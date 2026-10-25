---
id: clients
title: Setting Up a Client
description: Learn how to connect an AI assistant to the StatusCake MCP server
---

An assistant that supports MCP is told how to start the server, and starts it
when it needs it. Every client asks for the same two things: the *command* that
starts the server, and the *environment* to start it with, which is where the API
token goes.

You will need an API token. You can view and manage your API tokens from the
[StatusCake account panel](https://app.statuscake.com/User.php). A token with read
access is enough.

## Claude Code

Add the server with the `claude mcp add` command:

```bash title="Terminal"
$ claude mcp add statuscake --env STATUSCAKE_API_TOKEN=<token> -- statuscake-mcp
```

Everything after the `--` is the command that starts the server. Check that it
was added with `claude mcp list`.

## Claude Desktop

Add the server to the `mcpServers` section of Claude Desktop's configuration file,
`claude_desktop_config.json`, and restart Claude Desktop.

```json title="claude_desktop_config.json" showLineNumbers
{
  "mcpServers": {
    "statuscake": {
      "command": "statuscake-mcp",
      "env": { "STATUSCAKE_API_TOKEN": "<token>" }
    }
  }
}
```

If `statuscake-mcp` is not on the `PATH` that Claude Desktop sees, give the full
path to it as the `command`.

## Docker

To run the server as a container, make the command `docker` and pass the token
through. The `-i` keeps standard input open, which the protocol needs, and
`--rm` removes the container when the assistant is done with it.

```json title="claude_desktop_config.json" showLineNumbers
{
  "mcpServers": {
    "statuscake": {
      "command": "docker",
      "args": ["run", "--rm", "-i", "-e", "STATUSCAKE_API_TOKEN", "statuscake/statuscake-mcp"],
      "env": { "STATUSCAKE_API_TOKEN": "<token>" }
    }
  }
}
```

`-e STATUSCAKE_API_TOKEN` with no value copies the variable from the environment
the client gives to Docker, so the token is not written in the arguments.

## Other clients

Any client that supports MCP servers started as local programs over standard
input and output can use the server. Give it:

| Setting | Value |
| --- | --- |
| Command | `statuscake-mcp`, or `docker` with the arguments above |
| Arguments | None needed |
| Environment | `STATUSCAKE_API_TOKEN` set to your token |
| Transport | Standard input and output (`stdio`) |

The server does not listen on a network port and cannot be used as a remote
server.

## Checking it works

Ask the assistant to check the server is running. It has a tool for exactly this,
which returns a fixed reply without contacting StatusCake, so it confirms the
assistant can start the server before you involve your token. Then ask something
real:

> What checks do I have, and is anything down?

If the assistant says it has no such tool, or the server fails to start, see
[Troubleshooting](/guides/mcp/troubleshooting).

## Next Steps

Look at what each [tool](/guides/mcp/tools) does.
