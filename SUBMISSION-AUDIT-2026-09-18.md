# Assignment 2 submission audit — 18 September 2026

This is an agent-performed review, not a grade or evidence of student testing.
Sources: [Assignment 2](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/assessments/assignment-2/)
and the [shared assessment rubric](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/),
read on the audit date.

## Requirements and evidence

| Requirement | Repository evidence | Status |
| --- | --- | --- |
| Niche semester course with twelve dated weeks | SLOP2516; twelve lecture/lab pairs; Measure, Choose, Communicate, Defend | Present; quality also needs reading |
| Preserve assigned identity and platform | Suffix 516; SlopU brand retained; `astro.config.ts` and `src/content.config.ts` unchanged against initial commit `3425d6` | Checked |
| A lecture links a substantive deck | Week 1 links ten slides introducing the case, its argument and the first exercise | Present; twelve decks are not required |
| Assessment totals 100% | Queue Autopsy 20%, Policy Trial 30%, The Honest Queue 50% | Checked by course spec |
| Own checks beyond starter | Four authored suites documented in `spec/README.md` | Present; not a proxy for teaching quality |
| Process and evolving harness | PROCESS, CLAUDE, course research and cited history | Eight references resolve; about 558 narrative words excluding heading and draft note |
| Public deployed artefact | Public GitHub Pages site; successful workflow linked below | Published after author approval |

## Reading and corrections

Commit [`87a94e7`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-shuyangyuzu-cmd/commit/87a94e7)
records the changes in this section. The first observation activity and its deck now surface the already approved
accessible-record route. The analytical task remains the same, with the source
identified. Week 6 now treats unchecked priority declarations as an incentive,
not proof that everyone will exploit the lane. Its later audit therefore still
has something to investigate instead of confirming a foregone conclusion.

The earlier Week 2/3 quantity corrections, Week 9 departure-time sensitivity
and Week 10 association limits remain central to the course's position: a
service can improve its reported story without improving everyone's wait.
The final written specification asks learners to defend a cost, not find an
unqualified winning policy. This supports a coherent response; it does not
establish an HD mark or demonstrated learning outcomes.

## Validation

The final `pnpm check` on the content in `87a94e7` passed: 103 tests across five
files, 38 built pages, zero type errors, no detected accessibility violations,
no broken links, base-path checks passed, and the course API generated again
(30 nodes, 28 edges, 31 files). The earlier missing API was a failed local
build, not a missing source feature. Google font metadata remained unavailable;
fallback fonts were used. The existing unused-parameter hint remains.

Local browser inspection covered the changed Week 1 lab, Week 6 lecture and
Week 1 deck at 1920 by 1080 and 390 by 844. The approved-record route was
present in the rendered activity and deck; the conditional incentive claim
was present in the final Week 6 build. The changed pages were readable in
viewport screenshots. The revised slide was reached by keyboard, fit both
viewports and had no horizontal text overflow. No new server was started or
stopped. These checks used the in-app browser, not a deployed Chrome session.

The evidence check passes. Following author review and approval, commit
[`df7e2a9`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-shuyangyuzu-cmd/commit/df7e2a9)
replaced the pending-review note with a reviewed-and-adopted acknowledgement
of agent assistance. Commit validity alone does not establish authorship.

## Publication and live verification

The author approved publication after being told it exposes the repository
and full history. The repository was made public, GitHub Pages was enabled
with the existing workflow, and main was pushed without rewriting history.
[Workflow 35355386618](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-shuyangyuzu-cmd/actions/runs/35355386618)
completed successfully for `df7e2a9`: build/spec, evidence, both secret scans,
deployment and the online check passed.

The [live course](https://comp4020-agentic-coding-studio.github.io/comp4020-ass2-shuyangyuzu-cmd/)
returned HTTP 200 for the homepage, lectures 1 and 6, lab 9, The Honest Queue,
Week 1 deck, policies, Policy Lab and the generated API. These HTTP checks
establish availability, not visual quality.

In-app browser viewport screenshots confirmed the live homepage at 1920 by
1080 and 390 by 844. In the live Policy Lab, System Shock / Priority Lane
remained selected when resized from desktop to phone, retaining mean 5.83,
maximum 12 and three overtaking events. ArrowLeft changed the policy to Quick
Enquiries, displaying mean 5.67, maximum 12 and four overtaking events with a
visible keyboard focus outline. The phone document had no horizontal overflow.
The initial accessibility-tree calls timed out; documented Playwright browser
operations succeeded. This was not a Chrome-specific or controlled slow-network
test. Viewport overrides were reset afterwards.

## Remaining submission gates

- Verify the deployed URL in Chrome at 1920 by 1080 and 390 by 844, including
  keyboard use, a resize during interaction and a slow connection. Earlier
  local and live in-app browser checks support this but do not replace the
  specified browser and controlled network test.

The official deadline is noon on 21 September 2026. The shared rules identify
the deployed state of the last commit pushed to main by the deadline as the
submission; a local commit alone does not submit the assignment.
