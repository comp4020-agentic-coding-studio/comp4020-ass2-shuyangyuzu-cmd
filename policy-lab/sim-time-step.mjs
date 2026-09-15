// Path B: minute-by-minute scan.
//
// Independently written from sim-event-queue.mjs: instead of jumping
// between events, this steps time forward one whole minute at a time
// (safe because every arrivalMinute and serviceMinutes value in the fixed
// datasets is an integer) and re-decides what the desk should do at each
// minute. Deliberately does not import or share ordering code with
// sim-event-queue.mjs — agreement between the two is the cross-check.

function selectNext(waiting, policy) {
  if (waiting.length === 0) return null;

  const byServiceThenArrivalThenId = (a, b) => {
    if (a.serviceMinutes !== b.serviceMinutes) return a.serviceMinutes - b.serviceMinutes;
    if (a.arrivalMinute !== b.arrivalMinute) return a.arrivalMinute - b.arrivalMinute;
    return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
  };

  if (policy === "FCFS") {
    let best = waiting[0];
    for (const t of waiting) {
      if (
        t.arrivalMinute < best.arrivalMinute ||
        (t.arrivalMinute === best.arrivalMinute && t.id < best.id)
      ) {
        best = t;
      }
    }
    return best;
  }

  if (policy === "QUICK_ENQUIRIES") {
    return waiting.reduce((best, t) => (byServiceThenArrivalThenId(t, best) < 0 ? t : best));
  }

  if (policy === "PRIORITY_LANE") {
    const declared = waiting.filter((t) => t.declaredPriority);
    const pool = declared.length > 0 ? declared : waiting;
    return pool.reduce((best, t) => (byServiceThenArrivalThenId(t, best) < 0 ? t : best));
  }

  throw new Error(`unknown policy: ${policy}`);
}

export function simulateTimeStep(tickets, policy, closedWindow, maxMinutes = 500) {
  const remaining = new Map(tickets.map((t) => [t.id, t]));
  const waiting = [];
  const results = [];

  let busyUntil = 0; // desk is free once current minute >= busyUntil
  let current = null; // ticket currently in service

  for (let minute = 0; minute <= maxMinutes; minute++) {
    // Arrivals land in the waiting pool the minute they occur.
    for (const t of tickets) {
      if (t.arrivalMinute === minute) waiting.push(t);
    }

    // A ticket in service finishes the instant the clock reaches its
    // completion minute.
    if (current && minute >= current.completesAt) {
      results.push({
        id: current.ticket.id,
        arrivalMinute: current.ticket.arrivalMinute,
        start: current.startedAt,
        completion: current.completesAt,
        wait: current.startedAt - current.ticket.arrivalMinute,
      });
      remaining.delete(current.ticket.id);
      current = null;
    }

    const closedNow = closedWindow ? minute >= closedWindow[0] && minute < closedWindow[1] : false;

    if (!current && !closedNow && waiting.length > 0 && minute >= busyUntil) {
      const next = selectNext(waiting, policy);
      waiting.splice(waiting.indexOf(next), 1);
      current = { ticket: next, startedAt: minute, completesAt: minute + next.serviceMinutes };
      busyUntil = current.completesAt;
    }

    if (remaining.size === 0 && !current) break;
  }

  if (remaining.size > 0) {
    throw new Error(`simulation did not finish within ${maxMinutes} minutes`);
  }

  return results.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
}
