---
id: installation
title: Installation
description: Learn how to install the StatusCake MCP server
---

## Releases

Download the archive for your platform from the [releases
page](https://github.com/StatusCakeDev/statuscake-mcp/releases). Archives are
built for Linux, macOS, FreeBSD and Windows. Unpack it and put `statuscake-mcp`
somewhere your AI assistant can run it.

```bash title="Terminal"
$ tar -xzf statuscake-mcp_<version>_linux_amd64.tar.gz
$ sudo mv statuscake-mcp /usr/local/bin/
$ statuscake-mcp --version
```

Every release includes a checksum file, `statuscake-mcp_<version>_SHA256SUMS`, together
with a detached signature of it. Check the archive against the checksums before
you unpack it.

```bash title="Terminal"
$ sha256sum --check --ignore-missing statuscake-mcp_<version>_SHA256SUMS
```

## Docker

A Docker image, `statuscake/statuscake-mcp`, is also published. It suits
assistants that start servers as containers, and keeps the program off your
`PATH`.

```bash title="Terminal"
$ docker pull statuscake/statuscake-mcp
```

See [Setting Up a Client](/guides/mcp/clients#docker) for how to start it.

## Running it by hand

The server is not meant to be run yourself. It speaks the MCP protocol over
standard input and output, so it needs an assistant on the other end. If you run
it from a terminal it prints a notice saying so and stops:

```bash title="Terminal"
$ statuscake-mcp
This binary is an MCP server. It is not meant to be executed directly.
...
```

For the same reason it has no shell completions. `statuscake-mcp --version`
still works, and is the way to check it is installed.

## Next Steps

Connect it to your assistant. See [Setting Up a Client](/guides/mcp/clients).
