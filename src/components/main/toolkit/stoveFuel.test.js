import {
  boilingPointC,
  estimateStoveFuel,
  formatGrams,
  STOVE_FUEL_DEFAULTS,
  suggestCanisters,
} from "./stoveFuel";

describe("estimateStoveFuel", () => {
  it("matches the gear-shop rule of thumb at sea level", () => {
    // 1 L from a 15 °C stream to a 100 °C boil is exactly the baseline rise,
    // so the answer is the baseline itself: 14 g per liter.
    const r = estimateStoveFuel(1, 1, { reservePercent: 0 });
    expect(r.totalGrams).toBeCloseTo(STOVE_FUEL_DEFAULTS.gramsPerLiter, 5);
  });

  it("reproduces the classic worked example: ten 500 mL boils ≈ 70 g", () => {
    // Two boils a day for five days at ~7 g per half liter.
    const r = estimateStoveFuel(1, 5, { reservePercent: 0 });
    expect(r.litersTotal).toBe(5);
    expect(r.totalGrams).toBeCloseTo(70, 5);
  });

  it("makes each boil slightly cheaper at elevation, not dearer", () => {
    // At 10,000 ft water boils at ~90 °C — a 75 °C rise instead of 85.
    const seaLevel = estimateStoveFuel(1, 1, { reservePercent: 0 });
    const alpine = estimateStoveFuel(1, 1, {
      elevationFeet: 10000,
      reservePercent: 0,
    });
    expect(alpine.boilTempC).toBe(90);
    expect(alpine.totalGrams).toBeLessThan(seaLevel.totalGrams);
    expect(alpine.totalGrams).toBeCloseTo(14 * (75 / 85), 5);
  });

  it("charges for cold water and roughly doubles the bill for snowmelt", () => {
    const stream = estimateStoveFuel(1, 1, { reservePercent: 0 });
    const snow = estimateStoveFuel(1, 1, {
      waterSource: "snow",
      reservePercent: 0,
    });
    // 0 → 100 °C plus ~80 °C-equivalent of melting = 180 vs the baseline 85.
    expect(snow.totalGrams).toBeCloseTo(stream.totalGrams * (180 / 85), 5);
  });

  it("adds half again for an exposed, windy stove", () => {
    const r = estimateStoveFuel(1, 1, {
      windCondition: "windy",
      reservePercent: 0,
    });
    expect(r.windGrams).toBeCloseTo(r.heatGrams / 2, 5);
    expect(r.totalGrams).toBeCloseTo(21, 5);
  });

  it("applies the reserve on top of conditions, 20% by default", () => {
    const r = estimateStoveFuel(1, 5, {});
    expect(r.reserveGrams).toBeCloseTo(14, 5);
    expect(r.totalGrams).toBeCloseTo(84, 5);
  });

  it("survives emptied and junk inputs instead of returning NaN", () => {
    const r = estimateStoveFuel("", "junk", { elevationFeet: "" });
    expect(r.litersTotal).toBe(0);
    expect(r.totalGrams).toBe(0);
    expect(Number.isNaN(r.boilTempC)).toBe(false);
    expect(r.canisters).toEqual([]);
  });
});

describe("boilingPointC", () => {
  it("loses about a degree per thousand feet", () => {
    expect(boilingPointC(0)).toBe(100);
    expect(boilingPointC(5000)).toBe(95);
    expect(boilingPointC(14411)).toBeCloseTo(85.589, 3); // Rainier's summit
  });

  it("clamps at 80 °C rather than extrapolating past ~20,000 ft", () => {
    expect(boilingPointC(29000)).toBe(80);
  });
});

describe("suggestCanisters", () => {
  it("picks the smallest single canister that covers the trip", () => {
    expect(suggestCanisters(60)).toEqual([{ sizeG: 110, count: 1 }]);
    expect(suggestCanisters(200)).toEqual([{ sizeG: 230, count: 1 }]);
    expect(suggestCanisters(300)).toEqual([{ sizeG: 450, count: 1 }]);
  });

  it("stacks large canisters and tops up when one is not enough", () => {
    expect(suggestCanisters(500)).toEqual([
      { sizeG: 450, count: 1 },
      { sizeG: 110, count: 1 },
    ]);
    expect(suggestCanisters(1000)).toEqual([
      { sizeG: 450, count: 2 },
      { sizeG: 110, count: 1 },
    ]);
  });

  it("suggests nothing for an empty trip", () => {
    expect(suggestCanisters(0)).toEqual([]);
  });
});

describe("formatGrams", () => {
  it("rounds up — running out early is the failure mode", () => {
    expect(formatGrams(70.2)).toBe("71 g");
    expect(formatGrams(84)).toBe("84 g");
  });

  it("treats junk as zero", () => {
    expect(formatGrams("junk")).toBe("0 g");
    expect(formatGrams(-5)).toBe("0 g");
  });
});
