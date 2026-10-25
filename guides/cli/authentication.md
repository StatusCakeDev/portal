---
id: authentication
title: Authentication
description: Learn how to give cakectl an API token
---

`cakectl` needs a StatusCake API token to make requests. You can view and manage
your API tokens from the [StatusCake account
panel](https://app.statuscake.com/User.php).

:::warning

API tokens must be kept private. In the event that one is exposed a new one
should be generated.

:::

There are three ways to supply the token. They are listed here from the least to
the most convenient for everyday use.

## Using a flag

```bash title="Terminal"
$ cakectl uptime list --api-token "$TOKEN"
```

This works for a single command, but it is the least safe way: the token is
visible to other users of the machine in the list of running processes, and may
be saved in your shell history.

## Using the environment

```bash title="Terminal"
$ export STATUSCAKE_API_TOKEN="$TOKEN"
$ cakectl uptime list
```

`STATUSCAKE_API_TOKEN` is the variable used by the other StatusCake tools, so
one variable can serve the CLI, and the [Terraform
provider](/guides/terraform/authentication), and the [MCP
server](/guides/mcp/configuration). This is the right choice in a script or a CI
job, where the token should come from your secret store.

## Saving the token

On your own machine, save the token once and forget about it.

```bash title="Terminal"
$ cakectl auth login --api-token "$TOKEN"
```

To keep the token out of your shell history, pipe it in instead:

```bash title="Terminal"
$ echo "$TOKEN" | cakectl auth login
```

The token is stored in `~/.config/statuscake/cakectl.yaml`, a file only your user
can read.

## Which one wins

If more than one is supplied, a flag wins over the environment, and the
environment wins over the saved token. This means you can temporarily act as a
different account without altering what you saved:

```bash title="Terminal"
$ STATUSCAKE_API_TOKEN="$OTHER_TOKEN" cakectl uptime list
```

If no token can be found, `cakectl` stops and says how to supply one.

## Next Steps

Learn about the other [settings](/guides/cli/configuration) `cakectl` has.
