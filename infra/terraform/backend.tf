# timknab-site has no billing account, so it cannot hold a bucket. State sits
# under its own prefix in twk-experiments' versioned state bucket.
terraform {
  backend "gcs" {
    bucket = "twk-experiments-embodied-tfstate"
    prefix = "timknab-site"
  }
}
