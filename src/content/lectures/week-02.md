---
title: What does an average hide?
description:
  Why a single average wait time can be true and still misleading, and what
  it hides about who actually waits the longest.
week: 2
date: 2027-03-01
teachers:
  - desmond-okafor
related:
  - sessions/week-02
---

A number like "average wait: 5 minutes" is not false. It is also not the
whole system. This lecture is about the gap between a summary statistic and
the distribution it summarises, and why that gap is where a queue's real
costs usually hide.

## Outline

- mean versus median: what each one is actually telling you, and why they
  diverge exactly when a queue is least well-behaved
- the long tail, demonstrated: in this week's ten-ticket log, nine tickets
  cluster near the average and one sits far outside it — enough to show how
  a single long wait can coexist with a fair-sounding average, without
  claiming every queue's tail looks like this one
- who the average hides, in this case: the log's one long wait belongs to a
  specific kind of request, not an arbitrary one — enough to raise the
  question of whether that pattern generalises, which this course does not
  assume without more evidence
- reading a distribution honestly, without needing more than counting and
  sorting

> **Office of Everything file — synthetic case material.** A memo from the
> Office's front counter, Tuesday of week 2: "Mean wait for this ten-ticket
> sample: 5 minutes. Service remains excellent." The Queue Lab checks the
> calculation and what this sample can establish. It is not a monthly or
> population estimate; service durations and causes are unrecorded.

This week's Queue Lab gives you that ticket log and asks you to find the
story the memo left out — then asks you to do the same thing to the real
system you started watching in week 1.
