// Path A: discrete-event simulation.
//
// The desk's state only changes at events (an arrival, a service
// completion, or — for System Shock — the closed window's open/close
// boundary). Between events nothing happens, so the loop below jumps
// straight from one event time to the next instead of stepping minute by
// minute. This is one of two independently written simulators used to
// cross-check the Policy Lab contract's nine result sets; see
// sim-time-step.mjs for the other, and run.mjs for the comparison.

function compareByArrivalThenId(a, b) {
  if (a.arrivalMinute !== b.arrivalMinute) return a.arrivalMinute - b.arrivalMinute;
  return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
}

function pickNext(waiting, policy) {
  if (waiting.length === 0) return null;

  if (policy === "FCFS") {
    return [...waiting].sort(compareByArrivalThenId)[0];
  }

  if (policy === "QUICK_ENQUIRIES") {
    return [...waiting].sort((a, b) => {
      if (a.serviceMinutes !== b.serviceMinutes) return a.serviceMinutes - b.serviceMinutes;
      return compareByArrivalThenId(a, b);
    })[0];
  }

  if (policy === "PRIORITY_LANE") {
    const declared = waiting.filter((t) => t.declaredPriority);
    const pool = declared.length > 0 ? declared : waiting;
    return [...pool].sort((a, b) => {
      if (a.serviceMinutes !== b.serviceMinutes) return a.serviceMinutes - b.serviceMinutes;
      return compareByArrivalThenId(a, b);
    })[0];
  }

  throw new Error(`unknown policy: ${policy}`);
}

function isClosed(time, closedWindow) {
  if (!closedWindow) return false;
  const [start, end] = closedWindow;
  return time >= start && time < end;
}

export function simulateEventQueue(tickets, policy, closedWindow) {
  const arrivals = [...tickets].sort(compareByArrivalThenId);
  const notArrived = [...arrivals];
  const waiting = [];
  const done = [];

  let time = 0;
  let deskFreeAt = 0;
  let inService = null; // { ticket, completesAt }

  const nextArrivalTime = () => (notArrived.length > 0 ? notArrived[0].arrivalMinute : Infinity);

  while (done.length < arrivals.length) {
    // Candidate next event times.
    const candidates = [];
    if (inService) candidates.push(inService.completesAt);
    if (notArrived.length > 0) candidates.push(nextArrivalTime());
    if (closedWindow) {
      if (time < closedWindow[0]) candidates.push(closedWindow[0]);
      if (time < closedWindow[1]) candidates.push(closedWindow[1]);
    }
    if (!inService && waiting.length === 0 && candidates.length === 0) {
      throw new Error("simulation stalled: nothing left to happen but tickets remain");
    }

    const nextEventTime = candidates.length > 0 ? Math.min(...candidates) : time;
    time = Math.max(time, nextEventTime);

    // Admit arrivals up to and including `time`.
    while (notArrived.length > 0 && notArrived[0].arrivalMinute <= time) {
      waiting.push(notArrived.shift());
    }

    // Complete service if it finishes exactly now.
    if (inService && inService.completesAt <= time) {
      const t = inService.ticket;
      done.push({
        id: t.id,
        arrivalMinute: t.arrivalMinute,
        start: inService.startedAt,
        completion: inService.completesAt,
        wait: inService.startedAt - t.arrivalMinute,
      });
      deskFreeAt = inService.completesAt;
      inService = null;
    }

    // Try to start a new ticket if the desk is free and not closed.
    if (!inService && !isClosed(time, closedWindow) && waiting.length > 0) {
      const next = pickNext(waiting, policy);
      const idx = waiting.indexOf(next);
      waiting.splice(idx, 1);
      const start = Math.max(time, deskFreeAt);
      inService = { ticket: next, startedAt: start, completesAt: start + next.serviceMinutes };
    }

    // If the desk is idle with nothing to do right now, advance time to
    // the next thing that could change that (handled by the loop's top).
    if (!inService && waiting.length === 0 && notArrived.length === 0 && !closedWindow) {
      break;
    }
    if (!inService && waiting.length === 0 && notArrived.length === 0 && closedWindow && time >= closedWindow[1]) {
      break;
    }
  }

  return done.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
}
