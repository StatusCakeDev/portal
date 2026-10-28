---
id: uptime-checks
title: Uptime Checks
description: Learn how to configure every type of uptime check with Terraform
---

An uptime check tests, on a schedule and from several places, whether something
answers. In Terraform it is the `statuscake_uptime_check` resource. This guide
shows each type of check, and what to expect when you change one.

## The shape of a check

Every uptime check has the same outline:

```hcl title="main.tf" showLineNumbers
resource "statuscake_uptime_check" "example" {
  name           = "Example"
  check_interval = 300

  <type>_check {
    # Settings specific to the type of check
  }

  monitored_resource {
    address = "https://www.example.com"
  }
}
```

- `name` is what you call the check.
- `check_interval` is the number of seconds between tests. Only certain values are
  accepted, and `terraform plan` tells you if yours is not one of them.
- Exactly one *type block* says how the check tests: `http_check`, `tcp_check`,
  `dns_check` or `icmp_check`.
- `monitored_resource` says what is tested: the `address` is a URL, host name or
  IP address.

Optional arguments common to every type:

| Argument | Meaning |
| --- | --- |
| `contact_groups` | The identifiers of the [contact groups](/guides/terraform/alerting) to alert. |
| `tags` | Labels, used to find checks and to select them in maintenance windows. |
| `regions` | Where to run tests from. See [Data Sources](/guides/terraform/data-sources). |
| `confirmation` | Confirmation servers that must agree the check is down before an alert. From 0 to 3, and `2` by default. |
| `trigger_rate` | Minutes to wait before sending an alert. From 0 to 60. |
| `paused` | Set to `true` to stop the check running. |

## HTTP checks

```hcl title="main.tf" showLineNumbers
resource "statuscake_uptime_check" "checkout" {
  name           = "Checkout"
  check_interval = 60
  confirmation   = 3
  tags           = ["production", "payments"]

  contact_groups = [statuscake_contact_group.operations_team.id]

  http_check {
    follow_redirects = true
    timeout          = 20
    user_agent       = "terraform managed uptime check"
    validate_ssl     = true

    content_matchers {
      content         = "Place your order"
      include_headers = false
      matcher         = "CONTAINS_STRING"
    }

    status_codes = ["500", "502", "503"]
  }

  monitored_resource {
    address = "https://www.example.com/checkout"
  }
}
```

Useful `http_check` arguments:

| Argument | Meaning |
| --- | --- |
| `follow_redirects` | Whether to follow redirects. Off by default. |
| `final_endpoint` | Where the redirect chain should end. |
| `status_codes` | Status codes that trigger an alert. |
| `content_matchers` | Text to look for in the response. The check is down if it is not found, or with `matcher = "NOT_CONTAINS_STRING"` if it is found. |
| `request_headers` | A map of headers to send. |
| `request_payload`, `request_payload_raw` | A body to send. Setting either makes the check use `POST`. Use only one. |
| `basic_authentication` | A block with a `username` and `password`. |
| `request_method` | `HTTP`, or `HEAD` to request headers only. |
| `timeout` | Seconds to wait for the first byte. From 5 to 75, and `15` by default. |
| `enable_cookies` | Whether to keep cookies. |
| `validate_ssl` | Whether to alert when the certificate is about to expire. |

:::warning

`basic_authentication` and `request_headers` often hold secrets. Take them from
sensitive variables rather than writing them in the file, and remember they are
kept in Terraform state.

:::

## TCP checks

A `tcp_check` connects to a port.

```hcl title="main.tf" showLineNumbers
resource "statuscake_uptime_check" "database" {
  name           = "Database"
  check_interval = 60

  tcp_check {
    port     = 5432
    protocol = "TCP"
    timeout  = 15
  }

  monitored_resource {
    address = "db.example.com"
  }
}
```

`protocol` is `TCP`, `SMTP` or `SSH`. An `SMTP` or `SSH` check can also log in,
with an `authentication` block holding a `username` and `password`.

## DNS checks

A `dns_check` looks up a name and compares the answer with the addresses you
expect.

```hcl title="main.tf" showLineNumbers
resource "statuscake_uptime_check" "apex" {
  name           = "Apex record"
  check_interval = 900

  dns_check {
    dns_ips    = ["192.0.2.1", "192.0.2.2"]
    dns_server = "8.8.8.8"
  }

  monitored_resource {
    address = "example.com"
  }
}
```

## Ping checks

An `icmp_check` sends a ping. The block has no settings, but must be present to
choose the type.

```hcl title="main.tf" showLineNumbers
resource "statuscake_uptime_check" "gateway" {
  name           = "Gateway"
  check_interval = 60

  icmp_check {}

  monitored_resource {
    address = "192.0.2.10"
  }
}
```

## What changes replace a check

Most changes are made to the check in place. A few cannot be, and make Terraform
delete the check and create a new one. The plan marks these with
`-/+` and `must be replaced`.

- Changing the **type** of check, for example from `http_check` to `dns_check`.
- Changing an HTTP check's `request_method`.
- Changing a TCP check's `protocol`.

A replacement gets a new identifier, and the history recorded by the old check
stays with the old check. Read the plan before applying a change of these kinds
to a check whose history you value.

## Next Steps

Learn about [pagespeed, SSL and heartbeat checks](/guides/terraform/other-checks).
