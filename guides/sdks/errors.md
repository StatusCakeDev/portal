---
id: errors
title: Error Handling
description: Learn how to tell a failed request from an invalid one with the SDKs
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Every request can fail, and the right response depends on why. This guide shows
how the Go, JavaScript, Python and Ruby SDKs report errors and what to do about each.

## What an Error Looks Like

When the API rejected the request, the error carries the HTTP status, the
message the API gave and, for validation failures, the parameters that were
wrong. A helper returns those parameters and their problems, and is safe to call
on any error.

<Tabs groupId="languages">
  <TabItem value="go" label="Go">

`Execute` returns an `error`. When the API rejected the request, the error is
a `statuscake.APIError`.

```go title="Report the parameters that were wrong" showLineNumbers
_, err := client.CreateUptimeTest(ctx).Name("").Execute()
if err != nil {
  fmt.Println(err)

  for parameter, problems := range statuscake.Errors(err) {
    fmt.Println(parameter, problems)
  }
}
```

`statuscake.Errors` returns the map of parameter names to problems, or an empty
map if the error did not come from the API.

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

A call rejects with a `ResponseError`, which exposes the `status` of the response
and the decoded `data` of its body.

```typescript title="Report the parameters that were wrong" showLineNumbers
import { ResponseError, validationErrors } from '@statuscake/statuscake-js';

try {
  await client.uptime.createUptimeTest({ name: '', testType: 'HTTP', websiteUrl: 'https://www.statuscake.com', checkRate: 300 });
} catch (err) {
  if (err instanceof ResponseError) {
    for (const [parameter, problems] of Object.entries(validationErrors(err))) {
      console.log(parameter, problems);
    }
  }
}
```

`validationErrors` returns an object of parameter names to problems, or an empty
object if the error did not come from the API.

  </TabItem>
  <TabItem value="python" label="Python">

A call raises an `ApiException`, which exposes the `status` of the response and
the decoded `data` of its body.

```python title="Report the parameters that were wrong" showLineNumbers
from statuscake import ApiException, validation_errors

try:
    client.uptime.create_uptime_test(name="", test_type="HTTP", website_url="https://www.statuscake.com", check_rate=300)
except ApiException as err:
    for parameter, problems in validation_errors(err).items():
        print(parameter, problems)
```

`validation_errors` returns a dictionary of parameter names to problems, or an
empty dictionary if the error did not come from the API.

  </TabItem>
  <TabItem value="ruby" label="Ruby">

A call raises a `StatusCake::ApiError`, which exposes the `code` of the
response and its `response_body`.

```ruby title="Report the parameters that were wrong" showLineNumbers {4}
begin
  client.uptime.create_uptime_test('', 'HTTP', 'https://www.statuscake.com', 300)
rescue StatusCake::ApiError => e
  StatusCake.validation_errors(e).each do |parameter, problems|
    puts "#{parameter}: #{problems.join(', ')}"
  end
end
```

`StatusCake.validation_errors` returns a hash of parameter names to problems, or
an empty hash if the error did not come from the API.

  </TabItem>
</Tabs>

## Errors Before a Request

Some errors never reach the API. A required parameter that was not set, such as
the website URL of an uptime check, is reported without making a request. These
are mistakes in your code, and are worth catching in tests.

- In Go, `Execute` returns an error.
- In JavaScript, the call rejects with a `RequiredError` naming the `field`.
- In Python, the call raises a `pydantic.ValidationError`, which also reports
  values of the wrong type.
- In Ruby, the call raises an `ArgumentError`.

## Errors That Are Not the API's

A request can fail because the network did, or because it was cancelled or its
deadline passed. These are not API errors.

<Tabs groupId="languages">
  <TabItem value="go" label="Go">

Use `errors.Is` to recognise them.

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

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

When every attempt fails to connect the call rejects with a
`RetriesExceededError`, whose `attempts` counts them and whose `cause` is the
last failure. With `maxRetries: 0` the failure is thrown as a `FetchError`
instead. A request that you cancel is rethrown as it is, and is never retried.

```typescript title="Tell a timeout from an API error" showLineNumbers
import { RetriesExceededError } from '@statuscake/statuscake-js';

const client = new Client({ credentials, timeout: 10_000 });

try {
  await client.uptime.listUptimeTests({});
} catch (err) {
  if (err instanceof RetriesExceededError) {
    // The network failed or the API took too long on every attempt.
  } else {
    throw err;
  }
}
```

Set `timeout`, or pass an `AbortSignal` to a call, from code that must not wait
forever. The timeout applies to each attempt.

  </TabItem>
  <TabItem value="python" label="Python">

When every attempt fails to connect the call raises `RetriesExceeded`, whose
`attempts` counts them and whose `__cause__` is the last failure. With
`max_retries=0` the underlying `urllib3` exception is raised instead.

```python title="Tell a timeout from an API error" showLineNumbers
from statuscake import Client, RetriesExceeded

client = Client(credentials, timeout=10)

try:
    client.uptime.list_uptime_tests()
except RetriesExceeded as err:
    # The network failed or the API took too long on every attempt.
    print(err.attempts, err.__cause__)
```

Set `timeout` on the client, or `_request_timeout` on a call, from code that must
not wait forever. The timeout applies to each attempt.

  </TabItem>
  <TabItem value="ruby" label="Ruby">

When every attempt fails to connect the call raises `StatusCake::RetriesExceeded`,
whose `attempts` counts them and whose `cause` is the last failure. With
`max_retries: 0` the underlying exception, for example `Errno::ECONNREFUSED`, is
raised instead.

```ruby title="Tell a timeout from an API error" showLineNumbers
client = StatusCake::Client.new(api_token, timeout: 10)

begin
  client.uptime.list_uptime_tests
rescue StatusCake::RetriesExceeded => e
  # The network failed or the API took too long on every attempt.
  puts e.attempts, e.cause
end
```

Set `timeout` on the client from code that must not wait forever. The timeout
applies to each attempt.

  </TabItem>
</Tabs>

## Deciding What to Do

An API error records the HTTP status of the response. Decide from the status.

<Tabs groupId="languages">
  <TabItem value="go" label="Go">

Use `errors.As`, which also finds an `APIError` that has been wrapped.

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

  </TabItem>
  <TabItem value="javascript" label="JavaScript">

```typescript title="Decide from the status" showLineNumbers
import { ResponseError } from '@statuscake/statuscake-js';

try {
  await client.uptime.getUptimeTest({ testId });
} catch (err) {
  if (!(err instanceof ResponseError)) {
    throw err;
  }
  switch (err.status) {
    case 404:
      // The check does not exist, perhaps because it was deleted.
      break;
    case 401:
      // The token is wrong or has been deleted.
      break;
    case 429:
      // The SDK retried and the account is still being ratelimited.
      break;
    default:
      throw err;
  }
}
```

  </TabItem>
  <TabItem value="python" label="Python">

```python title="Decide from the status" showLineNumbers
from statuscake import ApiException

try:
    client.uptime.get_uptime_test(test_id)
except ApiException as err:
    if err.status == 404:
        # The check does not exist, perhaps because it was deleted.
        ...
    elif err.status == 401:
        # The token is wrong or has been deleted.
        ...
    elif err.status == 429:
        # The SDK retried and the account is still being ratelimited.
        ...
    else:
        raise
```

  </TabItem>
  <TabItem value="ruby" label="Ruby">

```ruby title="Decide from the status" showLineNumbers
begin
  client.uptime.get_uptime_test(test_id)
rescue StatusCake::ApiError => e
  case e.code
  when 404
    # The check does not exist, perhaps because it was deleted.
  when 401
    # The token is wrong or has been deleted.
  when 429
    # The SDK retried and the account is still being ratelimited.
  else
    raise
  end
end
```

  </TabItem>
</Tabs>

| Situation | What it means | What to do |
| --- | --- | --- |
| Status is `401` | The token is missing, wrong or deleted. | Check the token. See [Authentication](/guides/sdks/authentication). |
| Status is `404` | The identifier does not exist. | Check the identifier. |
| Status is `429` | The SDK used all its retries and the API is still asking it to slow down. | Wait longer, lower your request rate or raise the retry count. See [Configuration](/guides/sdks/configuration). |
| Another `4xx`, with validation errors set | The request had invalid parameters. | Fix the parameters. Retrying will fail the same way. |
| `5xx` | A problem at StatusCake. | Retry after a wait. The SDK does not retry these for you. |
| Retries exceeded | The network failed on every attempt. | Check connectivity, then try again. |
| Cancellation or deadline | Your deadline or cancellation. | Decide whether to try again with more time. |

See the [API error guide](/guides/api/errors) for more on the status codes.

## Next Steps

Tune how the SDK behaves with [configuration](/guides/sdks/configuration).
