---
id: pagination
title: Pagination
description: Learn how to page through lists and limit them to a window of time
---

Endpoints that return a list never return everything at once. There are two
styles of list, and which one an endpoint uses depends on what it lists.

## Paged lists

Lists of resources, such as checks, contact groups and maintenance windows, are
divided into pages. Two query parameters control which page is returned.

| Parameter | Meaning |
| --- | --- |
| `page` | The page to return, starting at `1`. |
| `limit` | The number of results on each page. |

The `metadata` property of the response describes where you are:

```json title="Response metadata"
{
  "metadata": {
    "page": 1,
    "per_page": 25,
    "page_count": 4,
    "total_count": 87
  }
}
```

`page_count` is the number of pages at the current `limit`, and `total_count` is
the number of results across all of them. To read everything, request pages
until you have reached `page_count`:

```bash title="Read every uptime check" showLineNumbers
page=1
while true; do
  body=$(curl -s "https://api.statuscake.com/v1/uptime?page=$page&limit=100" \
    -H "Authorization: Bearer $STATUSCAKE_API_TOKEN")

  echo "$body" | jq -r '.data[].name'

  [ "$page" -ge "$(echo "$body" | jq '.metadata.page_count')" ] && break
  page=$((page + 1))
done
```

:::info

Requests count towards your [ratelimit](/guides/api/ratelimiting). Prefer a
larger `limit` to many small pages, and avoid listing in a tight loop if you
only need to check on one resource, which is what retrieving it by identifier is
for.

:::

### Filtering

Some lists can be filtered before they are paged. Uptime checks, for example,
accept `status` (`up` or `down`) and `tags`, and with `matchany` a check need
carry only one of the tags rather than all of them. Filters apply to the whole
list, so `total_count` reflects the filtered results.

```bash title="Uptime checks that are down and tagged production"
curl "https://api.statuscake.com/v1/uptime?status=down&tags=production" \
  -H "Authorization: Bearer $STATUSCAKE_API_TOKEN"
```

## Lists of records

What a check has recorded, which is its history, its periods of being up or down
and the alerts it has sent, can run to a very large number of entries. These
lists are ordered with the newest first and are limited to a window of time
instead of being divided into numbered pages.

| Parameter | Meaning |
| --- | --- |
| `limit` | The maximum number of results to return. |
| `before` | Only results before this time, as a Unix timestamp in seconds. |
| `after` | Only results after this time, as a Unix timestamp in seconds. |

```bash title="Downtime in the last 30 days"
since=$(date -d '30 days ago' +%s)

curl "https://api.statuscake.com/v1/uptime/123/periods?after=$since&limit=100" \
  -H "Authorization: Bearer $STATUSCAKE_API_TOKEN"
```

Narrowing the window is the best way to keep these responses small. Asking for
the last day of history for a check is far cheaper than asking for everything
and discarding most of it.

### Following the next link

When more results exist than the response holds, the response says where to find
them. The `links` property carries a `next` link whose `before` parameter is the
point to carry on from, and the link is left out of the last page.

```json title="Response" showLineNumbers
{
  "data": [],
  "links": {
    "self": "https://api.statuscake.com/v1/uptime/123/history?limit=100",
    "next": "https://api.statuscake.com/v1/uptime/123/history?limit=100&before=1792000000"
  }
}
```

The `data` list is shortened above. To read everything in a window, make the
request again with `before` set from the link, until a response arrives without
a `next` link:

```bash title="Read every result since a time" showLineNumbers
since=$(date -d '7 days ago' +%s)
before=$(date +%s)

while [ -n "$before" ]; do
  body=$(curl -s "https://api.statuscake.com/v1/uptime/123/history?after=$since&before=$before&limit=100" \
    -H "Authorization: Bearer $STATUSCAKE_API_TOKEN")

  echo "$body" | jq -c '.data[]'

  before=$(echo "$body" | jq -r '.links.next // empty' \
    | sed -n 's/.*[?&]before=\([0-9]*\).*/\1/p')
done
```

Always set `after` as well as `before`, so the loop has an end even when more
history exists than you need.

:::info

Periods are selected by when they began. A period that began before your `after`
time but was still going on at that time is not returned, so to find what was
happening at the start of a window, keep reading back until you have a period
that began at or before it.

:::

## Next Steps

Learn how input parameters are sent and some common pitfalls when creating
monitoring resources.
