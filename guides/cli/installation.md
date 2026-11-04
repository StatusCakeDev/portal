---
id: installation
title: Installation
description: Learn how to install cakectl
---

## Releases

Download the archive for your platform from the [releases
page](https://github.com/StatusCakeDev/cakectl/releases). Archives are built for
Linux, macOS, FreeBSD and Windows, for each of the processor architectures those
systems commonly run on. Unpack it and put `cakectl` on your `PATH`.

```bash title="Terminal"
$ tar -xzf cakectl_<version>_linux_amd64.tar.gz
$ sudo mv cakectl /usr/local/bin/
$ cakectl --version
```

Every release includes a checksum file, `cakectl_<version>_SHA256SUMS`, together
with a detached signature of it. Check the archive against the checksums before
you unpack it, particularly if you are installing in a build pipeline.

```bash title="Terminal"
$ sha256sum --check --ignore-missing cakectl_<version>_SHA256SUMS
```

## Docker

`cakectl` is also published as a Docker image, which is convenient in a CI job
that already runs containers. Pass the token in through the environment.

```bash title="Terminal"
$ docker run --rm -e STATUSCAKE_API_TOKEN statuscake/cakectl uptime list
```

## From source

If you have Go installed you can build the latest release yourself.

```bash title="Terminal"
$ go install github.com/StatusCakeDev/cakectl@latest
```

## Shell completion

`cakectl` can complete commands, flags and resource names in your shell.

```bash title="Terminal"
$ cakectl completion bash|zsh|fish|powershell
```

prints the completion script for a shell. Each shell loads it differently, and
`cakectl completion <shell> --help` shows how for yours. For example, in a `bash`
session:

```bash title="Terminal"
$ source <(cakectl completion bash)
```

## Next Steps

Give `cakectl` an API token. See [Authentication](/guides/cli/authentication).
