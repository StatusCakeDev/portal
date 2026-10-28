---
id: installation
title: Installation
description: Learn how to install the StatusCake software development kits
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Installation of each StatusCake API SDK should be performed through the
respective package manager, or directly from GitHub where appropriate. This
guide will prefer the use of a dependency manager unless otherwise stated.

Use the following steps to install the StatusCake API SDK for the desired
language:

:::info

Some SDKs are currently in alpha and will not be given support at this time. We
are currently working to deliver stable releases for each of these projects.
Read more about alpha releases in the [documentation](/guides/sdks/alpha).

:::

<Tabs groupId="languages">
  <TabItem value="go" label="Go">

```bash title="Install statuscake-go"
go get github.com/StatusCakeDev/statuscake-go
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript (alpha)">

```bash title="Install statuscake-js"
npm install -D statuscake-js
```

  </TabItem>
  <TabItem value="python" label="Python (alpha)">

```bash title="Install statuscake-py"
pip install statuscake-py
```

  </TabItem>
  <TabItem value="ruby" label="Ruby (alpha)">

```bash title="Install statuscake-rb"
bundle add statuscake-rb
```

  </TabItem>
</Tabs>

## Requirements

<Tabs groupId="languages">
  <TabItem value="go" label="Go">

The Go SDK supports the three latest major [releases of
Go](https://go.dev/doc/devel/release). It is a Go module, so importing it is
enough for the toolchain to fetch it:

```go title="Import the SDK"
import "github.com/StatusCakeDev/statuscake-go"
```

Its only dependencies are in the standard library.

  </TabItem>
  <TabItem value="javascript" label="JavaScript (alpha)">

See the [statuscake-js](https://github.com/StatusCakeDev/statuscake-js)
repository for the supported versions of Node.js.

  </TabItem>
  <TabItem value="python" label="Python (alpha)">

See the [statuscake-py](https://github.com/StatusCakeDev/statuscake-py)
repository for the supported versions of Python.

  </TabItem>
  <TabItem value="ruby" label="Ruby (alpha)">

See the [statuscake-rb](https://github.com/StatusCakeDev/statuscake-rb)
repository for the supported versions of Ruby.

  </TabItem>
</Tabs>

## Pinning a version

Add the SDK at a specific version in the same way as any other dependency, and
upgrade deliberately. Go modules record the version in `go.mod`, which you
should commit:

```bash title="Install a specific version"
go get github.com/StatusCakeDev/statuscake-go@vX.Y.Z
```

Read the release notes on GitHub before upgrading, particularly for SDKs that
are still in alpha.

## Next Steps

Learn how to [authenticate](/guides/sdks/authentication) a client so that it can
make requests.
