# Infrastructure — timknab.dev

Everything that serves timknab.dev is in this one Terraform root. Nothing is
changed by hand in the Google Cloud, Firebase or name.com consoles.

| File | What it owns |
| --- | --- |
| `main.tf` | The `timknab-site` project ("TimKnab Developer Site") and its APIs |
| `hosting.tf` | Firebase on the project, the Hosting site, and the `timknab.dev` / `www.timknab.dev` domains (www redirects to the apex) |
| `ci.tf` | `site-deployer`, the service account the Deploy workflow uses, and the Workload Identity pool that lets **only** `twknab/personal_site_v3` on `main` act as it. No key exists. |
| `dns.tf` | Every DNS record for timknab.dev at name.com, and the domain's nameservers |
| `backend.tf` | State: `gs://twk-experiments-embodied-tfstate/timknab-site` |
| `imports.tf` | Resources first made with gcloud on 2026-11-27, adopted into state |

What the site itself sends (headers, clean URLs, caching) is `firebase.json`
at the repo root, not Terraform.

## Running it

```bash
gcloud auth application-default login          # once
source ~/.config/namedotcom/env                 # NAMEDOTCOM_USERNAME / NAMEDOTCOM_TOKEN
cd infra/terraform
terraform init
terraform plan -out=tfplan                      # read the diff
terraform apply tfplan
```

The name.com credentials are an API token from
<https://www.name.com/account/settings/api>, kept in a local file readable
only by you. They never go in a `.tf` or `.tfvars` file.

Two name.com quirks, both hit on the first apply:

- name.com gives each account its own nameservers (here `ns1qsy`, `ns2dqx`,
  `ns3gnv`, `ns4hmp`). Asking for the generic `ns1.name.com` set is rewritten
  to those and Terraform reports an inconsistent result.
- Creating two records at the same host in parallel can fail with
  "Parameter Value Error - Dns Error". Re-running the apply creates the rest.

After an apply, `terraform output firebase_required_dns` lists what Firebase
wants at the DNS host. `dns.tf` should already match it; if Firebase ever asks
for something new, change `dns.tf` rather than the name.com dashboard.

## Why no billing account

Firebase Hosting on the free (Spark) plan needs none, and the `twk-billing`
account is at its five-project limit. The cost of that choice is that the
project cannot hold its own state bucket, so state lives under a prefix in
`twk-experiments`' versioned bucket. If the project ever gets billing, move
state into a bucket of its own with `terraform init -migrate-state`.

## History

Hosted on Netlify (with Netlify DNS) until 2026-11-27. The Netlify zone held
four records: the apex and www (Netlify-only types), `plumberwars` →
`ghs.googlehosted.com`, and the Google site-verification TXT. The last two
were carried over in `dns.tf`.
