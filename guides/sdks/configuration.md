---
id: configuration
title: Configuration
description: Learn how to configure StatusCake software development kits
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Besides credentials, a client has options for how it retries failed requests,
which HTTP client it uses, and what it sends. The examples here use the Go SDK,
which takes each setting as an option passed to `statuscake.NewClient`.

| Option | Purpose | Default |
| --- | --- | --- |
| `WithRequestCredentials` | Authenticates requests. See [Authentication](/guides/sdks/authentication). | None |
| `WithMaxRetries` | How many times a request is retried. | `1` |
| `WithBackoff` | How long to wait between retries. | Constant, 1 second |
| `WithDisableRetry` | Turns retries off. | Retries on |
| `WithHTTPClient` | The `http.Client` that sends requests. | `http.DefaultClient` |
| `WithUserAgent` | The `User-Agent` header. | `statuscake/go/<go version>` |
| `WithHeader`, `WithHeaders` | Extra headers on every request. | None |
| `WithDebug` | Prints each request. | Off |
| `WithHost` | Overrides the host that requests go to. | `api.statuscake.com` |

## Request Retries

When a request results in a transient error - an error that will resolve itself,
i.e. connection error, or rate limit being hit - it may be desirable to retry
the request in the future. For this the SDKs allow for each request to be
retried up to some maximum number of times to give them a greater chance of
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

The Go SDK retries a request when the connection fails, or when the API answers
`429` because the account has been [ratelimited](/guides/api/ratelimiting). It
does not retry other errors: a `4xx` means the request needs to change, and a
`5xx` is returned to you to decide on. A retry waits for the period given by the
backoff strategy, and stops waiting if the request's context is cancelled.

:::info

The maximum is of *retries*, so `WithMaxRetries(3)` allows a request to be sent
up to four times.

:::

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

```go title="Disable Retries" showLineNumbers {12}
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

## Throttling

Retrying recovers from hitting the ratelimit, but it is better not to hit it.
The SDK does not limit how fast you send requests, so a program that makes many
of them, such as one that reads the history of every check, should limit itself
to a little under the API's burst limit of 5 requests per second. See
[Ratelimiting](/guides/api/ratelimiting).

The client sends requests through an `http.Client`, which can be given a
`RoundTripper` that spaces them out.

```go title="Limit requests to 4 per second" showLineNumbers
package main

import (
  "net/http"
  "time"

  "github.com/StatusCakeDev/statuscake-go"
  "github.com/StatusCakeDev/statuscake-go/credentials"
)

// throttle lets a request through each time the ticker fires.
type throttle struct {
  next http.RoundTripper
  tick <-chan time.Time
}

func (t throttle) RoundTrip(r *http.Request) (*http.Response, error) {
  select {
  case <-t.tick:
    return t.next.RoundTrip(r)
  case <-r.Context().Done():
    return nil, r.Context().Err()
  }
}

func main() {
  httpClient := &http.Client{
    Timeout: 30 * time.Second,
    Transport: throttle{
      next: http.DefaultTransport,
      tick: time.NewTicker(250 * time.Millisecond).C,
    },
  }

  bearer := credentials.NewBearerWithStaticToken("my-api-token")
  client := statuscake.NewClient(
    statuscake.WithRequestCredentials(bearer),
    statuscake.WithHTTPClient(httpClient),
  )
  _ = client
}
```

## HTTP Client

`WithHTTPClient` is also how you set a timeout, route requests through a proxy,
trust a private certificate authority or add tracing. Without it the SDK uses
`http.DefaultClient`, which has no timeout. Prefer to set one, or pass a context
with a deadline to each request.

## Headers and User Agent

Extra headers are added to every request. The user agent defaults to one that
identifies the SDK and the Go version; add to it rather than replacing it, so
that StatusCake can see which clients are in use.

```go title="Identify your application" showLineNumbers {3-4}
client := statuscake.NewClient(
  statuscake.WithRequestCredentials(bearer),
  statuscake.WithUserAgent("acme-deployer/1.4 statuscake-go"),
  statuscake.WithHeader("X-Request-Source", "deployer"),
)
```

## Debugging

`WithDebug` prints every outgoing request to the standard logger, which is the
quickest way to see exactly what is being sent.

```go title="Print each request" showLineNumbers {3}
client := statuscake.NewClient(
  statuscake.WithRequestCredentials(bearer),
  statuscake.WithDebug(),
)
```

:::warning

The output includes the `Authorization` header, and so your API token. Use it
locally, never in production, and never paste its output anywhere public.

:::

## Next Steps

Next learn about the different request retry backoff strategies the SDKs
support.
