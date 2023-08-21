---
id: errors
title: Errors
description: Learn how handle API errors
---

The StatusCake API uses conventional HTTP response codes to indicate the success
or failure of an API request. In general: Codes in the `2xx` range indicate
success; codes in the `4xx` range indicate a request that failed given the
information provided (e.g. a required parameter was omitted or malformed); and
codes in the `5xx` range indicate an error with StatusCake servers.

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

## Next Steps

Learn how to handle input parameters and avoid some common pitfalls when
creating monitoring resources.
