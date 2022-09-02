---
id: parameters
title: Parameters
description: Learn about some of the StatusCake API parameters
---

Some StatusCake API endpoints, namely those that create and update monitoring
resources, accept input parameters. This document outline the considerations
that must be made when interacting with these endpoints.

## Accept

The `Accept` request HTTP header indicates which content types, expressed as
MIME types, the client is able to understand. The StatusCake API is only
capable of consuming data that has been URL encoded, meaning that the only
viable `Accept` header be `application/x-www-form-urlencoded`.

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
