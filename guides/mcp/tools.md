---
id: tools
title: Tools
description: A reference for the tools the StatusCake MCP server offers
---

The server offers seven tools. You do not call them yourself: the assistant
chooses which to use, and with what arguments, from your question. This page
describes what each does, so you can tell what an assistant is able to answer and
check what it did.

Every tool is read-only. Each is marked as such, so a client that distinguishes
between reading and changing can run them without asking for confirmation.

| Tool | Use it to |
| --- | --- |
| [`list_checks`](#list_checks) | Find checks, and see which are down. |
| [`get_check`](#get_check) | See how one check is configured. |
| [`list_incidents`](#list_incidents) | See when an uptime check was down. |
| [`list_check_history`](#list_check_history) | See the individual tests of an uptime check. |
| [`list_contact_groups`](#list_contact_groups) | See who is alerted, by count. |
| [`list_maintenance_windows`](#list_maintenance_windows) | See when alerts are suppressed. |
| [`ping`](#ping) | Check that the server is running. |

## Limits and truncation

Every listing returns at most 25 results unless a `limit` is given, and never more
than 100. The tools tell the assistant when a listing was cut short, so it can
say so rather than present a partial list as the whole:

- `list_checks`, `list_contact_groups` and `list_maintenance_windows` return a
  `total`, the number that matched before the limit, and `truncated`, which is
  `true` when `total` is larger than the number listed.
- `list_incidents` and `list_check_history` return `more`, which is `true` when
  older results exist beyond those listed.

When a result is truncated, narrow the question rather than ask for more: filter by
type, status or tag, or ask about a shorter window of time.

## Times

Times in questions and in results are [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339)
timestamps, such as `2026-10-01T09:30:00Z`. Times in results are always in UTC,
whatever the timezone of the check or of your account. The assistant converts
them when it answers, but if a time looks wrong, ask what timezone it assumed.

## list_checks

Lists checks of every type: uptime, pagespeed, SSL and heartbeat. Results are
ordered down first, then paused, then up.

| Argument | Required | Meaning |
| --- | --- | --- |
| `type` | No | Only checks of this type: `uptime`, `pagespeed`, `ssl` or `heartbeat`. |
| `status` | No | Only checks in this state: `up`, `down` or `paused`. |
| `tag` | No | Only checks carrying this tag. |
| `limit` | No | The most checks to return. |
| `include_uptime` | No | Also report each uptime and heartbeat check's uptime percentage. |

Each check in the result has an `id`, `type`, `name`, `status` and `tags`.
`status` is `up`, `down` or `paused`. It can also be `unknown`, which is reported
for SSL and pagespeed checks that are not paused, because the API does not
report whether those are healthy. You cannot filter by `unknown`.

Uptime percentages are left out unless `include_uptime` is set, because the API
has to work out the figure for every check, which is slow on a large account. When
it is set, uptime and heartbeat checks gain an `uptime_percent` between 0 and 100,
rounded to two decimal places. Pagespeed and SSL checks have no uptime percentage,
so they never carry one. The assistant is told to set the option only when you ask
about uptime, and to narrow by type or tag first.

The `id` is only unique within a type, so the assistant needs both the `type` and
the `id` to look at a single check.

## get_check

Returns one check, with the settings that belong to its type.

| Argument | Required | Meaning |
| --- | --- | --- |
| `type` | Yes | The check's type, as returned by `list_checks`. |
| `id` | Yes | The check's id, as returned by `list_checks`. |

The result has the same fields as a listing, plus `settings`. A single check
comes with its `uptime_percent` (for uptime and heartbeat checks) without being
asked, since looking up one check costs the API little. The `settings` are:

| Check type | Settings |
| --- | --- |
| `uptime` | `target`, `protocol`, `interval_seconds` |
| `pagespeed` | `target`, `region`, `interval_seconds` |
| `ssl` | `target`, `interval_seconds`, `alert_days` |
| `heartbeat` | `period_seconds` |

If no such check exists, the error says so and suggests `list_checks`, which is
usually enough for the assistant to put it right itself.

## list_incidents

Lists the periods during which an uptime check was down, newest first. Only
uptime checks have incidents.

| Argument | Required | Meaning |
| --- | --- | --- |
| `type` | Yes | The check's type. Only `uptime` has incidents. |
| `id` | Yes | The check's id. |
| `after` | No | Only incidents after this time. |
| `before` | No | Only incidents before this time. |
| `limit` | No | The most incidents to return. |

Each incident has `started_at`, `ended_at`, `ongoing` and `duration_seconds`.
`ended_at` is absent while the incident is `ongoing`, and in that case
`duration_seconds` is how long the check has been down so far.

`after` must be earlier than `before`.

## list_check_history

Lists the individual tests an uptime check has run, newest first. Where an
incident says *when* a check was down, the history says *what the target
answered* each time it was tested. Only uptime checks have history; asking for
the history of any other type returns an error saying so.

| Argument | Required | Meaning |
| --- | --- | --- |
| `type` | Yes | The check's type. Only `uptime` has history. |
| `id` | Yes | The check's id. |
| `after` | No | Only tests after this time. |
| `before` | No | Only tests before this time. |
| `limit` | No | The most tests to return. |

Each entry has the `at` time of the test, the `location` it ran from, the
`status_code` the target answered with and its `response_time_ms`. The last two
are absent when the target did not answer at all.

## list_contact_groups

Lists the contact groups that are alerted when a check fails, ordered by name.

| Argument | Required | Meaning |
| --- | --- | --- |
| `limit` | No | The most groups to return. |

Each group has an `id` and `name`, and counts: `emails`, `mobiles` and
`integrations`. The addresses and numbers themselves are never returned. See
[Security](/guides/mcp/security).

## list_maintenance_windows

Lists the maintenance windows, during which StatusCake suppresses alerts. Active
windows come first, then pending, then paused.

| Argument | Required | Meaning |
| --- | --- | --- |
| `state` | No | Only windows in this state: `active`, `pending` or `paused`. |
| `limit` | No | The most windows to return. |

Each window has an `id`, `name`, `state`, `start` and `end` time, how often it
`repeat`s, its `timezone`, the `tags` it covers and the number of `checks`
covered by name. A window covers a check if the check carries any of the window's
tags, or is named in it. Ask for `active` windows to see what is being silenced
right now.

## ping

Confirms that the server is running. It takes no arguments and returns the fixed
message `pong`. It does not contact StatusCake, so it succeeds even when your
token is wrong, which makes it useful for telling a server that will not start from
a token that is rejected. See [Troubleshooting](/guides/mcp/troubleshooting).

## What is not available

The server cannot see everything that the API can. There are no tools for
reading page speed or SSL results, uptime performance over time, tests from
heartbeat checks, status pages, or the settings that an uptime check sends, such as
headers and credentials. Nor are there tools to create, change or delete
anything.

## Next Steps

Learn how to ask [good questions](/guides/mcp/using).
