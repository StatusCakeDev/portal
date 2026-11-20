---
id: configuration
title: Configuration
description: Learn how to configure StatusCake software development kits
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Besides credentials, a client has options for how it retries failed requests,
how fast it sends them, which HTTP client it uses, and what it sends. The Go SDK
takes each setting as an option passed to `statuscake.NewClient`. The JavaScript
SDK takes an options object passed to `new Client`, the Python SDK takes
keyword arguments passed to `Client`, and the Ruby SDK takes keyword arguments
passed to `StatusCake::Client.new`.

| Purpose | Go | JavaScript | Python | Ruby | Default |
| --- | --- | --- | --- | --- | --- |
| Authenticate requests. See [Authentication](/guides/sdks/authentication). | `WithRequestCredentials` | `credentials` | `credentials` | `credentials` | None |
| How many times a request is retried. | `WithMaxRetries` | `maxRetries` | `max_retries` | `max_retries` | `1` |
| How long to wait between retries. | `WithBackoff` | `backoff` | `backoff` | `backoff` | Constant, 1 second |
| Turn retries off. | `WithDisableRetry` | `maxRetries: 0` | `max_retries=0` | `max_retries: 0` | Retries on |
| Space requests out. | `WithHTTPClient` with `throttle` | `limiter` | `limiter` | `limiter` | No limit |
| How long a request may take. | `WithHTTPClient` | `timeout` | `timeout` | `timeout` | No timeout |
| The HTTP client that sends requests. | `WithHTTPClient` | `fetch` | `configuration` | `configuration` | The language default |
| The `User-Agent` header. | `WithUserAgent` | `userAgent` | `user_agent` | `user_agent` | Identifies the SDK |
| Extra headers on every request. | `WithHeader`, `WithHeaders` | `headers` | `headers` | `headers` | None |
| Print each request. | `WithDebug` | `middleware` | `debug` | `debug` | Off |
| Override the host that requests go to. | `WithHost` | `host` | `host` | `host` | `api.statuscake.com` |

The Ruby SDK uses the `Net::HTTP` timeouts of 60 seconds unless `timeout` is set.

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
  <TabItem value="javascript" label="JavaScript">

```typescript title="Retry Attempts" showLineNumbers {5}
import { Client, credentials } from '@statuscake/statuscake-js';

const client = new Client({
  credentials: new credentials.Bearer('my-api-token'),
  maxRetries: 3,
});
```

  </TabItem>
  <TabItem value="python" label="Python">

```python title="Retry Attempts" showLineNumbers {5}
from statuscake import Client, credentials

client = Client(
    credentials.Bearer("my-api-token"),
    max_retries=3,
)
```

  </TabItem>
  <TabItem value="ruby" label="Ruby">

```ruby title="Retry Attempts" showLineNumbers {5}
require 'statuscake'

client = StatusCake::Client.new(
  api_token,
  max_retries: 3,
)
```

  </TabItem>
</Tabs>

The SDKs retry a request when the connection fails, or when the API answers
`429` because the account has been [ratelimited](/guides/api/ratelimiting). They
do not retry other errors: a `4xx` means the request needs to change, and a
`5xx` is returned to you to decide on. A retry waits for the period given by the
backoff strategy, and stops waiting if the request is cancelled. A request that
fails to connect on every attempt is reported as a retries exceeded error, see
[Error Handling](/guides/sdks/errors).

:::info

The maximum is of *retries*, so a maximum of 3 allows a request to be sent up to
four times.

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
it. In JavaScript, Python and Ruby this is a maximum of zero retries.

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
  <TabItem value="javascript" label="JavaScript">

```typescript title="Disable Retries" showLineNumbers {5}
import { Client, credentials } from '@statuscake/statuscake-js';

const client = new Client({
  credentials: new credentials.Bearer('my-api-token'),
  maxRetries: 0,
});
```

  </TabItem>
  <TabItem value="python" label="Python">

```python title="Disable Retries" showLineNumbers {5}
from statuscake import Client, credentials

client = Client(
    credentials.Bearer("my-api-token"),
    max_retries=0,
)
```

  </TabItem>
  <TabItem value="ruby" label="Ruby">

```ruby title="Disable Retries" showLineNumbers {5}
require 'statuscake'

client = StatusCake::Client.new(
  api_token,
  max_retries: 0,
)
```

  </TabItem>
</Tabs>

## Throttling

Retrying recovers from hitting the ratelimit, but it is better not to hit it.
The SDKs do not limit how fast you send requests unless you ask them to, so a
program that makes many of them, such as one that reads the history of every
check, should limit itself to a little under the API's burst limit of 5 requests
per second. See [Ratelimiting](/guides/api/ratelimiting).

A limiter is anything that can wait until a request is allowed to be sent. The
limiter is waited on before every attempt to send a request, including retries,
and a limiter that fails prevents the request from being sent.

<Tabs groupId="languages">
  <TabItem value="go" label="Go">

The `throttle` package provides an `http.RoundTripper` that spaces out requests
using one or more limiters. A limiter is any type with a `Wait(context.Context)
error` method, such as a `rate.Limiter` from
[golang.org/x/time/rate](https://pkg.go.dev/golang.org/x/time/rate).

```go title="Limit requests to 4 per second" showLineNumbers {4-6,14-19,24}
package main

import (
  "net/http"

  "golang.org/x/time/rate"

  "github.com/StatusCakeDev/statuscake-go"
  "github.com/StatusCakeDev/statuscake-go/credentials"
  "github.com/StatusCakeDev/statuscake-go/throttle"
)

func main() {
  // Allow a burst of 4 requests, refilling at 4 requests per second.
  limiter := rate.NewLimiter(rate.Limit(4), 4)

  httpClient := &http.Client{
    Transport: throttle.NewWithDefaultTransport(limiter),
  }

  bearer := credentials.NewBearerWithStaticToken("my-api-token")
  client := statuscake.NewClient(
    statuscake.WithRequestCredentials(bearer),
    statuscake.WithHTTPClient(httpClient),
  )
  _ = client
}
```

`throttle.New` wraps a transport of your choosing, and takes any number of
limiters which must all be satisfied. `throttle.LimiterFunc` adapts a function to
a limiter. Waiting stops if the request's context is cancelled.

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```typescript title="Limit requests to 4 per second" showLineNumbers {1,5}
import { Client, credentials, throttle } from '@statuscake/statuscake-js';

const client = new Client({
  credentials: new credentials.Bearer('my-api-token'),
  limiter: new throttle.TokenBucket({ rate: 4, burst: 4 }),
});
```

`throttle.TokenBucket` allows `rate` requests per second with bursts of up to
`burst`, and can be shared safely between concurrent requests. Anything with a
`wait(signal?: AbortSignal): Promise<void>` method, or a plain async function,
can be used as a limiter, and `throttle.Group` combines several limiters which
must all be satisfied.

  </TabItem>
  <TabItem value="python" label="Python">

```python title="Limit requests to 4 per second" showLineNumbers {1,5}
from statuscake import Client, credentials, throttle

client = Client(
    credentials.Bearer("my-api-token"),
    limiter=throttle.TokenBucket(rate=4, burst=4),
)
```

`throttle.TokenBucket` allows `rate` requests per second with bursts of up to
`burst`, and can be shared safely between threads. Anything with a `wait()`
method, or a plain function, can be used as a limiter, and `throttle.Group`
combines several limiters which must all be satisfied.

  </TabItem>
  <TabItem value="ruby" label="Ruby">

```ruby title="Limit requests to 4 per second" showLineNumbers {5}
require 'statuscake'

client = StatusCake::Client.new(
  api_token,
  limiter: StatusCake::Throttle::TokenBucket.new(4, burst: 4),
)
```

`Throttle::TokenBucket` allows `rate` requests per second with bursts of up to
`burst`, and can be shared safely between threads. Anything with a `wait`
method, or a plain function, can be used as a limiter, and `Throttle::Group`
combines several limiters which must all be satisfied.

  </TabItem>
</Tabs>

## HTTP Client and Timeouts

The SDKs have no timeout unless you set one, so set one, or give each request a
deadline, from code that must not wait forever.

<Tabs groupId="languages">
  <TabItem value="go" label="Go">

`WithHTTPClient` is how you set a timeout, route requests through a proxy, trust
a private certificate authority or add tracing. Without it the SDK uses
`http.DefaultClient`, which has no timeout. Prefer to set one, or pass a context
with a deadline to each request.

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

`timeout` is the number of milliseconds each attempt may take, including reading
the response. Pass an `AbortSignal` as the second argument of a call to cancel it
yourself. To route requests through a proxy or add tracing, supply your own
`fetch` implementation:

```typescript title="Set a timeout" showLineNumbers
const client = new Client({
  credentials,
  timeout: 30_000,
  fetch: (input, init) => fetch(input, { ...init, dispatcher }),
});
```

  </TabItem>
  <TabItem value="python" label="Python">

`timeout` is the number of seconds each attempt may take. To route requests
through a proxy or trust a private certificate authority, pass a
`statuscake.Configuration`:

```python title="Set a timeout and a proxy" showLineNumbers
from statuscake import Client, Configuration

configuration = Configuration()
configuration.proxy = "http://proxy.example.com:3128"
configuration.ssl_ca_cert = "/etc/ssl/private-ca.pem"

client = Client(credentials, timeout=30, configuration=configuration)
```

  </TabItem>
  <TabItem value="ruby" label="Ruby">

`timeout` is the number of seconds each attempt may take, and by default the
`Net::HTTP` timeouts of 60 seconds apply. Requests honour the `https_proxy`
environment variable. To trust a private certificate authority, pass a
`StatusCake::Configuration`:

```ruby title="Set a timeout and trust a private CA" showLineNumbers {4,6}
require 'statuscake'

configuration = StatusCake::Configuration.new
configuration.ssl_ca_cert = '/etc/ssl/private-ca.pem'

client = StatusCake::Client.new(api_token, timeout: 30, configuration: configuration)
```

  </TabItem>
</Tabs>

## Headers and User Agent

Extra headers are added to every request. The user agent defaults to one that
identifies the SDK and its language version; add to it rather than replacing it,
so that StatusCake can see which clients are in use.

<Tabs groupId="languages">
  <TabItem value="go" label="Go">

```go title="Identify your application" showLineNumbers {3-4}
client := statuscake.NewClient(
  statuscake.WithRequestCredentials(bearer),
  statuscake.WithUserAgent("acme-deployer/1.4 statuscake-go"),
  statuscake.WithHeader("X-Request-Source", "deployer"),
)
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```typescript title="Identify your application" showLineNumbers {3-4}
const client = new Client({
  credentials,
  userAgent: 'acme-deployer/1.4 statuscake-js',
  headers: { 'X-Request-Source': 'deployer' },
});
```

Browsers do not allow scripts to set the user agent, so `userAgent` has no
effect there.

  </TabItem>
  <TabItem value="python" label="Python">

```python title="Identify your application" showLineNumbers {3-4}
client = Client(
    credentials,
    user_agent="acme-deployer/1.4 statuscake-py",
    headers={"X-Request-Source": "deployer"},
)
```

  </TabItem>
  <TabItem value="ruby" label="Ruby">

```ruby title="Identify your application" showLineNumbers {3-4}
client = StatusCake::Client.new(
  api_token,
  user_agent: 'acme-deployer/1.4 statuscake-rb',
  headers: { 'X-Request-Source' => 'deployer' },
)
```

  </TabItem>
</Tabs>

## Debugging

Printing every outgoing request is the quickest way to see exactly what is being
sent.

<Tabs groupId="languages">
  <TabItem value="go" label="Go">

`WithDebug` prints every outgoing request to the standard logger.

```go title="Print each request" showLineNumbers {3}
client := statuscake.NewClient(
  statuscake.WithRequestCredentials(bearer),
  statuscake.WithDebug(),
)
```

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

The JavaScript SDK has no debug switch. Add a middleware, which runs around every
attempt to send a request.

```typescript title="Print each request" showLineNumbers {3-8}
const client = new Client({
  credentials,
  middleware: [
    {
      async pre({ url, init }) {
        console.debug(init.method, url, init.body?.toString());
      },
    },
  ],
});
```

  </TabItem>
  <TabItem value="python" label="Python">

`debug` prints every request and response, and enables debug logging in the
`logging` module.

```python title="Print each request" showLineNumbers {3}
client = Client(
    credentials,
    debug=True,
)
```

  </TabItem>
  <TabItem value="ruby" label="Ruby">

`debug` logs every request and response to the logger of the configuration,
which writes to standard output unless you replace it. The `Authorization`
header is redacted but bodies are not.

```ruby title="Log each request" showLineNumbers {3}
client = StatusCake::Client.new(
  api_token,
  debug: true,
)
```

  </TabItem>
</Tabs>

:::warning

The output includes the `Authorization` header, and so your API token. Use it
locally, never in production, and never paste its output anywhere public.

:::

## Next Steps

Next learn about the different request retry backoff strategies the SDKs
support.
