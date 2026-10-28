---
id: introduction
title: API Introduction
description: Overview of the StatusCake API
---

The StatusCake API is organised around the features that we offer, with each
feature providing a set of endpoints to perform operations on resources
associated with your account. It is the foundation for everything else on this
portal: the [SDKs](/guides/sdks/introduction), and the [Terraform
provider](/guides/terraform/introduction) all make requests to it on your
behalf.

If you only need to manage monitoring from a script, a pipeline or a
configuration repository, one of those tools is usually quicker than calling the
API directly. Use the API directly when you are building an integration in a
language we do not provide an SDK for, or when you need complete control over
the requests that are made.

## Base URL

All requests are made to the following base URL. The version is part of the
path, so a change that is not backwards compatible will be released under a new
version rather than altering the one you are using.

```text title="Base URL"
https://api.statuscake.com/v1
```

Requests must be made over HTTPS. Requests made over plain HTTP are redirected
to the secure endpoint.

## Making a request

Every request must carry an API token. You can view and manage your API tokens
from the [StatusCake account panel](https://app.statuscake.com/User.php).
[Authentication](/guides/api/authentication) describes this in full; for now,
the following command lists the uptime checks in your account.

```bash title="List uptime checks"
curl "https://api.statuscake.com/v1/uptime" \
  -H "Authorization: Bearer <token>"
```

A successful response is a JSON document. Endpoints that return a list wrap it
in a `data` property alongside a `metadata` property that describes the page of
results:

```json title="Response" showLineNumbers
{
  "data": [
    {
      "id": "123",
      "name": "statuscake.com",
      "test_type": "HTTP",
      "status": "up"
    }
  ],
  "metadata": {
    "page": 1,
    "per_page": 25,
    "page_count": 1,
    "total_count": 1
  }
}
```

:::info

The response above is abbreviated. Each resource returns more properties than
are shown here, as described in the [API reference](/api).

:::

Endpoints that return a single resource wrap it in `data` without `metadata`.
Requests that create a resource respond with the identifier of the new resource
in `data.new_id`, and requests that update or delete one return no body.

## Conventions

A few conventions hold across the whole API, and each is covered in more detail
in its own guide:

- Request bodies are sent as `application/x-www-form-urlencoded`, not JSON. See
  [Parameters](/guides/api/parameters).
- Lists are paginated, and some can be limited to a window of time. See
  [Pagination](/guides/api/pagination).
- Requests are ratelimited per account. See
  [Ratelimiting](/guides/api/ratelimiting).
- Failures use conventional HTTP status codes together with a body describing
  what was wrong. See [Errors](/guides/api/errors).

## Next Steps

Read about the [resources](/guides/api/resources) the API exposes and how they
relate to each other, then learn how to [authenticate](/guides/api/authentication).
Available endpoints along with their respective parameters and responses may be
found within the [API reference](/api).
