---
title: Recompute with and without the outlier
description:
  Rehearse the Queue Autopsy's core technique on the Office of Everything's
  data, then apply it to your own observed system before writing it up.
week: 3
date: 2027-03-08
teachers:
  - renata-voss
spec:
  - you have recomputed the week-2 Office of Everything numbers twice, once
    with the 26-minute ticket included and once with it removed, and can
    state the size of the difference
  - you have identified, from your own observed system, one moment (an
    outlier or a plausible one) worth treating the same way
  - you have a short written note distinguishing what you observed about
    that moment from what you are inferring caused it
---

This lab has one method and two datasets. Learn the method on the Office of
Everything's numbers, where the underlying cause is already known, then turn
it on your own system, where it usually isn't.

## Before the lab

Bring your week-1 and week-2 notes on your own system. If you haven't yet
seen anything resembling an unusually long case, bring your best candidate —
even an ordinary-looking wait that took noticeably longer than the others
around it.

## In the lab

> **Office of Everything file — synthetic case material.** Full log for the
> printer-credit dispute ticket and the nine tickets behind it: arrivals at
> minutes 0, 1, 3, 4, 5, 7, 8, 9, 11, 12; the disputed ticket (arrival 0) is
> served from minute 0 to minute 26; the remaining nine are served back to
> back afterwards, 2 minutes each.

Compute the mean wait for the nine tickets behind the dispute, given they
could not be served until it finished. Then recompute what their mean wait
would have been if the disputed ticket had taken its usual 2 minutes instead
of 26. Write down the difference in minutes — this is the ripple effect, and
it is larger than the 26-minute ticket's own delay might suggest.

Now do the same exercise on your own system's outlier or near-outlier. You
will not have arrival-and-service data as clean as the Office's file; say
plainly where your numbers are a firm observation and where they are your
best estimate.

## Afterwards

You now have the technique the Queue Autopsy asks for: observation notes
(week 1), a wait-time calculation that separates typical from atypical cases
(weeks 2–3), and a written account of what is measured versus assumed. The
Queue Autopsy is due at the end of this week and asks you to bring these
three things together for the one system you have been watching all along.
