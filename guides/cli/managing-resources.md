---
id: managing-resources
title: Managing Resources
description: Learn how to create, update and delete resources with cakectl
---

Every resource is managed in the same way, whether it is an uptime check, a
contact group or a maintenance window. This guide describes that common
pattern, and the guides that follow cover the detail of each resource.

## Describing a resource

A resource is described with flags, with a YAML or JSON file, or with both. Flag
names are the field names with dashes, so the field `website_url` is the flag
`--website-url`.

```bash title="Terminal"
# From flags
$ cakectl uptime create --name "Home page" --test-type HTTP \
    --website-url https://example.com --check-rate 300

# From a file
$ cakectl uptime create --filename uptime.yaml

# From standard input
$ cat uptime.yaml | cakectl uptime create --filename -

# From a file, overriding one field
$ cakectl uptime create --filename uptime.yaml --name "Staging"
```

When both a file and flags are given, a flag overrides the same field in the
file. That makes a file a good template: keep the common settings in it, and
supply what differs for each check as a flag.

The file uses the same field names as the flags:

```yaml title="uptime.yaml" showLineNumbers
name: Home page
test_type: HTTP
website_url: https://example.com
check_rate: 300
contact_groups:
- "1234"
tags:
- production
- web
```

JSON is accepted as well as YAML, since YAML is a superset of it.

### Files are read strictly

A field that does not exist is an error. A misspelt `webiste_url` is reported
rather than silently ignored, so a typo can never leave a check configured
differently from what you meant. Required fields that are missing are reported
too, and all the problems with a file are listed together rather than one at a
time.

## Creating

`create` makes the resource and prints its new identifier. Identifiers are what
every other command takes.

```bash title="Terminal"
$ cakectl contact-group create --name "On call" --email-addresses oncall@example.com
$ cakectl uptime create --filename uptime.yaml --contact-groups 1234
```

Resources refer to one another by identifier, so create contact groups before the
checks that alert them.

## Looking at a resource

```bash title="Terminal"
$ cakectl uptime list
$ cakectl uptime describe 123
```

`list` gives an overview of every resource, while `describe` shows everything
about one. Lists leave out secrets and personal data: heartbeat ping URLs, and
the email addresses, phone numbers and ping URLs of contact groups. `describe`
shows them.

## Updating

An update changes only the fields you supply. Everything else is left alone.

```bash title="Terminal"
$ cakectl uptime update 123 --paused
$ cakectl uptime update 123 --name "Renamed"
```

To empty a list rather than leave it alone, pass an empty value:

```bash title="Terminal"
$ cakectl uptime update 123 --contact-groups ""
```

### Editing a resource as a file

`describe` prints a resource in the shape that `--filename` reads, so a resource
can be fetched, edited and applied back.

```bash title="Terminal"
$ cakectl uptime describe 123 --format yaml > uptime.yaml
$ $EDITOR uptime.yaml
$ cakectl uptime update 123 --filename uptime.yaml
```

Basic authentication credentials and monitoring regions can be set but are never
returned by the API, so they do not appear in a description. Leave them out of
the edited file, and they stay as they were.

## Deleting

`delete` asks for confirmation, because it cannot be undone. When input is not a
terminal, as in a script, it refuses to run unless you pass `--yes`.

```bash title="Terminal"
$ cakectl uptime delete 123
$ cakectl uptime delete 123 --yes
```

## Next Steps

Read about [uptime checks](/guides/cli/uptime-checks), the most commonly used
resource.
