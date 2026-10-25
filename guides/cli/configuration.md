---
id: configuration
title: Configuration
description: Learn how to configure cakectl
---

`cakectl` has a few settings that control how it talks to the StatusCake API.
Every one of them has a sensible default, so you may never need to change them.

| Setting | Flag | Environment | Default | Meaning |
| --- | --- | --- | --- | --- |
| `api_token` | `--api-token` | `STATUSCAKE_API_TOKEN` | | The token used to authenticate. See [Authentication](/guides/cli/authentication). |
| `rps` | `--rps` | `STATUSCAKE_RPS` | `4` | The most requests made each second. |
| `retries` | `--retries` | `STATUSCAKE_RETRIES` | `3` | How many times a failed request is tried again. |
| `min_backoff` | `--min-backoff` | `STATUSCAKE_MIN_BACKOFF` | `1s` | The shortest wait before a retry. |
| `max_backoff` | `--max-backoff` | `STATUSCAKE_MAX_BACKOFF` | `30s` | The longest wait before a retry. |

Durations take a unit, such as `500ms`, `2s` or `1m`.

## Where settings come from

A setting can be given in three places. A flag wins over the environment, and
the environment wins over the configuration file, which wins over the default.

The configuration file is `~/.config/statuscake/cakectl.yaml`. Use `--config` to
name a different one, for example to keep a separate file for each account:

```bash title="Terminal"
$ cakectl --config ~/.config/statuscake/other.yaml uptime list
```

## Viewing and changing the file

Rather than editing the file by hand, use `cakectl config`.

```bash title="Terminal"
$ cakectl config view
$ cakectl config get rps
$ cakectl config set rps 8
$ cakectl config set min_backoff 500ms
$ cakectl config unset rps
```

`unset` removes a setting from the file, so that it returns to its default.

## Retries and throttling

`cakectl` limits itself to `rps` requests each second, to stay under the API's
[ratelimit](/guides/api/ratelimiting). The default of `4` is just under the burst
limit of 5 requests per second that applies to every account. Raising it can make
listing large accounts quicker, but only until the API starts turning requests
away.

When a request fails, it is tried again after a wait that grows from
`min_backoff` up to `max_backoff`, until `retries` is used up. For a job that
should fail quickly, lower `retries`; for one that must ride out a busy period,
raise `retries` and `max_backoff`.

```bash title="Terminal"
$ cakectl uptime list --retries 0
$ cakectl uptime list --retries 8 --max-backoff 2m
```

## Next Steps

Learn how to [create, update and delete](/guides/cli/managing-resources)
resources.
