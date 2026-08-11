import {
  estimateKayakTime,
  KAYAK_TIME_DEFAULTS,
  MIN_PROGRESS_KN,
  WIND_EFFECT,
} from "./kayakTime";

describe("estimateKayakTime", () => {
  it("covers flat calm water at the default 3 knots", () => {
    const r = estimateKayakTime(6, { restMinutesPerHour: 0 });
    expect(r.underway).toBe(true);
    expect(r.effectiveSpeedKn).toBe(KAYAK_TIME_DEFAULTS.paddleSpeedKn);
    expect(r.paddlingHours).toBeCloseTo(2, 5);
    expect(r.totalHours).toBeCloseTo(2, 5);
  });

  it("adds rest per paddling hour like the hiking estimate does", () => {
    const r = estimateKayakTime(6, { restMinutesPerHour: 10 });
    // 2 paddling hours * 10 min = 20 min of rest.
    expect(r.restHours).toBeCloseTo(1 / 3, 5);
    expect(r.totalHours).toBeCloseTo(2 + 1 / 3, 5);
  });

  it("credits a following current in full and charges an opposing one in full", () => {
    const withCurrent = estimateKayakTime(6, {
      currentKn: 1,
      currentDirection: "with",
      restMinutesPerHour: 0,
    });
    const against = estimateKayakTime(6, {
      currentKn: 1,
      currentDirection: "against",
      restMinutesPerHour: 0,
    });
    expect(withCurrent.effectiveSpeedKn).toBeCloseTo(4, 5);
    expect(against.effectiveSpeedKn).toBeCloseTo(2, 5);
  });

  it("makes a headwind hurt about twice as much as a tailwind helps", () => {
    const head = estimateKayakTime(6, {
      windKn: 14,
      windDirection: "head",
      restMinutesPerHour: 0,
    });
    const tail = estimateKayakTime(6, {
      windKn: 14,
      windDirection: "tail",
      restMinutesPerHour: 0,
    });
    // 14 kn headwind: lose 2 kn. 14 kn tailwind: gain 1 kn.
    expect(head.effectiveSpeedKn).toBeCloseTo(1, 5);
    expect(tail.effectiveSpeedKn).toBeCloseTo(4, 5);
    const loss = 3 - head.effectiveSpeedKn;
    const gain = tail.effectiveSpeedKn - 3;
    expect(loss).toBeCloseTo(gain * 2, 5);
  });

  it("ignores a beam wind's effect on speed", () => {
    const r = estimateKayakTime(6, {
      windKn: 15,
      windDirection: "beam",
      restMinutesPerHour: 0,
    });
    expect(WIND_EFFECT.beam).toBe(0);
    expect(r.effectiveSpeedKn).toBe(3);
  });

  it("refuses to invent a time when the water outruns the paddler", () => {
    const r = estimateKayakTime(6, {
      currentKn: 3,
      currentDirection: "against",
      windKn: 14,
      windDirection: "head",
    });
    expect(r.underway).toBe(false);
    expect(r.effectiveSpeedKn).toBeLessThan(MIN_PROGRESS_KN);
    expect(r.totalHours).toBe(0);
  });

  it("survives emptied and junk inputs instead of returning NaN", () => {
    const r = estimateKayakTime("", {
      currentKn: "",
      windKn: "junk",
      currentDirection: "with",
      windDirection: "tail",
    });
    expect(r.underway).toBe(true);
    expect(r.totalHours).toBe(0);
    expect(Number.isNaN(r.effectiveSpeedKn)).toBe(false);
  });
});
