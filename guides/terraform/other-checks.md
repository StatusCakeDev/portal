---
id: other-checks
title: Other Checks
description: Learn how to configure pagespeed, SSL and heartbeat checks with Terraform
---

Besides [uptime checks](/guides/terraform/uptime-checks), StatusCake monitors how
fast pages load, whether certificates are healthy, and whether your scheduled
jobs are running.

## Pagespeed checks

A `statuscake_pagespeed_check` loads a page and records how long it took, how big
it was and how many requests it made.

```hcl title="main.tf" showLineNumbers
resource "statuscake_pagespeed_check" "landing_page" {
  name           = "Landing page"
  check_interval = 3600
  region         = "UK"

  alert_config {
    alert_slower = 3000
    alert_bigger = 2048
  }

  contact_groups = [statuscake_contact_group.operations_team.id]

  monitored_resource {
    address = "https://www.example.com"
  }
}
```

- `region` is where the page is tested from: `AU`, `CA`, `DE`, `FR`, `IN`, `JP`,
  `NL`, `SG`, `UK`, `US` or `USW`.
- `alert_config` is required. Each setting is a threshold: `alert_slower` is a
  load time in milliseconds, `alert_bigger` and `alert_smaller` are page sizes in
  kilobytes. An empty `alert_config {}` block turns all alerts off, which is
  useful when you only want the measurements.

## SSL checks

A `statuscake_ssl_check` watches a certificate and alerts before it expires or
when something is wrong with it.

```hcl title="main.tf" showLineNumbers
resource "statuscake_ssl_check" "example" {
  check_interval = 86400

  alert_config {
    alert_at    = [7, 14, 30]
    on_broken   = true
    on_expiry   = true
    on_mixed    = true
    on_reminder = true
  }

  contact_groups = [statuscake_contact_group.operations_team.id]

  monitored_resource {
    address = "https://www.example.com"
  }
}
```

- `alert_at` is the number of days before expiry at which to alert. It takes
  exactly three values.
- `on_expiry`, `on_broken`, `on_mixed` and `on_reminder` choose which events
  alert: the certificate expiring, being broken, a page loading insecure (mixed)
  content, and reminders as expiry approaches.
- `monitored_resource` takes an `address`, and optionally a `hostname` to present
  during the TLS handshake.

## Heartbeat checks

A `statuscake_heartbeat_check` works the other way round. Rather than StatusCake
testing your service, your job tells StatusCake that it ran. If a ping does not
arrive within `period` seconds, the check is down. It suits work that has no
address to test, such as a nightly backup or a queue consumer.

```hcl title="main.tf" showLineNumbers
resource "statuscake_heartbeat_check" "backup" {
  name   = "Nightly backup"
  period = 90000

  contact_groups = [statuscake_contact_group.operations_team.id]
  tags           = ["production"]
}

output "backup_ping_url" {
  value = statuscake_heartbeat_check.backup.check_url
}
```

The check's `check_url` is the address your job requests to report in. Give the
job a `period` a little longer than its schedule, so that one slow run does not
raise an alert.

:::info

Anyone with the ping URL can report your job as healthy. Treat `check_url` as a
secret, and mark any output that holds it `sensitive = true`.

:::

## Next Steps

Decide who hears about problems, and when to stay quiet. See
[Alerting](/guides/terraform/alerting).
