---
id: quickstart
title: Quick Start
description: Create, change and destroy your first monitoring resource with Terraform
---

With the provider [installed](/guides/terraform/installation) and
[authenticated](/guides/terraform/authentication) you may make requests to the
StatusCake API to manage monitoring resources. In this guide we will create an
uptime check, change it, and remove it again.

## Create a Resource

Add the following to `main.tf`:

```hcl title="main.tf" showLineNumbers
resource "statuscake_uptime_check" "example" {
  name           = "Example"
  check_interval = 300
  trigger_rate   = 5

  http_check {
    follow_redirects = true
    validate_ssl     = true
  }

  monitored_resource {
    address = "https://www.example.com"
  }
}
```

The `resource` block says that an uptime check should exist. The check will run
every 300 seconds and send an alert after 5 minutes of downtime. It makes an HTTP
request to `https://www.example.com`, following redirects, and alerts if the
certificate is close to expiring.

Before changing anything, ask Terraform what it would do:

```bash title="Preview the changes"
terraform plan
```

The plan shows the check that will be created, and it is safe to run as often as
you like. When you are happy with it, apply the change:

```bash title="Create resources"
terraform apply
```

Terraform shows the plan again and waits for you to type `yes`. Once it has
completed, head on over to the StatusCake [web application](https://app.statuscake.com)
to see the uptime check has been created.

:::warning

In a production environment you should not use `apply -auto-approve` as this can
be dangerous. Instead create a plan with `terraform plan -out terraform.tfplan`
followed by `terraform apply terraform.tfplan` to apply exactly the changes that
were reviewed.

:::

## Change the Resource

Edit the configuration, changing the interval to once a minute:

```hcl title="main.tf" showLineNumbers {3}
resource "statuscake_uptime_check" "example" {
  name           = "Example"
  check_interval = 60
  trigger_rate   = 5

  http_check {
    follow_redirects = true
    validate_ssl     = true
  }

  monitored_resource {
    address = "https://www.example.com"
  }
}
```

Run `terraform plan` again. Terraform compares the configuration with the check
that exists, and shows that one argument will be changed in place:

```text title="Part of the plan"
  # statuscake_uptime_check.example will be updated in-place
  ~ resource "statuscake_uptime_check" "example" {
      ~ check_interval = 300 -> 60
        # (unchanged attributes hidden)
    }
```

Apply it to make the change.

## Read What Was Created

Outputs show values you will want to use elsewhere, such as the identifier of the
check.

```hcl title="main.tf"
output "example_check_id" {
  value = statuscake_uptime_check.example.id
}
```

## Destroy the Resource

When you no longer need the check, remove it:

```bash title="Delete resources"
terraform destroy
```

This deletes everything in the configuration. To remove only one check, delete
its `resource` block and apply; Terraform sees that the check is no longer wanted
and deletes it.

## Next Steps

Look in more detail at [uptime checks](/guides/terraform/uptime-checks).
