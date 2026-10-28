---
id: importing
title: Importing
description: Learn how to bring existing StatusCake resources under Terraform
---

If you already have monitoring that was created in the web application, or with
another tool, you do not have to delete it and start again. Terraform can import
it, so that from then on the configuration manages it.

Every resource the provider manages can be imported by its identifier.

## Import a check

1. Write a `resource` block that describes the check, with a name of your choice.
   It does not need to be complete yet.

   ```hcl title="main".tf
   resource "statuscake_uptime_check" "example_com" {
     name           = "Example"
     check_interval = 300

     http_check {}

     monitored_resource {
       address = "https://www.example.com"
     }
   }
   ```

2. Import the check, naming the resource and giving the identifier of the check.
   The identifier is shown in the web application, and listed by
   `cakectl uptime list` and the [API](/guides/api/resources).

   ```bash title="Import"
   terraform import statuscake_uptime_check.example_com 1234
   ```

3. Run `terraform plan`. The plan shows every difference between your block and
   the check that exists.

4. Edit the block until the plan shows no changes. Terraform now manages the
   check, and your configuration describes it exactly.

:::tip

Do the last two steps carefully, and do not apply until the plan is empty. An
incomplete block is a request to change the check to match it.

:::

The same pattern works for the other resources:

```bash title="Import other resources"
terraform import statuscake_pagespeed_check.landing_page 2345
terraform import statuscake_ssl_check.example 3456
terraform import statuscake_heartbeat_check.backup 4567
terraform import statuscake_contact_group.operations_team 5678
terraform import statuscake_maintenance_window.weekly_patching 6789
```

## Importing many at once

For more than a handful of resources, an `import` block (Terraform 1.5 and later)
lets you list the imports in configuration and review them in a plan before
anything happens.

```hcl title="imports.tf" showLineNumbers
import {
  to = statuscake_uptime_check.example_com
  id = "1234"
}
```

## Next Steps

If a plan or an apply fails, see [Troubleshooting](/guides/terraform/troubleshooting).
