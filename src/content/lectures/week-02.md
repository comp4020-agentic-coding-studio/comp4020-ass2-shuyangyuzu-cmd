---
title: What does an average hide?
description:
  Why a single average wait time can be true and still misleading, and what
  it hides about who actually waits the longest.
week: 2
date: 2027-03-01
teachers:
  - idris-fenn
related:
  - sessions/week-02
---

A number like "average wait: 4 minutes" is not false. It is also not the
whole system. This lecture is about the gap between a summary statistic and
the distribution it summarises, and why that gap is where a queue's real
costs usually hide.

## Outline

- mean versus median: what each one is actually telling you, and why they
  diverge exactly when a queue is least well-behaved
- the long tail: most people wait close to the average, and a small number
  wait much longer — an average alone cannot tell you which group you'd be
  in
- who the average hides: it is rarely random who ends up in the long tail,
  and "the average customer waits 4 minutes" can be true while describing
  almost nobody's actual experience
- reading a distribution honestly, without needing more than counting and
  sorting

> **Office of Everything file — synthetic case material.** A memo from the
> Office's front counter, mid-semester: "Average wait this month: 4 minutes.
> Service remains excellent." The same week's ticket log, examined in the
> Queue Lab, tells a different story about who that average is averaging
> over.

This week's Queue Lab gives you that ticket log and asks you to find the
story the memo left out — then asks you to do the same thing to the real
system you started watching in week 1.
