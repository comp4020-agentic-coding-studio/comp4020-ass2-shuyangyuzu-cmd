---
title: Policy Trial
description: >-
  A comparison of two queue-ordering policies against the same declared
  dataset, ending in a defended choice between them.
week: 7
due: 2027-04-09T17:00:00+10:00
weight: 30
marking:
  mode: weighted
  criteria:
    - name: Dataset and assumptions declared clearly
      weight: 25
    - name: Fair comparison of both policies on the same data
      weight: 35
    - name: Defence names who benefits and who waits longer
      weight: 40
spec:
  - the dataset used for the comparison is declared in full, so a marker can
    check the working
  - the same dataset is used for both policies, with no change to it between
    trials
  - the comparison reports results for both policies, not only the one
    ultimately chosen
  - the written defence names at least one group the chosen policy
    disadvantages, not only the group it favours
related:
  - sessions/week-04
  - sessions/week-05
  - sessions/week-06
  - queue-autopsy
  - the-honest-queue
---

## Purpose

Weeks 4 through 6 introduced first come first served, shortest job first
and a priority rule, then compared them on one declared log in week 6.
The Policy Trial asks for the same comparison
done properly: a declared dataset, both policies run against it in full, and
a written defence that owns the trade-off rather than hiding it.

## The task

Choose two ordering policies to compare — you may use two of first come
first served, shortest job first, or a priority rule, or propose a variant
of your own, as long as it is precisely specified. Declare a dataset (you
may build on the Office of Everything logs from weeks 4 through 6, extend
them, or construct a new one of comparable size) and compute the outcome —
individual wait times for every entry — under each policy.

Then choose one policy and defend it in writing. The defence must name a
specific group of requests that would wait longer under your chosen policy
than under the alternative, not only describe who benefits.

## What you submit

The declared dataset, the computed results for both policies (shown as
working), and a written defence of your choice, as one document.

You may use **Normal Day** from the [Queue Policy Lab](../../policy-lab/)
with two policies. Include the declared inputs, service order and individual
waits, and explain at least one selection decision; a screenshot alone is
not working. Other declared datasets and policy variants remain permitted,
but require your own calculations because the Lab only runs its fixed
inputs and rules. The written defence is your judgment, not a simulator
recommendation.

## Scope boundaries

This assessment is a comparison of exactly two policies on one declared
dataset — it does not ask you to build a working scheduler, simulate
randomised arrivals, or survey real-world scheduling literature. Any dataset
you construct yourself must be stated as constructed, not presented as
observed.

## Relationship to other work

The Policy Trial reuses the Queue Autopsy's discipline of separating
description from assumption, applied here to a policy choice rather than an
observation. Its declared dataset and defended trade-off are also the
method The Honest Queue's final redesign has to use when it accounts for
who its own ordering rule favours.
