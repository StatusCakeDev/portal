---
id: introduction
title: StatusCake CLI
description: Learn about cakectl, the StatusCake command-line tool
---

`cakectl` is the StatusCake command-line tool. It creates, inspects and manages
your monitoring from the terminal, so checks can be scripted, reviewed in a
pull request or fixed at 3am without opening a browser. It works in the way
that `kubectl` does for Kubernetes or `gcloud` does for Google Cloud: each kind
of resource is a command, and each command has the same handful of verbs.

```bash title="Terminal"
$ cakectl uptime list --status down
$ cakectl uptime describe 123
$ cakectl uptime update 123 --paused
```

:::info

`cakectl` is available for Linux, macOS, FreeBSD and Windows.

:::

## What it is for

- **Answering questions quickly.** Which checks are down? When did this one last
  fail? Is a maintenance window active?
- **Making changes in a hurry.** Pause a check, silence a tag, or change who is
  alerted, with one command.
- **Scripting and automation.** Output can be printed as JSON or YAML, and every
  command that changes something can read its settings from a file, so shell
  scripts and CI jobs can use it without parsing text.
- **Moving configuration around.** Describe a resource as YAML, edit it, and
  apply it back.

## Choosing between tools

`cakectl` manages monitoring *imperatively*: you tell it what to do. If you want
monitoring to be described declaratively and kept in version control, with
changes planned and reviewed before they are applied, use the [Terraform
provider](/guides/terraform/introduction) instead. If you are writing software
that manages monitoring, use an [SDK](/guides/sdks/introduction).

## Commands

Resources are grouped by what they do.

| Group | Command | Manages |
| --- | --- | --- |
| Monitoring | `uptime` | Uptime checks. |
| | `pagespeed` | Pagespeed checks. |
| | `ssl` | SSL certificate checks. |
| | `heartbeat` | Heartbeat checks. |
| Alerting | `contact-group` | Who is alerted. |
| | `maintenance-window` | When alerts are silenced. |
| Reference | `locations` | The places checks can run from. |
| Setup | `auth` | Saving your API token. |
| | `config` | Viewing and changing settings. |

Each resource has the verbs `list`, `describe`, `create`, `update` and `delete`.
Uptime and pagespeed checks also have `history`, and uptime checks have
`periods` and `alerts` too. Run `cakectl --help` to see every command, and
`cakectl <command> --help` for the flags and examples of any one of them.

## How these guides are organised

| Guide | What it covers |
| --- | --- |
| [Installation](/guides/cli/installation) | Getting `cakectl` onto your machine. |
| [Authentication](/guides/cli/authentication) | Giving it an API token. |
| [Configuration](/guides/cli/configuration) | Settings, the config file and shell completion. |
| [Managing Resources](/guides/cli/managing-resources) | Creating, updating and deleting, with flags or files. |
| [Uptime Checks](/guides/cli/uptime-checks) | Every kind of uptime check, with examples. |
| [Other Checks](/guides/cli/other-checks) | Pagespeed, SSL and heartbeat checks. |
| [Alerting](/guides/cli/alerting) | Contact groups and maintenance windows. |
| [Reading Results](/guides/cli/results) | History, downtime and alerts. |
| [Scripting](/guides/cli/scripting) | Output formats, automation and CI. |
| [Troubleshooting](/guides/cli/troubleshooting) | Fixing common problems. |

## Next Steps

[Install](/guides/cli/installation) `cakectl`.
