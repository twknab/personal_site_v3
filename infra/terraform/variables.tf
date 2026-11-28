variable "project_id" {
  description = "GCP / Firebase project that hosts the site."
  type        = string
  default     = "timknab-site"
}

variable "project_name" {
  description = "Human-readable project name (GCP allows no periods or parentheses)."
  type        = string
  default     = "TimKnab Developer Site"
}

variable "region" {
  type    = string
  default = "us-west1"
}

variable "domain" {
  description = "Apex domain served by the site. www.<domain> redirects to it."
  type        = string
  default     = "timknab.dev"
}

variable "github_repository" {
  description = "owner/name of the repository allowed to deploy."
  type        = string
  default     = "twknab/personal_site_v3"
}
