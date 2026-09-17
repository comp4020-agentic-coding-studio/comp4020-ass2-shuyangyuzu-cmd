# Course design contract — SLOP2516

This is the approved design for *Your Call Is Important to Us*, recorded
before the site was built so later work can be checked against it rather than
against itself. It is a contract, not a spec sheet: compact enough to hold in
one read, and the thing to update first if the course's premise changes.

## Public title and pitch

**SLOP2516 — Your Call Is Important to Us: Twelve Weeks in the Architecture of
Waiting.** Semester 1, 2027, Slop University.

> Everybody waits. Not everybody waits equally. Learn who designed the queue,
> what it measures, and whose time it spends.

## Central claim

Waiting is not simply the absence of service. It is one of the ways a system
allocates service, risk, attention and priority. A queue is not a delay that
happens to a design — it is a design decision, made by someone, on someone
else's time. The course exists to make that decision visible and arguable.

## Target student and prerequisites

Aimed at a student who has already met basic data handling and can read a
small dataset without being taught what a spreadsheet is — comfortable
comparing numbers, not necessarily any formal training in queueing theory,
statistics or operations research. No prior systems-design experience is
assumed; the course teaches queue policy from first principles, using a
single running case rather than a survey of the literature. It suits someone
who is annoyed by badly designed waiting rooms, call centres and online
queues and wants the vocabulary to say exactly what is wrong with one.

## Observable end-of-course capability

By week 12, a student can take an unfamiliar waiting system, ask what it is
actually measuring, name the policy choice behind its ordering rule, identify
who that choice favours, and propose and defend a specific change — including
what the change would cost someone else. That is a checkable capability: it
shows up in the final assessment as a redesign the student can defend under
questioning, not as a set of definitions they can recite.

## The four-stage progression

1. **Measure the wait (weeks 1–3).** From "the service is slow" to naming
   when a wait starts, what an average hides, and how one slow case reshapes
   a queue.
2. **Choose who goes next (weeks 4–6).** Comparing concrete queue policies —
   first-come, shortest-task-first, priority — and explaining how each one
   redistributes waiting rather than eliminating it.
3. **Communicate uncertainty (weeks 7–9).** Deciding what a system can
   honestly promise about duration, when a queue is stuck rather than just
   slow, and what cancelling and re-entering a queue actually costs.
4. **Defend a waiting system (weeks 10–12).** Auditing who benefits from the
   current rules, finding where the system fails under pressure, and
   presenting a redesign that survives challenge.

Each stage depends on the one before it: a policy comparison in weeks 4–6
needs the measurement vocabulary from weeks 1–3; the audit in weeks 10–12
needs a system that weeks 1–9 have already built up, rule by rule.

## The Office of Everything

The SlopU Office of Everything is the course's one running case: a single
fictional counter that queues everything the university's central services
touch — enrolment variations, room bookings, printer credits, lost property,
grade queries — through one ticket system. It exists so every week has
somewhere concrete to point instead of a fresh invented scenario. Each week
adds one artefact to the same file: a memo, a ticket log, a policy trial, a
complaint, a failure. Later weeks read earlier ones — the priority lane
introduced in week 6 is still the priority lane being audited in week 10.

## Synthetic cases vs. real claims

Everything from the Office of Everything is fiction, built for the exercise,
and is labelled as such wherever it appears — as a dated "file," never as
data the site claims actually happened. Nothing in the course site states a
specific statistic, named law, published study or historical fact about real
queueing systems; where the material draws on real ideas, it does so in
plain, general terms a reader could reasonably expect anyone to know, with no
invented number or citation attached. Where a future iteration wants to cite
real research, that is a distinct piece of work, done properly, not backfilled
into this MVP.

## Editorial voice

Restrained and deadpan. The site is written the way an actual, slightly
bureaucratic institution would write about itself — plainly, a little dryly,
without irony markers or promotional language. The comedy of "your call is
important to us" comes from the premise being followed seriously, not from
jokes layered on top of it.

## Visual direction: the Office case file

The course website takes its visual language from a university service
counter: numbered files, perforated ticket edges, ruled records and a
black-and-gold counter display. SlopU's identity, palette, fonts and theme
components remain the foundation. Shared treatment lives in
`src/layouts/PageLayout.astro`; it applies to both MDX and Astro pages.

The homepage makes the course claim and four-stage progression visible
before the longer explanation. A prospective student can enter the first
lecture or try the Policy Lab directly. Weekly listings retain their real
dates and gain file numbers; decorative numbers never imply a live queue.
The Policy Lab gives individual metrics and service order more prominence,
while retaining the complete tables, fixed scenarios and verified results.
No policy is presented as a winner. On mobile, controls and key figures
should be readable without horizontal scrolling; only wide evidence tables
may scroll. Native inputs, visible keyboard focus and reduced-motion
support remain part of acceptance. This is a visual treatment, not a claim
that the Office's fictional records are real research.

## Scope exclusions

This MVP has approved building an interactive Queue Policy Lab on the
site, running the three policies (FCFS, Quick Enquiries, Priority Lane)
against the three fixed scenarios (Normal Day, High-declaration Day,
System Shock) specified, with computed and cross-checked results, in
`POLICY-LAB-CONTRACT.md`. The simulator is implemented at `/policy-lab/`,
with all nine combinations also available as static tables. Week 6 uses
Normal Day for the policy comparison; week 7 distinguishes a completed log
from information available on arrival; week 10 uses High-declaration Day
as a controlled example, not proof about the audit's population; weeks
11–12 use System Shock for a bounded stress test. The two later assessments
explain how to use these results as evidence without replacing a defence.
Stretch beyond the approved three policies and three scenarios —
randomised arrivals, additional policies, or letting a visitor define
their own tickets — stays excluded from this pass. The site does not claim
completed academic
research, does not cite sources it hasn't verified, and does not present the
Office of Everything as anything other than fiction. Twelve weeks is the
whole curriculum for this pass — no thirteenth "extension" week, no optional
track.

Week 9 measures the evidence gap explicitly: 15% of issued tickets are
recorded as departed, with no tickets still waiting at the reporting cutoff.
The served-only mean is not a mean for all arrivals. Sensitivity calculations
use hypothetical departure times and distinguish elapsed waiting until exit
from the unobserved time to service. No direction of bias is assumed.

## Assessment alignment

Three tasks, 100% total, each keyed to a stage boundary: **Queue Autopsy**
(20%, week 3) closes stage one by asking a student to document and analyse
one real waiting system, separating what they observed from what they
assumed. **Policy Trial** (30%, week 7) closes stage two by asking for a
compared, defended choice between two queue policies on the same dataset,
naming who benefits and who waits longer. **The Honest Queue** (50%, week 12)
closes the whole course: a redesign of the Office of Everything covering
normal demand, congestion, uncertainty, failure and cancellation, justified
and defended. No task carries a generic participation mark.

## MVP acceptance criteria

The site is done for this pass when: all twelve weeks exist as a matched
lecture and Queue Lab pair, each with a distinct question and a stated
capability gain; the Office of Everything reads as one coherent case across
the semester rather than twelve unrelated scenarios; all three assessments
total 100% and state purpose, task, submission, boundaries, criteria and
relationship to the surrounding weeks; the homepage, one deck and the
policies page carry real, specific content; the starter imagery and
boilerplate are gone; and `pnpm check` passes. `pnpm check:evidence` is
expected to still fail on `PROCESS.md`, which this pass deliberately leaves
for its actual author to write.

## Homepage revision: the Service Hall

The homepage is an entrance to the Office of Everything: a two-column course
introduction and an original typographic service receipt, followed by a real
Normal Day comparison, four numbered teaching windows and three assessment
outcomes. The receipt is explicitly fictional course artwork, never a live
queue. FCFS and Quick Enquiries figures come from the existing site simulator
at build time, not a second algorithm or the verification-only reference file.
The comparison illustrates a trade-off on fixed synthetic tickets, not a winner.

The four windows use the full content width, with four/two/one columns across
wide/medium/mobile screens. They must not inherit the prose list width cap or
split stage titles inside words. Styles are scoped to the homepage; SlopU
identity, tokens, collections, generated API and existing course links remain.
