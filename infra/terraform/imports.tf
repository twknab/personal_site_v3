# Made with gcloud / Firebase on 2026-11-27 before this root existed, adopted
# here. Import blocks are no-ops once in state; they stay as a record.

import {
  to = google_project.site
  id = "timknab-site"
}

import {
  to = google_firebase_project.site
  id = "projects/timknab-site"
}

import {
  to = google_firebase_hosting_site.web
  id = "projects/timknab-site/sites/timknab-site"
}

import {
  to = google_service_account.deployer
  id = "projects/timknab-site/serviceAccounts/site-deployer@timknab-site.iam.gserviceaccount.com"
}

import {
  to = google_iam_workload_identity_pool.github
  id = "projects/timknab-site/locations/global/workloadIdentityPools/github"
}

import {
  to = google_iam_workload_identity_pool_provider.personal_site
  id = "projects/timknab-site/locations/global/workloadIdentityPools/github/providers/personal-site"
}
