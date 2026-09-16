import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  POLICIES,
  SCENARIOS,
  simulate,
  type PolicyName,
  type ScenarioName,
} from "../src/lib/policy-lab/simulate";

// POLICY-LAB-CONTRACT.md's own two independently written calculation paths
// (policy-lab/sim-event-queue.mjs, policy-lab/sim-time-step.mjs) already
// cross-checked these nine result sets against each other; policy-lab/run.mjs
// wrote the agreed values to results.json. This spec checks the third,
// separately written implementation — the site's src/lib/policy-lab/simulate.ts
// — against that same fixed reference, so all three paths agree.

interface ReferencePerTicket {
  id: string;
  arrivalMinute: number;
  start: number;
  completion: number;
  wait: number;
  serviceOrder: number;
  overtaking: number;
}

interface ReferenceAggregate {
  meanWaitMinutes: number;
  medianWaitMinutes: number;
  maxWaitMinutes: number;
  waitOver5Count: number;
  overtakingTotal: number;
  makespanMinutes: number;
  idleMinutes: number;
}

interface ReferencePolicyResult {
  agree: boolean;
  perTicket: ReferencePerTicket[];
  aggregate: ReferenceAggregate;
}

type ReferenceResults = Record<ScenarioName, Record<PolicyName, ReferencePolicyResult>>;

const reference = JSON.parse(
  readFileSync(resolve("policy-lab/results.json"), "utf8"),
) as ReferenceResults;

const SCENARIO_NAMES = Object.keys(SCENARIOS) as ScenarioName[];

describe("Policy Lab simulator matches the verified reference results", () => {
  for (const scenarioName of SCENARIO_NAMES) {
    const { tickets, closedWindow } = SCENARIOS[scenarioName];

    for (const policy of POLICIES) {
      const result = simulate(tickets, closedWindow, policy);
      const ref = reference[scenarioName][policy];

      describe(`${scenarioName} / ${policy}`, () => {
        it("was itself agreed by the contract's two reference simulators", () => {
          expect(ref.agree).toBe(true);
        });

        it("matches every ticket's serviceOrder, start, completion, wait and overtaking", () => {
          expect(result.tickets).toHaveLength(ref.perTicket.length);

          const byId = new Map(result.tickets.map((ticket) => [ticket.id, ticket]));
          for (const expected of ref.perTicket) {
            const actual = byId.get(expected.id);
            expect(actual, `missing ticket ${expected.id}`).toBeDefined();
            expect(actual!.arrivalMinute, `${expected.id} arrivalMinute`).toBe(expected.arrivalMinute);
            expect(actual!.serviceOrder, `${expected.id} serviceOrder`).toBe(expected.serviceOrder);
            expect(actual!.start, `${expected.id} start`).toBe(expected.start);
            expect(actual!.completion, `${expected.id} completion`).toBe(expected.completion);
            expect(actual!.wait, `${expected.id} wait`).toBe(expected.wait);
            expect(actual!.overtaking, `${expected.id} overtaking`).toBe(expected.overtaking);
          }
        });

        it("matches the reference aggregate: mean, median, max, wait>5 count, overtaking total", () => {
          // results.json's meanWaitMinutes is rounded to 2 decimal places.
          expect(Math.round(result.summary.meanWait * 100) / 100).toBe(ref.aggregate.meanWaitMinutes);
          expect(result.summary.medianWait).toBe(ref.aggregate.medianWaitMinutes);
          expect(result.summary.maxWait).toBe(ref.aggregate.maxWaitMinutes);
          expect(result.summary.waitOverFiveCount).toBe(ref.aggregate.waitOver5Count);
          expect(result.summary.overtakingTotal).toBe(ref.aggregate.overtakingTotal);
        });
      });
    }
  }
});

describe("Policy Lab simulator invariants (all nine scenario x policy combinations)", () => {
  for (const scenarioName of SCENARIO_NAMES) {
    const { tickets, closedWindow } = SCENARIOS[scenarioName];

    for (const policy of POLICIES) {
      const result = simulate(tickets, closedWindow, policy);

      describe(`${scenarioName} / ${policy}`, () => {
        it("serves every ticket exactly once", () => {
          const ids = result.tickets.map((ticket) => ticket.id).sort();
          expect(ids).toEqual([...tickets.map((ticket) => ticket.id)].sort());

          const serviceOrders = result.tickets.map((ticket) => ticket.serviceOrder).sort((a, b) => a - b);
          expect(serviceOrders).toEqual(tickets.map((_, index) => index + 1));
        });

        it("never starts a ticket before it arrives", () => {
          for (const ticket of result.tickets) {
            expect(ticket.start).toBeGreaterThanOrEqual(ticket.arrivalMinute);
          }
        });

        it("never produces a negative wait", () => {
          for (const ticket of result.tickets) {
            expect(ticket.wait).toBeGreaterThanOrEqual(0);
            expect(ticket.wait).toBe(ticket.start - ticket.arrivalMinute);
          }
        });

        it("keeps the single service desk's intervals non-overlapping", () => {
          const byStart = [...result.tickets].sort((a, b) => a.start - b.start);
          for (let i = 1; i < byStart.length; i++) {
            expect(byStart[i].start).toBeGreaterThanOrEqual(byStart[i - 1].completion);
          }
        });

        it("counts overtaking as strictly-later arrivals that started strictly earlier", () => {
          for (const ticket of result.tickets) {
            const expectedOvertaking = result.tickets.filter(
              (other) => other.arrivalMinute > ticket.arrivalMinute && other.start < ticket.start,
            ).length;
            expect(ticket.overtaking).toBe(expectedOvertaking);
          }
        });

        if (scenarioName === "System Shock") {
          it("never begins a new service inside the closed window [6, 10)", () => {
            for (const ticket of result.tickets) {
              const startsInWindow = ticket.start >= closedWindow![0] && ticket.start < closedWindow![1];
              expect(startsInWindow, `${ticket.id} started at ${ticket.start}`).toBe(false);
            }
          });
        }
      });
    }
  }
});

describe("System Shock closed window: hand-checked FCFS timeline", () => {
  // Traceable to POLICY-LAB-CONTRACT.md's "Hand-checked timeline: System
  // Shock, FCFS" section: SS02's service starts before minute 6 and is
  // allowed to run uninterrupted to completion inside the closed window,
  // then the desk sits idle until minute 10 before SS03 can start.
  const { tickets, closedWindow } = SCENARIOS["System Shock"];
  const result = simulate(tickets, closedWindow, "FCFS");
  const byId = new Map(result.tickets.map((ticket) => [ticket.id, ticket]));

  it("lets a ticket already in service finish inside the closed window", () => {
    const ss02 = byId.get("SS02")!;
    expect(ss02.start).toBe(4);
    expect(ss02.completion).toBe(7);
  });

  it("holds the desk idle through the window and resumes exactly at minute 10", () => {
    const ss03 = byId.get("SS03")!;
    expect(ss03.start).toBe(10);
  });
});
