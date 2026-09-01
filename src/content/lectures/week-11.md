---
title: How does the system fail under pressure?
description:
  The Office of Everything's worst day, and identifying which specific
  design decision from earlier weeks is most responsible for its collapse.
week: 11
date: 2027-05-03
teachers:
  - marisol-quaye
related:
  - sessions/week-11
---

Every policy examined so far has been tested against ordinary demand, or
against one outlier inside an otherwise ordinary day. This lecture asks what
happens to the same system on a day where demand surges and something else
also goes wrong at the same time.

## Outline

- congestion is a different regime, not just more of the same: a policy
  that behaves reasonably at normal volume can behave very differently once
  the arrival rate outpaces the service rate for a sustained period
- compounding failure: the Office's worst day combines a demand surge
  (enrolment-variation deadline) with an unrelated system failure (the
  ticket dispenser jamming, from week 8) at the same time
- tracing the collapse back to a decision, not an event: this lecture argues
  that the failure was allowed to compound by a choice made earlier in the
  semester, and asks the Queue Lab to identify which one
- why "the system failed" is not itself an analysis: this course has built
  the vocabulary (measured wait, chosen policy, honest promise, stuck-versus-
  slow evidence, audited priority) to say specifically what failed and why
- this is the last lecture before the final redesign: everything examined
  this semester is now material to defend or replace

> **Office of Everything file — synthetic case material.** Incident summary,
> the Thursday before the enrolment-variation deadline: ticket volume
> tripled against a normal day; the dispenser jammed for its usual forty
> minutes, but this time behind a queue three times longer; the Priority
> Lane, still specified as in week 6, saw declared urgency rise
> disproportionately as the queue grew.

The Queue Lab asks you to trace this compounding failure back to one
specific decision from an earlier week, and argue why that decision — not
the surge, not the jam — is where the design should have been different.
