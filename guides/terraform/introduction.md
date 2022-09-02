---
id: introduction
title: Terraform
description: Learn how to install and use the StatusCake Terraform provider
---

StatusCake provides a comprehensive [Terraform
provider](https://registry.terraform.io/providers/StatusCakeDev/statuscake/latest/docs)
to manage monitoring resources declaratively. This guide describes how to setup
the Terraform provider and create an uptime check.

:::caution note

It is assumed you are already familiar with Terraform and have it installed. If
not check out this [link](https://www.terraform.io/downloads) to get started.

:::

:::info

The examples in this guide work with Terraform 1.x and above.

:::

## Installation

To install the StatusCake Terraform provider it should be declared within a
`terraform` configuration block. Multiple `terraform` blocks can be declared,
each containing a number of settings related to Terraform's behaviour. For now
we are interested only with `required_providers`.

The `required_providers` block specifies all the providers required by the
current module, mapping each local provider name to a source address and a
version constraint. In this guide the provider we'll use is
`StatusCakeDev/statuscake`.

To begin, create a new file, `main.tf`, and copy the following configuration:

```hcl title=main.tf showLineNumbers
terraform {
  required_providers {
    statuscake = {
      source  = "StatusCakeDev/statuscake"
      version = "~> 2.0.4"
    }
  }
}

provider "statuscake" {
  # Configuration options
}
```

The version constraint, denoted as `~> 2.0.4`, specifies the minimum version of
the provider supported by the current module, ensuring that we are always using
the latest patch release. This will prevent accidental upgrades to the latest
minor release in case of breaking changes. For more information on version
constraints see the Terraform
[documentation](https://www.terraform.io/language/providers/requirements#version-constraints).

To have Terraform initialise the current module and fetch the StatusCake
provider issue the following command in the terminal from within the directory
containing `main.tf`.

```bash title="Initialise Terraform"
terraform init
```

The Terraform module has been initialised and the StatusCake provider should
have been downloaded and stored within the `.terraform/providers/` directory.`

## Configuration

With the module initialised, the StatusCake provider can be configured. The
providers has a few configuration options that will be discussed in this
section.

### Authentication

The StatusCake Terraform provider requires that an API bearer token be included
in the provider configuration block. You can view and manage your API tokens
from the [StatusCake account panel](https://app.statuscake.com/User.php).

:::warning note

API tokens must be kept private. In the event that one is exposed a new one
should be generated.

:::

```hcl title=main.tf showLineNumbers
provider "statuscake" {
  api_token = "my-api-token"
}
```

:::info

Authentication may also be configured using the `STATUSCAKE_API_TOKEN`
environment variable.

:::

### Request Retries

If requests to the StatusCake API fail, the provider will attempt to retry the
request up to a maximum of 3 times by default, after which the provider will
report on the error returned from the API. The maximum number of attempts can
be controlled from the provider configuration block.

```hcl title=main.tf showLineNumbers {3}
provider "statuscake" {
  api_token = "my-api-token"
  requests  = 10
}
```

:::info

Request retries may also be configured using the `STATUSCAKE_RETRIES`
environment variable.

:::

Request retry attempts are made using an exponential backoff strategy that may
also be configured from the provider configuration block.

```hcl title=main.tf showLineNumbers {3-4}
provider "statuscake" {
  api_token   = "my-api-token"
  min_backoff = 3
  max_backoff = 10
}
```

:::info

Request backoff may also be configured using the `STATUSCAKE_MIN_BACKOFF` and
`STATUSCAKE_MAX_BACKOFF` environemnt variables respectively.

:::

### Request Throttling

To help aliviate problems with API ratelimiting the provider throttles
requests, placing a restriction on the maximum number of requests made per
second. Whilst this value can be increased it may result in an increase of
errors returned from the API.

If the provider is returning too many errors relating to hitting ratelimits
the requests per second can be lowered by configuring throttling within the
provider configuration block.

```hcl title=main.tf showLineNumbers {3}
provider "statuscake" {
  api_token = "my-api-token"
  rps       = 3
}
```

:::info

Request throttling may also be configured using the `STATUSCAKE_RPS`
environemnt variables.

:::

## Create a Resource

With the provider configured you may make requests to the StatusCake API to
manage monitoring resources. In this document we will create an uptime check.

```hcl title=main.tf showLineNumbers
resource "statuscake_uptime_check" "uptime_check" {
  name           = "Google"
  check_interval = 30
  trigger_rate   = 1800

  http_check {
    follow_redirects = true
    validate_ssl     = true

    status_codes = [
      "202",
      "404",
      "405",
    ]
  }

  monitored_resource {
    address = "https://www.google.com"
  }
}
```

To then have Terraform create this check on the StatusCake platform run the
following command in the terminal from within the directory containing
`main.tf`.

```bash title="Create Resources"
terraform apply -auto-approve
```

Once this has completed head on over to the StatusCake [web
application](https://app.statuscake.com) to see the uptime check has been
created.

:::warning

In a production environment you should not use `apply -auto-approve` as this
can be dangerous. Instead create a plan with `terraform plan -out
terraform.tfplan` followed by the command to apply the changes.

:::
