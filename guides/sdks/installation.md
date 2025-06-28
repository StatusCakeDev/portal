---
id: installation
title: Installation
description: Learn how to get started using StatusCake software development kits
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Installation of each StatusCake API SDK should be performed through the
respective package manager, or directly from GitHub where appropriate. This
guide will prefer the use of a dependency manager unless otherwise stated.

Use the following steps to install the StatusCake API SDK for the desired
language:

:::info

Some SDK are currently in alpha and will not be given support at this time. We
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

## Create a Client

Once the desired SDK(s) is installed the next step is to create an authenticated
API client. You can view and manage your API tokens from the [StatusCake account
panel](https://app.statuscake.com/User.php).

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

## List Uptime Checks

With the API client configured you may make requests to the StatusCake API using
the available methods. In this document we will list all uptime checks for the
given workspace.

<Tabs groupId="languages">
  <TabItem value="go" label="Go">

```go title="List Uptime Checks" showLineNumbers {4-5,15-20}
package main

import (
  "context"
  "fmt"

  "github.com/StatusCakeDev/statuscake-go"
  "github.com/StatusCakeDev/statuscake-go/credentials"
)

func main() {
  bearer := credentials.NewBearerWithStaticToken("my-api-token")
  client := statuscake.NewClient(statuscake.WithRequestCredentials(bearer))

  res, err := client.ListUptimeTests(context.Background()).Execute()
  if err != nil {
    panic(err)
  }

  fmt.Printf("%+v\n", res.Data)
}
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript (alpha)">

```typescript title="List Uptime Checks" showLineNumbers {4,13-16}
import 'isomorphic-fetch';
import {
  Configuration,
  UptimeApi,
} from '@statuscake/statuscake-js';

const config = new Configuration({
  headers: {
    'Authorization': `Bearer ${apiToken}`,
  },
});

const service = new UptimeApi(config);
service.listUptimeTests()
  .then((tests) => console.log(JSON.stringify(tests)))
  .catch(console.log);
```

  </TabItem>
  <TabItem value="python" label="Python (alpha)">

```python title="List Uptime Checks" showLineNumbers {2,9-12}
from statuscake import ApiClient
from statuscake.apis import UptimeApi

client = ApiClient(
  header_name='Authorization',
  header_value='Bearer %s' % api_token,
)

service = UptimeApi(api_client=client)
tests = service.list_uptime_tests()

print(tests)
```

  </TabItem>
  <TabItem value="ruby" label="Ruby (alpha)">

```ruby title="List Uptime Checks" showLineNumbers {9-12}
require 'statuscake'

client = StatusCake::ApiClient.new

# Constructing these options is a temporary fix until a client wide
# authentication mechanism has been realised.
opts = { header_params: { 'Authorization' => "Bearer #{api_token}" } }

service = StatusCake::UptimeApi.new(client)
tests = service.list_uptime_tests(opts)

puts tests
```

  </TabItem>
</Tabs>

## Next steps

There are many other methods available within each SDK to manage StatusCake
monitoring resource that are not covered in this document. See the respective
SDK GitHub repositories for example usage.

Next learn about configuration options available in the SDKs.
