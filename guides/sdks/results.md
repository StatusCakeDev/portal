---
id: results
title: Reading Results
description: Learn how to read the history, periods and alerts a check has recorded
---

Checks keep a record of what has happened to them. This guide shows how to read
it with the Go SDK, and assumes a `client` and `ctx` as created in
[Authentication](/guides/sdks/authentication).

There are three records for an uptime check, each answering a different
question:

| Method | Answers |
| --- | --- |
| `ListUptimeTestHistory` | What did each individual test see? |
| `ListUptimeTestPeriods` | When was the check up, and when was it down? |
| `ListUptimeTestAlerts` | Who was told, and when? |

Pagespeed checks record their measurements with `ListPagespeedTestHistory`.

## History

Every time a check runs from a location the result is recorded: when it ran,
where from, what status code the target answered with and how long it took, in
milliseconds.

```go title="Recent tests of a check" showLineNumbers
res, err := client.ListUptimeTestHistory(ctx, id).
  Limit(50).
  Execute()
if err != nil {
  return err
}

for _, result := range res.Data {
  var took int64
  if result.Performance != nil {
    took = *result.Performance
  }

  fmt.Println(result.Created.Format(time.RFC3339), *result.Location, took, "ms")
}
```

Several fields are pointers because they are absent when the target did not
answer at all. Check them before dereferencing.

## Periods

History is detailed, but it is a poor way to answer "how long was it down?". For
that, read periods, each of which is a stretch of time during which the check had
one status.

```go title="Downtime over the last week" showLineNumbers
week := time.Now().AddDate(0, 0, -7)

res, err := client.ListUptimeTestPeriods(ctx, id).
  After(week.Unix()).
  Execute()
if err != nil {
  return err
}

var down time.Duration
for _, period := range res.Data {
  if period.Status == statuscake.UptimeTestStatusDown && period.Duration != nil {
    down += time.Duration(*period.Duration) * time.Millisecond
  }
}

fmt.Println("down for", down)
```

A period's `Duration` is in milliseconds. A period that is still going on has no
`Ended` time.

:::caution

Periods are selected by when they began. A period that began before `After` but
was still going on at that time is not returned, so the total above can be a
little short if the check was already down when the week began. To be exact, keep
reading back until you reach a period that began at or before the start of your
window, and clip it to the window.

:::

## Alerts

Alerts are the notifications that were sent when a check changed status.

```go title="Alerts in the last day" showLineNumbers
day := time.Now().Add(-24 * time.Hour)

res, err := client.ListUptimeTestAlerts(ctx, id).
  After(day.Unix()).
  Execute()
if err != nil {
  return err
}

for _, alert := range res.Data {
  fmt.Println(alert.ID, alert.Status, alert.StatusCode)
}
```

## Pagespeed History

A pagespeed check records the load time in milliseconds, the size of the page in
kilobytes and the number of requests it made.

```go title="Pagespeed measurements" showLineNumbers
res, err := client.ListPagespeedTestHistory(ctx, id).
  Limit(30).
  Execute()
if err != nil {
  return err
}

for _, result := range res.Data {
  fmt.Printf("%s %dms %.0fkb %d requests\n",
    result.Created.Format(time.RFC3339), result.Loadtime, result.Filesize, result.Requests)
}
```

## Choosing a Window

Each of these methods takes `Limit`, `Before` and `After`. `Before` and `After`
are Unix timestamps in seconds, which is what `time.Time.Unix` returns. Results
are newest first. See [Pagination](/guides/sdks/pagination) for reading further
back than a single response.

## Next Steps

Learn how to read everything in a large list with [pagination](/guides/sdks/pagination).
