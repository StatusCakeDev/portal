---
id: configuration
title: Configuration
description: Learn how to configure the StatusCake MCP server
---

The only setting you need is an API token. The rest control how the server talks
to the StatusCake API, and have defaults that suit most accounts.

## API token

You can view and manage your API tokens from the [StatusCake account
panel](https://app.statuscake.com/User.php). The server only reads, so a token
with read access is enough. The server refuses to start without one:

```text
API token is required: set STATUSCAKE_API_TOKEN or pass --api-token
```

Because your assistant starts the server, the token is usually given in the
client's configuration, as the `STATUSCAKE_API_TOKEN` environment variable. See
[Setting Up a Client](/guides/mcp/clients). Avoid the `--api-token` flag when you
can: arguments can be seen by other users of the machine in the process list,
while an environment variable or a file only you can read cannot.

## Settings

| Setting | Flag | Environment | Default | Meaning |
| --- | --- | --- | --- | --- |
| `api_token` | `--api-token` | `STATUSCAKE_API_TOKEN` | | The token used to authenticate. |
| `rps` | `--rps` | `STATUSCAKE_RPS` | `4` | The most requests made each second. |
| `retries` | `--retries` | `STATUSCAKE_RETRIES` | `3` | How many times a failed request is tried again. |
| `min_backoff` | `--min-backoff` | `STATUSCAKE_MIN_BACKOFF` | `1s` | The shortest wait before a retry. |
| `max_backoff` | `--max-backoff` | `STATUSCAKE_MAX_BACKOFF` | `30s` | The longest wait before a retry. |

Durations take a unit, such as `500ms`, `2s` or `1m`.

The server limits itself to `rps` requests each second, to stay under the API's
[ratelimit](/guides/api/ratelimiting), and retries with a wait that grows from
`min_backoff` to `max_backoff`. Listing checks may take several API requests
for an account with many, which is why the limit exists.

## Where settings come from

A setting can be given in three places. A flag wins over the environment, and the
environment wins over the configuration file, which wins over the default.

The configuration file is `mcp.yaml`, and the server looks for it in
`./config` and then in `~/.config/statuscake`. Use `--config` to name a file
instead. It is plain YAML, using the setting names above:

```yaml title="~/.config/statuscake/mcp.yaml" showLineNumbers
api_token: <token>
rps: 2
retries: 5
max_backoff: 1m
```

If you name a file with `--config` and it cannot be read, the server stops with
an error rather than carrying on without it. A file that does not exist in the
default locations is not an error.

Flags are given as `args` in the client's configuration. For example, in Claude
Desktop:

```json title="claude_desktop_config.json" showLineNumbers
{
  "mcpServers": {
    "statuscake": {
      "command": "statuscake-mcp",
      "args": ["--config", "/home/me/.config/statuscake/work.yaml"]
    }
  }
}
```

## More than one account

Each server is configured with one token, and so sees one account. To use several,
add the server more than once under different names, each with its own token:

```json title="claude_desktop_config.json" showLineNumbers
{
  "mcpServers": {
    "statuscake-production": {
      "command": "statuscake-mcp",
      "env": { "STATUSCAKE_API_TOKEN": "<production token>" }
    },
    "statuscake-staging": {
      "command": "statuscake-mcp",
      "env": { "STATUSCAKE_API_TOKEN": "<staging token>" }
    }
  }
}
```

## Logs

The server writes its logs to standard error, since standard output carries the
protocol. Clients differ in whether and where they show them; see your client's
documentation for how to find the logs of an MCP server. Logs record which tool
was called and with what filters, and any errors. The server does not write the API
token to them.

## Next Steps

Read about [security](/guides/mcp/security).
