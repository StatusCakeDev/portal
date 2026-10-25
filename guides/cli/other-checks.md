---
id: other-checks
title: Other Checks
description: Learn how to manage pagespeed, SSL and heartbeat checks with cakectl
---

Besides uptime checks, StatusCake monitors how fast pages load, whether
certificates are healthy, and whether your scheduled jobs are running. They are
managed in the same way as [uptime checks](/guides/cli/uptime-checks), with the
verbs `list`, `describe`, `create`, `update` and `delete`.

## Pagespeed checks

A pagespeed check loads a page and records how long it took, how big it was and
how many requests it made. Alerts are optional thresholds, and `0` turns one off.

```bash title="Terminal"
$ cakectl pagespeed create --name "Landing page" \
    --website-url https://www.example.com \
    --check-rate 3600 --region UK \
    --alert-slower 3000 --alert-bigger 2048
```

| Flag | Meaning |
| --- | --- |
| `--website-url` | The URL of the page to test. |
| `--check-rate` | Seconds between tests: `60`, `300`, `600`, `900`, `1800`, `3600` or `86400`. |
| `--region` | Where to test from: `AU`, `CA`, `DE`, `FR`, `IN`, `JP`, `NL`, `SG`, `UK`, `US` or `USW`. |
| `--alert-slower` | Alert if the page takes longer than this many milliseconds. |
| `--alert-bigger` | Alert if the page is bigger than this many kilobytes. |
| `--alert-smaller` | Alert if the page makes fewer than this many requests. |
| `--contact-groups` | IDs of the contact groups to alert. |

`cakectl locations pagespeed` lists the regions and what they are called.

As a file:

```yaml title="pagespeed.yaml" showLineNumbers
name: Landing page
website_url: https://www.example.com
check_rate: 3600
region: UK
alert_slower: 3000
alert_bigger: 2048
contact_groups:
- "1234"
```

## SSL checks

An SSL check watches a certificate and alerts before it expires or when
something is wrong with it.

```bash title="Terminal"
$ cakectl ssl create --website-url https://www.example.com \
    --check-rate 86400 --alert-at 7,14,30 \
    --alert-expiry --alert-broken --alert-mixed
```

| Flag | Meaning |
| --- | --- |
| `--website-url` | The HTTPS URL whose certificate is checked. |
| `--check-rate` | Seconds between tests: `300`, `600`, `1800`, `3600`, `86400` or `2073600`. |
| `--alert-at` | Days before expiry at which to alert. |
| `--alert-expiry` | Alert when the certificate expires. |
| `--alert-broken` | Alert when the certificate is broken. |
| `--alert-mixed` | Alert on mixed content, which is insecure content on a secure page. |
| `--alert-reminder` | Send reminders as expiry approaches. |
| `--hostname` | The hostname to present during the TLS handshake. |
| `--follow-redirects` | Follow redirects. |

## Heartbeat checks

A heartbeat check works the other way round. Rather than StatusCake testing your
service, your job tells StatusCake that it ran. If a ping does not arrive within
`period` seconds, the check is down. It suits work that has no address to test,
such as a nightly backup or a queue consumer.

```bash title="Terminal"
$ cakectl heartbeat create --name "Nightly backup" --period 90000 \
    --contact-groups 1234 --tags production
$ cakectl heartbeat describe 123
```

`describe` shows the ping URL. Have the end of your job request it:

```bash title="backup.sh"
run-backup && curl -fsS --retry 3 "$HEARTBEAT_URL" > /dev/null
```

Because the ping URL is a secret, anyone who has it can report your job as
healthy; `list` leaves it out, and only `describe` shows it. Give a job a period
a little longer than its schedule, so that one slow run does not raise an alert.

| Flag | Meaning |
| --- | --- |
| `--period` | Seconds to wait for a ping before alerting. |
| `--host` | The name of the hosting provider. |
| `--tags` | Tags. |
| `--paused` | Pause the check. |

## Finding and changing checks

```bash title="Terminal"
$ cakectl pagespeed list
$ cakectl ssl list
$ cakectl heartbeat list --status down
$ cakectl heartbeat update 123 --period 7200
```

Heartbeat checks can be filtered with `--status`, `--tags` and `--match-any`
like uptime checks. As with uptime checks, listings leave out the uptime
percentage unless you add `--uptime`. See [Uptime
Checks](/guides/cli/uptime-checks#uptime-percentage).

## Next Steps

Decide who is told when a check fails, and when to stay quiet. See
[Alerting](/guides/cli/alerting).
