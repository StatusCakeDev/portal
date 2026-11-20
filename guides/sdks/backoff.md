---
id: backoff
title: Backoff Strategies
description: Learn about the available backoff strategies for request retries
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

When a request fails it may be desirable to retry the request in the future.
For this the SDKs employ a couple of strategies to give the best chance of a
successful request. A strategy decides how long to wait before each retry, and
you choose one with the `WithBackoff` option in Go, or the `backoff` option in
JavaScript, Python and Ruby, described in [Configuration](/guides/sdks/configuration).

| Strategy | Wait before retry | Best for |
| --- | --- | --- |
| Constant | The same every time. | Short outages, and predictable timing. |
| Linear | Grows by the base delay each time. | A gentle increase. |
| Exponential | Multiplies each time. | Giving a struggling service room to recover. |

Exponential backoff is the usual choice when many clients might retry at once,
since it spreads them out. Add jitter in that case, so that clients that failed
together do not all retry together.

## Constant Backoff

A constant backoff applies a fixed period of time between each failed request.

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
  <TabItem value="javascript" label="JavaScript">

```typescript title="Constant Backoff" showLineNumbers {1,5}
import { Client, backoff, credentials } from '@statuscake/statuscake-js';

const client = new Client({
  credentials: new credentials.Bearer(apiToken),
  backoff: new backoff.Constant({ baseDelay: 5000 }),
});
```

  </TabItem>
  <TabItem value="python" label="Python">

```python title="Constant Backoff" showLineNumbers {1,5}
from statuscake import Client, backoff, credentials

client = Client(
    credentials.Bearer(api_token),
    backoff=backoff.Constant(base_delay=5),
)
```

  </TabItem>
  <TabItem value="ruby" label="Ruby">

```ruby title="Constant Backoff" showLineNumbers
require 'statuscake'

client = StatusCake::Client.new(
  api_token,
  backoff: StatusCake::Backoff::Constant.new(5),
)
```

  </TabItem>
</Tabs>

## Exponential Backoff

An exponential backoff applies an exponential function on the time between each
failed request.

<Tabs groupId="languages">
  <TabItem value="go" label="Go">

```go title="Exponential Backoff" showLineNumbers {4,7,15-20}
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
    statuscake.WithBackoff(backoff.Exponential{
      BaseDelay:  time.Duration(1) * time.Second,
      Multiplier: 2.0,
      Jitter:     0.2,
      MaxDelay:   time.Duration(30) * time.Second,
    }),
  )
}
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```typescript title="Exponential Backoff" showLineNumbers {1,5-10}
import { Client, backoff, credentials } from '@statuscake/statuscake-js';

const client = new Client({
  credentials: new credentials.Bearer(apiToken),
  backoff: new backoff.Exponential({
    baseDelay: 1000,
    multiplier: 2,
    jitter: 0.2,
    maxDelay: 30_000,
  }),
});
```

  </TabItem>
  <TabItem value="python" label="Python">

```python title="Exponential Backoff" showLineNumbers {1,5-10}
from statuscake import Client, backoff, credentials

client = Client(
    credentials.Bearer(api_token),
    backoff=backoff.Exponential(
        base_delay=1,
        multiplier=2,
        jitter=0.2,
        max_delay=30,
    ),
)
```

  </TabItem>
  <TabItem value="ruby" label="Ruby">

```ruby title="Exponential Backoff" showLineNumbers
require 'statuscake'

client = StatusCake::Client.new(
  api_token,
  backoff: StatusCake::Backoff::Exponential.new(
    base_delay: 1,
    multiplier: 2,
    jitter: 0.2,
    max_delay: 30,
  ),
)
```

  </TabItem>
</Tabs>

## Linear Backoff

Linear backoff applies a linear function on the time between each failed
request.

<Tabs groupId="languages">
  <TabItem value="go" label="Go">

```go title="Linear Backoff" showLineNumbers {4,7,15-20}
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
    statuscake.WithBackoff(backoff.Linear{
      BaseDelay:  time.Duration(1) * time.Second,
      Jitter:     0.2,
      MaxDelay:   time.Duration(30) * time.Second,
    }),
  )
}
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```typescript title="Linear Backoff" showLineNumbers {1,5-9}
import { Client, backoff, credentials } from '@statuscake/statuscake-js';

const client = new Client({
  credentials: new credentials.Bearer(apiToken),
  backoff: new backoff.Linear({
    baseDelay: 1000,
    jitter: 0.2,
    maxDelay: 30_000,
  }),
});
```

  </TabItem>
  <TabItem value="python" label="Python">

```python title="Linear Backoff" showLineNumbers {1,5-9}
from statuscake import Client, backoff, credentials

client = Client(
    credentials.Bearer(api_token),
    backoff=backoff.Linear(
        base_delay=1,
        jitter=0.2,
        max_delay=30,
    ),
)
```

  </TabItem>
  <TabItem value="ruby" label="Ruby">

```ruby title="Linear Backoff" showLineNumbers
require 'statuscake'

client = StatusCake::Client.new(
  api_token,
  backoff: StatusCake::Backoff::Linear.new(
    base_delay: 1,
    jitter: 0.2,
    max_delay: 30,
  ),
)
```

  </TabItem>
</Tabs>

## Choosing Delays

The period a strategy waits is the time the request is held up, so it should be
shorter than any deadline you give the request, such as the context in Go, an
`AbortSignal` in JavaScript or a `timeout` in Python and Ruby. With
`WithMaxRetries(3)` and an exponential strategy that starts at 1 second and
doubles, a request that keeps failing waits for roughly 1, 2 and 4 seconds
before it gives up, so a deadline shorter than about seven seconds will be hit
first.

`MaxDelay` caps the wait however many retries are made. A `MaxDelay` of zero,
which is what you get by leaving it out, means the wait is not capped. Set one
on the exponential and linear strategies so that a long run of failures cannot
leave a request waiting for minutes. The cap is applied before jitter, so a
jittered wait can be a little longer than the maximum.

`Jitter` is a fraction by which each wait may vary either way, so `0.2` varies
it by up to 20% shorter or longer. It is applied to every retry, including the
first.

The Go SDK measures delays as a `time.Duration`, the Python and Ruby SDKs in
seconds, and the JavaScript SDK in milliseconds. In JavaScript, Python and Ruby
a plain function of the retry index that returns the delay can be used in place
of a strategy, for example `backoff: (idx) => 500 * 2 ** idx` in JavaScript or
`backoff: ->(idx) { 0.5 * 2**idx }` in Ruby.

## Next Steps

Return to [Configuration](/guides/sdks/configuration) for the other client
options.
