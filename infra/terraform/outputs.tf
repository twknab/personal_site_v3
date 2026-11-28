output "default_url" {
  description = "The site's own address, usable before DNS points at it."
  value       = google_firebase_hosting_site.web.default_url
}

output "workload_identity_provider" {
  description = "Goes in deploy.yml → google-github-actions/auth."
  value       = google_iam_workload_identity_pool_provider.personal_site.name
}

output "deployer_service_account" {
  value = google_service_account.deployer.email
}

output "firebase_required_dns" {
  description = "What Firebase asks for. dns.tf must match it; compare after an apply."
  value = {
    (google_firebase_hosting_custom_domain.apex.custom_domain) = google_firebase_hosting_custom_domain.apex.required_dns_updates
    (google_firebase_hosting_custom_domain.www.custom_domain)  = google_firebase_hosting_custom_domain.www.required_dns_updates
  }
}

output "domain_status" {
  value = {
    apex = { host = google_firebase_hosting_custom_domain.apex.host_state, cert = google_firebase_hosting_custom_domain.apex.cert }
    www  = { host = google_firebase_hosting_custom_domain.www.host_state, cert = google_firebase_hosting_custom_domain.www.cert }
  }
}
