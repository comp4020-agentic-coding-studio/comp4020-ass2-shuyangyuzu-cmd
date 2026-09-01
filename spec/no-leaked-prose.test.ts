import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

// A prior pass shipped public pages that read every STARTER_CONTENT marker
// removed and check:evidence green, while still telling the reader how the
// `sessions` collection was named, where frontmatter lived, or what a
// template author meant a slot for (see CLAUDE.md's "removing STARTER_CONTENT
// markers... is not proof the starter is gone"). These are the exact
// fragments that leaked; this test only guards against their literal return,
// not tone, originality or the strength of any claim.

const listHtmlFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) return listHtmlFiles(full);
    return full.endsWith(".html") ? [full] : [];
  });

const distDir = resolve("dist");
const pages = listHtmlFiles(distDir).map((path) => ({
  path,
  html: readFileSync(path, "utf8"),
}));

const forbiddenFragments = [
  "Every lecture the course claims to run",
  "The internal collection and URL stay",
  "src/site-config.ts",
  "Weights should sum to 100",
  "What you bring to the session. Written so",
  "The brief poses the problem and leaves room for a response",
  "connects lectures to the sessions and assessments they feed",
];

describe("no leaked developer-facing prose in built public pages", () => {
  it("built at least one page to check", () => {
    expect(pages.length).toBeGreaterThan(0);
  });

  for (const fragment of forbiddenFragments) {
    it(`never renders the fragment: "${fragment}"`, () => {
      const offenders = pages.filter((page) => page.html.includes(fragment));
      expect(
        offenders.map((page) => page.path),
        `found starter/developer-facing fragment "${fragment}" in built HTML`,
      ).toEqual([]);
    });
  }
});
