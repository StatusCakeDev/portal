---
id: uptime-checks
title: Uptime Checks
description: Learn how to create and manage every kind of uptime check with cakectl
---

An uptime check tests, on a schedule and from several places, whether something
answers. This guide shows how to create each kind, and how to find and change
the ones you have. It builds on [Managing
Resources](/guides/cli/managing-resources).

## What is required

An uptime check needs four things: a `name`, a `test_type`, a `website_url` and a
`check_rate`. Everything else is optional.

| Field | Flag | Meaning |
| --- | --- | --- |
| `name` | `--name` | What you call the check. |
| `test_type` | `--test-type` | How it is tested: `HTTP`, `HEAD`, `TCP`, `DNS`, `PING`, `SMTP` or `SSH`. |
| `website_url` | `--website-url` | The URL, host name or address to test. |
| `check_rate` | `--check-rate` | Seconds between tests: `0`, `30`, `60`, `300`, `900`, `1800`, `3600` or `86400`. |

## HTTP checks

```bash title="Terminal"
$ cakectl uptime create --name "Home page" --test-type HTTP \
    --website-url https://www.example.com --check-rate 300
```

HTTP checks have the most options. The common ones are:

| Flag | Meaning |
| --- | --- |
| `--follow-redirects` | Follow redirects rather than treating one as the answer. |
| `--final-endpoint` | The URL the check must end up at after redirects. |
| `--status-codes` | HTTP status codes that count as down. |
| `--find-string` | Text the response must contain. |
| `--do-not-find` | Alert if the text is present rather than absent. |
| `--include-header` | Include response headers when searching for the text. |
| `--basic-username`, `--basic-password` | HTTP basic authentication. |
| `--custom-header` | Request headers, as a JSON object. |
| `--post-body`, `--post-raw` | Data to send, as JSON form data or as a raw body. |
| `--user-agent` | The user agent to send. |
| `--timeout` | Seconds to wait for a response. |
| `--use-jar` | Keep cookies between redirects. |
| `--enable-ssl-alert` | Alert when the certificate is about to expire. |

As a file, a check that looks for text and alerts the on-call group:

```yaml title="checkout.yaml" showLineNumbers
name: Checkout
test_type: HTTP
website_url: https://www.example.com/checkout
check_rate: 60
follow_redirects: true
find_string: Place your order
status_codes:
- "500"
- "502"
- "503"
contact_groups:
- "1234"
tags:
- production
- payments
```

```bash title="Terminal"
$ cakectl uptime create --filename checkout.yaml
```

## TCP, SMTP and SSH checks

These connect to a port rather than requesting a page.

```bash title="Terminal"
$ cakectl uptime create --name "Database" --test-type TCP \
    --website-url db.example.com --port 5432 --check-rate 60
```

## DNS checks

A DNS check looks up a name and compares the answer with the addresses you
expect.

```bash title="Terminal"
$ cakectl uptime create --name "Apex record" --test-type DNS \
    --website-url example.com --dns-ips 192.0.2.1,192.0.2.2 \
    --dns-server 8.8.8.8 --check-rate 900
```

## Ping checks

```bash title="Terminal"
$ cakectl uptime create --name "Gateway" --test-type PING \
    --website-url 192.0.2.10 --check-rate 60
```

## Choosing where checks run

Checks run from monitoring locations. List them, then choose with `--regions`.

```bash title="Terminal"
$ cakectl locations uptime
$ cakectl uptime create --filename checkout.yaml --regions london,paris
```

## Reducing false alarms

Two settings make an alert less hasty:

- `--confirmation` is the number of confirmation servers that must agree the
  check is down before anyone is alerted.
- `--trigger-rate` is the number of failed checks in a row before an alert.

## Finding checks

```bash title="Terminal"
$ cakectl uptime list
$ cakectl uptime list --status down
$ cakectl uptime list --tags production,payments
$ cakectl uptime list --tags production,payments --match-any
```

With several `--tags`, a check must carry all of them, unless you add
`--match-any` to match checks carrying any of them.

### Uptime percentage

Listings leave out each check's uptime percentage, because the API has to work
it out for every check and that makes the request noticeably slower on a large
account. Add `--uptime` when you want it. The table gains an `UPTIME` column, and
JSON and YAML output gain an `uptime` field.

```bash title="Terminal"
$ cakectl uptime list --uptime
$ cakectl uptime list --tags production --uptime --format json
```

Without the flag, `uptime` is absent from JSON and YAML output rather than
zero, so a script can tell "not asked for" from "0%". `cakectl uptime describe`
always includes it, since a single check costs the API little.

## Changing checks

```bash title="Terminal"
$ cakectl uptime update 123 --paused
$ cakectl uptime update 123 --check-rate 60 --tags production,critical
$ cakectl uptime update 123 --paused=false
```

Tags are useful for acting on many checks at once; see [Scripting](/guides/cli/scripting)
and [maintenance windows](/guides/cli/alerting#maintenance-windows).

## Next Steps

Learn about [pagespeed, SSL and heartbeat checks](/guides/cli/other-checks).
