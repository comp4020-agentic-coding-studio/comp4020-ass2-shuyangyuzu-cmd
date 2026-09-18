---
title: Queue Autopsy
description: >-
  A close analysis of one real waiting system, separating what you observed
  from what you assumed, and accounting honestly for its slowest case.
week: 3
due: 2027-03-12T17:00:00+10:00
weight: 20
marking:
  mode: weighted
  criteria:
    - name: Observation kept separate from assumption
      weight: 40
    - name: Wait-time analysis and sensitivity to the longest recorded wait
      weight: 35
    - name: Scope and clarity of the write-up
      weight: 25
spec:
  - the system named is real and public, with repeated observations made
    personally or supplied through the approved accessibility arrangement
  - observation and assumption are kept in visibly separate sections, not
    blended into one narrative
  - the write-up reports the full sample and recomputes its mean with one
    longest recorded wait omitted, stating when no conspicuous outlier was
    observed and avoiding causal conclusions from this deletion
  - no general external source substitutes for the real observation record,
    whether personally collected or approved for accessibility; interpretation
    sources are cited,
    and claims about the system itself are kept to what your observation
    actually supports
related:
  - sessions/week-01
  - sessions/week-02
  - sessions/week-03
  - policy-trial
---

## Purpose

Weeks 1 through 3 gave you a method for looking at a queue honestly: watch
it before theorising about it, compute more than one summary statistic, and
check how sensitive a summary is to the longest recorded wait. The Queue
Autopsy asks you to apply that method properly, in writing, to one real
waiting system of your choosing — not the Office of Everything.

## The task

Produce a written analysis of the system you have been observing since
week 1. The analysis has two distinct jobs, and they must not be merged: an
**observation record** (what you actually saw, when, and how) and an
**analysis** (what you conclude from it, including any assumption you had
to make because the system didn't show you everything). A reader should be
able to tell, line by line, which section they are reading.

Within the analysis, include a wait-time calculation for a representative
case and your longest recorded wait. Report the full sample mean, then
recompute it with one longest wait omitted, as in Part A of week 3's lab.
State both sample sizes. If there is no conspicuous outlier, say so and use
the longest wait without relabelling it unusual; if several tie, omit one
and identify it. Honest absence of an outlier is not penalised. This check
does not establish causes or what removing a customer would change.

An observation record approved under the [accessibility policy](../../policies/)
may replace personal observation and satisfies the observation requirement.
Identify its source and what you did not observe yourself. The same marking
criteria apply; approval does not require inventing first-hand experience.
General literature alone is not an observation record.

## What you submit

A single written document (a few pages is enough) containing the
observation record, the analysis, and your wait-time calculations shown as
working, not just a final number.

## Scope boundaries

This is an analysis of one system you can actually watch, not a survey of
queueing systems in general and not a proposal for fixing anything. Do not
collect anyone's personal information while observing — timing and counting
people is enough; see the policies page for what "observing without
collecting personal data" means in practice. An outside source may help you
interpret something you observed, and if you use one, cite it — but it
cannot prove what happened in the system you watched. A claim about your
specific system has to come from your own observation or the approved
observation record. If that evidence cannot support a claim, say so and
scope the claim down rather than borrowing authority from somewhere else.

## Relationship to other work

This is the only assessment built entirely from a system you chose yourself,
rather than the Office of Everything's synthetic case. Its method — separate
observation from assumption, account for outliers rather than averaging past
them — is the same method the Policy Trial and The Honest Queue both assume
you already have.
