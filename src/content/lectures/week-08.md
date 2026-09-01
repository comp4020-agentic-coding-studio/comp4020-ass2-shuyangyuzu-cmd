---
title: When is a queue actually stuck?
description:
  Telling a slow queue apart from a stopped one, using only what a person
  waiting inside it could actually observe.
week: 8
date: 2027-04-12
teachers:
  - idris-fenn
related:
  - sessions/week-08
---

Week 7 asked what a queue can honestly say about how long it will take.
This lecture asks a narrower, sharper version of the same problem: from
inside the queue, how do you tell "this is slow" from "this has stopped"?

## Outline

- slow and stuck are different failure modes: a slow queue is still moving
  people through, however unpleasantly; a stuck queue has stopped, and no
  amount of extra waiting will change that
- why this distinction matters for what someone should do: it is
  unreasonable to keep waiting in a genuinely stuck queue, and unreasonable
  to give up on a merely slow one
- the evidence available to someone waiting: whether the ticket number on
  display has changed recently, whether anyone ahead of them has been served
  since they arrived, whether staff are visibly present
- the Office's own blind spot: a system can look stuck to someone waiting
  and still be technically "working" from the inside, if the definition of
  working doesn't include serving anyone
- why a system that can get stuck needs to say so, rather than leaving
  people to guess from indirect evidence

> **Office of Everything file — synthetic case material.** Incident report:
> the ticket dispenser jammed for forty minutes one Thursday. Numbers kept
> being called correctly by staff working from a paper log, but the display
> board — the only thing most people in line could see — never advanced.
> Several people left, believing the queue had stopped, while it had not.

This week's Queue Lab asks you to specify what evidence would actually
distinguish "stuck" from "slow," using nothing but what the Thursday
incident's waiting crowd could see for themselves.
