---
id: introduction
title: SDKs Introduction
description: Overview of StatusCake software development kits
---

import DocClients from '@site/src/components/DocClients';

Our Software Development Kits (SDKs) provide integrations into several common
programming languages making it simpler to manage monitoring resources using
idiomatic code. Each wraps the [StatusCake API](/guides/api/introduction), so
you work with typed requests and responses instead of building HTTP calls by
hand, and the SDK takes care of authentication, retries and backing off when
the API asks for it.

At present we support the following languages:

<DocClients />

:::info

Some SDKs are currently in alpha and will not be given support at this time. We
are currently working to deliver stable releases for each of these projects.
Read more about alpha releases in the [documentation](/guides/sdks/alpha).

:::

## What an SDK gives you

- **Typed requests and responses.** Check types, check rates, regions and
  repeat intervals are values the compiler or editor can check, rather than
  strings and numbers you must get right yourself.
- **Authentication.** Give the client a token once and every request carries
  it.
- **Retries and backoff.** When the API says it is being asked too much, the
  client waits and tries again. How many times, and for how long, is
  configurable.
- **Structured errors.** A failed request becomes an error that tells you which
  parameters were wrong.

## When to use an SDK

Reach for an SDK when monitoring is something your own software manages: a
service that registers a check for each tenant it provisions, a deployment tool
that pauses checks while it works, or a report that reads uptime into your own
systems.

If you are describing monitoring as configuration, the [Terraform
provider](/guides/terraform/introduction) is usually a better fit. If your
language has no SDK, call the [API](/guides/api/introduction) directly.

## How these guides are organised

The guides build on each other, and can also be read individually.

| Guide | What it covers |
| --- | --- |
| [Installation](/guides/sdks/installation) | Adding an SDK to your project. |
| [Authentication](/guides/sdks/authentication) | Creating a client that can make requests. |
| [Quick Start](/guides/sdks/quickstart) | Your first requests: list, create and delete a check. |
| [Managing Resources](/guides/sdks/managing-resources) | Creating, reading, updating and deleting each kind of resource. |
| [Reading Results](/guides/sdks/results) | History, periods of downtime and alerts for a check. |
| [Pagination](/guides/sdks/pagination) | Reading every result of a large list. |
| [Error Handling](/guides/sdks/errors) | Telling a failure from a validation problem. |
| [Configuration](/guides/sdks/configuration) | Retries, throttling, HTTP clients and debugging. |
| [Backoff Strategies](/guides/sdks/backoff) | Choosing how long to wait between retries. |

:::caution

The Go SDK is the most complete, and the guides after the Quick Start use it
for their examples. The other SDKs are in [alpha](/guides/sdks/alpha), so
consult their repositories for the current state of any feature.

:::

## Next Steps

Install the SDK for your language.
