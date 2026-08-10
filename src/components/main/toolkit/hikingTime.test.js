import {
  BOOK_TIME_DEFAULTS,
  estimateHikingTime,
  formatDuration,
} from "./hikingTime";

describe("estimateHikingTime", () => {
  it("matches the original 2017 worked example (8 mi, 500 ft)", () => {
    // 8/2 = 4h flat, 500/1000 = 0.5h climbing, 4.5h * 5min = 0.375h resting.
    const { totalHours } = estimateHikingTime(8, 500);
    expect(totalHours).toBeCloseTo(4.875, 5);
    expect(formatDuration(totalHours)).toBe("4 h 53 m");
  });

  it("breaks the estimate into flat, climbing, and rest time", () => {
    const result = estimateHikingTime(12, 5699);
    expect(result.flatHours).toBeCloseTo(6, 5);
    expect(result.climbHours).toBeCloseTo(5.699, 5);
    expect(result.movingHours).toBeCloseTo(11.699, 5);
    expect(result.restHours).toBeCloseTo(11.699 * (5 / 60), 5);
  });

  it("lets a stronger hiker override the book's constants", () => {
    const book = estimateHikingTime(10, 2000);
    const faster = estimateHikingTime(10, 2000, {
      paceMph: 3,
      feetPerExtraHour: 1500,
    });
    expect(faster.totalHours).toBeLessThan(book.totalHours);
  });

  it("drops rest time when rest is set to zero", () => {
    const { restHours, totalHours, movingHours } = estimateHikingTime(6, 0, {
      restMinutesPerHour: 0,
    });
    expect(restHours).toBe(0);
    expect(totalHours).toBe(movingHours);
  });

  it("treats missing, negative, and junk input as zero", () => {
    expect(estimateHikingTime(0, 0).totalHours).toBe(0);
    expect(estimateHikingTime(-5, -100).totalHours).toBe(0);
    expect(estimateHikingTime("", "").totalHours).toBe(0);
    expect(estimateHikingTime(undefined, NaN).totalHours).toBe(0);
  });

  it("falls back to the book defaults when overrides are unusable", () => {
    const withJunk = estimateHikingTime(8, 500, {
      paceMph: 0,
      feetPerExtraHour: -1,
    });
    expect(withJunk.totalHours).toBeCloseTo(
      estimateHikingTime(8, 500, BOOK_TIME_DEFAULTS).totalHours,
      5
    );
  });
});

describe("formatDuration", () => {
  it("rounds minutes up, because over-estimating is the safe direction", () => {
    // 2.51 h is 150.6 minutes — 151, not 150.
    expect(formatDuration(2.51)).toBe("2 h 31 m");
  });

  it("handles a whole number of hours without a stray minute count", () => {
    // The original implementation threw here: it split "4" on "." and read a
    // decimal half that did not exist.
    expect(formatDuration(4)).toBe("4 h");
  });

  it("omits the hour when the hike is under an hour", () => {
    expect(formatDuration(0.5)).toBe("30 m");
  });

  it("returns zero for empty or nonsense durations", () => {
    expect(formatDuration(0)).toBe("0 m");
    expect(formatDuration(-3)).toBe("0 m");
    expect(formatDuration("nope")).toBe("0 m");
  });
});
