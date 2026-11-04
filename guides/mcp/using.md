---
id: using
title: Using the Server
description: Learn how to ask an AI assistant good questions about your monitoring
---

You ask in your own words; the assistant decides which [tools](/guides/mcp/tools)
to call. This page shows what works well, and how to check an answer.

## Where to start

Questions that start from the current state of your account need only one call:

> What is down right now?

> Which checks are paused?

> Do we have any SSL checks?

For a particular group of checks, say how you identify them. Tags are the
easiest, since the server can filter on them directly:

> Show me the checks tagged `production` that are not up.

For uptime percentages, say so, because they are slow for the API to work out and
the assistant leaves them out otherwise:

> What is the uptime percentage of our production checks?

The assistant then asks for them, ideally after narrowing to the checks you named.

## Investigating a failure

Investigations take several steps, and the assistant works through them for you.
Describe what you want to know, not how to find it:

> The checkout API alerted overnight. When did it go down, for how long, and what
> did the target answer?

To answer this the assistant lists the checks to find the checkout check, asks for
its incidents, then asks for the tests around the time of the incident. You will
see each tool call in most clients, and it is worth looking, since that is how you
see what the answer is based on.

Other questions in the same vein:

> How often has the payments check failed this month?

> Was the last incident on the login check slow before it failed, or did it fail
> suddenly?

> Which locations saw the homepage check fail?

## Explaining silence

When something looks broken but nobody was told, ask about maintenance windows:

> Why didn't anyone get an alert for the search outage at 14:00 yesterday?

> What is covered by a maintenance window right now?

A window covers a check by tag or by name, so the assistant can say which window
suppressed which check.

## Understanding alerting

> How many people are alerted by each contact group?

The server reports how many email addresses, mobile numbers and integrations a
group has, but not who they are. It can tell you that a group is empty, but not
who to add to it.

## Getting good answers

- **Name the check or tag.** The assistant has to find the check by listing
  them, and a name that matches several checks costs it extra steps.
- **Give a time window.** "Since 9am UTC" or "in the last week" lets the assistant
  restrict the history it asks for. Without one, it sees only the newest results.
- **Say which timezone you mean.** Results are in UTC. If your question says
  "yesterday evening", the assistant has to guess where.
- **Ask for the evidence.** "Show me the incidents you found" makes the
  assistant list what it saw, so you can check its summary against it.
- **Watch for truncation.** A listing is cut at 25 results unless the assistant
  asks for more, and at 100 whatever it asks. The tools tell it when this happens;
  if an answer sounds like it covers everything, ask whether the results were
  truncated.

## What it will not do

The server only reads. An assistant asked to pause a check, create an uptime
check or edit a maintenance window will say it cannot, though it may offer
instructions or a command for [cakectl](/guides/cli/introduction), the
[Terraform provider](/guides/terraform/introduction) or the
[API](/guides/api/introduction), which you can then review and run yourself.

## Next Steps

See the [configuration](/guides/mcp/configuration) options, or read about
[security](/guides/mcp/security).
