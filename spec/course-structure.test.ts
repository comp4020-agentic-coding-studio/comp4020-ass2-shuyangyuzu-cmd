import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface ApiNode {
  id: string;
  type: string;
  title: string;
  meta?: Record<string, unknown>;
}

interface ApiEdge {
  from: string;
  to: string;
}

interface CourseApi {
  course: {
    code: string;
    title: string;
    level: number;
  };
  nodes: ApiNode[];
  edges: ApiEdge[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;

const nodesOfType = (type: string) => api.nodes.filter((node) => node.type === type);
const weekOf = (node: ApiNode) => Number(node.meta?.week);
const weeksOneToTwelve = Array.from({ length: 12 }, (_, i) => i + 1);
const hasEdge = (a: string, b: string) =>
  api.edges.some((edge) => (edge.from === a && edge.to === b) || (edge.from === b && edge.to === a));

// The build already fails on a dangling `related:` ref (README.md) and on any
// content that doesn't parse against content.config.ts's schemas. What it
// can't check is whether the *set* of published weeks and assessments still
// matches the twelve-week, three-assessment shape COURSE-DESIGN.md commits to.

describe("twelve-week structure", () => {
  const lectures = nodesOfType("lectures");
  const sessions = nodesOfType("sessions");

  it("publishes exactly twelve lecture weeks, numbered 1 to 12", () => {
    expect(lectures.map(weekOf).sort((a, b) => a - b)).toEqual(weeksOneToTwelve);
  });

  it("publishes exactly twelve Queue Lab weeks, numbered 1 to 12", () => {
    expect(sessions.map(weekOf).sort((a, b) => a - b)).toEqual(weeksOneToTwelve);
  });

  it("gives every lecture a same-week Queue Lab, linked via related:", () => {
    for (const lecture of lectures) {
      const week = weekOf(lecture);
      const session = sessions.find((candidate) => weekOf(candidate) === week);
      expect(session, `lecture week ${week} has no matching Queue Lab`).toBeDefined();
      expect(
        hasEdge(lecture.id, session!.id),
        `${lecture.id} and ${session!.id} are not connected by related:`,
      ).toBe(true);
    }
  });

  it("links at least one published lecture to a real, built slide deck", () => {
    const withSlides = lectures.filter((lecture) => typeof lecture.meta?.slides === "string");
    expect(withSlides.length).toBeGreaterThanOrEqual(1);
    for (const lecture of withSlides) {
      const deckPath = resolve("dist", `.${lecture.meta!.slides as string}`, "index.html");
      expect(existsSync(deckPath), `${lecture.id} links to a deck that was not built at ${deckPath}`).toBe(
        true,
      );
    }
  });
});

describe("assessments", () => {
  const assessments = nodesOfType("assessments");

  it("has exactly the three assessments this course was designed around, at their agreed weights", () => {
    const byTitle = Object.fromEntries(assessments.map((a) => [a.title, a.meta?.weight]));
    expect(byTitle).toEqual({
      "Queue Autopsy": 20,
      "Policy Trial": 30,
      "The Honest Queue": 50,
    });
  });

  it("sums assessment weights to exactly 100", () => {
    const total = assessments.reduce((sum, a) => sum + Number(a.meta?.weight), 0);
    expect(total).toBe(100);
  });
});

describe("course identity", () => {
  it("keeps the repo-assigned code suffix and agrees with its own level digit", () => {
    // README.md: "Its last three digits were allocated to this repo and no
    // other course in the cohort has them, so keep them; the first digit is
    // the level."
    expect(api.course.code).toMatch(/^SLOP\d516$/);
    expect(Number(api.course.code.at(4))).toBe(api.course.level);
  });

  it("replaces the starter's placeholder course title and code", () => {
    expect(api.course.title).not.toBe("Course Title Goes Here");
    expect(api.course.code).not.toBe("SLOP1000");
  });

  it("removes the starter's placeholder content nodes", () => {
    const ids = api.nodes.map((node) => node.id);
    expect(ids).not.toEqual(
      expect.arrayContaining([
        "sessions/01-getting-started",
        "sessions/02-first-review",
        "assessments/assignment-1",
        "assessments/final-project",
      ]),
    );
  });
});
