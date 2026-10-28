---
id: authentication
title: Authentication
description: Learn how to give the StatusCake Terraform provider an API token
---

The StatusCake Terraform provider requires that an API bearer token be included
in the provider configuration block. You can view and manage your API tokens
from the [StatusCake account panel](https://app.statuscake.com/User.php).

:::warning

API tokens must be kept private. In the event that one is exposed a new one
should be generated.

:::

## Using the environment

The safest way to supply the token is to leave it out of the configuration
altogether and set the `STATUSCAKE_API_TOKEN` environment variable where
Terraform runs.

```hcl title="main.tf" showLineNumbers
provider "statuscake" {
  # The API token is read from the STATUSCAKE_API_TOKEN environment variable.
}
```

```bash title="Supply the token"
export STATUSCAKE_API_TOKEN="<token>"
terraform plan
```

`STATUSCAKE_API_TOKEN` is the variable used by the other StatusCake tools, so
one variable can serve the [SDKs](/guides/sdks/authentication) too. In a
continuous integration system, store the token as a secret and expose it only to
the step that runs Terraform.

## Using a variable

If the token has to be passed in through Terraform, use a sensitive input
variable. Terraform then hides its value in plans and logs.

```hcl title="main.tf" showLineNumbers
variable "statuscake_api_token" {
  type      = string
  sensitive = true
}

provider "statuscake" {
  api_token = var.statuscake_api_token
}
```

The value is then supplied at run time, for example with
`TF_VAR_statuscake_api_token` in the environment, and never written in a file
that is committed.

## Not in the file

Writing the token as a literal string in the configuration is possible, but it
puts a credential into version control, where it is copied to everyone who clones
the repository and is hard to remove again.

```hcl title="Avoid this"
provider "statuscake" {
  api_token = "..."
}
```

Keep in mind that Terraform state and saved plan files can contain sensitive
values, such as the basic authentication password of an uptime check. Store them
in a backend that encrypts them and restricts who can read them.

:::info

The provider checks that a token looks like one, so a placeholder such as
`my-api-token` may be rejected. Tokens contain only letters, digits and
underscores.

:::

## Next Steps

Tune how the provider talks to the API in
[Configuration](/guides/terraform/configuration).
