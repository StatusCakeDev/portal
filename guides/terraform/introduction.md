---
id: introduction
title: Terraform
description: Learn how to manage StatusCake monitoring with the Terraform provider
---

StatusCake provides a comprehensive [Terraform
provider](https://registry.terraform.io/providers/StatusCakeDev/statuscake/latest/docs)
to manage monitoring resources declaratively. Rather than creating checks one at
a time, you describe the monitoring you want in configuration files, and
Terraform works out what has to change to make StatusCake match.

```hcl title="main.tf" showLineNumbers
resource "statuscake_uptime_check" "example" {
  name           = "Example"
  check_interval = 300

  http_check {}

  monitored_resource {
    address = "https://www.example.com"
  }
}
```

:::caution

It is assumed you are already familiar with Terraform and have it installed. If
not check out the [installation page](https://www.terraform.io/downloads) to get
started.

:::

:::info

The examples in these guides work with Terraform 1.x and above.

:::

## Why use Terraform for monitoring

- **Monitoring is reviewed like code.** A new check, or a change to who is
  alerted, is a pull request that a colleague can read before it takes effect.
- **Nothing is forgotten.** Create a service and its monitoring in the same
  change, so that no service goes live unwatched.
- **Drift is visible.** Terraform compares what you wrote with what exists, and
  `terraform plan` shows any difference before anything is changed.
- **Repeatable.** The same configuration can create identical monitoring for
  staging and production, or for every tenant you onboard.
- **Cleaned up with the service.** When the service is removed, so are its
  checks, instead of lingering and alerting about something that no longer
  exists.

If monitoring is created by your own software at runtime, use an
[SDK](/guides/sdks/introduction).

## What the provider manages

| Kind | Name | Manages |
| --- | --- | --- |
| Resource | `statuscake_uptime_check` | Uptime checks of every type. |
| Resource | `statuscake_pagespeed_check` | Pagespeed checks. |
| Resource | `statuscake_ssl_check` | SSL certificate checks. |
| Resource | `statuscake_heartbeat_check` | Heartbeat checks. |
| Resource | `statuscake_contact_group` | Who is alerted. |
| Resource | `statuscake_maintenance_window` | When alerts are silenced. |
| Data source | `statuscake_contact_group` | An existing contact group. |
| Data source | `statuscake_uptime_monitoring_locations` | Where uptime checks can run from. |
| Data source | `statuscake_pagespeed_monitoring_locations` | Where pagespeed checks can run from. |

The complete argument reference for each is on the [Terraform
Registry](https://registry.terraform.io/providers/StatusCakeDev/statuscake/latest/docs).
These guides explain how to use them together.

## How these guides are organised

| Guide | What it covers |
| --- | --- |
| [Installation](/guides/terraform/installation) | Declaring and downloading the provider. |
| [Authentication](/guides/terraform/authentication) | Giving the provider an API token safely. |
| [Configuration](/guides/terraform/configuration) | Retries, backoff and throttling. |
| [Quick Start](/guides/terraform/quickstart) | Creating, changing and destroying your first check. |
| [Uptime Checks](/guides/terraform/uptime-checks) | Every type of uptime check. |
| [Other Checks](/guides/terraform/other-checks) | Pagespeed, SSL and heartbeat checks. |
| [Alerting](/guides/terraform/alerting) | Contact groups and maintenance windows. |
| [Data Sources](/guides/terraform/data-sources) | Looking up existing contact groups and locations. |
| [Importing](/guides/terraform/importing) | Bringing existing checks under Terraform. |
| [Troubleshooting](/guides/terraform/troubleshooting) | Fixing common problems. |

## Next Steps

[Install](/guides/terraform/installation) the provider.
