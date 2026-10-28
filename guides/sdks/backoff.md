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
you choose one with the `WithBackoff` option described in
[Configuration](/guides/sdks/configuration).

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
</Tabs>

## Choosing Delays

The period a strategy waits is the time the request is held up, so it should be
shorter than any deadline you give the request's context. With
`WithMaxRetries(3)` and an exponential strategy that starts at 1 second and
doubles, a request that keeps failing waits for roughly 1, 2 and 4 seconds
before it gives up, so a deadline shorter than about seven seconds will be hit
first.

`MaxDelay` caps the wait however many retries are made. Set it on both the
exponential and linear strategies: a `MaxDelay` of zero, which is what you get
by leaving it out, caps every wait at zero and so removes the backoff entirely.

`Jitter` is a fraction by which each wait may vary either way, so `0.2` varies
it by up to 20% shorter or longer. Jitter is not applied to the first retry of
an exponential strategy.

## Next Steps

Return to [Configuration](/guides/sdks/configuration) for the other client
options.
