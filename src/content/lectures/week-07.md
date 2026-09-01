---
title: What can the system honestly promise?
description:
  Moving from choosing an ordering rule to deciding what a queue can
  truthfully tell someone about how long they will wait.
week: 7
date: 2027-04-05
teachers:
  - marisol-quaye
related:
  - sessions/week-07
---

The first six weeks measured a queue and chose how it orders people. This
lecture starts the course's third movement: once a system has a policy, what
is it allowed to say to the person currently waiting inside it?

## Outline

- a wait-time estimate is a claim about the future, made with information
  that is always incomplete — the honesty question is about what to do with
  that incompleteness, not how to eliminate it
- the Office's existing display ("estimated wait: 5 minutes", fixed,
  unchanging) as an example of a number that is easy to produce and almost
  never true
- what an honest estimate would need to account for: the policy now in use
  (from weeks 4–6), the current queue length, and whether an outlier
  (week 3) is currently being served
- a range or a confidence statement versus a single number: this course does
  not require you to build a working estimator, only to reason about what
  information any honest one would need
- what happens to trust in a system that is confidently wrong versus one
  that is honestly uncertain

> **Office of Everything file — synthetic case material.** The counter's
> "estimated wait: 5 minutes" sign has not been updated since it was
> installed. It reads 5 minutes during a two-person queue and during a
> forty-person queue alike.

This week's Queue Lab asks you to design what the sign should say instead —
not a working system, a specific, honest form of words the Office could
post given only the information it actually has.
