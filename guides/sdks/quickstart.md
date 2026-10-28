---
id: quickstart
title: Quick Start
description: Make your first requests with a StatusCake SDK
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide takes a client from nothing to a working monitor. It assumes you have
[installed](/guides/sdks/installation) an SDK and know how to
[create a client](/guides/sdks/authentication). You will list the uptime checks
in your account, then create one, read it back and delete it.

## List Uptime Checks

With the API client configured you may make requests to the StatusCake API using
the available methods. In this section we will list all uptime checks for the
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

## Create, Read and Delete a Check

A request is built by chaining the parameters you want onto the call, and sent
with `Execute`. The remainder of this guide, and those that follow, use Go.

```go title="Create, read and delete an uptime check" showLineNumbers {18-24,30,35}
package main

import (
  "context"
  "fmt"

  "github.com/StatusCakeDev/statuscake-go"
  "github.com/StatusCakeDev/statuscake-go/credentials"
)

func main() {
  ctx := context.Background()

  bearer := credentials.NewBearerWithStaticToken("my-api-token")
  client := statuscake.NewClient(statuscake.WithRequestCredentials(bearer))

  created, err := client.CreateUptimeTest(ctx).
    Name("statuscake.com").
    TestType(statuscake.UptimeTestTypeHTTP).
    WebsiteURL("https://www.statuscake.com").
    CheckRate(statuscake.UptimeTestCheckRateFiveMinutes).
    Execute()
  if err != nil {
    panic(err)
  }

  id := created.Data.NewID
  fmt.Println("created check", id)

  check, err := client.GetUptimeTest(ctx, id).Execute()
  if err != nil {
    panic(err)
  }
  fmt.Printf("%s checks %s every %d seconds\n", check.Data.Name, check.Data.WebsiteURL, check.Data.CheckRate)

  if err := client.DeleteUptimeTest(ctx, id).Execute(); err != nil {
    panic(err)
  }
}
```

A few things to notice:

- Every call takes a `context.Context`, which controls cancellation and
  deadlines.
- Creating returns the identifier of the new check in `Data.NewID`. Identifiers
  are strings, and are what you pass to every other call about that check.
- Updating and deleting return only an error, since the API returns no body.
- Required parameters are checked before the request is made. Leave one out and
  `Execute` returns an error without contacting the API.

## Next Steps

The [Managing Resources](/guides/sdks/managing-resources) guide covers every
kind of resource, and the [Reading Results](/guides/sdks/results) guide shows
what a check has recorded.
