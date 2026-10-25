---
id: data-sources
title: Data Sources
description: Learn how to look up contact groups and monitoring locations with Terraform
---

A data source reads something that exists already, rather than creating it. This
is how a configuration refers to things Terraform does not manage.

## Contact groups

If your contact groups are managed elsewhere, such as in the web application or
by another team's Terraform, look one up by its identifier.

```hcl title="main.tf" showLineNumbers
data "statuscake_contact_group" "developers" {
  id = "123456"
}

resource "statuscake_uptime_check" "example" {
  name           = "Example"
  check_interval = 300

  contact_groups = [data.statuscake_contact_group.developers.id]

  http_check {}

  monitored_resource {
    address = "https://www.example.com"
  }
}
```

The data source also exposes the group's `name`, `email_addresses`,
`mobile_numbers`, `integrations` and `ping_url`.

## Monitoring locations

Checks run from locations, and the `regions` of an uptime check come from here.
Two data sources list them, one for uptime checks and one for pagespeed checks.

```hcl title="main.tf" showLineNumbers
data "statuscake_uptime_monitoring_locations" "uk" {
  region_code = "GBR"
}

data "statuscake_pagespeed_monitoring_locations" "uk" {
  region_code = "GB"
}
```

Each has a `locations` list, and each location has a `description`, `region`,
`region_code`, `status`, `ipv4` and `ipv6`.

A common use is to keep the addresses checks come from allowed through a
firewall:

```hcl title="main.tf" showLineNumbers
output "uptime_monitoring_location_ips" {
  value = toset([
    for location in data.statuscake_uptime_monitoring_locations.uk.locations : location.ipv4
  ])
}
```

Leave out `region_code` to list every location.

## Next Steps

Bring checks you created by hand under Terraform's control. See
[Importing](/guides/terraform/importing).
