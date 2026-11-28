resource "google_firebase_project" "site" {
  provider = google-beta
  project  = google_project.site.project_id

  depends_on = [google_project_service.enabled]
}

# The default site Firebase made with the project; also https://timknab-site.web.app.
resource "google_firebase_hosting_site" "web" {
  provider = google-beta

  project = google_firebase_project.site.project
  site_id = var.project_id
}

resource "google_firebase_hosting_custom_domain" "apex" {
  provider = google-beta

  project       = google_firebase_project.site.project
  site_id       = google_firebase_hosting_site.web.site_id
  custom_domain = var.domain

  # DNS moves to name.com in the same apply (dns.tf); do not block on it.
  wait_dns_verification = false
}

# www answers with a redirect to the apex, so there is one canonical address.
resource "google_firebase_hosting_custom_domain" "www" {
  provider = google-beta

  project         = google_firebase_project.site.project
  site_id         = google_firebase_hosting_site.web.site_id
  custom_domain   = "www.${var.domain}"
  redirect_target = var.domain

  wait_dns_verification = false

  depends_on = [google_firebase_hosting_custom_domain.apex]
}
