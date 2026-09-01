---
title: The Honest Queue
description: >-
  A full redesign of the SlopU Office of Everything's front counter, defended
  against normal demand, congestion, uncertainty, failure and cancellation.
week: 12
due: 2027-05-14T17:00:00+10:00
weight: 50
marking:
  mode: holistic
  description: >-
    The redesign is judged as a whole against the five requirements below,
    not as a checklist scored piece by piece. A strong submission makes
    specific, defensible decisions on each requirement and is honest about
    what those decisions cost; a submission that is thorough on some
    requirements and silent on others is judged on its weakest point, since
    an Office of Everything that only works under normal demand is not the
    one this course asked for.
spec:
  - the redesign states a specific ordering policy for normal demand, not
    only a principle
  - it states what the counter honestly tells someone about how long they
    will wait, consistent with week 7's standard
  - it specifies evidence that would distinguish a genuine stall from an
    ordinary slow period, per week 8
  - it accounts for people who leave before being served, per week 9
  - it addresses the Priority Lane directly, using the week 10 audit as
    evidence for keeping, changing or removing it
  - it names, for at least one major decision, the alternative rejected and
    why
  - it identifies what would happen to the redesign under the week 11
    worst-day conditions and does not claim the failure could not recur
related:
  - sessions/week-07
  - sessions/week-08
  - sessions/week-09
  - sessions/week-10
  - sessions/week-11
  - sessions/week-12
  - policy-trial
---

## Purpose

The Honest Queue is the semester's redesign. It asks you to specify, in
enough detail that someone else could implement it, how the Office of
Everything's front counter should actually work — and to defend every
decision in that specification against the case built up since week 1.

## The task

Write a redesign of the Office of Everything's front counter that
specifies, at minimum:

- the ordering policy the counter runs under normal demand, and why, in
  terms of who it favours and who it disadvantages (building on the Policy
  Trial)
- what the counter honestly communicates to someone currently waiting,
  consistent with the honesty standard set in week 7
- the specific evidence that would tell a person waiting that the queue is
  genuinely stalled rather than merely slow (week 8)
- how the design accounts for people who leave before being served, and
  what it does differently as a result (week 9)
- a decision on the Priority Lane — keep it, change its verification, or
  remove it — argued from the week 10 usage audit, not from the lane's
  original stated intent alone
- what the redesign predicts would happen under the week 11 worst-day
  conditions, and whether it claims to prevent that failure or only to
  soften it

For at least one of these decisions, state the alternative you rejected and
your reason for rejecting it.

## What you submit

A single written specification covering all six points above, organised so
a reader can find each requirement addressed without hunting for it.

## Scope boundaries

This is a specification, not a working system — you are not required to
build a simulator, a scheduler, or a functioning wait-time estimator. Every
claim about the Office of Everything's behaviour must be grounded in the
synthetic case material already established in earlier weeks or a plainly
stated new assumption; do not introduce real-world statistics, studies or
named laws to support the design.

## Relationship to other work

The Honest Queue is where the semester's separate threads — measurement
(weeks 1–3), policy choice (weeks 4–6, rehearsed formally in the Policy
Trial), and honest communication under uncertainty and failure (weeks 7–11)
— have to work together in one specification rather than being demonstrated
one at a time. Nothing here introduces a new concept; it asks you to use all
of the earlier ones at once, correctly, and to say so when they pull against
each other.
