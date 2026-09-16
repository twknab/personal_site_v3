// Canister-stove fuel estimate, built from the planning rule of thumb every
// gear shop repeats: a small canister stove burns roughly 5–8 g of fuel to
// boil ~500 mL of water under decent conditions — call it 14 g per liter.
//
// That baseline hides three assumptions, and each becomes an input here:
//
// - Where the water starts. The rule assumes cool stream water (~15 °C), so
//   the baseline buys an 85 °C rise. Colder water costs proportionally more,
//   and snow is its own category: melting ice takes about as much energy as
//   heating the meltwater from 0 °C to 80 °C, before the boil even starts.
// - Where the water stops. Boiling point falls ~1 °C per 1,000 ft of
//   elevation, so altitude actually makes each individual boil slightly
//   *cheaper* — at 10,000 ft the pot boils at ~90 °C. The catch is what rides
//   along with altitude: cold source water and wind, which cost far more than
//   the lower boiling point saves.
// - Whether the flame is sheltered. Wind strips heat off the pot before it
//   reaches the water; an exposed stove can burn half again the fuel.
//
//   grams = liters × baseline × (boil temp − water temp [+ melt]) / 85 × wind
//   total = grams + reserve
//
// The reserve is not pessimism — a canister that dies one breakfast early is
// a worse trip than 40 extra grams in the lid pocket.

export const STOVE_FUEL_DEFAULTS = Object.freeze({
  // The middle of the 5–8 g per 500 mL rule of thumb: 7 g ≈ 14 g per liter,
  // at sea level, sheltered, from a cool stream.
  gramsPerLiter: 14,
  // Spare fuel carried on top of the estimate.
  reservePercent: 20,
});

// The temperature rise the baseline pays for: ~15 °C stream water to a
// 100 °C sea-level boil.
export const BASELINE_TEMP_RISE_C = 85;

// Multiplier on fuel burned, by how exposed the stove is. Wind steals heat
// from the pot walls before it ever reaches the water.
export const WIND_EFFECT = Object.freeze({
  sheltered: 1,
  breezy: 1.25,
  windy: 1.5,
});

// Starting water temperature in °C, by source.
export const WATER_SOURCES = Object.freeze({
  stream: 15,
  alpine: 5,
  snow: 0,
});

// Melting snow costs latent heat with no temperature change — about as much
// energy as heating the same water another ~80 °C (334 kJ/kg ÷ 4.19 kJ/kg·°C).
export const SNOW_MELT_EQUIV_C = 80;

// Standard isobutane canisters, by grams of fuel inside (not gross weight).
export const CANISTER_SIZES_G = Object.freeze([110, 230, 450]);

const positive = (value, fallback) => {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

const nonNegative = (value) => {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

/**
 * Boiling point of water in °C at an elevation, using the planning
 * approximation of ~1 °C lost per 1,000 ft. Clamped at 80 °C (~20,000 ft) —
 * beyond that this card is the wrong tool.
 */
export function boilingPointC(elevationFeet) {
  return Math.max(80, 100 - nonNegative(elevationFeet) / 1000);
}

/**
 * Suggest which canisters to pack: the smallest single canister that covers
 * the total, topping up with 450s first when no single canister can.
 *
 * @returns {Array<{sizeG: number, count: number}>} largest size first
 */
export function suggestCanisters(totalGrams) {
  let remaining = nonNegative(totalGrams);
  const counts = new Map();
  const largest = CANISTER_SIZES_G[CANISTER_SIZES_G.length - 1];

  while (remaining > largest) {
    counts.set(largest, (counts.get(largest) || 0) + 1);
    remaining -= largest;
  }
  if (remaining > 0) {
    const size = CANISTER_SIZES_G.find((s) => s >= remaining);
    counts.set(size, (counts.get(size) || 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([sizeG, count]) => ({ sizeG, count }));
}

/**
 * Estimate canister fuel for a trip, returning the whole breakdown — where
 * the grams go is the useful part, not just the total.
 *
 * @param {number|string} litersPerDay - water boiled per day, liters
 * @param {number|string} days - trip length in days
 * @param {object} options
 * @param {number} [options.elevationFeet] - camp/cooking elevation
 * @param {"sheltered"|"breezy"|"windy"} [options.windCondition]
 * @param {"stream"|"alpine"|"snow"} [options.waterSource]
 * @param {number} [options.gramsPerLiter] - baseline stove efficiency
 * @param {number} [options.reservePercent] - spare fuel margin
 * @returns {{litersTotal: number, boilTempC: number, heatGrams: number,
 *            windGrams: number, reserveGrams: number, totalGrams: number,
 *            canisters: Array<{sizeG: number, count: number}>}}
 */
export function estimateStoveFuel(litersPerDay, days, options = {}) {
  const gramsPerLiter = positive(
    options.gramsPerLiter,
    STOVE_FUEL_DEFAULTS.gramsPerLiter
  );
  const reservePercent = Number.isFinite(Number(options.reservePercent))
    ? Math.max(0, Number(options.reservePercent))
    : STOVE_FUEL_DEFAULTS.reservePercent;

  const litersTotal = nonNegative(litersPerDay) * nonNegative(days);
  const boilTempC = boilingPointC(options.elevationFeet);
  const waterTempC = WATER_SOURCES[options.waterSource] ?? WATER_SOURCES.stream;
  const meltC = options.waterSource === "snow" ? SNOW_MELT_EQUIV_C : 0;
  const windFactor = WIND_EFFECT[options.windCondition] ?? 1;

  // Grams needed for the temperature work alone, scaled off the baseline rise.
  const degreesOfWork = boilTempC - waterTempC + meltC;
  const heatGrams =
    litersTotal * gramsPerLiter * (degreesOfWork / BASELINE_TEMP_RISE_C);
  const windGrams = heatGrams * (windFactor - 1);
  const reserveGrams = (heatGrams + windGrams) * (reservePercent / 100);
  const totalGrams = heatGrams + windGrams + reserveGrams;

  return {
    litersTotal,
    boilTempC,
    heatGrams,
    windGrams,
    reserveGrams,
    totalGrams,
    canisters: suggestCanisters(totalGrams),
  };
}

/**
 * Format grams as "185 g". Rounds *up* to the next whole gram — like the
 * trail-time minutes, over-estimating fuel is the safe direction.
 */
export function formatGrams(grams) {
  const n = Number(grams);
  if (!Number.isFinite(n) || n <= 0) return "0 g";
  return `${Math.ceil(n)} g`;
}
