/**
 * timknab.dev on Firebase Hosting, in its own project (timknab-site).
 *
 * The site is a Next.js static export: `next build` writes out/, and the
 * Deploy workflow publishes it. Headers and redirects live in firebase.json at
 * the repo root; this root owns the project, the site, its domains, the
 * keyless deploy identity GitHub Actions uses, and DNS at name.com.
 *
 * The project has no billing account: Hosting on the free (Spark) plan needs
 * none, and twk-billing is at its five-project cap. State therefore lives in
 * twk-experiments' bucket (backend.tf).
 *
 * It replaced Netlify on 2026-11-27. The project, the deployer and the
 * identity pool were first made with gcloud and adopted here (imports.tf).
 */

resource "google_project" "site" {
  project_id      = var.project_id
  name            = var.project_name
  deletion_policy = "PREVENT"
}

locals {
  services = [
    "firebase.googleapis.com",
    "firebasehosting.googleapis.com",
    "iam.googleapis.com",
    "iamcredentials.googleapis.com",
    "sts.googleapis.com",
    "serviceusage.googleapis.com",
    "cloudresourcemanager.googleapis.com",
  ]
}

resource "google_project_service" "enabled" {
  for_each = toset(local.services)

  project            = google_project.site.project_id
  service            = each.value
  disable_on_destroy = false
}
