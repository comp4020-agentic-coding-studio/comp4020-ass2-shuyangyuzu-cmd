---
title: Recompute with and without the outlier
description:
  Rehearse the Queue Autopsy's core technique on the Office of Everything's
  data, then apply it to your own observed system before writing it up.
week: 3
date: 2027-03-08
teachers:
  - renata-voss
spec:
  - you have recomputed the week-2 Office of Everything numbers twice, once
    with the 26-minute ticket included and once with it removed, and can
    state the size of the difference
  - you have compared a separate service-time model under its declared
    26-minute and 2-minute dispute durations, distinguishing this intervention
    from deleting a recorded wait
  - you have analysed your longest recorded wait without inventing an outlier
  - you have a short written note distinguishing what you observed about
    that moment from what you are inferring caused it
---

This lab separates changing a summary from changing a queue. Part A
prepares the Queue Autopsy; Part B introduces later policy comparisons.

## Before the lab

Bring your week-1 and week-2 notes, or an approved accessible observation
record. If there is no conspicuous outlier, bring the longest recorded wait
and say that it was not unusually different from the others.

## In the lab

### Part A: change the summary

Reuse the ten waiting durations from week 2. Compute their mean and median,
then omit the single 26-minute wait and recompute both. Identify the changed
denominator. This checks the sensitivity of a reported statistic; it does
not show that removing that person would improve anyone else's experience.
Keep the full sample as the primary result.

### Part B: change a service duration

> **Office of Everything file — synthetic case material.** A separate log,
> Monday of week 3, not a reconstruction of week 2. A new dispute and nine
> later tickets arrive at minutes 0, 1, 3, 4, 5, 7, 8, 9, 11, 12. The
> dispute starts at minute 0 and finishes at 26; each later service takes
> 2 minutes. Service is FCFS and non-preemptive. A ticket cannot start
> before arrival; an idle desk waits for the next arrival.

Compute each later ticket's start and wait, and their mean wait. Then
recompute with the first service shortened to 2 minutes and every arrival
and other service unchanged. Compare the mean and the total waiting minutes
across the nine later tickets. This is a counterfactual within this model,
not an observed improvement or deletion of one row from a report.

### Apply Part A to your observation

Report your real sample in full, then recompute its mean with one longest
recorded wait omitted. If several tie, omit one and explain which. With no
conspicuous outlier, say so: the sensitivity calculation still has value.
Do not claim the omitted person caused other waits. Part B is not required
for your real system without enough arrival and service data to support it.

## Afterwards

You now have the technique the Queue Autopsy asks for: observation notes
(week 1), a wait-time calculation that separates typical from atypical cases
(weeks 2–3), and a written account of what is measured versus assumed. The
Queue Autopsy is due at the end of this week and asks you to bring these
three things together for the one system you have been watching all along.
