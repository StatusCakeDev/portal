---
id: introduction
title: MCP Server
description: Learn how to let an AI assistant read your StatusCake monitoring
---

The StatusCake [Model Context Protocol](https://modelcontextprotocol.io) (MCP)
server lets an AI assistant look at your monitoring. Ask "what is down?", "when
did the checkout API last fail?" or "why didn't that alert?" and the assistant
reads the answer from StatusCake, instead of you opening the dashboard and
working it out.

:::info

The server is read-only. It cannot create, change, pause or delete anything, and
it never shows the addresses or numbers in a contact group.

:::

## What is MCP

MCP is an open standard for giving AI assistants access to tools and data. An
assistant that supports it, such as Claude, can be pointed at an *MCP server*, and
then decides for itself when to use what the server offers. The StatusCake server
offers a small set of tools for looking at monitoring, and the assistant calls
them as part of answering your question.

## What you can ask

The assistant works out which tools to use. Questions that work well include:

- *What is down right now?*
- *Which of our production checks have failed in the last 24 hours?*
- *When did the checkout API last go down, and for how long?*
- *The nightly backup alerted twice this week. What did the check see?*
- *Is anything covered by a maintenance window at the moment?*
- *Who gets alerted when the payments checks fail?*

See [Using the Server](/guides/mcp/using) for more, and for how to get good
answers.

## What it can see

| It can read | It cannot |
| --- | --- |
| Which checks exist, and their status and tags | Create, change, pause or delete a check |
| How an uptime, pagespeed, SSL or heartbeat check is configured | See the credentials or headers a check sends |
| When an uptime check was down, and its individual test results | Show your API token or anyone's contact details |
| Maintenance windows, and which are active | Create or change a maintenance window |
| How many people each contact group alerts | List the addresses or numbers in a contact group |

## How it runs

The server is a small program that runs on your own machine, or in a container,
alongside your AI assistant. The assistant starts it and talks to it over
standard input and output, and the server makes requests to the [StatusCake
API](/guides/api/introduction) using your API token. Nothing is hosted, and
nothing is sent anywhere except between the assistant, the server, and StatusCake.

## How these guides are organised

| Guide | What it covers |
| --- | --- |
| [Installation](/guides/mcp/installation) | Getting the server onto your machine. |
| [Setting Up a Client](/guides/mcp/clients) | Connecting Claude Code, Claude Desktop and others. |
| [Tools](/guides/mcp/tools) | What each tool does and accepts. |
| [Using the Server](/guides/mcp/using) | Asking good questions. |
| [Configuration](/guides/mcp/configuration) | The API token and other settings. |
| [Security](/guides/mcp/security) | What the server can and cannot do with your data. |
| [Troubleshooting](/guides/mcp/troubleshooting) | Fixing common problems. |

## Next Steps

[Install](/guides/mcp/installation) the server.
