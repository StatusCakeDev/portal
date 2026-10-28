---
id: troubleshooting
title: Troubleshooting
description: Learn how to fix common problems with the StatusCake Terraform provider
---

## The provider cannot authenticate

If requests are rejected with an authentication error, the provider is not
sending a valid token. Check that:

- `STATUSCAKE_API_TOKEN` is exported in the environment that runs Terraform. A CI
  step or a container does not inherit your shell.
- The token has not been deleted in the [account
  panel](https://app.statuscake.com/User.php).
- The token was copied in full, with no trailing space or line break.
- An `api_token` in the provider block is not overriding the environment with an
  old value.

See [Authentication](/guides/terraform/authentication).

## Errors that mention ratelimiting

A large configuration makes a lot of requests, and the API's
[ratelimit](/guides/api/ratelimiting) is shared by everything using your account.
The provider already retries when it is told to slow down. If it still fails:

- Lower `rps` in the provider block.
- Raise `retries` and `max_backoff`.
- Run Terraform with `-parallelism=4`.

See [Configuration](/guides/terraform/configuration).

## A check is replaced when you expected an update

Some changes cannot be made to an existing check: changing the type of check,
an HTTP check's `request_method`, or a TCP check's `protocol`. The plan shows
`must be replaced`. See [Uptime Checks](/guides/terraform/uptime-checks#what-changes-replace-a-check).

## A value is rejected before anything is created

The provider validates arguments during `terraform plan`, so most mistakes are
found before any request is made. The error names the argument and says what is
accepted. For example `check_interval` must be one of the intervals StatusCake
supports, `trigger_rate` must be from 0 to 60, and an `http_check` `timeout` must
be from 5 to 75.

## "Exactly one of" an uptime check type

An uptime check must have exactly one of `http_check`, `tcp_check`, `dns_check` or
`icmp_check`. A block with none, or two, is an error. A ping check is written
`icmp_check {}`.

## The plan shows a change that you did not make

Terraform compares your configuration with what StatusCake reports. If someone
edited a check in the web application, the plan shows what it will change back.
Decide which is right: update the configuration to keep their change, or apply to
undo it.

## Still stuck

Run Terraform with `TF_LOG=debug` to see the provider's requests, but remove your
API token from the output before sharing it. Issues can be raised on the
[provider repository](https://github.com/StatusCakeDev/terraform-provider-statuscake).
