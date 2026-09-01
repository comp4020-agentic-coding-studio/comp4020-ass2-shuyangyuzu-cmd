import type { CourseMetaInput } from "astro-course-university";
import { z } from "astro/zod";

// The level digits ANU uses: 1000--4000 undergraduate, 6000 and 8000
// postgraduate. Both the code pattern and the level field derive from this.
const LEVELS = [1, 2, 3, 4, 6, 8] as const;
const allowedCode = new RegExp(`^SLOP[${LEVELS.join("")}]\\d{3}$`);

export const slopCourseMetaSchema = z
  .strictObject({
    code: z.string().regex(allowedCode, {
      message: "use SLOP plus a 1000–4000, 6000 or 8000 level code",
    }),
    title: z.string().trim().min(1).max(100),
    session: z.string().trim().min(1).max(40),
    year: z.number().int().min(2026).max(2200),
    level: z.literal(LEVELS),
    startDate: z.iso.date(),
    endDate: z.iso.date(),
    description: z.string().trim().min(80).max(300),
    tags: z.array(z.string().trim().min(2).max(24)).min(1).max(3),
  })
  .superRefine((course, ctx) => {
    const codeLevel = Number(course.code.at(4));
    if (course.level !== codeLevel) {
      ctx.addIssue({
        code: "custom",
        path: ["level"],
        message: `must match ${course.code}'s first digit (${codeLevel})`,
      });
    }
    if (course.startDate > course.endDate) {
      ctx.addIssue({
        code: "custom",
        path: ["startDate"],
        message: "must not be after endDate",
      });
    }
  });

// The single source of truth for the course record. The generated homepage,
// navigation label and /api/index.json all read this object.
//
// The code's last three digits were assigned to this repo when it was
// provisioned, and no other course in the cohort has them; only the level
// digit changed, from the starter's 1 to this course's 2.
export const courseMeta = slopCourseMetaSchema.parse({
  code: "SLOP2516",
  title: "Your Call Is Important to Us",
  session: "Semester 1",
  year: 2027,
  level: 2,
  startDate: "2027-02-22",
  endDate: "2027-05-28",
  description:
    "Everybody waits, but not equally. This course studies queues as " +
    "designed systems, using SlopU's Office of Everything as a running " +
    "case, to learn what waiting measures, who it favours, and how a " +
    "service should speak about it.",
  tags: ["queueing", "service design", "fairness"],
}) satisfies CourseMetaInput;
