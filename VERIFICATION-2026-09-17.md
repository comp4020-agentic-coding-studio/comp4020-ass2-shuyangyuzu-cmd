# Local curriculum and interface review — 17 September 2026

This is an agent verification record, not the author-owned PROCESS.md or a
claim that the assignment is ready to submit.

## Scope

- Connected Policy Lab to weeks 6, 7, 10, 11 and 12 and both later assessments.
- Corrected week 7 assessment alignment, the week 9 denominator and missing
  departure-time reasoning, and the limits of the week 10/11 comparison.
- Preserved all fixed datasets, simulation rules, nine reference results,
  assessment weights, collections, schemas, APIs, dependencies and build config.
- Applied Office case-file styling through the existing shared layout and
  theme components, including a new authored SVG, course register, four-stage
  overview, file numbers and Policy Lab metric/service-order presentation.
- Added initialization on Astro page-load and browser pageshow so the Lab can
  be revisited without stale controls or duplicated change listeners.

## Automated verification

The full pnpm check pipeline passed: 35 files typechecked with zero errors,
38 pages built, no detected accessibility violations, no broken internal
links, base-path checks passed, one deck passed structural checks, and all
103 existing tests across five files passed. There is one pre-existing unused
parameter hint in policy-lab/run.mjs. Google font metadata requests timed out;
the local build uses the theme's fallback font stack. This matters for visual
comparison with a deployment where the intended fonts load successfully.

The evidence check still fails on the untouched PROCESS.md template comment
and the nonexistent placeholder citations a1b2c3d and e4f5a6b. This is known
unfinished submission work, not an evidence-check pass.

## Actual browser checks

The production build was served locally at its real base path using a
loopback-only static server. Initial Astro preview background processes did
not remain usable; this is not a deployment or a build-config modification.

- Homepage and Policy Lab inspected at 1920 x 1080 and 390 x 844. DOM viewport
  measurements confirmed dimensions and no page-wide horizontal overflow.
- Mobile navigation opened and followed to Policy Lab; the menu closed after
  navigation. Lectures listing also inspected on mobile.
- All nine scenario/policy combinations selected in the browser: displayed
  mean, median, maximum, wait-over-five count and overtaking total matched the
  contract values; the Normal Day ledger had eight rows, the others six.
- Arrow-key policy selection changed both checked state and results. A visible
  focus outline was inspected. Reset restored Normal Day / FCFS.
- Compare-all disclosure opened with the three correct Normal Day results.
  Wide tables were contained in horizontally scrollable wrappers on mobile.
- Navigated away to Lectures and back to Policy Lab, then selected
  High-declaration Day / Quick Enquiries: displayed mean 9.17, maximum 23,
  overtaking 6. Reload returned controls and results consistently to defaults.
- Mobile review caught index-page descriptions preceding headings. The shared
  wrapper now supports an explicit pageHeading for those three index pages.
  Rebuilt and reloaded the mobile Lectures page: heading now precedes lead.

## Reference and limits

The user-supplied Partner Photography homepage was inspected in the browser:
https://comp4020-agentic-coding-studio.github.io/comp4020-ass2-lyclccylcq/
Its strong title hierarchy and thematic line drawing were visual references;
no source code, copy or artwork was copied. Its design is not evidence of
what the assignment permits. The SlopU platform remains unchanged here.

This pass did not test with a screen reader, with JavaScript disabled in a
real browser, or under every browser/OS/font combination. Static fallback
tables remain in the generated HTML. No claim of comprehensive accessibility
conformance follows from the automated report or the keyboard spot check.
Dark-mode visual review, verified academic references, author-written process
evidence and deployment remain separate work. Nothing was pushed or deployed.

The first content commit exposed missing grep/cut utilities in the sandboxed
hook environment. The unchanged credential guard was rerun successfully with
Git for Windows utilities available outside that sandbox. No hook was bypassed
or disabled. The visual commit uses that same working environment.
