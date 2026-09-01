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
people experience. This lecture asks a different question: what does that
same ticket do to the *other people in line* while it is still being served,
before anyone has computed an average at all?

## Outline

- an outlier is not just a data point, it is a period of time during which
  the server is unavailable to everyone behind it
- queueing time versus service time: a slow case lengthens the queue for
  everyone waiting behind it, in a way a same-length gap between arrivals
  does not
- why "it only happened once" undersells the cost: one 26-minute ticket at a
  single-counter office can add close to 26 minutes to everyone who arrived
  during it, not just to the person it happened to
- separating description from explanation: naming that an outlier occurred is
  not the same as explaining why, and this course keeps those two claims
  apart
- this week's technique — recomputing a queue's numbers with and without its
  outlier — is the method the Queue Autopsy assessment asks you to apply to
  your own system

> **Office of Everything file — synthetic case material.** The same
> printer-credit dispute from week 2's ticket log is logged again here, this
> time with arrival times for the nine tickets behind it. All nine arrived
> before it finished. The counter has one queue and one server; there was
> nowhere else for them to go.

The Queue Lab asks you to recompute this week's Office of Everything numbers
twice — once with the slow case included, once with it removed — and then
turn the same technique on the real system you have been watching since
week 1, ahead of writing it up as the Queue Autopsy.
