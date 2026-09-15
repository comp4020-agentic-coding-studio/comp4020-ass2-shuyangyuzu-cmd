// Canonical fixed datasets for the Policy Lab contract
// (see POLICY-LAB-CONTRACT.md at the repo root).
//
// This is data only — no scheduling logic lives here. The two simulators
// (sim-event-queue.mjs and sim-time-step.mjs) each implement the ordering
// and tie-break rules independently, on purpose, so that agreement between
// them is a real cross-check rather than two runs of the same code.

export const POLICIES = ["FCFS", "QUICK_ENQUIRIES", "PRIORITY_LANE"];

// Normal Day: the week-06 lab log, given fixed IDs and arrival minutes.
// Counts match week-06 session content exactly: six ordinary 5-minute
// requests, one 20-minute dispute, one urgent 8-minute request, all
// arriving inside the first ten minutes of opening. Categories are not
// specified in week-06 itself; they are added here for consistency with
// the week-10 audit's category set and are not a week-06 fact.
export const NORMAL_DAY = [
  { id: "ND01", category: "collect a form", arrivalMinute: 0, serviceMinutes: 5, declaredPriority: false },
  { id: "ND02", category: "collect a form", arrivalMinute: 1, serviceMinutes: 5, declaredPriority: false },
  { id: "ND03", category: "collect a form", arrivalMinute: 2, serviceMinutes: 5, declaredPriority: false },
  { id: "ND04", category: "collect a form", arrivalMinute: 3, serviceMinutes: 5, declaredPriority: false },
  { id: "ND05", category: "collect a form", arrivalMinute: 4, serviceMinutes: 5, declaredPriority: false },
  { id: "ND06", category: "collect a form", arrivalMinute: 5, serviceMinutes: 5, declaredPriority: false },
  { id: "ND07", category: "dispute a printer credit", arrivalMinute: 6, serviceMinutes: 20, declaredPriority: false },
  { id: "ND08", category: "enrolment variation", arrivalMinute: 7, serviceMinutes: 8, declaredPriority: true },
];

// High-declaration Day: constructed so most tickets declare priority,
// including two gaming declarations (HD01, HD02) that tie on
// serviceMinutes and must be resolved by the arrival-minute tie-break.
export const HIGH_DECLARATION_DAY = [
  { id: "HD01", category: "collect a form", arrivalMinute: 0, serviceMinutes: 5, declaredPriority: true },
  { id: "HD02", category: "collect a form", arrivalMinute: 1, serviceMinutes: 5, declaredPriority: true },
  { id: "HD03", category: "enrolment variation", arrivalMinute: 2, serviceMinutes: 8, declaredPriority: true },
  { id: "HD04", category: "dispute a printer credit", arrivalMinute: 3, serviceMinutes: 20, declaredPriority: false },
  { id: "HD05", category: "collect a form", arrivalMinute: 4, serviceMinutes: 5, declaredPriority: false },
  { id: "HD06", category: "other", arrivalMinute: 5, serviceMinutes: 3, declaredPriority: true },
];

// System Shock: models the week-11 worst day (surge + closed window +
// rising declarations under pressure) at hand-calculable scale. The desk
// is closed to new starts during [6, 10) minutes — see CLOSED_WINDOW below.
export const SYSTEM_SHOCK = [
  { id: "SS01", category: "collect a form", arrivalMinute: 0, serviceMinutes: 4, declaredPriority: false },
  { id: "SS02", category: "enrolment variation", arrivalMinute: 1, serviceMinutes: 3, declaredPriority: true },
  { id: "SS03", category: "collect a form", arrivalMinute: 2, serviceMinutes: 3, declaredPriority: true },
  { id: "SS04", category: "dispute a printer credit", arrivalMinute: 5, serviceMinutes: 6, declaredPriority: false },
  { id: "SS05", category: "enrolment variation", arrivalMinute: 6, serviceMinutes: 2, declaredPriority: true },
  { id: "SS06", category: "other", arrivalMinute: 9, serviceMinutes: 2, declaredPriority: false },
];

// Half-open closed window, in minutes after opening: the desk may not
// *start* a new ticket while start >= CLOSED_WINDOW[0] && start < CLOSED_WINDOW[1].
// A ticket already in service continues uninterrupted across the boundary.
export const CLOSED_WINDOW = [6, 10];

export const SCENARIOS = {
  "Normal Day": { tickets: NORMAL_DAY, closedWindow: null },
  "High-declaration Day": { tickets: HIGH_DECLARATION_DAY, closedWindow: null },
  "System Shock": { tickets: SYSTEM_SHOCK, closedWindow: CLOSED_WINDOW },
};
