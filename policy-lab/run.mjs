// Runs both independent simulators (sim-event-queue.mjs and
// sim-time-step.mjs) over all 3 scenarios x 3 policies from data.mjs,
// asserts they agree on every ticket, computes aggregate metrics, and
// writes the combined output to policy-lab/results.json.
//
// Usage: node policy-lab/run.mjs
//
// This script — and everything else in policy-lab/ — is verification
// tooling for POLICY-LAB-CONTRACT.md. It is deliberately kept out of
// src/ and unrelated to any future on-site Queue Policy Lab simulator;
// nothing here is imported by the Astro site.

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { POLICIES, SCENARIOS } from "./data.mjs";
import { simulateEventQueue } from "./sim-event-queue.mjs";
import { simulateTimeStep } from "./sim-time-step.mjs";

const here = dirname(fileURLToPath(import.meta.url));

function ticketsEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    const x = a[i];
    const y = b[i];
    if (x.id !== y.id || x.start !== y.start || x.completion !== y.completion || x.wait !== y.wait) {
      return false;
    }
  }
  return true;
}

// "Overtaking": for ticket T, the number of other tickets that arrived
// strictly after T but started service strictly before T — i.e. how many
// later arrivals overtook T. Ties on arrivalMinute never count. FCFS is
// arrival order, so it is always zero there by construction; Quick
// Enquiries and Priority Lane can both produce overtaking because they
// reorder by something other than arrival time.
function withServiceOrderAndOvertaking(tickets) {
  const byStart = [...tickets].sort((a, b) => a.start - b.start);
  const orderById = new Map(byStart.map((t, i) => [t.id, i + 1]));

  return tickets.map((t) => {
    const overtaking = tickets.filter(
      (other) => other.id !== t.id && other.arrivalMinute > t.arrivalMinute && other.start < t.start,
    ).length;
    return { ...t, serviceOrder: orderById.get(t.id), overtaking };
  });
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;
  const mid = Math.floor(n / 2);
  const m = n % 2 === 1 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  return Math.round(m * 100) / 100;
}

function aggregate(tickets, closedWindow) {
  const waits = tickets.map((t) => t.wait);
  const lastCompletion = Math.max(...tickets.map((t) => t.completion));
  const totalService = tickets.reduce((sum, t) => sum + (t.completion - t.start), 0);
  const mean = waits.reduce((sum, w) => sum + w, 0) / waits.length;
  return {
    meanWaitMinutes: Math.round(mean * 100) / 100,
    medianWaitMinutes: median(waits),
    maxWaitMinutes: Math.max(...waits),
    waitOver5Count: waits.filter((w) => w > 5).length,
    overtakingTotal: tickets.reduce((sum, t) => sum + t.overtaking, 0),
    makespanMinutes: lastCompletion,
    idleMinutes: lastCompletion - totalService,
  };
}

const report = {};
let allAgree = true;

for (const [scenarioName, { tickets, closedWindow }] of Object.entries(SCENARIOS)) {
  report[scenarioName] = {};
  for (const policy of POLICIES) {
    const a = simulateEventQueue(tickets, policy, closedWindow);
    const b = simulateTimeStep(tickets, policy, closedWindow);
    const agree = ticketsEqual(a, b);
    if (!agree) allAgree = false;

    const perTicket = withServiceOrderAndOvertaking(a);

    report[scenarioName][policy] = {
      agree,
      perTicket,
      aggregate: aggregate(perTicket, closedWindow),
    };

    console.log(`${scenarioName} / ${policy}: ${agree ? "AGREE" : "DISAGREE"}`);
    if (!agree) {
      console.log("  event-queue:", JSON.stringify(a));
      console.log("  time-step:  ", JSON.stringify(b));
    }
  }
}

writeFileSync(join(here, "results.json"), JSON.stringify(report, null, 2) + "\n");

console.log("");
console.log(allAgree ? "All nine combinations agree between both simulators." : "DISAGREEMENT FOUND — see above.");
process.exitCode = allAgree ? 0 : 1;
