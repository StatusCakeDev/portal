---
id: parameters
title: Parameters
description: Learn how to send input parameters to the StatusCake API
---

Some StatusCake API endpoints, namely those that create and update monitoring
resources, accept input parameters. This document outlines the considerations
that must be made when interacting with these endpoints.

## Content Type

Request bodies must be URL encoded. Set the `Content-Type` request header to
`application/x-www-form-urlencoded`; the API does not accept JSON request
bodies. Responses are always JSON, so it is good practice to send
`Accept: application/json` as well.

```bash title="Create an uptime check" showLineNumbers
curl -X POST "https://api.statuscake.com/v1/uptime" \
  -H "Authorization: Bearer <token>" \
  -H "Accept: application/json" \
  -d "name=statuscake.com" \
  -d "test_type=HTTP" \
  -d "website_url=https://www.statuscake.com" \
  -d "check_rate=300"
```

`curl` sends `-d` data as `application/x-www-form-urlencoded` by default, and
URL encodes nothing for you. If a value contains characters such as `&`, `=` or
spaces, use `--data-urlencode` instead.

```bash title="Encode a value" {3}
curl -X POST "https://api.statuscake.com/v1/uptime" \
  -H "Authorization: Bearer <token>" \
  --data-urlencode "name=Checkout & payments" \
  -d "test_type=HTTP" \
  -d "website_url=https://www.example.com/checkout" \
  -d "check_rate=300"
```

The response contains the identifier of the new check:

```json title="Response"
{
  "data": {
    "new_id": "123456"
  }
}
```

## Required Parameters

Each endpoint documents the parameters it needs in the [API reference](/api).
For an uptime check these are `name`, `test_type`, `website_url` and
`check_rate`, and a request that omits one fails with a [validation
error](/guides/api/errors) naming it. Everything else is optional and is given
a sensible default.

## Updating

Updating a resource is a `PUT` to the resource's path. Send only the parameters
you want to change; those you leave out keep their current values.

```bash title="Pause an uptime check"
curl -X PUT "https://api.statuscake.com/v1/uptime/123456" \
  -H "Authorization: Bearer <token>" \
  -d "paused=true"
```

## Booleans

Boolean parameters are sent as the text `true` or `false`.

## Arrays

Any API endpoint that accepts an array as input must be formatted as follows:

```bash title="Array Syntax"
field[]=value1&field[]=value2&...
```

For example if creating an uptime check with tags, the tags must be given as
separate parameters.

```bash title="Uptime Check with Tags" {3}
curl -X POST "https://api.statuscake.com/v1/uptime" \
  -H "Authorization: Bearer <token>" \
  -d "...&tags[]=testing&tags[]=sales"
```

:::info

Setting an array of values to be empty can be achieved either by passing a
single array item without a value, i.e. `tags[]=`, or by specifying the field
name without a value, i.e. `tags=`.

:::

The distinction matters when updating. Leaving a field out of an update leaves
it unchanged, whereas sending it empty clears it. To remove every tag from a
check, send the empty value:

```bash title="Remove all tags"
curl -X PUT "https://api.statuscake.com/v1/uptime/123456" \
  -H "Authorization: Bearer <token>" \
  -d "tags[]="
```

## Next Steps

Learn how the API limits the rate of requests.
