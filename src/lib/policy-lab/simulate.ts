// Site-facing Queue Policy Lab simulator.
//
// This module is a standalone TypeScript re-implementation of the rules
// fixed by POLICY-LAB-CONTRACT.md (repo root): three policies, three fixed
// scenarios, the half-open closed window [6, 10) for System Shock, and the
// non-preemptive, event-driven, arrived-tickets-only selection rule. It does
// not import from policy-lab/ — that directory's two simulators
// (sim-event-queue.mjs, sim-time-step.mjs) and its results.json are the
// contract's own cross-checked reference material, kept separate on
// purpose. Any future page renders the Policy Lab through this module, not
// through policy-lab/.

export type PolicyName = "FCFS" | "QUICK_ENQUIRIES" | "PRIORITY_LANE";

export const POLICIES: PolicyName[] = ["FCFS", "QUICK_ENQUIRIES", "PRIORITY_LANE"];

export type ScenarioName = "Normal Day" | "High-declaration Day" | "System Shock";

export interface Ticket {
  id: string;
  category: string;
  arrivalMinute: number;
  serviceMinutes: number;
  declaredPriority: boolean;
}

export interface TicketResult extends Ticket {
  serviceOrder: number;
  start: number;
  completion: number;
  wait: number;
  /** Count of other tickets that arrived strictly later but started strictly earlier. */
  overtaking: number;
}

export interface ScenarioSummary {
  meanWait: number;
  medianWait: number;
  maxWait: number;
  waitOverFiveCount: number;
  overtakingTotal: number;
}

export interface SimulationResult {
  tickets: TicketResult[];
  summary: ScenarioSummary;
}

/** Half-open interval [start, end): the desk may not begin a new ticket while start <= t < end. */
export type ClosedWindow = readonly [number, number];

// Normal Day: the week-06 lab log, given fixed IDs and arrival minutes.
// Categories are this contract's addition (taken from week 10's audit set),
// not a week-06 fact.
const NORMAL_DAY: Ticket[] = [
  { id: "ND01", category: "collect a form", arrivalMinute: 0, serviceMinutes: 5, declaredPriority: false },
  { id: "ND02", category: "collect a form", arrivalMinute: 1, serviceMinutes: 5, declaredPriority: false },
  { id: "ND03", category: "collect a form", arrivalMinute: 2, serviceMinutes: 5, declaredPriority: false },
  { id: "ND04", category: "collect a form", arrivalMinute: 3, serviceMinutes: 5, declaredPriority: false },
  { id: "ND05", category: "collect a form", arrivalMinute: 4, serviceMinutes: 5, declaredPriority: false },
  { id: "ND06", category: "collect a form", arrivalMinute: 5, serviceMinutes: 5, declaredPriority: false },
  { id: "ND07", category: "dispute a printer credit", arrivalMinute: 6, serviceMinutes: 20, declaredPriority: false },
  { id: "ND08", category: "enrolment variation", arrivalMinute: 7, serviceMinutes: 8, declaredPriority: true },
];

// High-declaration Day: most tickets declare priority, including two gaming
// declarations (HD01, HD02) tied on serviceMinutes that must be resolved by
// the arrival-minute tie-break.
const HIGH_DECLARATION_DAY: Ticket[] = [
  { id: "HD01", category: "collect a form", arrivalMinute: 0, serviceMinutes: 5, declaredPriority: true },
  { id: "HD02", category: "collect a form", arrivalMinute: 1, serviceMinutes: 5, declaredPriority: true },
  { id: "HD03", category: "enrolment variation", arrivalMinute: 2, serviceMinutes: 8, declaredPriority: true },
  { id: "HD04", category: "dispute a printer credit", arrivalMinute: 3, serviceMinutes: 20, declaredPriority: false },
  { id: "HD05", category: "collect a form", arrivalMinute: 4, serviceMinutes: 5, declaredPriority: false },
  { id: "HD06", category: "other", arrivalMinute: 5, serviceMinutes: 3, declaredPriority: true },
];

// System Shock: a surge combined with the closed window and rising
// declarations under pressure (SS03, SS05 declare after the surge begins).
const SYSTEM_SHOCK: Ticket[] = [
  { id: "SS01", category: "collect a form", arrivalMinute: 0, serviceMinutes: 4, declaredPriority: false },
  { id: "SS02", category: "enrolment variation", arrivalMinute: 1, serviceMinutes: 3, declaredPriority: true },
  { id: "SS03", category: "collect a form", arrivalMinute: 2, serviceMinutes: 3, declaredPriority: true },
  { id: "SS04", category: "dispute a printer credit", arrivalMinute: 5, serviceMinutes: 6, declaredPriority: false },
  { id: "SS05", category: "enrolment variation", arrivalMinute: 6, serviceMinutes: 2, declaredPriority: true },
  { id: "SS06", category: "other", arrivalMinute: 9, serviceMinutes: 2, declaredPriority: false },
];

const SYSTEM_SHOCK_CLOSED_WINDOW: ClosedWindow = [6, 10];

export const SCENARIOS: Record<ScenarioName, { tickets: Ticket[]; closedWindow: ClosedWindow | null }> = {
  "Normal Day": { tickets: NORMAL_DAY, closedWindow: null },
  "High-declaration Day": { tickets: HIGH_DECLARATION_DAY, closedWindow: null },
  "System Shock": { tickets: SYSTEM_SHOCK, closedWindow: SYSTEM_SHOCK_CLOSED_WINDOW },
};

/** Tie-break shared by all three policies: earlier arrival, then lower ID. */
function compareTieBreak(a: Ticket, b: Ticket): number {
  if (a.arrivalMinute !== b.arrivalMinute) return a.arrivalMinute - b.arrivalMinute;
  return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
}

/** Selects the next ticket to serve from the tickets that have already arrived. */
function selectNext(waiting: Ticket[], policy: PolicyName): Ticket {
  let pool = waiting;
  if (policy === "PRIORITY_LANE") {
    const declared = waiting.filter((ticket) => ticket.declaredPriority);
    pool = declared.length > 0 ? declared : waiting;
  }
  const orderingKey = (ticket: Ticket) =>
    policy === "FCFS" ? ticket.arrivalMinute : ticket.serviceMinutes;

  let best = pool[0];
  for (const ticket of pool.slice(1)) {
    const key = orderingKey(ticket);
    const bestKey = orderingKey(best);
    if (key < bestKey || (key === bestKey && compareTieBreak(ticket, best) < 0)) {
      best = ticket;
    }
  }
  return best;
}

/**
 * Runs the non-preemptive, single-desk, event-driven simulation for one
 * policy against one scenario's tickets, per POLICY-LAB-CONTRACT.md.
 */
export function simulate(
  tickets: Ticket[],
  closedWindow: ClosedWindow | null,
  policy: PolicyName,
): SimulationResult {
  const remaining = [...tickets].sort(compareTieBreak);
  const waitingPool: Ticket[] = [];
  const completed: Omit<TicketResult, "overtaking">[] = [];
  let arrivalIndex = 0;
  let time = 0;
  let serviceOrder = 0;

  while (completed.length < tickets.length) {
    while (arrivalIndex < remaining.length && remaining[arrivalIndex].arrivalMinute <= time) {
      waitingPool.push(remaining[arrivalIndex]);
      arrivalIndex++;
    }

    const inClosedWindow =
      closedWindow !== null && time >= closedWindow[0] && time < closedWindow[1];

    if (waitingPool.length === 0 || inClosedWindow) {
      const nextTimes: number[] = [];
      if (arrivalIndex < remaining.length) nextTimes.push(remaining[arrivalIndex].arrivalMinute);
      if (inClosedWindow) nextTimes.push(closedWindow![1]);
      time = Math.min(...nextTimes);
      continue;
    }

    const ticket = selectNext(waitingPool, policy);
    waitingPool.splice(waitingPool.indexOf(ticket), 1);
    const start = time;
    const completion = start + ticket.serviceMinutes;
    serviceOrder++;
    completed.push({ ...ticket, serviceOrder, start, completion, wait: start - ticket.arrivalMinute });
    time = completion;
  }

  const results: TicketResult[] = completed.map((ticket) => ({
    ...ticket,
    overtaking: completed.filter(
      (other) => other.arrivalMinute > ticket.arrivalMinute && other.start < ticket.start,
    ).length,
  }));

  return { tickets: results, summary: summarize(results) };
}

function summarize(results: TicketResult[]): ScenarioSummary {
  const waits = results.map((ticket) => ticket.wait).sort((a, b) => a - b);
  const mid = Math.floor(waits.length / 2);
  const medianWait =
    waits.length % 2 === 0 ? (waits[mid - 1] + waits[mid]) / 2 : waits[mid];

  return {
    meanWait: waits.reduce((sum, wait) => sum + wait, 0) / waits.length,
    medianWait,
    maxWait: Math.max(...waits),
    waitOverFiveCount: waits.filter((wait) => wait > 5).length,
    overtakingTotal: results.reduce((sum, ticket) => sum + ticket.overtaking, 0),
  };
}

/** Runs all three policies against one named scenario. */
export function simulateScenario(scenarioName: ScenarioName): Record<PolicyName, SimulationResult> {
  const { tickets, closedWindow } = SCENARIOS[scenarioName];
  return Object.fromEntries(
    POLICIES.map((policy) => [policy, simulate(tickets, closedWindow, policy)]),
  ) as Record<PolicyName, SimulationResult>;
}
