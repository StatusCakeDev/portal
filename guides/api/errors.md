---
id: errors
title: Errors
description: Learn how to handle API errors
---

The StatusCake API uses conventional HTTP response codes to indicate the success
or failure of an API request. In general: Codes in the `2xx` range indicate
success; codes in the `4xx` range indicate a request that failed given the
information provided (e.g. a required parameter was omitted or malformed); and
codes in the `5xx` range indicate an error with StatusCake servers.

## Error Responses

A failed request has a JSON body that says what was wrong. The `message`
describes the failure as a whole. When the problem is with particular
parameters, `errors` lists each offending parameter together with what is wrong
with it.

```json title="Example validation error" showLineNumbers
{
  "message": "The request could not be processed",
  "errors": {
    "check_rate": [
      "must be one of 0, 30, 60, 300, 900, 1800, 3600, 86400"
    ]
  }
}
```

:::info

The response above is an illustration of the shape of an error. The text of
messages is intended for people and may change, so write code that depends on
the HTTP status code and the names of the parameters in `errors`, not on the
wording.

:::

## Status Codes

| Status | Meaning | What to do |
| --- | --- | --- |
| `2xx` | The request succeeded. | Carry on. |
| `401` | The token is missing, wrong or has been deleted. | Check the token. See [Authentication](/guides/api/authentication). |
| `404` | The resource does not exist. | Check the identifier. It may have been deleted. |
| `429` | The account has made too many requests. | Wait, then retry. See [Ratelimiting](/guides/api/ratelimiting). |
| Other `4xx` | The request was understood but cannot be carried out, usually because of a parameter. | Read `errors`, fix the request and send it again. Sending it unchanged will fail the same way. |
| `5xx` | Something went wrong at StatusCake. | Retry after a short wait. If it persists, contact support. |

## Handling Errors

Errors should be handled appropriately, depending upon the value of the HTTP
status code returned from the API. For example if we wanted to email a member of
the DevOps team when an uptime check is missing from our monitoring suite we
could write the following script:

```bash title="Alert on missing uptime check" showLineNumbers
status_code=$(
  curl -s https://api.statuscake.com/v1/uptime/123 \
    -H "Authorization: Bearer <token>" \
    --write-out %{http_code} \
    --output /dev/null
)

if [[ "$status_code" -eq 404 ]] ; then
  echo "Uptime check (ID: 123) does not exist" | mail -s "Missing uptime check" devops@example.com
else
  exit 0
fi
```

## Which Errors to Retry

Retrying only helps when the same request could succeed later.

- **Retry** `429` and `5xx` responses, and requests that failed without a
  response at all, such as a dropped connection. Wait a little longer between
  each attempt, and stop after a handful.
- **Do not retry** other `4xx` responses. The request itself needs to change.

Be careful retrying a request that creates something. If the connection drops
after the API has processed the request but before you receive the response, a
retry creates a second resource. Where it matters, list the resources afterwards
to check whether the first attempt succeeded.

The SDKs, and the Terraform provider can retry for you when the API asks a
client to slow down. See [SDK request retries](/guides/sdks/configuration).

## Next Steps

Read the [API reference](/api) for the endpoints, their parameters and their
responses.
