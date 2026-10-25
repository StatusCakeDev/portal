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
  <TabItem value="javascript" label="JavaScript (alpha)">

```typescript title="Create a Client" showLineNumbers
import 'isomorphic-fetch';
import {
  Configuration,
} from '@statuscake/statuscake-js';

const config = new Configuration({
  headers: {
    'Authorization': `Bearer ${apiToken}`,
  },
});
```

  </TabItem>
  <TabItem value="python" label="Python (alpha)">

```python title="Create a Client" showLineNumbers
from statuscake import ApiClient

client = ApiClient(
  header_name='Authorization',
  header_value='Bearer %s' % api_token,
)
```

  </TabItem>
  <TabItem value="ruby" label="Ruby (alpha)">

```ruby title="Create a Client" showLineNumbers
require 'statuscake'

client = StatusCake::ApiClient.new

# Constructing these options is a temporary fix until a client wide
# authentication mechanism has been realised.
opts = { header_params: { 'Authorization' => "Bearer #{api_token}" } }
```

  </TabItem>
</Tabs>

## Reading the Token from the Environment

Do not write a token into your source code. Read it from the environment of the
process, which is where deployment platforms and CI systems expect to place
secrets. `STATUSCAKE_API_TOKEN` is the name used by the other StatusCake tools,
so a single variable can serve them all.

<Tabs groupId="languages">
  <TabItem value="go" label="Go">

```go title="Token from the environment" showLineNumbers {10-13}
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
  <TabItem value="javascript" label="JavaScript (alpha)">

```typescript title="Token from the environment" showLineNumbers {1-4}
const apiToken = process.env.STATUSCAKE_API_TOKEN;
if (!apiToken) {
  throw new Error('STATUSCAKE_API_TOKEN is not set');
}
```

  </TabItem>
  <TabItem value="python" label="Python (alpha)">

```python title="Token from the environment" showLineNumbers
import os

api_token = os.environ['STATUSCAKE_API_TOKEN']
```

  </TabItem>
  <TabItem value="ruby" label="Ruby (alpha)">

```ruby title="Token from the environment" showLineNumbers
api_token = ENV.fetch('STATUSCAKE_API_TOKEN')
```

  </TabItem>
</Tabs>

## Tokens That Change

A static token is fixed when the client is created. A long-running service may
need to pick up a rotated token without restarting. The Go SDK supports this by
accepting a function, which is called for every request, in place of a fixed
value.

```go title="A token supplied by a function" showLineNumbers {11-13}
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

## Next Steps

Make your first requests in the [Quick Start](/guides/sdks/quickstart).
