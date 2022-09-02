---
id: backoff
title: Backoff Strategies
description: Learn about the available backoff strategies for request retries
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

When a request fails it may be desirable to retry the request in the future.
For this the SDKs employ a couple of strategies to give the best chance of a
successful request.

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

Linear backoff applies a linear functions on the time between each failed
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
