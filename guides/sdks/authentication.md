---
id: authentication
title: Authentication
description: Learn how to create an authenticated StatusCake API client
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Once the desired SDK is [installed](/guides/sdks/installation) the next step is
to create an authenticated API client. You can view and manage your API tokens
from the [StatusCake account panel](https://app.statuscake.com/User.php).

:::warning

API tokens must be kept private. In the event that one is exposed a new one
should be generated.

:::

## Create a Client

<Tabs groupId="languages">
  <TabItem value="go" label="Go">

```go title="Create a Client" showLineNumbers
package main

import (
  "github.com/StatusCakeDev/statuscake-go"
  "github.com/StatusCakeDev/statuscake-go/credentials"
)

func main() {
  bearer := credentials.NewBearerWithStaticToken("my-api-token")
  client := statuscake.NewClient(statuscake.WithRequestCredentials(bearer))
}
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```typescript title="Create a Client" showLineNumbers
import { Client } from '@statuscake/statuscake-js';

const client = new Client({ credentials: apiToken });
```

A token is shorthand for `new credentials.Bearer(token)`.

  </TabItem>
  <TabItem value="python" label="Python">

```python title="Create a Client" showLineNumbers
from statuscake import Client

client = Client(api_token)
```

A token is shorthand for `credentials.Bearer(token)`.

  </TabItem>
  <TabItem value="ruby" label="Ruby">

```ruby title="Create a Client" showLineNumbers
require 'statuscake'

client = StatusCake::Client.new(api_token)
```

A token is shorthand for `StatusCake::Credentials::Bearer.new(token)`.

  </TabItem>
</Tabs>

## Reading the Token from the Environment

Do not write a token into your source code. Read it from the environment of the
process, which is where deployment platforms and CI systems expect to place
secrets. `STATUSCAKE_API_TOKEN` is the name used by the other StatusCake tools,
so a single variable can serve them all.

<Tabs groupId="languages">
  <TabItem value="go" label="Go">

```go title="Token from the environment" showLineNumbers {11-14}
package main

import (
  "os"

  "github.com/StatusCakeDev/statuscake-go"
  "github.com/StatusCakeDev/statuscake-go/credentials"
)

func main() {
  apiToken := os.Getenv("STATUSCAKE_API_TOKEN")
  if apiToken == "" {
    panic("STATUSCAKE_API_TOKEN is not set")
  }

  bearer := credentials.NewBearerWithStaticToken(apiToken)
  client := statuscake.NewClient(statuscake.WithRequestCredentials(bearer))
}
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```typescript title="Token from the environment" showLineNumbers {3-6}
import { Client } from '@statuscake/statuscake-js';

const apiToken = process.env.STATUSCAKE_API_TOKEN;
if (!apiToken) {
  throw new Error('STATUSCAKE_API_TOKEN is not set');
}

const client = new Client({ credentials: apiToken });
```

  </TabItem>
  <TabItem value="python" label="Python">

```python title="Token from the environment" showLineNumbers {5}
import os

from statuscake import Client

api_token = os.environ['STATUSCAKE_API_TOKEN']
client = Client(api_token)
```

  </TabItem>
  <TabItem value="ruby" label="Ruby">

```ruby title="Token from the environment" showLineNumbers {3}
require 'statuscake'

api_token = ENV.fetch('STATUSCAKE_API_TOKEN')
client = StatusCake::Client.new(api_token)
```

  </TabItem>
</Tabs>

## Tokens That Change

A static token is fixed when the client is created. A long-running service may
need to pick up a rotated token without restarting. The Go, JavaScript, Python
and Ruby SDKs support this by accepting a function, which is called for every
attempt to send a request, in place of a fixed value.

<Tabs groupId="languages">
  <TabItem value="go" label="Go">

```go title="A token supplied by a function" showLineNumbers {12-14}
package main

import (
  "net/http"
  "os"

  "github.com/StatusCakeDev/statuscake-go"
  "github.com/StatusCakeDev/statuscake-go/credentials"
)

func main() {
  bearer := credentials.NewBearer(func(*http.Request) string {
    return os.Getenv("STATUSCAKE_API_TOKEN")
  })
  
  client := statuscake.NewClient(statuscake.WithRequestCredentials(bearer))
  _ = client
}
```

The function is given the request about to be sent, so it can fetch a token
from a secrets manager or a cache. Keep it fast, since it runs before every
request.

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```typescript title="A token supplied by a function" showLineNumbers {4}
import { Client } from '@statuscake/statuscake-js';

const client = new Client({
  credentials: async () => await secrets.get('statuscake-token'),
});
```

The function may be asynchronous, so it can fetch a token from a secrets manager
or a cache. Keep it fast, since it runs before every attempt to send a request.

  </TabItem>
  <TabItem value="python" label="Python">

```python title="A token supplied by a function" showLineNumbers {5}
import os

from statuscake import Client

client = Client(lambda: os.environ['STATUSCAKE_API_TOKEN'])
```

The function is called before every attempt to send a request, so it can fetch
a token from a secrets manager or a cache. Keep it fast.

  </TabItem>
  <TabItem value="ruby" label="Ruby">

```ruby title="A token supplied by a function" showLineNumbers {3}
require 'statuscake'

client = StatusCake::Client.new(-> { ENV.fetch('STATUSCAKE_API_TOKEN') })
```

The function is called before every attempt to send a request, so it can fetch
a token from a secrets manager or a cache. Keep it fast.

  </TabItem>
</Tabs>

## Basic Authentication

Accounts that authenticate with a username and password rather than an API token
can use basic credentials in the Go, JavaScript, Python and Ruby SDKs. Bearer tokens
are preferred.

<Tabs groupId="languages">
  <TabItem value="go" label="Go">

```go title="Basic credentials"
basic := credentials.NewBasicAuthentication("my-username", "my-password")
client := statuscake.NewClient(statuscake.WithRequestCredentials(basic))
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```typescript title="Basic credentials"
const client = new Client({
  credentials: new credentials.Basic('my-username', 'my-password'),
});
```

  </TabItem>
  <TabItem value="python" label="Python">

```python title="Basic credentials"
client = Client(credentials.Basic('my-username', 'my-password'))
```

  </TabItem>
  <TabItem value="ruby" label="Ruby">

```ruby title="Basic credentials"
client = StatusCake::Client.new(StatusCake::Credentials::Basic.new('my-username', 'my-password'))
```

  </TabItem>
</Tabs>

## Next Steps

Make your first requests in the [Quick Start](/guides/sdks/quickstart).
