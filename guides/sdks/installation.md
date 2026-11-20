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

<Tabs groupId="languages">
  <TabItem value="go" label="Go">

```bash title="Install statuscake-go"
go get github.com/StatusCakeDev/statuscake-go
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```bash title="Install statuscake-js"
npm install @statuscake/statuscake-js
```

  </TabItem>
  <TabItem value="python" label="Python">

```bash title="Install statuscake-py"
pip install statuscake-py
```

  </TabItem>
  <TabItem value="ruby" label="Ruby">

```bash title="Install statuscake-rb"
gem install statuscake-rb
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
  <TabItem value="javascript" label="JavaScript">

The JavaScript SDK supports Node.js 20 and later, and modern browsers. It is
written in TypeScript and includes its type definitions. It is published as both
an ES module and a CommonJS module, so it can be imported or required:

```javascript title="Import the SDK"
import { Client } from '@statuscake/statuscake-js';
// or
const { Client } = require('@statuscake/statuscake-js');
```

It has no runtime dependencies and uses the global `fetch`.

  </TabItem>
  <TabItem value="python" label="Python">

The Python SDK supports Python 3.9 and later. It depends on
[pydantic](https://docs.pydantic.dev/) 2 to validate and type requests and
responses, and on [urllib3](https://urllib3.readthedocs.io/) 2.

```python title="Import the SDK"
from statuscake import Client
```

  </TabItem>
  <TabItem value="ruby" label="Ruby">

The Ruby SDK supports Ruby 3.2 and later. It has no dependencies other than the
standard library, and sends requests with `Net::HTTP`.

```ruby title="Require the SDK"
require 'statuscake'
```

  </TabItem>
</Tabs>

## Pinning a version

Add the SDK at a specific version in the same way as any other dependency, and
upgrade deliberately. Go modules record the version in `go.mod`, which you
should commit:

```bash title="Install a specific version"
go get github.com/StatusCakeDev/statuscake-go@vX.Y.Z
```

Read the release notes on GitHub before upgrading.

## Next Steps

Learn how to [authenticate](/guides/sdks/authentication) a client so that it can
make requests.
