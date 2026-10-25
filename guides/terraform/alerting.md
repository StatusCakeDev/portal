---
id: alerting
title: Alerting
description: Learn how to manage contact groups and maintenance windows with Terraform
---

A check that finds a problem is only useful if the right people hear about it,
and only trusted if it stays quiet when it should. Contact groups say who to
tell, and maintenance windows say when not to.

## Contact groups

A `statuscake_contact_group` is a set of ways to reach people.

```hcl title="main.tf" showLineNumbers
resource "statuscake_contact_group" "operations_team" {
  name = "Operations Team"

  email_addresses = [
    "johnsmith@example.com",
    "janesmith@example.com",
  ]

  mobile_numbers = ["+441234567890"]
}
```

| Argument | Meaning |
| --- | --- |
| `name` | The name of the group. |
| `email_addresses` | Email addresses to notify. |
| `mobile_numbers` | Mobile numbers to notify, in international format. |
| `integrations` | The identifiers of integrations, such as a chat service, to notify. |
| `ping_url` | An HTTP `GET` endpoint to request when an alert is raised. |

Checks refer to a group by its identifier. Referring to the resource, rather than
typing the identifier, tells Terraform to create the group first.

```hcl title="main.tf" showLineNumbers {5}
resource "statuscake_uptime_check" "example" {
  name           = "Example"
  check_interval = 300

  contact_groups = [statuscake_contact_group.operations_team.id]

  http_check {}

  monitored_resource {
    address = "https://www.example.com"
  }
}
```

## Maintenance windows

A `statuscake_maintenance_window` silences alerts while planned work is done, so
that a deployment does not wake anyone. It covers the checks you list in `tests`,
the checks that carry any of its `tags`, or both.

```hcl title="main.tf" showLineNumbers
resource "statuscake_maintenance_window" "weekly_patching" {
  name            = "Weekly patching"
  start           = "2026-11-07T22:00:00Z"
  end             = "2026-11-08T00:00:00Z"
  timezone        = "Europe/London"
  repeat_interval = "1w"

  tags = ["production"]

  tests = [
    statuscake_uptime_check.example.id,
  ]
}
```

| Argument | Meaning |
| --- | --- |
| `start`, `end` | When the window begins and ends, as RFC 3339 times. |
| `timezone` | The time zone of the window, such as `Europe/London`. |
| `repeat_interval` | How often it recurs: `never`, `1d`, `1w`, `2w` or `1m`. |
| `tags` | Silences the checks carrying these tags. |
| `tests` | Silences the checks with these identifiers. |

Selecting by tag means a window keeps working as checks come and go: a window that
silences everything tagged `production` needs no change when a new production
check is added.

## Next Steps

Look up resources that already exist with [data sources](/guides/terraform/data-sources).
