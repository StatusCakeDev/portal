---
id: security
title: Security
description: Learn what the StatusCake MCP server can and cannot do with your data
---

Giving an AI assistant access to your monitoring is a decision worth making with
open eyes. This page explains what the server allows, and what to consider.

## What the server can do

- **It only reads.** There are no tools that create, change, pause or delete
  anything. Every tool is marked read-only.
- **It does not reveal who you alert.** For contact groups it returns only the
  number of email addresses, mobile numbers and integrations, never the values.
- **It talks only to StatusCake.** A released server sends requests to the
  StatusCake API and nowhere else. Its address cannot be changed by a flag,
  environment variable or configuration file; only development builds, made from
  source, offer that.
- **It has no network listener.** It communicates with your assistant over
  standard input and output, so nothing can connect to it from the network.

## What the assistant can see

Whatever a tool returns is given to the assistant, and so to the service behind
it. That includes check names, tags and targets (URLs and hostnames), maintenance
window names, and the results of tests. If those are sensitive, then so is the
conversation. Check your assistant's data handling terms, and consider whether
the names you give checks reveal more than you would like.

Content in your account can also reach the assistant as text. A check named
"Ignore previous instructions" is still only a name, but an assistant that has
other tools, such as the ability to run commands or send messages, could be
influenced by text it reads, and so be steered into misusing them. This is a
property of AI assistants generally, and not of this server. The server cannot
change anything, but you should be wary of combining it, in one conversation, with
tools that can.

## The API token

The token is the credential, and it lives in your client's configuration.

- **Use a token of your own,** made for this purpose, so that you can revoke it
  without affecting anything else.
- **Give it read access only.** The server does not need more, and a token that
  cannot write limits what can go wrong if the token is exposed.
- **Do not commit client configuration** that contains the token to source
  control. Where the client supports it, keep the token out of the file and
  take it from the environment instead.
- **Rotate it** from the [account panel](https://app.statuscake.com/User.php) if
  you think it has been seen.

## Verifying a download

Releases are published with a checksum file and a detached signature of it, so you
can confirm that an archive is the one that was built. See
[Installation](/guides/mcp/installation).

## Next Steps

If something is not working, see [Troubleshooting](/guides/mcp/troubleshooting).
