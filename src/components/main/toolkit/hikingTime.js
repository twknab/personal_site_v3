// Hiking travel-time estimate adapted from Rick Curtis,
// The Backpacker's Handbook (2005).
//
//   travel time = (miles / pace)
//               + (elevation gain / feet-per-extra-hour)
//               + (moving hours * rest minutes per hour)
//
// The original 2017 implementation lived in twknab/mean_hike and powered the
// travel-time estimate on HikingTool. Two things changed on the way here:
// the constants are now parameters (the book itself says they "may need to be
// adjusted depending upon the individual, group or trip needs"), and the
// minute rounding no longer blows up on whole-hour results. Rest defaults to
// 15 minutes per moving hour — what we usually budget on trail.

export const BOOK_TIME_DEFAULTS = Object.freeze({
  // An average hiker on flat terrain covers 2 miles per hour.
  paceMph: 2,
  // Every 1,000 ft of gain costs roughly one extra hour.
  feetPerExtraHour: 1000,
  // On our trips, each hour of movement usually gets ~15 minutes of rest.
  restMinutesPerHour: 15,
});

const positive = (value, fallback) => {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

const nonNegative = (value) => {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

/**
 * Estimate hiking travel time, returning the whole breakdown rather than just
 * a total — seeing where the hours come from is the useful part.
 *
 * @returns {{flatHours: number, climbHours: number, movingHours: number,
 *            restHours: number, totalHours: number}}
 */
export function estimateHikingTime(
  distanceMiles,
  elevationGainFeet,
  options = {}
) {
  const paceMph = positive(options.paceMph, BOOK_TIME_DEFAULTS.paceMph);
  const feetPerExtraHour = positive(
    options.feetPerExtraHour,
    BOOK_TIME_DEFAULTS.feetPerExtraHour
  );
  const restMinutesPerHour = Number.isFinite(Number(options.restMinutesPerHour))
    ? Math.max(0, Number(options.restMinutesPerHour))
    : BOOK_TIME_DEFAULTS.restMinutesPerHour;

  const miles = nonNegative(distanceMiles);
  const gain = nonNegative(elevationGainFeet);

  const flatHours = miles / paceMph;
  const climbHours = gain / feetPerExtraHour;
  const movingHours = flatHours + climbHours;
  const restHours = movingHours * (restMinutesPerHour / 60);

  return {
    flatHours,
    climbHours,
    movingHours,
    restHours,
    totalHours: movingHours + restHours,
  };
}

/**
 * Format hours as "4 h 53 m". Minutes round *up*: on a trail it is better to
 * over-estimate than to be caught out after dark.
 */
export function formatDuration(hours) {
  const n = Number(hours);
  if (!Number.isFinite(n) || n <= 0) return "0 m";

  const totalMinutes = Math.ceil(n * 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;

  if (h === 0) return `${m} m`;
  if (m === 0) return `${h} h`;
  return `${h} h ${m} m`;
}
