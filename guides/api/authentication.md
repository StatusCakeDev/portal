---
id: authentication
title: Authentication
description: Learn how to authentication with the StatusCake API
---

The StatusCake API uses a bearer authentication (also called token
authentication) [HTTP authentication
scheme](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication) that
involves security tokens called bearer tokens. The client must send this token
in the `Authorization` header when making requests to protected resources:

```bash title="Authenticated HTTP request"
Authorization: Bearer <token>
```

You can view and manage your API tokens from the [StatusCake account
panel](https://app.statuscake.com/User.php).

:::warning note

API tokens must be kept private. In the event that one is exposed a new one
should be generated.

:::

All API requests must be made over HTTPS. Calls made over plain HTTP will be
redirected to the secure endpoint. API requests without authentication will
fail, returning `401 Unauthorised` unless otherwise stated in the documentation
for the specific endpoint.

For example, to make an authenticated request for a list of uptime monitoring
checks, the following `curl` command may be issues:

```bash title="List uptime checks" {2}
curl "https://api.statuscake.com/v1/uptime" \
  -H "Authorization: Bearer <token>"
```

## Cross-Origin Resource Sharing

The StatusCake API features Cross-Origin Resource Sharing (CORS) implemented in
compliance with the W3C specification. This allows cross-domain communication
from the browser. All responses have a wildcard same-origin which makes them
completely public and accessible to everyone.

## Next Steps

Learn how to handle request ratelimiting.
