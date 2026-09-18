# Alignment review verification — 18 September 2026

This is Codex's verification record, not a student reflection or a claim of
measured educational effectiveness. Research provenance is in COURSE-RESEARCH.md.

## Numerical review

The unchanged Week 2 sample is 2, 3, 3, 2, 4, 3, 2, 26, 3, 2 waiting minutes.
Its sum is 50, count 10, mean 5 and median 3. Omitting the single 26-minute
wait leaves sum 24, count 9, mean 8/3 and median 3. These are sample summaries,
not estimates of the effect of changing service.

Week 3 now identifies a separate service log. With first service duration 26,
the nine later waits are 25, 25, 26, 27, 27, 28, 29, 29, 30: total 246 and
mean 82/3. Shortening that service to 2 with all arrivals and other durations
fixed gives 1, 1, 2, 3, 3, 4, 5, 5, 6: total 30 and mean 10/3. Each later wait
falls by 24; the total reduction is 216 waiting minutes. These were independently
recomputed using a small Python FCFS calculation, not the Policy Lab module.
The latter module and its fixed scenarios were not changed.

## Semantic review

- Week 2 does not claim nobody waited 4 minutes or imply the ten-ticket sample
  proves a monthly mean. Waiting duration remains distinct from service duration.
- Week 3 Part A rehearses the Queue Autopsy; Part B introduces a separate
  intervention. Neither implies that deleting a record removes a real delay.
- Queue Autopsy accepts an ordinary longest wait and approved accessible
  observation records. It does not require a fabricated outlier.
- Week 12, its lab and the final assessment distinguish written assessment
  from formative oral or written objections.
- The homepage and policies explain consolidation after the twelve teaching
  weeks without adding another assessment or changing existing due dates.

## Verification status

Final `pnpm check` passed: 103 tests across five files, 38 pages, zero type
errors, no detected accessibility violations, no broken links and all internal
links respecting the base. Google font metadata timed out and fallback fonts
were used. The existing unused-parameter hint remains.

Actual local browser inspection confirmed the revised Week 3 lab and homepage
at measured 390 by 844 with no document overflow. This is not a deployed Chrome
audit. Further deck inspection found mobile slides too small when scaled from
the landscape canvas; that issue is separate follow-up work, not a pass.

GitHub reports the repository PRIVATE; the Pages API returned 404. No push or
publication occurred. A replacement loopback preview was started after the old
one was unavailable: Python PID 7384, tool session 83528, port 4326. No unrelated
process was stopped.

## Follow-up deck verification

The deck stylesheet now uses the phone viewport as the reading canvas below
600px, while retaining the landscape Reveal canvas on desktop. The opening
slide's kicker and question are separate lines so the desktop subtitle cannot
run past the slide edge. With the local preview at measured 1920 by 1080 and
390 by 844, the opening slide had no element outside the viewport; the mobile
slide text was readable and the slide remained keyboard navigable. The preview
is local only and does not substitute for the required deployed Chrome review.
