---
id: authentication
title: Authentication
description: Learn how to authenticate with the StatusCake API
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

:::warning

API tokens must be kept private. In the event that one is exposed a new one
should be generated.

:::

All API requests must be made over HTTPS. Calls made over plain HTTP will be
redirected to the secure endpoint. API requests without authentication will
fail, returning `401 Unauthorised` unless otherwise stated in the documentation
for the specific endpoint.

For example, to make an authenticated request for a list of uptime monitoring
checks, the following `curl` command may be issued:

```bash title="List uptime checks" {2}
curl "https://api.statuscake.com/v1/uptime" \
  -H "Authorization: Bearer <token>"
```

## Keeping tokens out of your code

A token is a credential for your whole account, so it should never be written
into source code, a Dockerfile or a command that is saved in shell history.
Instead, supply it from the environment of the process that needs it.

```bash title="Supply the token from the environment" {1,4}
export STATUSCAKE_API_TOKEN="<token>"

curl "https://api.statuscake.com/v1/uptime" \
  -H "Authorization: Bearer $STATUSCAKE_API_TOKEN"
```

`STATUSCAKE_API_TOKEN` is also the variable that the
[SDKs](/guides/sdks/authentication), and the [Terraform
provider](/guides/terraform/authentication) read, so a single variable can serve
every tool in a pipeline.

In a continuous integration system, store the token as a secret and expose it to
the steps that need it, rather than to the whole job.

## Rotating a token

To replace a token without interrupting anything that uses it:

1. Create a new token in the account panel.
2. Update each place that uses the old token, such as pipeline secrets, to use
   the new one.
3. Check that each of those places still works.
4. Delete the old token.

If you suspect a token has been exposed, skip straight to deleting it. Anything
still using it will begin to receive `401` responses, which is the signal that
it needs the new token.

## Cross-Origin Resource Sharing

The StatusCake API features Cross-Origin Resource Sharing (CORS) implemented in
compliance with the W3C specification. This allows cross-domain communication
from the browser. All responses have a wildcard same-origin which makes them
completely public and accessible to everyone.

:::caution

Because requests from a browser are permitted, it can be tempting to call the
API from front-end code. Do not do this with a real token: anything sent to a
browser can be read by whoever uses it. Make the request from a server you
control instead.

:::

## Next Steps

Learn how the API is paginated.
