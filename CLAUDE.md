# Harness

This is the working harness for SLOP2516, *Your Call Is Important to Us*. It
carries forward what still applies from earlier work, plus the rules this
course needs. The platform is fixed and documented in `README.md`; the
[course website](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/)
publishes the Assignment 2 brief and shared rubric. The design contract this
course was built against is `COURSE-DESIGN.md`; a change to the course's
premise, progression or claim goes there first, not straight into content.

## Rules carried forward

- Before adding a spec test, trace it to either a line in the published spec,
  the Assignment 2 brief, or an explicit decision recorded in
  `COURSE-DESIGN.md`. Don't invent a requirement because it would be easy to
  test.
- When writing `PROCESS.md` or other first-person project evidence, use "I"
  and "my"; never refer to me as "the student." (This repo's `PROCESS.md` is
  left as the template for me to write myself — the agent does not write it.)
- Never convert a subjective reaction into a factual claim. That discipline
  now has a sharper edge on this repo: see the synthetic-vs-real rule below.

## Course-specific rules

- **One claim, twelve weeks.** Every week's content should visibly serve the
  course claim — waiting allocates service, risk, attention and priority, it
  isn't just absence of service — either by building a tool to see that claim
  at work or by testing it against a harder case. If a week's page doesn't
  connect back to the claim in its own words, rewrite it rather than adding a
  generic transition sentence.
- **Real claims vs. SlopU case material, always distinguishable.** The Office
  of Everything is a running fictional case, not evidence about real queueing
  systems. Anything presented as an Office of Everything memo, ticket log,
  complaint or dataset must read as obviously part of that fiction (named,
  dated within the SlopU semester, framed as "a file" or "a memo"). Anything
  offered as a real-world claim must be something I can actually stand behind
  without a citation — general, well-known and stated plainly — never a
  specific statistic, study result or named law dressed up as fact.
- **No invented citations, studies, statistics or laws.** If a week wants the
  authority of research to make its point, it doesn't get to invent one:
  either the point stands on plain reasoning about the synthetic case, or it
  waits for a future pass that does real research and cites it properly.
- **Every week is a new decision, not a reskin.** Before finishing a week,
  check it against the two nearest weeks: if the Queue Lab activity is
  "repeat last week's method on a new noun," it's not done. A later week must
  require something a student couldn't have done in week 1 — a rule choice, a
  policy tradeoff, an audit, a defence.
- **Deadpan institutional voice.** Course prose reads like a real (if odd)
  university wrote it: measured, a little bureaucratic, taking its own
  premise completely seriously. The satire is in what the institution
  believes, not in jokey copywriting. No exclamation points, no "hey there,"
  no marketing superlatives.
- **Automated checks confirm consistency, not quality.** `spec/` can verify
  twelve weeks exist, links resolve, weights sum to 100 — mechanical facts.
  Whether a week's question is actually interesting, or the Office of
  Everything case actually holds together, is a human call at review. Don't
  write a test to launder a subjective judgement into a green check.
- **Look at both viewports before calling a page done.** Inspect rendered
  pages at 1920×1080 and at 390×844 — a page that reads well on one and
  breaks on the other isn't finished.
- **The SlopU brand is fixed; build on it, don't fork it.** New visual motifs
  (ticket stubs, counter windows, status boards, stamps) are accents layered
  on the existing theme components and `--at-*` tokens, applied through
  `PageLayout.astro` or plain markdown — never a parallel stylesheet, a new
  font, or a component that duplicates what `Card`, `Callout` or `Hero`
  already do.
- **`PROCESS.md` stays the template.** The agent does not write the final
  process account or fabricate commit citations, screenshots or reflections
  to make `check:evidence` pass early. Leaving that gate red until the actual
  author writes it is the correct state, not a bug to route around.
