---
title: Why does one slow case change the queue?
description:
  How a single unusually long case reshapes everyone else's wait while it is
  happening, not only the average calculated afterwards.
week: 3
date: 2027-03-08
teachers:
  - renata-voss
related:
  - sessions/week-03
---

Week 2 showed that one long ticket pulls the average away from what most
people experience. This lecture asks a different question: what does a
long service do to the *other people in line* while it is happening,
before anyone has computed an average at all?

## Outline

- a long wait does not tell us how long service took: waiting ends when
  service starts; service duration ends when that service completes
- queueing time versus service time: a slow case lengthens the queue for
  everyone waiting behind it, in a way a same-length gap between arrivals
  does not
- why "it only happened once" undersells the cost: in this week's declared
  log, shortening the first service from 26 to 2 minutes reduces each of
  the nine later waits by 24 minutes, or 216 waiting minutes in total
- separating description from explanation: naming that an outlier occurred is
  not the same as explaining why, and this course keeps those two claims
  apart
- the Queue Autopsy uses Part A's omission sensitivity on recorded waits;
  Part B's service-time intervention prepares later policy comparisons

> **Office of Everything file — synthetic case material.** Monday of week
> 3, a separate incident log: a dispute starts service immediately and
> occupies the counter for 26 minutes. This is not the ticket that waited
> 26 minutes in week 2. Nine later arrivals wait behind it. The counter has
> one queue and one server.

The Queue Lab separates two questions: how much does omitting one recorded
wait change a summary, and how would shortening a service change later
waits? Only the first is required in the Queue Autopsy. A counterfactual
about your real system would need extra arrival and service evidence.
