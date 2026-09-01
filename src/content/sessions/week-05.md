---
title: Test the Quick Enquiries draft for starvation
description:
  Apply the Office's draft shortest-job-first notice to a busier ticket log
  and check whether the longest case ever gets served.
week: 5
date: 2027-03-22
teachers:
  - marisol-quaye
spec:
  - you have simulated, by hand, the Quick Enquiries draft policy against
    a log where short requests keep arriving
  - you can state whether the long-dispute ticket is served, and if so, how
    much later than under plain FCFS
  - you have written one sentence naming who benefits from the draft policy
    and one sentence naming who it leaves worse off
---

Last week you proposed your own alternative to FCFS. This week you test the
Office's actual draft — Quick Enquiries first — against a log designed to
make its weakness visible.

## Before the lab

Have your week 4 proposed rule to hand; you'll compare it against this
week's policy at the end of the lab.

## In the lab

> **Office of Everything file — synthetic case material.** Extended ticket
> log: the same 20-minute dispute arrives first, then a new "collect a form"
> ticket (2 minutes) arrives every 3 minutes for the next hour, without
> stopping.

Work through the Quick Enquiries draft by hand: at every decision point, the
counter serves the shortest waiting request. Track whether the 20-minute
dispute is ever served, or whether the constant stream of 2-minute arrivals
keeps it waiting indefinitely. This is starvation, and it is not a rare edge
case here — it is what the policy does whenever short requests keep coming.

Compare this outcome to what plain FCFS would have done with the same log
(the dispute is served immediately, then every form-collector waits behind
it in turn). Write one sentence on who the draft policy benefits and one on
who it leaves worse off, and check both against your own week 4 rule: does
your rule have the same starvation problem, a different one, or none?

## Afterwards

You have now tested two alternatives to FCFS against the same case. Week 6
introduces a third — a priority rule rather than a size rule — and asks you
to compare all three side by side, which is the direct rehearsal for the
Policy Trial.
