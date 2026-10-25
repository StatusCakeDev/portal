---
id: configuration
title: Configuration
description: Learn how to configure retries, backoff and throttling in the StatusCake Terraform provider
---

With the provider [installed](/guides/terraform/installation) and
[authenticated](/guides/terraform/authentication), a few more options control
how it talks to the StatusCake API. Each has a default that suits most
configurations.

| Argument | Environment variable | Default | Meaning |
| --- | --- | --- | --- |
| `api_token` | `STATUSCAKE_API_TOKEN` | | The token used to authenticate. |
| `retries` | `STATUSCAKE_RETRIES` | `3` | How many times a failed request is tried again. From 0 to 10. |
| `min_backoff` | `STATUSCAKE_MIN_BACKOFF` | `1` | The shortest wait before a retry, in seconds. |
| `max_backoff` | `STATUSCAKE_MAX_BACKOFF` | `30` | The longest wait before a retry, in seconds. |
| `rps` | `STATUSCAKE_RPS` | `4` | The most requests made each second. |

An argument in the configuration wins over its environment variable.

## Request Retries

If requests to the StatusCake API fail, the provider will attempt to retry the
request up to a maximum of 3 times by default, after which the provider will
report on the error returned from the API. The maximum number of attempts can be
controlled from the provider configuration block.

```hcl title="main.tf" showLineNumbers {2}
provider "statuscake" {
  retries = 10
}
```

:::info

Request retries may also be configured using the `STATUSCAKE_RETRIES`
environment variable.

:::

Request retry attempts are made using an exponential backoff strategy that may
also be configured from the provider configuration block.

```hcl title="main.tf" showLineNumbers {2-3}
provider "statuscake" {
  min_backoff = 3
  max_backoff = 10
}
```

:::info

Request backoff may also be configured using the `STATUSCAKE_MIN_BACKOFF` and
`STATUSCAKE_MAX_BACKOFF` environment variables respectively.

:::

## Request Throttling

To help alleviate problems with API ratelimiting the provider throttles
requests, placing a restriction on the maximum number of requests made per
second. Whilst this value can be increased it may result in an increase of
errors returned from the API.

If the provider is returning too many errors relating to hitting ratelimits the
requests per second can be lowered by configuring throttling within the provider
configuration block.

```hcl title="main.tf" showLineNumbers {2}
provider "statuscake" {
  rps = 3
}
```

:::info

Request throttling may also be configured using the `STATUSCAKE_RPS` environment
variable.

:::

### Large configurations

Terraform makes requests for every resource when it plans, and by default it
works on up to ten resources at once. A configuration with hundreds of checks
therefore makes a great many requests, and the API's [ratelimit](/guides/api/ratelimiting)
is shared by everything using your account. The provider's `rps` setting keeps it
under the limit, but you can also reduce the number of resources Terraform works
on at once:

```bash title="Work on fewer resources at once"
terraform apply -parallelism=4
```

## Next Steps

Create your first check in the [Quick Start](/guides/terraform/quickstart).
