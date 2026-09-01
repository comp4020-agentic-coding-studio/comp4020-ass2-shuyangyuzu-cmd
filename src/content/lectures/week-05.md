---
title: Should the shortest task go first?
description:
  Shortest-job-first as the Office's proposed answer to last week's
  complaint, and the starvation risk it introduces in return.
week: 5
date: 2027-03-22
teachers:
  - marisol-quaye
related:
  - sessions/week-05
---

Last week's complaint asked why a two-minute request should wait behind a
twenty-minute one. Shortest job first (SJF) is the most direct answer: serve
whichever request takes the least time to complete, regardless of when it
arrived. This lecture takes that answer seriously, then asks what it breaks.

## Outline

- SJF as the mirror image of FCFS: it optimises for total time spent
  waiting, and in doing so drops arrival order as a consideration entirely
- why SJF lowers *average* wait for a fixed set of requests — the same
  mean-versus-distribution distinction from week 2, now applied to a policy
  rather than a measurement
- starvation: a request that is merely a little long, not extreme, can be
  pushed behind every shorter request that arrives after it, arriving early
  and still finishing last
- the missing information problem: SJF needs to know how long a request will
  take before serving it, and the Office of Everything usually can't know
  that in advance — a limit this course does not paper over
- the Office's proposed fix in response to last week's complaint, and the
  new group it would now leave waiting

> **Office of Everything file — synthetic case material.** A revised counter
> notice, drafted but not yet posted: "Quick enquiries under 2 minutes will
> be served next, ahead of longer matters, whenever the queue backs up."

The Queue Lab tests this exact draft policy against last week's proposed
rule and the log's original 20-minute case, to see whether the person with
the complicated dispute — currently the one person nobody has an answer for
— gets served at all.
