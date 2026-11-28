# DNS for timknab.dev, hosted at name.com (also the registrar).
#
# Until 2026-11-27 the zone lived at Netlify DNS (nsone.net). Its records were
# copied here — plumberwars and the Google site-verification TXT — and the
# Netlify-only apex/www records replaced with Firebase Hosting's.
#
# Compare with `terraform output firebase_required_dns` after an apply: if
# Firebase ever asks for something different, change it here.

locals {
  # Certificate challenge records Firebase generates per domain. Read from the
  # custom-domain resources so a reissued challenge flows through on apply.
  acme = {
    for name, d in {
      apex = google_firebase_hosting_custom_domain.apex
      www  = google_firebase_hosting_custom_domain.www
      } : name => one(flatten([
        for c in d.cert : [
          for v in c.verification : [
            for dns in v.dns : [
              for desired in dns.desired : [
                for r in desired.records : r.rdata
                if r.type == "TXT" && startswith(r.domain_name, "_acme-challenge.")
              ]
            ]
          ]
        ]
    ]))
  }

  records = {
    # Firebase Hosting
    apex_a       = { host = "", type = "A", answer = "199.36.158.100" }
    apex_hosting = { host = "", type = "TXT", answer = "hosting-site=${google_firebase_hosting_site.web.site_id}" }
    www_cname    = { host = "www", type = "CNAME", answer = "${google_firebase_hosting_site.web.site_id}.web.app" }

    # Carried over from Netlify DNS
    google_verify = { host = "", type = "TXT", answer = "google-site-verification=xauC5kcwqnnjweTyXm7bmkYQKnYOt4TrMDt0ivgiSUw" }
    plumberwars   = { host = "plumberwars", type = "CNAME", answer = "ghs.googlehosted.com" }
  }

  acme_records = {
    for name, value in local.acme : "acme_${name}" => {
      host   = name == "apex" ? "_acme-challenge" : "_acme-challenge.www"
      type   = "TXT"
      answer = value
    } if value != null
  }
}

resource "namedotcom_record" "zone" {
  for_each = merge(local.records, local.acme_records)

  domain_name = var.domain
  host        = each.value.host
  record_type = each.value.type
  answer      = each.value.answer

  # name.com refuses records for a domain not on its nameservers.
  depends_on = [namedotcom_domain_nameservers.domain]
}

# The cutover: points the domain at name.com's own DNS (away from Netlify's).
# It has to come first — name.com rejects records for a domain that is not on
# its nameservers. Resolvers keep asking Netlify's (still-live) zone until the
# old NS records expire, so the site stays up while this propagates.
resource "namedotcom_domain_nameservers" "domain" {
  domain_name = var.domain
  # name.com assigns each account its own set; asking for the generic
  # ns1-4.name.com is silently rewritten to these.
  nameservers = [
    "ns1qsy.name.com",
    "ns2dqx.name.com",
    "ns3gnv.name.com",
    "ns4hmp.name.com",
  ]
}
