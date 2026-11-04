---
id: alerting
title: Alerting
description: Learn how to manage contact groups and maintenance windows with cakectl
---

A check that finds a problem is only useful if the right people hear about it,
and only trusted if it stays quiet when it should. Contact groups say who to
tell, and maintenance windows say when not to.

## Contact groups

A contact group is a set of ways to reach people. Checks refer to groups by
identifier, so create the group first.

```bash title="Terminal"
$ cakectl contact-group create --name "On call" \
    --email-addresses oncall@example.com,ops@example.com \
    --mobile-numbers +441234567890
```

| Flag | Meaning |
| --- | --- |
| `--name` | The name of the group. |
| `--email-addresses` | Email addresses to notify. |
| `--mobile-numbers` | Mobile numbers to notify, in international format. |
| `--integrations` | IDs of integrations to notify. |
| `--ping-url` | A URL to request when an alert is raised. |

As a file:

```yaml title="contact-group.yaml" showLineNumbers
name: On call
email_addresses:
- oncall@example.com
- ops@example.com
mobile_numbers:
- "+441234567890"
```

Then attach the group to checks with `--contact-groups`:

```bash title="Terminal"
$ cakectl contact-group list
$ cakectl uptime update 123 --contact-groups 456
```

:::info

A list of contact groups leaves out email addresses, phone numbers and ping URLs.
`cakectl contact-group describe ID` shows them.

:::

## Maintenance windows

A maintenance window silences alerts for the checks it covers while planned work
is done, so that a deployment does not wake anyone. It covers checks you name
with `--tests`, checks that carry any of its `--tags`, or both.

```bash title="Terminal"
$ cakectl maintenance-window create --name "Deploy" \
    --start-at 2026-11-01T22:00:00Z --end-at 2026-11-02T01:00:00Z \
    --timezone Europe/London --tests 123,456
```

| Flag | Meaning |
| --- | --- |
| `--start-at`, `--end-at` | When the window begins and ends, as RFC 3339 times such as `2026-11-01T22:00:00Z`. |
| `--timezone` | The IANA time zone of the window, such as `Europe/London`. |
| `--repeat-interval` | How often it recurs: `never`, `1d`, `1w`, `2w` or `1m`. |
| `--tests` | IDs of the checks to silence. |
| `--tags` | Silence the checks carrying these tags. |

Selecting by tag means a window keeps working as checks come and go. A window
that silences everything tagged `production` needs no change when a new
production check is added.

```yaml title="weekly-patching.yaml" showLineNumbers
name: Weekly patching
start_at: 2026-11-07T22:00:00Z
end_at: 2026-11-08T00:00:00Z
timezone: Europe/London
repeat_interval: 1w
tags:
- production
```

See what is silenced right now with the state filter:

```bash title="Terminal"
$ cakectl maintenance-window list
$ cakectl maintenance-window list --state active
```

The states are `active`, `pending` and `paused`. `maintenance-windows` and `mw`
also work in place of `maintenance-window`.

## Next Steps

Look at what your checks have recorded with [Reading Results](/guides/cli/results).
