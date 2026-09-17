---
title: Account for the 15% who left
description:
  Test what unrecorded departures leave unknown about waiting, and check
  your own system for the same measurement gap.
week: 9
date: 2027-04-19
teachers:
  - renata-voss
spec:
  - you have stated, in writing, why a 4-minute average computed from
    served tickets only is not automatically the true average wait
  - you have calculated the mean elapsed time until service or departure
    under three explicit assumptions about unrecorded departure times
  - you have distinguished those assumptions from observed evidence
  - you have checked whether your own observed system could hide reneging
    the same way, and said what evidence would reveal it if so
---

The Office's own numbers don't tell you what happened to the 15% who left.
This lab asks you to reason about that gap carefully, without inventing data
the Office doesn't have.

## Before the lab

Reread the reneging gap in this week's lecture. Notice what is and isn't
known: the size of the gap is known; why those specific people left, and how
long they had already waited, is not recorded anywhere.

## In the lab

Write one paragraph explaining why the reported 4-minute average describes
served tickets only. People who left may have waited less, the same amount,
or longer: this dataset does not establish the direction of the difference.
Their time until service is unobserved; their time until departure is a
different outcome that the Office could have recorded.

For a sensitivity calculation, assume every issued ticket either reached
service or left, with no tickets still waiting at the end of the period.
Define L as the unknown average minutes spent waiting by those who left.
The mean elapsed time until service or departure would then be:

**0.85 × 4 + 0.15 × L minutes.**

Compute this for L = 2, 4 and 10. These are hypothetical values, not estimates
supported by the case. Explain why the resulting means can fall below,
equal or exceed 4, and why none is an estimate of how long everyone would
have waited if nobody had left. Name the extra timestamp needed to measure
elapsed time honestly.

Then check your own real system: could someone leave it before being served
without that departure being recorded anywhere you have access to? If so,
name one piece of evidence (a sign-in sheet, a numbered-ticket count, a
headcount at two points in time) that would reveal it.

## Afterwards

You have now examined how a queue can look good on paper for reasons that
have nothing to do with serving people well — a slow-but-honest average
(weeks 2–3), a starving policy (week 5), an unverified priority claim
(week 6), and now survivorship bias. Week 10 turns from these mechanisms to
a direct audit: who has actually been benefiting from the rule the Office
chose in week 6?
