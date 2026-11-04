---
id: scripting
title: Scripting
description: Learn how to use cakectl in scripts and continuous integration
---

`cakectl` is designed to be used by programs as much as by people. This guide
covers the output formats, how it behaves when nobody is watching, and some
patterns that come up often.

## Output formats

Output is plain text by default: tables for lists and a readable summary for a
single resource. Use `--format` (or `-f`) to choose another.

| Format | Use |
| --- | --- |
| `text` | Reading in a terminal. The default. |
| `json` | Processing with `jq` and similar. Compact. |
| `prettyjson` | The same JSON, indented for reading. |
| `yaml` | Editing, or saving a resource to apply back later. |

```bash title="Terminal"
$ cakectl uptime list --status down --format json | jq -r '.[].name'
$ cakectl uptime describe 123 --format yaml
```

Do not parse the text format in a script. It is meant for people, and its
columns may change. JSON and YAML carry the same information in a form designed
for programs.

## Behaviour without a terminal

When `cakectl` is run by a script or a pipeline, rather than by a person at a
keyboard, it takes no chances:

- Commands that would ask a question, such as `delete`, refuse to guess and exit
  with an error unless you answer in advance with `--yes`.
- Errors are written to standard error and the exit status is non-zero, so
  `set -e`, `&&` and CI systems notice a failure.
- Results are written to standard output, so they can be piped without
  being mixed with messages.

```bash title="Terminal"
if ! cakectl uptime describe 123 > /dev/null 2>&1; then
  echo "check 123 is missing" >&2
fi
```

## Authentication in pipelines

Pass the token through the environment from your secret store rather than saving
it with `cakectl auth login`, so that nothing is left behind on the build
machine. See [Authentication](/guides/cli/authentication).

```yaml title=".github/workflows/monitoring.yaml" showLineNumbers {9-10}
name: monitoring
on: workflow_dispatch

jobs:
  report-down-checks:
    runs-on: ubuntu-latest
    steps:
    - name: List checks that are down
      env:
        STATUSCAKE_API_TOKEN: ${{ secrets.STATUSCAKE_API_TOKEN }}
      run: |
        docker run --rm -e STATUSCAKE_API_TOKEN statuscake/cakectl \
        uptime list --status down
```

## Recipes

### Pause every check with a tag

Update takes one check at a time, so use the list to find the identifiers.

```bash title="pause-tag.sh" showLineNumbers
cakectl uptime list --tags "$1" --format json \
  | jq -r '.[].id' \
  | while read -r id; do
      cakectl uptime update "$id" --paused
    done
```

For a planned period of work, a [maintenance
window](/guides/cli/alerting#maintenance-windows) is usually better than pausing
checks: it silences alerts without stopping the checks, and ends by itself.

### Create a check for every host in a file

Use a file as a template, and supply what differs as flags.

```bash title="create-checks.sh" showLineNumbers
while read -r host; do
  cakectl uptime create --filename template.yaml \
    --name "$host" --website-url "https://$host"
done < hosts.txt
```

### Back up your checks

```bash title="backup.sh" showLineNumbers
mkdir -p checks
cakectl uptime list --format json | jq -r '.[].id' | while read -r id; do
  cakectl uptime describe "$id" --format yaml > "checks/$id.yaml"
done
```

Commit the directory to keep a history of how your monitoring changed. If you
find yourself doing this for every resource, consider the [Terraform
provider](/guides/terraform/introduction), which does it declaratively.

## Staying within the ratelimit

A loop over many checks is many requests. `cakectl` limits itself to 4 requests
per second by default, which keeps it under the API's [ratelimit](/guides/api/ratelimiting),
but a loop that starts several `cakectl` processes at once has no shared limit.
Run them one after another, as in the recipes above, rather than in parallel.

## Next Steps

If something is not working, see [Troubleshooting](/guides/cli/troubleshooting).
