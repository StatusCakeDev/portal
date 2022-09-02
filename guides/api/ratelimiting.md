---
id: ratelimiting
title: Ratelimiting
description: Learn about how to handle ratelimits imposed by the API
---

Ratelimits are applied to the API to prevent any one client degrading the
overall system stability. StatusCake accounts without a subscription, or those
on a free plan, can make a maximum of 60 requests per minute (rpm). Accounts
with a paid subscription have no such limit. However all accounts, free or
otherwise, are subject to a burst limit of 5 requests per second (rps).

Requests are associated with the account owning the given bearer token,
regardless of which token was used. This means that all API clients accessing
resources belonging to the same account share the same ratelimit quota.

When the ratelimit quota is exceeded all future requests will return an HTTP
`429` status code until the ratelimit window is reset.

## Response Headers

There are 3 HTTP response headers describing the state of the current
ratelimits in effect. These are as follows:

- `x-ratelimit-limit`
- `x-ratelimit-remaining`
- `x-ratelimit-reset`

Each response will be returned with these headers - an example request may
look like the following:

```bash title="Example response"
HTTP/2 200
...
x-ratelimit-limit: 5, 60;w=60, 5;w=1
x-ratelimit-remaining: 4
x-ratelimit-reset: 1
```

The response may be understood from the following sections.

### x-ratelimit-limit

This response header describe the ratelimit being applied to the request. In
the example above we can see the value of this header is `5, 60;w=60, 5;w=1`.
What this is telling us is that:

- The first 5 indicates what ratelimit is currently being applied - that of 5
  rps,
- `60;w=60` indicates there is a 60 request per 60 seconds limit in effect,
- `5;w=1` indicates there is a 5 request per second limit in effect.

### x-ratelimit-remaining

This response header states how many more requests may be made before the
ratelimit has been reached. When this number returns 0 it indicates that all
subsequent requests will be limited and that the API will return an HTTP status
code of `429` until the ratelimit window is reset.

Because users operating from accounts without a subscription are limited by
both a 5 rps ratelimit and a 60 rpm ratelimit it is difficult to determine how
many more request can be made within the current minute as this HTTP response
header only returns information regarding the 5 rps ratelimit (because it take
higher priority). Therefore it is imperative that all applications consuming
the StatusCake API keep track of the number of calls being made. This may be
accomplished with some sort of debounce functionality. However it will be
evident when the 60 rpm ratelimit has been reached because:

- The HTTP status code returned from a request will be `429`,
- More accurately the `x-ratelimit-limit` header will return `60, 60;w=60,
  5;w=1` - the first `60` indicating the ratelimit that has been reached.

### x-ratelimit-reset

This response header displays the time remaining, in seconds, until the
ratelimint currently being enforced is no longer in effect. This header is most
useful for applying a client side ratelimiting strategy.

## Next Steps

Learn how to handle API errors appropriately.
