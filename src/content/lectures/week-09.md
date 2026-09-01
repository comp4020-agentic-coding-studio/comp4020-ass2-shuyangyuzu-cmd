---
title: What does cancellation cost?
description:
  People who leave a queue before being served disappear from its
  wait-time records — this lecture asks what that does to every number the
  course has computed so far.
week: 9
date: 2027-04-19
teachers:
  - marisol-quaye
related:
  - sessions/week-09
---

Every average, median and outlier calculation so far has used one dataset:
tickets that were eventually served. This lecture asks about the tickets
that weren't — the people who took a number and left before it was called —
and what leaving them out does to everything measured before.

## Outline

- reneging: the specific term for leaving a queue before being served,
  distinct from never joining it at all
- survivorship bias applied to a queue: if you only measure the wait times
  of people who stayed, you are measuring the wait times of the people most
  willing to tolerate waiting — a systematically different group from
  everyone who arrived
- why cancellation looks like good news in the Office's own records (fewer
  people being served slowly) while being a sign the queue is failing the
  people it lost
- reconnecting to week 2: an average computed only over survivors is a
  second, quieter way an average can hide who a system is actually failing
- what it would take to notice reneging at all — the Office would need to
  count tickets issued, not just tickets served, and it currently doesn't

> **Office of Everything file — synthetic case material.** This semester's
> reported "average wait: 4 minutes" was computed from served tickets only.
> The ticket dispenser's own counter, checked separately, shows 15% more
> numbers issued than the service log shows served.

The Queue Lab asks you to work out what that 15% gap implies about the
Office's real average — and what it would take to measure it honestly.
