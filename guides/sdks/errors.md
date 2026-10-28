---
id: errors
title: Error Handling
description: Learn how to tell a failed request from an invalid one with the Go SDK
---

Every request can fail, and the right response depends on why. This guide shows
how the Go SDK reports errors and what to do about each.

## What an Error Looks Like

`Execute` returns an `error`. When the API rejected the request, the error is
a `statuscake.APIError`, which carries the message the API gave and, for
validation failures, the parameters that were wrong.

```go title="Report the parameters that were wrong" showLineNumbers {3}
_, err := client.CreateUptimeTest(ctx).Name("").Execute()
if err != nil {
  fmt.Println(err)

  for parameter, problems := range statuscake.Errors(err) {
    fmt.Println(parameter, problems)
  }
}
```

`statuscake.Errors` returns the map of parameter names to problems, or an empty
map if the error did not come from the API. It is safe to call on any error.

## Errors Before a Request

Some errors never reach the API. A required parameter that was not set, such as
the `WebsiteURL` of an uptime check, is reported by `Execute` without making a
request. These are mistakes in your code, and are worth catching in tests.

## Errors That Are Not the API's

A request can fail because the network did, or because the context was cancelled
or its deadline passed. These are not `APIError`s. Use `errors.Is` to recognise
them.

```go title="Tell a timeout from an API error" showLineNumbers
ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
defer cancel()

_, err := client.ListUptimeTests(ctx).Execute()
switch {
case errors.Is(err, context.DeadlineExceeded):
  // The request took too long.
case err != nil:
  // Something else went wrong.
}
```

Always pass a context with a deadline from code that must not wait forever. The
SDK retries requests when the API asks it to slow down, and a deadline bounds
the time it will spend doing so.

## Deciding What to Do

An `APIError` records the HTTP status of the response in `Status`. Use
`errors.As`, which also finds an `APIError` that has been wrapped, and decide
from the status.

```go title="Decide from the status" showLineNumbers
_, err := client.GetUptimeTest(ctx, id).Execute()

var apiErr statuscake.APIError
switch {
case err == nil:
  // Carry on.
case errors.As(err, &apiErr) && apiErr.Status == http.StatusNotFound:
  // The check does not exist, perhaps because it was deleted.
case errors.As(err, &apiErr) && apiErr.Status == http.StatusUnauthorized:
  // The token is wrong or has been deleted.
case errors.As(err, &apiErr) && apiErr.Status == http.StatusTooManyRequests:
  // The SDK retried and the account is still being ratelimited.
default:
  return err
}
```

| Situation | What it means | What to do |
| --- | --- | --- |
| `Status` is `401` | The token is missing, wrong or deleted. | Check the token. See [Authentication](/guides/sdks/authentication). |
| `Status` is `404` | The identifier does not exist. | Check the identifier. |
| `Status` is `429` | The SDK used all its retries and the API is still asking it to slow down. | Wait longer, lower your request rate or raise the retry count. See [Configuration](/guides/sdks/configuration). |
| Another `4xx`, with `Errors(err)` set | The request had invalid parameters. | Fix the parameters. Retrying will fail the same way. |
| `5xx` | A problem at StatusCake. | Retry after a wait. The SDK does not retry these for you. |
| Message beginning `retries exceeded` | The network failed on every attempt. | Check connectivity, then try again. |
| Context error | Your deadline or cancellation. | Decide whether to try again with more time. |

See the [API error guide](/guides/api/errors) for more on the status codes.

## Next Steps

Tune how the SDK behaves with [configuration](/guides/sdks/configuration).
