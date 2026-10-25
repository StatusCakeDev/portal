---
id: troubleshooting
title: Troubleshooting
description: Learn how to fix common problems with the StatusCake MCP server
---

The assistant starts the server, so problems show up in the assistant. Work from
the start of the list below: each step rules out a cause of the next.

## Check the server by itself

Run the version command, which does not need a token or an assistant.

```bash title="Terminal"
$ statuscake-mcp --version
```

If the command is not found, it is not installed, or not on your `PATH`. See
[Installation](/guides/mcp/installation).

## The assistant says it has no StatusCake tools

The assistant could not start the server, or was not restarted after you added
it. Check:

- That you restarted the client, if it only reads its configuration at start.
- That the JSON in the configuration is valid. A missing comma stops the whole
  file being read.
- That `command` is something the client can run. Clients often start servers
  with a shorter `PATH` than your terminal has. Give the full path, such as
  `/usr/local/bin/statuscake-mcp`.
- That `docker` is running, if you use the image.

The server's logs, which most clients can show, usually say what went wrong.

## "API token is required"

The server started but was given no token. Check that the client sets
`STATUSCAKE_API_TOKEN` in the `env` of the server, and that the name is spelled
correctly. When you run the server through Docker, the variable must also be
passed into the container with `-e`. See [Setting Up a
Client](/guides/mcp/clients#docker).

## "This binary is an MCP server"

You ran `statuscake-mcp` from a terminal. It prints this notice and stops, because
it only works when an assistant is on the other end. Configure the assistant to
start it. To check that it is installed, use `--version`.

## Tools are found but every call fails

Ask the assistant to call `ping`. It does not use your token or contact StatusCake,
so:

- **If `ping` fails,** the server is not running properly. Look at its logs.
- **If `ping` works but other tools fail,** the problem is with the token or the
  connection to StatusCake.

For the second case:

- A message that the request was **unauthorised** means the token is wrong, was
  revoked, or lacks access. Check it in the [account
  panel](https://app.statuscake.com/User.php) and make sure it is the whole token.
- Messages that the request **timed out**, or could not connect, point to a
  network problem. A proxy or firewall must allow HTTPS to the StatusCake API.

## Answers are slow, or fail intermittently

The server paces itself to `rps` requests a second, and the API limits the whole
account. If something else is using the API at the same time, requests may be
turned away. The server retries these, which makes the answer slower rather than
failing it. Lower `rps`, or raise `retries` and `max_backoff`. See
[Configuration](/guides/mcp/configuration), and the API's
[ratelimit](/guides/api/ratelimiting).

## The assistant says there is no history or no incidents

Only uptime checks have incidents and test history. Asking for either of a
pagespeed, SSL or heartbeat check returns an error that says so. Ask about the
check's settings with `get_check` instead.

## Results look incomplete

Listings stop at 25 results by default and 100 at most. Ask the assistant whether
the result was truncated, and narrow the question by type, status, tag or time.
See [Tools](/guides/mcp/tools#limits-and-truncation).

## The times look wrong

Times in results are in UTC. If your question named a local time, ask the
assistant which timezone it used.

## Getting help

If none of this helps, raise an issue on the
[repository](https://github.com/StatusCakeDev/statuscake-mcp/issues) with the
version from `statuscake-mcp --version`, the client you use, and the server's logs
with the token removed.
