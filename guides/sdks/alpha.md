---
id: alpha
title: Alpha Releases
description: Learn about current StatusCake SDK alpha releases
---

Some SDKs are currently in alpha, meaning they are still under development. We
encourage you to use these packages with caution as some features may not
currently be fully supported. This is an opportunity to provide feedback and
open issues so that we may deliver these packages as quickly as possible.

We advise that these packages not be used for production purposes until they are
in a general availability stage. That being said the following features are
supported in all available SDKs:

- Listing and retrieving monitoring resources (uptime, pagespeed, SSL)
- Listing and retrieving contact groups
- Listing and retrieving maintenance windows
- Listing historical data
- Listing uptime and pagespeed monitoring locations
- Deleting monitoring resources, contact groups, and maintenance windows.

Most other features of the SDKs may be used for simple use cases, but not all
functionality will be available. For instance supplying inputs where arrays are
required should be avoided.

## Which SDKs are in alpha

| SDK | Status |
| --- | --- |
| Go | Stable. |
| JavaScript | Alpha. |
| Python | Alpha. |
| Ruby | Alpha. |

## Working around the limits

If you need a feature an alpha SDK does not yet support, you have two choices
that keep the rest of your code unchanged:

- Call the [API](/guides/api/introduction) directly for that one operation,
  using the HTTP client you already have. [Parameters](/guides/api/parameters)
  describes how to send arrays correctly.

## Giving feedback

Each SDK is developed in the open. Issues and pull requests are welcome in the
repositories linked from the [SDK overview](/guides/sdks/introduction), and the
most useful reports include the SDK version, the call you made and the response
or error you received.
