---
title: Compare three policies on one log
description:
  Run FCFS, Quick Enquiries and the Priority Lane against the same ticket
  log, then choose and defend one policy for the Office of Everything.
week: 6
date: 2027-03-29
teachers:
  - desmond-okafor
spec:
  - you have computed each ticket's wait under all three policies on the
    same log
  - you have chosen one policy and written a defence of it that names who it
    favours and who it disadvantages
  - you have noted, in writing, one way the Priority Lane could be misused
    given that urgency is self-declared
---

Three weeks, three policies, one log. This lab puts them side by side and
asks you to commit to one, in writing, the way the Policy Trial will.

## Before the lab

Bring your week 4 proposed rule and your week 5 starvation findings.

## In the lab

> **Office of Everything file — synthetic case material.** One day's full
> ticket log: six ordinary requests (5 minutes each), one dispute (20
> minutes), and one request marked urgent at the Priority Lane dispenser (8
> minutes), all arriving within the first ten minutes of opening.

Open the [Queue Policy Lab](../../policy-lab/) and select **Normal Day**.
Its ticket IDs, exact arrival times and category labels are additional
synthetic inputs that make this comparison reproducible; they are not
observations from a real counter. Copy the eight-ticket input table.

Compute each wait under FCFS (arrival order), Quick Enquiries (shortest
service first), and Priority Lane (shortest service among declared-priority
tickets first, then shortest among the rest). Only tickets already arrived
are eligible; a service already started finishes without interruption.
Break ties by arrival time, then ticket ID. Wait is start minus arrival;
service duration is completion minus start. Check your working against the
Lab's service order and ticket table, then lay the three results side by
side. Record a helped ticket, a harmed ticket and the mean for each rule.

Choose one policy for the Office of Everything to actually adopt. Write a
short defence: name the group your choice favours, name the group it
disadvantages, and say why that trade is the right one for a general-purpose
front counter rather than a specialised one. Then write one sentence on how
someone could exploit the Priority Lane's self-declared urgency if the
counter never checks it — this is not a hypothetical the Office can ignore
once the lane exists.

## Afterwards

Keep your chosen policy and its defence; the Policy Trial, due at the end of
next week, asks for exactly this kind of comparison and defence against a
declared dataset, done more thoroughly than a single lab session allows.
Week 7 turns from choosing an ordering to deciding what the Office can
honestly tell someone about how long they'll wait.
