---
id: resources
title: Resources
description: Learn about the resources the StatusCake API exposes and how they relate
---

The API manages a small number of resources. Understanding how they relate to
each other makes it much easier to decide which endpoints a task needs.

## Checks

A check is a monitor that StatusCake runs on a schedule against something you
care about. There are four kinds, each with its own endpoints.

| Resource | Path | What it monitors |
| --- | --- | --- |
| Uptime check | `/uptime` | Whether a website or server answers, using HTTP, HEAD, TCP, DNS, ping (ICMP), SMTP or SSH tests. |
| Pagespeed check | `/pagespeed` | How quickly and how heavily a page loads. |
| SSL check | `/ssl` | The validity and expiry of a certificate. |
| Heartbeat check | `/heartbeat` | Whether a job or service, such as a nightly backup, keeps reporting in. |

Every kind of check supports the same five operations, following the usual
conventions for the HTTP method:

| Operation | Request | Response |
| --- | --- | --- |
| List | `GET /uptime` | A page of checks. |
| Create | `POST /uptime` | The identifier of the new check. |
| Retrieve | `GET /uptime/{test_id}` | One check, in full. |
| Update | `PUT /uptime/{test_id}` | No body. Only the properties you send change. |
| Delete | `DELETE /uptime/{test_id}` | No body. |

Replace `/uptime` with `/pagespeed`, `/ssl` or `/heartbeat` for the other
kinds of check.

### What a check has recorded

Uptime checks keep a record of what has happened to them. Each is a list that
can be limited to a window of time (see [Pagination](/guides/api/pagination)):

| Request | Records |
| --- | --- |
| `GET /uptime/{test_id}/history` | Every individual test: when it ran, from where, and what the target answered. |
| `GET /uptime/{test_id}/periods` | The periods during which the check was up or down. |
| `GET /uptime/{test_id}/alerts` | The alerts that were sent. |

Pagespeed checks keep their results at `GET /pagespeed/{test_id}/history`.

## Alerting

Checks are connected to the people who should hear about a problem through
contact groups, and silenced during planned work with maintenance windows.

| Resource | Path | Purpose |
| --- | --- | --- |
| Contact group | `/contact-groups` | A set of email addresses, mobile numbers, integrations and an optional ping URL to alert. A check refers to groups by their identifiers in `contact_groups`. |
| Maintenance window | `/maintenance-windows` | A period, optionally repeating, during which alerts are suppressed. A window names the checks it covers in `tests`, or selects them by `tags`. |

Contact groups and maintenance windows support the same create, retrieve,
update, delete and list operations as checks.

## Locations

Checks run from monitoring locations. The locations a check can use are listed
by two read-only endpoints, and the values they return are what you supply in a
check's `regions` (uptime) or `region` (pagespeed).

| Request | Lists |
| --- | --- |
| `GET /uptime-locations` | The locations uptime checks can run from. |
| `GET /pagespeed-locations` | The locations pagespeed checks can run from. |

## Tags

Uptime checks and heartbeat checks can carry tags, which are free-form labels
that you choose. Tags are useful for more than organisation: a list of uptime
checks can be filtered by tag, and a maintenance window can silence every check
that carries one.

## How resources refer to each other

Resources refer to one another by identifier, and identifiers are strings. This
means that the order in which you create things matters:

1. Create the contact groups that should hear about problems.
2. Create the checks, naming those groups in `contact_groups`.
3. Create any maintenance windows, naming checks in `tests` or selecting them
   with `tags`.

Reverse the order to tear things down, so that nothing is left referring to a
resource that no longer exists.

## Next Steps

Learn how to authenticate your requests.
