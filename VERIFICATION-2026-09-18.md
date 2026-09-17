# Service Hall homepage verification

Performed by Codex on 18 September 2026. This records checks, not student
reflection or a claim that the course is ready for submission.

## Automated checks

- `pnpm check` passed: zero type errors, 38 built pages, no detected
  accessibility violations, all internal links respect the base path, no
  broken links, one valid deck, 103 tests across five files.
- The build could not fetch Google font metadata and used fallback fonts.
  No font configuration or dependency was changed.
- The homepage imports the existing simulator and Normal Day scenario.
  Rendered FCFS values are 15.88 minutes mean, 43 maximum, zero overtaking
  pairs; Quick Enquiries values are 14.38, 32 and one. These are synthetic,
  scenario-specific results, not universal policy rankings.

## Browser checks

The existing local static preview on port 4326 served the newly built files.
No server was started or stopped for this pass. Browser inspection covered:

- A measured CSS viewport of 1920 by 1080: four full-width teaching windows,
  intact stage names, a two-column introduction and receipt, and no document
  horizontal overflow. Keyboard navigation from a stage link to the next
  produced a visible outline; the focused Defend link was below the header.
- A measured 900 by 900 viewport: two teaching-window columns, no horizontal
  overflow.
- Measured 390 by 843 and 390 by 845 viewports: one teaching-window column,
  intact Communicate title, stacked assessments, no horizontal overflow.
  The course introduction and both primary links precede the receipt and are
  visible in the initial viewport. Browser scaling prevented an exact 844px
  height; the adjacent heights were checked instead.

The full-page screenshot facility produced overlapping stitched segments;
those capture artefacts were not treated as duplicate DOM content. Viewport
screenshots and DOM measurements were used for the layout findings above.
This was a homepage pass, not a repeat of every Policy Lab interaction or a
screen-reader audit. Automated accessibility checks do not replace those.

## Scope

Only homepage presentation, its local layout option, and its design note were
changed. The SlopU marks, palette tokens, course collections, generated API,
theme packages and dependencies were retained. Core homepage content and links
are rendered at build time and do not require client JavaScript.
