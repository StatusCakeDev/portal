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

```go title="List Uptime Checks" showLineNumbers
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
  <TabItem value="javascript" label="JavaScript">

```typescript title="List Uptime Checks" showLineNumbers
import { Client, credentials } from '@statuscake/statuscake-js';

const client = new Client({
  credentials: new credentials.Bearer(apiToken),
});

const tests = await client.uptime.listUptimeTests();
console.log(tests.data);
```

  </TabItem>
  <TabItem value="python" label="Python">

```python title="List Uptime Checks" showLineNumbers
from statuscake import Client, credentials

client = Client(credentials.Bearer(api_token))

tests = service.list_uptime_tests()
print(tests.data)
```

  </TabItem>
  <TabItem value="ruby" label="Ruby">

```ruby title="List Uptime Checks" showLineNumbers
require 'statuscake'

client = StatusCake::Client.new(api_token)

tests = client.uptime.list_uptime_tests
puts tests
```

  </TabItem>
</Tabs>

## Create, Read and Delete a Check

In Go a request is built by chaining the parameters you want onto the call, and
sent with `Execute`. In JavaScript the parameters are properties of a single
object, and in Python they are keyword arguments. In Ruby the required parameters
are positional and the rest are keyword options. The guides that follow use Go
unless they say otherwise.

<Tabs groupId="languages">
  <TabItem value="go" label="Go">

```go title="Create, read and delete an uptime check" showLineNumbers {17-25,30,36}
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
    - Creating returns the identifier of the new check in
      `Data.NewID`. Identifiers are strings, and are what you pass to every
      other call about that check.
    - Updating and deleting return only an error, since the API returns no body.
    - Required parameters are checked before the request is made. Leave one out
      and `Execute` returns an error without contacting the API.

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```typescript title="Create, read and delete an uptime check" showLineNumbers {10-15,20,23}
import {
  Client,
  UptimeTestCheckRate,
  UptimeTestType,
  credentials,
} from '@statuscake/statuscake-js';

const client = new Client({ credentials: new credentials.Bearer(apiToken) });

const created = await client.uptime.createUptimeTest({
  name: 'statuscake.com',
  testType: UptimeTestType.Http,
  websiteUrl: 'https://www.statuscake.com',
  checkRate: UptimeTestCheckRate.FiveMinutes,
});

const testId = created.data.newId;
console.log('created check', testId);

const check = await client.uptime.getUptimeTest({ testId });
console.log(`${check.data.name} checks ${check.data.websiteUrl} every ${check.data.checkRate} seconds`);

await client.uptime.deleteUptimeTest({ testId });
```

A few things to notice:

    - Every call returns a promise. Pass `{ signal }` as the second argument to
      cancel a request with an `AbortSignal`.
    - Creating returns the identifier of the new check in
      `data.newId`. Identifiers are strings, and are what you pass to every
      other call about that check.
    - Required parameters are checked before the request is made. Leave one out
      and the call rejects with a `RequiredError` without contacting the API.

  </TabItem>
  <TabItem value="python" label="Python">

```python title="Create, read and delete an uptime check" showLineNumbers {6-11,16,19}
from statuscake import Client, credentials
from statuscake.models import UptimeTestCheckRate, UptimeTestType

client = Client(credentials.Bearer(api_token))

created = client.uptime.create_uptime_test(
    name="statuscake.com",
    test_type=UptimeTestType.HTTP,
    website_url="https://www.statuscake.com",
    check_rate=UptimeTestCheckRate.FiveMinutes,
)

test_id = created.data.new_id
print("created check", test_id)

check = client.uptime.get_uptime_test(test_id)
print(f"{check.data.name} checks {check.data.website_url} every {check.data.check_rate} seconds")

client.uptime.delete_uptime_test(test_id)
```

A few things to notice:

    - Calls are synchronous. Pass `_request_timeout` to a call, or `timeout` to
      the client, to limit how long a request may take.
    - Creating returns the identifier of the new check in
      `data.new_id`. Identifiers are strings, and are what you pass to every
      other call about that check.
    - Requests and responses are validated with pydantic. A missing or invalid
      parameter raises a `pydantic.ValidationError` before the request is made.

  </TabItem>
  <TabItem value="ruby" label="Ruby">

```ruby title="Create, read and delete an uptime check" showLineNumbers {5-10,15,18}
require 'statuscake'

client = StatusCake::Client.new(api_token)

created = client.uptime.create_uptime_test(
  'statuscake.com',
  'HTTP',
  'https://www.statuscake.com',
  300,
)

test_id = created.data.new_id
puts "created check #{test_id}"

check = client.uptime.get_uptime_test(test_id)
puts "#{check.data.name} checks #{check.data.website_url} every #{check.data.check_rate} seconds"

client.uptime.delete_uptime_test(test_id)
```

A few things to notice:

    - Calls are synchronous. Set `timeout` on the client to limit how long a
      request may take.
    - Creating returns the identifier of the new check in
      `data.new_id`. Identifiers are strings, and are what you pass to every
      other call about that check.
    - Required parameters are positional and the rest are keyword options, for
      example `regions: %w[london paris]`.

  </TabItem>
</Tabs>

## Next Steps

The [Managing Resources](/guides/sdks/managing-resources) guide covers every
kind of resource, and the [Reading Results](/guides/sdks/results) guide shows
what a check has recorded.
