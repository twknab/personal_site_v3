// Kayak travel-time estimate, built the way paddlers actually plan: speed made
// good over water, in knots and nautical miles.
//
//   effective speed = paddling speed ± current ± wind effect
//   travel time     = (nautical miles / effective speed)
//                   + (paddling hours * rest minutes per hour)
//
// The two environmental terms come from paddling references rather than
// invention:
//
// - Current adds or subtracts directly. Water is the medium you move through,
//   so a 2 kn current under the hull is 2 kn on your speed over ground, whole.
// - Wind is asymmetric. The working rule of thumb (Kayarchy, "The sea and
//   weather: wind") is that a true headwind costs about one seventh of its
//   speed in lost hull speed — a 10 kn headwind takes ~1.4 kn. A tailwind
//   helps *less* than a headwind hurts (a kayak surfs poorly and the paddler
//   blocks little wind), so it is credited at half the headwind rate. A beam
//   wind mostly pushes you sideways; it costs steering effort, not modelled
//   speed.
//
// Unlike hills, water can outrun you: against enough wind and current the
// effective speed reaches zero or goes negative, and no finite time is
// honest. The estimate says so (`underway: false`) instead of printing a
// large number.

export const KAYAK_TIME_DEFAULTS = Object.freeze({
  // A loaded touring kayak at conversational effort makes about 3 knots.
  paddleSpeedKn: 3,
  // Raft up, drink, stretch — about 10 minutes per paddling hour.
  restMinutesPerHour: 10,
});

// Fraction of true wind speed applied to hull speed, by wind direction.
export const WIND_EFFECT = Object.freeze({
  head: -1 / 7,
  beam: 0,
  tail: 1 / 14,
});

// Sign applied to current speed, by which way it runs relative to you.
export const CURRENT_EFFECT = Object.freeze({
  against: -1,
  slack: 0,
  with: 1,
});

// Below this speed made good, call it what it is: not making progress.
// 0.2 kn is under a quarter mile an hour — drift, not travel.
export const MIN_PROGRESS_KN = 0.2;

const positive = (value, fallback) => {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

const nonNegative = (value) => {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

/**
 * Estimate kayak travel time, returning the whole picture — the effective
 * speed is as much the answer as the hours are.
 *
 * @param {number|string} distanceNm - trip length in nautical miles
 * @param {object} options
 * @param {number} [options.paddleSpeedKn] - flat-water paddling speed, knots
 * @param {number} [options.currentKn] - current speed, knots
 * @param {"against"|"slack"|"with"} [options.currentDirection]
 * @param {number} [options.windKn] - true wind speed, knots
 * @param {"head"|"beam"|"tail"} [options.windDirection]
 * @param {number} [options.restMinutesPerHour]
 * @returns {{underway: boolean, effectiveSpeedKn: number,
 *            paddlingHours: number, restHours: number, totalHours: number}}
 */
export function estimateKayakTime(distanceNm, options = {}) {
  const paddleSpeedKn = positive(
    options.paddleSpeedKn,
    KAYAK_TIME_DEFAULTS.paddleSpeedKn
  );
  const restMinutesPerHour = Number.isFinite(
    Number(options.restMinutesPerHour)
  )
    ? Math.max(0, Number(options.restMinutesPerHour))
    : KAYAK_TIME_DEFAULTS.restMinutesPerHour;

  const currentKn = nonNegative(options.currentKn);
  const windKn = nonNegative(options.windKn);
  const currentSign = CURRENT_EFFECT[options.currentDirection] ?? 0;
  const windFactor = WIND_EFFECT[options.windDirection] ?? 0;

  const effectiveSpeedKn =
    paddleSpeedKn + currentSign * currentKn + windFactor * windKn;

  const nm = nonNegative(distanceNm);

  if (effectiveSpeedKn < MIN_PROGRESS_KN) {
    return {
      underway: false,
      effectiveSpeedKn,
      paddlingHours: 0,
      restHours: 0,
      totalHours: 0,
    };
  }

  const paddlingHours = nm / effectiveSpeedKn;
  const restHours = paddlingHours * (restMinutesPerHour / 60);

  return {
    underway: true,
    effectiveSpeedKn,
    paddlingHours,
    restHours,
    totalHours: paddlingHours + restHours,
  };
}
