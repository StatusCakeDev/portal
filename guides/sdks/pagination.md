---
id: pagination
title: Pagination
description: Learn how to read every result of a large list with the Go SDK
---

Lists are never returned whole, so reading everything means asking for more than
one response. There are two kinds of list, as described in the [API
pagination guide](/guides/api/pagination). This guide shows how to read both
with the Go SDK, and assumes a `client` and `ctx` as created in
[Authentication](/guides/sdks/authentication).

## Paged Lists

Lists of resources take `Page` and `Limit`, and respond with the `Metadata`
needed to know when to stop.

```go title="Read every uptime check" showLineNumbers
var checks []statuscake.UptimeTestOverview

for page := int32(1); ; page++ {
  res, err := client.ListUptimeTests(ctx).
    Page(page).
    Limit(100).
    Execute()
  if err != nil {
    return err
  }

  checks = append(checks, res.Data...)

  if page >= res.Metadata.PageCount {
    break
  }
}
```

`Metadata.TotalCount` is the number of results across all pages, which is useful
for sizing a slice or reporting progress.

:::tip

Each page is a request that counts towards your
[ratelimit](/guides/api/ratelimiting). A larger `Limit` means fewer requests.

:::

## Lists of Records

History, periods and alerts are limited by time rather than numbered. When more
results exist than a response holds, it carries a `next` link in `Links`, and the
link's `before` parameter is the point to carry on from. The link is left out of
the last page.

```go title="Read a week of history" showLineNumbers
since := time.Now().AddDate(0, 0, -7)
before := time.Now().Unix()

var results []statuscake.UptimeTestHistoryResult

for {
  res, err := client.ListUptimeTestHistory(ctx, id).
    After(since.Unix()).
    Before(before).
    Limit(100).
    Execute()
  if err != nil {
    return err
  }

  results = append(results, res.Data...)

  next, ok := res.Links.AdditionalProperties["next"].(string)
  if !ok || next == "" {
    break
  }

  link, err := url.Parse(next)
  if err != nil {
    return err
  }

  cursor, err := strconv.ParseInt(link.Query().Get("before"), 10, 64)
  if err != nil || cursor >= before {
    break // The link did not move on; stop rather than loop forever.
  }
  before = cursor
}
```

Always set `After` as well as `Before`, so the loop has an end even if more
history exists than you need. Reading a week of history for many checks is a lot
of requests; consider whether [periods](/guides/sdks/results#periods) answer the
question with far fewer.

The same loop works for `ListUptimeTestPeriods`, `ListUptimeTestAlerts` and
`ListPagespeedTestHistory`. Note that periods are selected by when they began, so
a period that began before `After` but was still going on at that time is not
returned.

## Next Steps

Learn how to handle [errors](/guides/sdks/errors).
