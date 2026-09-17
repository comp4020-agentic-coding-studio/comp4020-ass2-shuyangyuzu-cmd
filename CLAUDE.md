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
  and "my"; never refer to me as "the student." Assisted drafting must
  distinguish my directions from actions or checks performed by an agent.
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
- **Process assistance authorised on 18 September 2026.** At my explicit
  request, the agent may organise an English PROCESS.md draft using my
  recorded instructions and verified commit evidence. This supersedes the
  earlier template-only instruction. Do not invent personal experiences,
  decisions, prompts, research, screenshots or checks; name agent-performed
  verification as such. Keep the draft's review status visible until I have
  reviewed and adopted it. A green evidence check verifies citations, not
  authorship, reflective quality or permission to submit.
- **Removing `STARTER_CONTENT` markers and a green `check:evidence` is not
  proof the starter is gone.** Both check for specific, narrow conditions —
  a marker comment absent here, a file hash different there — not that the
  authored prose a student actually reads has been rewritten. A page can
  clear both checks while still telling the reader how the collection is
  named, where the frontmatter lives, or what a template author meant a slot
  for. Before accepting a course-site replacement as finished, read every
  public index page and every shared dynamic page shell (the `[slug].astro`
  files that render a whole collection) start to finish, as a student would.
  No public page may expose implementation instructions, collection names,
  source paths, frontmatter syntax, or template guidance meant for the
  person building the course site — that belongs in code comments and
  `README.md`, never in what gets rendered.
- **Stopping a server means stopping the one process you started, by PID,
  never a name-matched sweep.** A prior session ran `taskkill /IM node.exe
  /F` to stop a preview server it had started and killed every Node process
  on the machine instead, including whatever else the user had running.
  That failure mode is specifically what this rule closes: when starting any
  long-running server (`pnpm preview`, `pnpm dev`, or similar), record the
  exact PID or tool-owned background-task ID it started under before doing
  anything else with it. Before stopping it, confirm that recorded PID is
  still the same process (re-check it belongs to this repo's server, not a
  PID the OS has since reused for something else) and stop only that exact
  PID or task ID — `TaskStop` on the specific task, or a PID-targeted kill,
  never `taskkill /IM node.exe`, `pkill node`, `killall node`, or any other
  command that matches by process name rather than by the one PID you
  recorded. If you can't confirm which PID is yours, ask rather than
  guessing with a broader command.
