---
id: configuration
title: Configuration
description: Learn how configure StatusCake software development kits
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

With the module initialised, the StatusCake provider can be configured.

## Authentication

The StatusCake Terraform provider requires that an API bearer token be included
in the provider configuration block. You can view and manage your API tokens
from the [StatusCake account panel](https://app.statuscake.com/User.php).

:::warning note

API tokens must be kept private. In the event that one is exposed a new one
should be generated.

:::

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

## Request Retries

When a request results in a transient error - an error that will resolve
itself, i.e. connection error, or rate limit being hit - it may be desirable to
retry the request in the future. For this the SDKs allow for each request to be
retired up to some maximum number of times to give thea greater chance for
success.

<Tabs groupId="languages">
  <TabItem value="go" label="Go">

```go title="Retry Attempts" showLineNumbers {12}
package main

import (
  "github.com/StatusCakeDev/statuscake-go"
  "github.com/StatusCakeDev/statuscake-go/credentials"
)

func main() {
  bearer := credentials.NewBearerWithStaticToken("my-api-token")
  client := statuscake.NewClient(
    statuscake.WithRequestCredentials(bearer),
    statuscake.WithMaxRetries(3),
  )
}
```

  </TabItem>
</Tabs>

### Backoff

By default request retry attempts are made using a constant backoff strategy
with a backoff period of 1 second. This may be configured to support alternate
backoff periods.

<Tabs groupId="languages">
  <TabItem value="go" label="Go">

```go title="Constant Backoff" showLineNumbers {4,7,15-17}
package main

import (
  "time"

  "github.com/StatusCakeDev/statuscake-go"
  "github.com/StatusCakeDev/statuscake-go/backoff"
  "github.com/StatusCakeDev/statuscake-go/credentials"
)

func main() {
  bearer := credentials.NewBearerWithStaticToken("my-api-token")
  client := statuscake.NewClient(
    statuscake.WithRequestCredentials(bearer),
    statuscake.WithBackoff(backoff.Constant{
      BaseDelay: time.Duration(5) * time.Second,
    }),
  )
}
```

  </TabItem>
</Tabs>

The SDKs support other backoff strategies. These are detailed further in the
[backoff strategies](/guides/sdks/backoff) guide.

### Disable Retries

Request retries can be disabled entirely for applications that do not require
it.

<Tabs groupId="languages">
  <TabItem value="go" label="Go">

```go title="Disbale Retries" showLineNumbers {12}
package main

import (
  "github.com/StatusCakeDev/statuscake-go"
  "github.com/StatusCakeDev/statuscake-go/credentials"
)

func main() {
  bearer := credentials.NewBearerWithStaticToken("my-api-token")
  client := statuscake.NewClient(
    statuscake.WithRequestCredentials(bearer),
    statuscake.WithDisableRetry(),
  )
}
```

  </TabItem>
</Tabs>

# Next Steps

Next learn about the different request retry backoff strategies the SDKs
support.
