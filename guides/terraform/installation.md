---
id: installation
title: Installation
description: Learn how to install the StatusCake Terraform provider
---

To install the StatusCake Terraform provider it should be declared within a
`terraform` configuration block. Multiple `terraform` blocks can be declared,
each containing a number of settings related to Terraform's behaviour. For now
we are interested only with `required_providers`.

The `required_providers` block specifies all the providers required by the
current module, mapping each local provider name to a source address and a
version constraint. In this guide the provider we'll use is
`StatusCakeDev/statuscake`.

To begin, create a new file, `main.tf`, and copy the following configuration:

```hcl title="main.tf" showLineNumbers
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
have been downloaded and stored within the `.terraform/providers/` directory.

## Committing the lock file

`terraform init` also writes `.terraform.lock.hcl`, which records the exact
version and checksums of the provider that was installed. Commit it. It makes
every machine and pipeline that runs your configuration use the same provider
build, and it is how an unexpected change to the provider is noticed.

Upgrade deliberately, with `terraform init -upgrade`, and read the provider's
release notes first.

## Requirements

The provider requires Terraform 1.0 or later, and is published for Linux, macOS,
FreeBSD and Windows.

## Next Steps

Give the provider an API token. See
[Authentication](/guides/terraform/authentication).
