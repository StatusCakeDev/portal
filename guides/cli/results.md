---
id: results
title: Reading Results
description: Learn how to read the history, downtime and alerts of a check with cakectl
---

Checks keep a record of what has happened to them. Reading it answers questions
that the current status cannot: when did this start, how often does it happen,
and who was told?

| Command | Answers |
| --- | --- |
| `cakectl uptime history ID` | What did each test see: when, from where, what the target answered and how quickly? |
| `cakectl uptime periods ID` | When was the check up, and when was it down? |
| `cakectl uptime alerts ID` | Which alerts were sent, and when? |
| `cakectl pagespeed history ID` | How long did the page take to load, and how big was it? |

## Choosing a window

Each takes the same flags to limit what is returned.

| Flag | Meaning |
| --- | --- |
| `--limit` | The maximum number of results. The default is `25`. |
| `--after` | Only results after this time, as an RFC 3339 time. |
| `--before` | Only results before this time, as an RFC 3339 time. |

```bash title="Terminal"
$ cakectl uptime history 123 --limit 100 --after 2026-10-01T00:00:00Z
$ cakectl uptime periods 123 --before 2026-10-08T00:00:00Z
$ cakectl uptime alerts 123 --after 2026-10-20T00:00:00Z
```

Results are newest first. To see further back than the limit allows, move
`--before` to the time of the oldest result you have seen.

## When did it go down?

Periods are the right place to start. Each is a stretch of time with one status,
so downtime is easy to find.

```bash title="Terminal"
$ cakectl uptime periods 123 --after 2026-10-01T00:00:00Z
```

Once you know when, history shows what the check saw at that moment, including
which location reported a failure:

```bash title="Terminal"
$ cakectl uptime history 123 --after 2026-10-14T09:00:00Z --before 2026-10-14T10:00:00Z
```

## Using the results in a script

With `--format json` the results can be processed with a tool such as `jq`. For
example, to count the periods a check was down in October:

```bash title="Terminal"
$ cakectl uptime periods 123 --after 2026-10-01T00:00:00Z --limit 500 --format json \
    | jq '[.[] | select(.status == "down")] | length'
```

:::caution

Listings print as a JSON array of objects. Run a command with `--format json`
once to see the fields available before writing a filter.

:::

## Next Steps

Learn how to use `cakectl` in [scripts and pipelines](/guides/cli/scripting).
