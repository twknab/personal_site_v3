# The identity the Deploy workflow (.github/workflows/deploy.yml) acts as.
# No key exists for it: GitHub's OIDC token is exchanged through the pool
# below, and the provider only accepts tokens from this repo's main branch.

resource "google_service_account" "deployer" {
  project      = google_project.site.project_id
  account_id   = "site-deployer"
  display_name = "GitHub Actions site deployer"
}

resource "google_project_iam_member" "deployer" {
  for_each = toset([
    "roles/firebasehosting.admin",
    "roles/serviceusage.serviceUsageConsumer",
  ])

  project = google_project.site.project_id
  role    = each.value
  member  = "serviceAccount:${google_service_account.deployer.email}"
}

resource "google_iam_workload_identity_pool" "github" {
  project                   = google_project.site.project_id
  workload_identity_pool_id = "github"
  display_name              = "GitHub Actions"
}

resource "google_iam_workload_identity_pool_provider" "personal_site" {
  project                            = google_project.site.project_id
  workload_identity_pool_id          = google_iam_workload_identity_pool.github.workload_identity_pool_id
  workload_identity_pool_provider_id = "personal-site"

  attribute_mapping = {
    "google.subject"       = "assertion.sub"
    "attribute.repository" = "assertion.repository"
    "attribute.ref"        = "assertion.ref"
  }
  attribute_condition = "assertion.repository=='${var.github_repository}' && assertion.ref=='refs/heads/main'"

  oidc {
    issuer_uri = "https://token.actions.githubusercontent.com"
  }
}

resource "google_service_account_iam_member" "deployer_wif" {
  service_account_id = google_service_account.deployer.name
  role               = "roles/iam.workloadIdentityUser"
  member             = "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.github.name}/attribute.repository/${var.github_repository}"
}
