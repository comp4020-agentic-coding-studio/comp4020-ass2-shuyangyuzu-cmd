import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

// The Week 10 Priority Lane dataset supports a category-share comparison and
// one whole-population wait-time association. It does not support a
// per-category minute-savings figure, a causal reading of that association,
// a verdict on whether any declaration was truthful, or a conclusion that
// the lane "measures urgency." A prior pass phrased the Queue Lab as if the
// data supported all of those; this test guards against that overreach
// returning, and separately checks the revised page actually keeps the
// three permitted claim types visibly distinct rather than merging them
// back into one undifferentiated finding.

const listHtmlFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) return listHtmlFiles(full);
    return full.endsWith(".html") ? [full] : [];
  });

const distDir = resolve("dist");
const allPages = listHtmlFiles(distDir).map((path) => ({
  path,
  html: readFileSync(path, "utf8"),
}));

const sessionPage = readFileSync(resolve("dist/sessions/week-10/index.html"), "utf8");
const lecturePage = readFileSync(resolve("dist/lectures/week-10/index.html"), "utf8");

const forbiddenClaims = [
  "what declaring urgency is actually worth",
  "the incentive every requester has",
  "how much waiting time that category is saving",
  "is measuring urgency or something else",
];

describe("Week 10 audit does not overclaim beyond what the released data supports", () => {
  for (const claim of forbiddenClaims) {
    it(`never renders the unsupported claim: "${claim}"`, () => {
      const offenders = allPages.filter((page) => page.html.includes(claim));
      expect(
        offenders.map((page) => page.path),
        `found an unsupported causal/category-specific claim ("${claim}") in built HTML`,
      ).toEqual([]);
    });
  }

  it("keeps the category-share comparison visibly distinct from the aggregate wait-time association", () => {
    expect(sessionPage).toContain("category-share analysis");
    expect(sessionPage).toContain("aggregate wait-time association");
  });

  it("names what evidence is missing, distinct from either claim above", () => {
    expect(sessionPage).toContain("name what’s missing");
  });

  it("states plainly, in the lecture, that the wait-time association is not evidence of what caused it", () => {
    expect(lecturePage).toContain("is not evidence of what caused it");
  });

  it("labels the six-minute figure as a whole-population average, not a per-category one, on both pages", () => {
    expect(sessionPage).toContain("whole-population");
    expect(lecturePage).toContain("whole Priority Lane population");
  });
});
