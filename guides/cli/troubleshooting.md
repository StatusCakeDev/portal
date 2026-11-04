---
id: troubleshooting
title: Troubleshooting
description: Learn how to fix common cakectl problems
---

Errors are written to standard error, begin with `Error:`, and are followed by a
non-zero exit status. This guide lists the ones you are most likely to meet.

## API token is required

```text
Error: failed to create StatusCake client: API token is required: run `cakectl auth login`, set STATUSCAKE_API_TOKEN or pass --api-token
```

No token could be found. Supply one in any of the ways described in
[Authentication](/guides/cli/authentication). If you did, check that the
variable is exported (`export STATUSCAKE_API_TOKEN=...`) rather than only set,
and that it is set in the same environment that runs `cakectl`: a CI step or a
container does not inherit your shell.

## Authentication failures

If the token is present but rejected, the API answers `401`. Check that the token
has not been deleted in the [account panel](https://app.statuscake.com/User.php),
and that it was copied without a trailing space or line break. A token saved with
`auth login` is overridden by `STATUSCAKE_API_TOKEN` and by `--api-token`, so an
old value in the environment can hide a new saved one. `cakectl config view`
shows what is saved.

## Unknown field in a file

```text
Error: uptime.yaml: invalid specification: json: unknown field "webiste_url"
```

Files are read strictly, so that a typo cannot leave a check configured
differently from what you meant. Correct the field name. The names are those of
the flags with underscores in place of dashes; `cakectl <command> create --help`
lists them.

## A required field is missing

```text
Error: invalid uptime check: test_type is required
website_url is required
check_rate is required
```

Every missing field is listed at once. Supply them with flags or in the file.

## Refusing to continue without confirmation

```text
Error: refusing to continue without confirmation: input is not a terminal; pass --yes to confirm
```

`delete` asks first, and in a script there is nobody to ask. Pass `--yes` once
you are sure.

## Nothing to update

```text
Error: nothing to update: no fields were supplied; give --filename or a flag such as --name
```

`update` was given an identifier but nothing to change.

## Invalid time

```text
Error: invalid --after "yesterday": expected an RFC 3339 time such as 2026-11-01T22:00:00Z
```

`--after` and `--before` take a full RFC 3339 time, with a date, a time and a zone
such as `Z` for UTC or `+01:00`.

## Requests fail with "retries exceeded"

The request could not be completed after trying again. Look at what follows the
words "retries exceeded" for the cause. Common ones are a network that is down, a
proxy that is blocking `api.statuscake.com`, or the API's ratelimit. For the
last, lower `--rps` and see [Ratelimiting](/guides/api/ratelimiting). To see
failures sooner, lower `--retries`.

## Commands are slow

By default `cakectl` makes no more than 4 requests a second, and a command that
reads many pages, such as listing a large account, makes many requests. Narrow
the list with `--status` or `--tags` to make fewer.

## Still stuck

Run the failing command with `--help` to check its flags, then include the exact
command, the error and the output of `cakectl --version` when you ask for help.
Remove your API token first. Issues can be raised on the [cakectl
repository](https://github.com/StatusCakeDev/cakectl).
