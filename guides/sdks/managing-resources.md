---
id: managing-resources
title: Managing Resources
description: Learn how to create, read, update and delete monitoring resources with the Go SDK
---

Every resource follows the same pattern: a method per operation, named for the
operation and the resource, that returns a request you add parameters to and
then send with `Execute`. This guide shows each resource in turn using the Go
SDK.

The examples assume a `client` and a `ctx` created as shown in
[Authentication](/guides/sdks/authentication), and leave out error handling
where it would repeat what has already been shown. See [Error
Handling](/guides/sdks/errors) before relying on any of them.

| Operation | Method | Returns |
| --- | --- | --- |
| Create | `CreateUptimeTest(ctx)` | The new identifier, in `Data.NewID`. |
| Retrieve | `GetUptimeTest(ctx, id)` | The resource, in `Data`. |
| Update | `UpdateUptimeTest(ctx, id)` | Only an error. |
| Delete | `DeleteUptimeTest(ctx, id)` | Only an error. |
| List | `ListUptimeTests(ctx)` | A page of resources, in `Data`. |

The methods for other resources replace `UptimeTest` with `PagespeedTest`,
`SslTest`, `HeartbeatTest`, `ContactGroup` or `MaintenanceWindow`. Lists are
plural, as in `ListContactGroups`.

## Contact Groups

A contact group is who gets told. Create these first, since checks refer to
them by identifier.

```go title="Create a contact group" showLineNumbers
res, err := client.CreateContactGroup(ctx).
  Name("Operations").
  EmailAddresses([]string{"ops@example.com"}).
  MobileNumbers([]string{"+441234567890"}).
  Execute()
if err != nil {
  return err
}

groupID := res.Data.NewID
```

Mobile numbers are given in international format. A group can also hold the
identifiers of integrations, such as a chat service, and a `PingURL` to request
when an alert is raised.

## Uptime Checks

An uptime check tests whether something answers. The `TestType` chooses how:

| Constant | Test |
| --- | --- |
| `UptimeTestTypeHTTP` | An HTTP request. |
| `UptimeTestTypeHEAD` | An HTTP `HEAD` request. |
| `UptimeTestTypeTCP` | A TCP connection to `Port`. |
| `UptimeTestTypeDNS` | A DNS lookup, compared with `DNSIPs`. |
| `UptimeTestTypePING` | An ICMP ping. |
| `UptimeTestTypeSMTP` | An SMTP connection. |
| `UptimeTestTypeSSH` | An SSH connection. |

`TestType`, `WebsiteURL`, `Name` and `CheckRate` are required. The check rate is
one of the constants `UptimeTestCheckRateThirtySeconds`,
`UptimeTestCheckRateOneMinute`, `UptimeTestCheckRateFiveMinutes`,
`UptimeTestCheckRateFifteenMinutes`, `UptimeTestCheckRateThirtyMinutes`,
`UptimeTestCheckRateOneHour` or `UptimeTestCheckRateOneDay`.

```go title="Create an uptime check" showLineNumbers
res, err := client.CreateUptimeTest(ctx).
  Name("Checkout").
  TestType(statuscake.UptimeTestTypeHTTP).
  WebsiteURL("https://www.example.com/checkout").
  CheckRate(statuscake.UptimeTestCheckRateFiveMinutes).
  ContactGroups([]string{groupID}).
  FollowRedirects(true).
  EnableSSLAlert(true).
  Regions([]string{"london", "paris"}).
  Tags([]string{"production", "payments"}).
  Execute()
if err != nil {
  return err
}
```

`Regions` takes location names, which you can list as shown in
[Locations](#locations). Checks of other types use other parameters, such as
`Port` for TCP and `DNSIPs` for DNS:

```go title="Create a TCP check and a DNS check" showLineNumbers
_, err := client.CreateUptimeTest(ctx).
  Name("Database").
  TestType(statuscake.UptimeTestTypeTCP).
  WebsiteURL("db.example.com").
  Port(5432).
  CheckRate(statuscake.UptimeTestCheckRateOneMinute).
  Execute()

_, err = client.CreateUptimeTest(ctx).
  Name("Apex record").
  TestType(statuscake.UptimeTestTypeDNS).
  WebsiteURL("example.com").
  DNSIPs([]string{"192.0.2.1"}).
  DNSServer("8.8.8.8").
  CheckRate(statuscake.UptimeTestCheckRateFifteenMinutes).
  Execute()
```

### Updating

An update changes only the parameters you give it.

```go title="Pause a check" showLineNumbers
err := client.UpdateUptimeTest(ctx, id).
  Paused(true).
  Execute()
```

To clear a list rather than leave it alone, pass it empty:

```go title="Remove all tags" showLineNumbers
err := client.UpdateUptimeTest(ctx, id).
  Tags([]string{}).
  Execute()
```

### Filtering a list

```go title="Checks that are down" showLineNumbers
res, err := client.ListUptimeTests(ctx).
  Status("down").
  Tags("production").
  Execute()
if err != nil {
  return err
}

for _, check := range res.Data {
  fmt.Println(check.ID, check.Name, check.Status)
}
```

`Tags` takes a comma-separated string, and a check must carry all of them unless
you also call `Matchany(true)`.

## Pagespeed Checks

A pagespeed check loads a page and records how long it took and how big it
was. Alerts are optional thresholds.

```go title="Create a pagespeed check" showLineNumbers
res, err := client.CreatePagespeedTest(ctx).
  Name("Landing page").
  WebsiteURL("https://www.example.com").
  CheckRate(statuscake.PagespeedTestCheckRateOneHour).
  Region(statuscake.PagespeedTestRegionUnitedKingdom).
  AlertSlower(3000).    // milliseconds
  AlertBigger(2048).    // kilobytes
  ContactGroups([]string{groupID}).
  Execute()
```

Regions are constants such as `PagespeedTestRegionAmericaEast` and
`PagespeedTestRegionGermany`.

## SSL Checks

An SSL check watches a certificate and alerts before it expires.

```go title="Create an SSL check" showLineNumbers
res, err := client.CreateSslTest(ctx).
  WebsiteURL("https://www.example.com").
  CheckRate(statuscake.SSLTestCheckRateOneDay).
  AlertAt([]int32{7, 14, 30}).   // days before expiry
  AlertExpiry(true).
  AlertBroken(true).
  AlertMixed(true).
  ContactGroups([]string{groupID}).
  Execute()
```

## Heartbeat Checks

A heartbeat check inverts the others: rather than StatusCake asking your service
whether it is alive, your job tells StatusCake that it ran. If a ping does not
arrive within `Period` seconds, the check is down.

```go title="Create a heartbeat check" showLineNumbers
res, err := client.CreateHeartbeatTest(ctx).
  Name("Nightly backup").
  Period(90000).    // 25 hours
  ContactGroups([]string{groupID}).
  Execute()
if err != nil {
  return err
}

check, err := client.GetHeartbeatTest(ctx, res.Data.NewID).Execute()
if err != nil {
  return err
}

fmt.Println("ping", check.Data.WebsiteURL, "at the end of the job")
```

The check's `WebsiteURL` is the address your job requests to report in.

## Maintenance Windows

A maintenance window silences alerts while you work. It names the checks it
covers, selects them with tags, or both.

```go title="Create a weekly maintenance window" showLineNumbers
start := time.Date(2026, time.November, 7, 22, 0, 0, 0, time.UTC)

res, err := client.CreateMaintenanceWindow(ctx).
  Name("Weekly patching").
  Start(start).
  End(start.Add(2 * time.Hour)).
  Timezone("Europe/London").
  RepeatInterval(statuscake.MaintenanceWindowRepeatIntervalWeekly).
  Tags([]string{"production"}).
  Execute()
```

The repeat interval is one of `Never`, `Daily`, `Weekly`, `Biweekly` or
`Monthly`. List windows by state to see what is silenced right now:

```go title="Active maintenance windows" showLineNumbers
res, err := client.ListMaintenanceWindows(ctx).
  State("active").
  Execute()
```

## Locations

Checks run from locations, and the values to put in `Regions` come from here.

```go title="List uptime locations" showLineNumbers
res, err := client.ListUptimeMonitoringLocations(ctx).
  RegionCode("GBR").
  Execute()
if err != nil {
  return err
}

for _, location := range res.Data {
  fmt.Println(location.Region, location.Description)
}
```

`ListPagespeedMonitoringLocations` does the same for pagespeed checks.

## Cleaning Up

Delete in the reverse order to creation, so that nothing refers to a resource
that is gone.

```go title="Delete" showLineNumbers
_ = client.DeleteMaintenanceWindow(ctx, windowID).Execute()
_ = client.DeleteUptimeTest(ctx, checkID).Execute()
_ = client.DeleteContactGroup(ctx, groupID).Execute()
```

## Next Steps

Learn how to read the [results](/guides/sdks/results) a check has recorded.
