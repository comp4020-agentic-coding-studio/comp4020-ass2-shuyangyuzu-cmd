# Policy Lab Contract

**Status: implemented; initial visual and interaction review completed.** The
approved three-policy, three-scenario simulator is available at
`/policy-lab/`, with all nine results rendered as static fallback tables.
Its calculation module and regression tests implement this contract.
See `COURSE-DESIGN.md` for scope and the cross-week teaching sequence, and
`VERIFICATION-2026-09-17.md` for the checks performed and their limits.

Priority Lane selects the shortest service time within the declared-priority
group, then the shortest within the remaining group; arrival time and ticket
ID resolve ties. A later handover described arrival order inside each group:
that description was inaccurate. The implementation and reference results
retain this contract's shortest-first rule.

This document fixes scope, simulation rules, the three input datasets, and
the nine computed result sets (three policies × three scenarios), each
cross-checked by two independently written calculation paths — see
[Results](#results) and [Verification](#verification).

## MVP scope: three policies, three fixed scenarios

**Policies** (names and orderings carried over from `week-06` session
content, with precise tie-break rules below matching what the course tells
students):

1. **FCFS** — first come, first served. Strict arrival order.
2. **Quick Enquiries** — shortest job first. Ignores any declared-priority
   marking entirely.
3. **Priority Lane** — self-declared-urgent tickets served first as a
   group, shortest-first within that group, then shortest-first among the rest.

**Scenarios** (all newly constructed for this contract, stated as
constructed, not observed — per the Policy Trial's scope boundary on
declared datasets):

1. **Normal Day** — the week-06 lab log (six ordinary requests, one
   dispute, one urgent request), given fixed IDs and arrival minutes so it
   is reproducible outside that session's prose description.
2. **High-declaration Day** — a shorter log where most tickets declare
   priority, built to force the tie-break rule inside the Priority Lane's
   urgent group. The log records declarations, not verified urgency; it
   cannot establish whether any declaration is dishonest.
3. **System Shock** — a shorter log combining a closed service window with
   several priority declarations. It isolates a short closure at
   hand-calculable scale, not the full surge or dispenser fault in week 11.

No scenario has more than 8 tickets. All three are designed to be checked
by hand.

## Simulation rules

- **Single service desk.** Exactly one ticket is in service at any moment.
- **Event-driven.** The only events are a ticket's arrival and a ticket's
  service completion (plus, for System Shock only, the closed window's
  open/close boundary). Nothing happens between events.
- **Non-preemptive.** Once the desk starts serving a ticket, that ticket
  runs to completion without interruption — including across a closed
  window's boundary (see below). No policy, and no window closure, may stop
  a ticket that has already started.
- **Selection on becoming free.** Whenever the desk is idle and could take a
  new ticket, it selects the next ticket, among those that have arrived
  (`arrivalMinute` ≤ current time) and have not yet been served, using the
  active policy's ordering rule below. If no ticket is currently eligible,
  the desk sits idle until the next arrival (or, in System Shock, until the
  window reopens).

### Ordering within each policy

- **FCFS:** order by `arrivalMinute` ascending.
- **Quick Enquiries:** order by `serviceMinutes` ascending.
- **Priority Lane:** split the waiting tickets into a declared group
  (`declaredPriority = true`) and an undeclared group. If the declared group
  is non-empty, choose from it; otherwise choose from the undeclared group.
  Order *within whichever group is chosen* by `serviceMinutes` ascending.

### Tie-break (applies identically to all three policies, after the rule above)

When two or more tickets are tied on the policy's ordering key, break the
tie, in order, by:

1. earlier `arrivalMinute`;
2. if still tied, lower ticket `ID` (ASCII/lexicographic order, e.g.
   `NT01` before `NT02`).

This tie-break is total — no two tickets in any scenario share both an
`arrivalMinute` and an `ID`, so it always resolves.

### System Shock's closed window

The desk is **closed to new starts** during the half-open interval
`[6, 10)` minutes after opening — i.e. at any current time `t` with
`6 ≤ t < 10`, the desk may not *begin* serving a ticket, no matter what
policy is active or what is waiting. Consistent with non-preemption above:

- A ticket already in service when minute 6 arrives continues uninterrupted
  and may finish inside the closed window.
- If the desk becomes free at some `t` with `6 ≤ t < 10` (or is already
  idle when minute 6 arrives), it stays idle until minute 10, then applies
  the active policy's ordering rule to whatever has arrived and is waiting
  at that point.
- The window applies only to the System Shock scenario. Normal Day and
  High-declaration Day have no closed window.

## Datasets

All times are minutes after opening. `declaredPriority` is a boolean:
whether that ticket's holder declared urgency at the Priority Lane
dispenser, self-declared and unverified, exactly as described in week 6.
Categories reuse the four named in the week-10 audit dataset (`dispute a
printer credit`, `collect a form`, `enrolment variation`, `other`) so any
future cross-week reference stays consistent.

### Normal Day (8 tickets)

Reconstructs the week-06 lab log: six ordinary 5-minute requests, one
20-minute dispute, and one urgent 8-minute request, all arriving within the
first ten minutes of opening — matching week-06's session content field
for field on counts, durations and the urgent marking. Fixed IDs and exact
per-ticket arrival minutes (0–7, so still within week-06's "first ten
minutes") are this contract's own addition, needed to make the log
reproducible outside that session's prose description. Categories are also
this contract's addition, not a week-06 fact — week 6 does not assign
categories to these eight tickets, so the four category labels below are
taken from the week-10 audit's category set for consistency, not carried
over from week 6 itself.

| ID   | category                 | arrivalMinute | serviceMinutes | declaredPriority |
|------|---------------------------|--------------:|---------------:|:-----------------:|
| ND01 | collect a form            | 0             | 5               | false             |
| ND02 | collect a form            | 1             | 5               | false             |
| ND03 | collect a form            | 2             | 5               | false             |
| ND04 | collect a form             | 3             | 5               | false             |
| ND05 | collect a form            | 4             | 5               | false             |
| ND06 | collect a form            | 5             | 5               | false             |
| ND07 | dispute a printer credit  | 6             | 20              | false             |
| ND08 | enrolment variation       | 7             | 8               | true              |

### High-declaration Day (6 tickets)

Built so that most tickets declare priority, including equal-duration
requests that exercise the tie-break rule and one short `other` request.
No field establishes genuine urgency, so the input data cannot identify
which declarations, if any, constitute gaming.

| ID   | category                 | arrivalMinute | serviceMinutes | declaredPriority |
|------|---------------------------|--------------:|---------------:|:-----------------:|
| HD01 | collect a form            | 0             | 5               | true              |
| HD02 | collect a form            | 1             | 5               | true              |
| HD03 | enrolment variation       | 2             | 8               | true              |
| HD04 | dispute a printer credit  | 3             | 20              | false             |
| HD05 | collect a form            | 4             | 5               | false             |
| HD06 | other                     | 5             | 3               | true              |

### System Shock (6 tickets, closed window [6, 10))

Models the week-11 worst day at small scale: a run of early arrivals, a
closed window from minute 6 to 10, and priority declarations rising once
the queue is already under pressure (SS03 and SS05 declare after the surge
has begun).

| ID   | category                 | arrivalMinute | serviceMinutes | declaredPriority |
|------|---------------------------|--------------:|---------------:|:-----------------:|
| SS01 | collect a form            | 0             | 4               | false             |
| SS02 | enrolment variation       | 1             | 3               | true              |
| SS03 | collect a form            | 2             | 3               | true              |
| SS04 | dispute a printer credit  | 5             | 6               | false             |
| SS05 | enrolment variation       | 6             | 2               | true              |
| SS06 | other                     | 9             | 2               | false             |

## Results

All nine result sets (three policies × three scenarios) are computed and
cross-checked. Per-ticket detail — `serviceOrder`, `start`, `completion`,
`wait`, and `overtaking` for every ticket in every scenario — is not
duplicated in this file; the authoritative, re-runnable source is
[`policy-lab/results.json`](policy-lab/results.json), regenerated by
`node policy-lab/run.mjs` from the datasets above. Keeping one copy avoids
the two ever drifting apart. The table below is a summary of that file's
aggregate figures, one row per policy × scenario.

| Scenario             | Policy           | Mean wait | Median wait | Max wait | Wait > 5 count | Overtaking total |
|-----------------------|------------------|----------:|-------------:|----------:|-----------------:|-------------------:|
| Normal Day            | FCFS             | 15.88     | 14           | 43        | 6                 | 0                   |
| Normal Day            | Quick Enquiries  | 14.38     | 14           | 32        | 6                 | 1                   |
| Normal Day            | Priority Lane    | 15.88     | 18           | 32        | 5                 | 5                   |
| High-declaration Day  | FCFS             | 16.5      | 11.5         | 38        | 4                 | 0                   |
| High-declaration Day  | Quick Enquiries  | 9.17      | 8            | 23        | 4                 | 6                   |
| High-declaration Day  | Priority Lane    | 9.67      | 9            | 23        | 4                 | 5                   |
| System Shock          | FCFS             | 7.33      | 8            | 13        | 4                 | 0                   |
| System Shock          | Quick Enquiries  | 5.67      | 3.5          | 12        | 2                 | 4                   |
| System Shock          | Priority Lane    | 5.83      | 5            | 12        | 3                 | 3                   |

`overtaking` is counted per ticket `T` as the number of other tickets whose
`arrivalMinute` is strictly later than `T`'s but whose `start` is strictly
earlier than `T`'s — i.e. how many later arrivals were served before `T`.
Ties on `arrivalMinute` never count. FCFS is arrival order, so its
overtaking total is always 0 by construction; Quick Enquiries and Priority
Lane both reorder by something other than arrival time and so both produce
overtaking.

## Verification

Two independently written calculation paths, both under `policy-lab/` and
kept separate from the on-site simulator:

- **`sim-event-queue.mjs`** — a discrete-event simulation that jumps
  straight from one event (arrival, service completion, closed-window
  boundary) to the next.
- **`sim-time-step.mjs`** — a minute-by-minute scan that re-decides what
  the desk should do at every whole minute, with its own separately coded
  ordering and tie-break logic (it shares no code with the event-queue
  path).

`policy-lab/run.mjs` runs both paths over all nine scenario × policy
combinations and asserts, ticket by ticket, that `start`, `completion`, and
`wait` agree. Running `node policy-lab/run.mjs` reports:

```
Normal Day / FCFS: AGREE
Normal Day / QUICK_ENQUIRIES: AGREE
Normal Day / PRIORITY_LANE: AGREE
High-declaration Day / FCFS: AGREE
High-declaration Day / QUICK_ENQUIRIES: AGREE
High-declaration Day / PRIORITY_LANE: AGREE
System Shock / FCFS: AGREE
System Shock / QUICK_ENQUIRIES: AGREE
System Shock / PRIORITY_LANE: AGREE

All nine combinations agree between both simulators.
```

### Hand-checked timeline: System Shock, FCFS

Worked by hand against the System Shock dataset and the closed-window rule
above, independently of both scripts, then compared to
`policy-lab/results.json` — the two match exactly.

- `t=0`: desk free, window not yet closed. Only SS01 (arrival 0) has
  arrived. Starts SS01, serving 0–4.
- `t=4`: desk free. SS02 (arr 1) and SS03 (arr 2) have both arrived; FCFS
  picks the earlier arrival, SS02. Starts SS02, serving 4–7.
- `t=7`: desk free, but `7` is inside the closed window `[6, 10)`
  (`6 ≤ 7 < 10`), so the desk may not begin a new ticket — this is the
  minute-6 boundary in effect: SS02's service, already running since
  before minute 6, was allowed to continue uninterrupted and finish at 7
  inside the window (non-preemption), but nothing new may start until the
  window reopens. The desk sits idle from 7 to 10 with SS03 (arr 2), SS04
  (arr 5) waiting.
- `t=10`: the window reopens — the minute-10 boundary. FCFS now picks the
  earliest remaining arrival, SS03. Starts SS03, serving 10–13.
- `t=13`: desk free, not closed. SS04 (arr 5) is earliest waiting. Starts
  SS04, serving 13–19.
- `t=19`: SS05 (arr 6) is earliest waiting. Starts SS05, serving 19–21.
- `t=21`: only SS06 (arr 9) remains. Starts SS06, serving 21–23.

Resulting service order and wait times: SS01 (order 1, start 0, completion
4, wait 0), SS02 (order 2, start 4, completion 7, wait 3), SS03 (order 3,
start 10, completion 13, wait 8), SS04 (order 4, start 13, completion 19,
wait 8), SS05 (order 5, start 19, completion 21, wait 13), SS06 (order 6,
start 21, completion 23, wait 12). Makespan 23, idle time 3 minutes — the
7-to-10 gap forced by the closed window — exactly matching
`policy-lab/results.json`'s `System Shock.FCFS` entry. No mismatch was
found; nothing here required correction before this contract was
committed.
