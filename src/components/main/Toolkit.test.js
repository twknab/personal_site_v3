import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Toolkit from "./Toolkit";

// Same constraint as Projects.test.js: the pinned jsdom throws from
// getComputedStyle on pseudo-elements, which *ByRole queries reach through.
beforeEach(() => {
  render(<Toolkit />);
});

const total = () => document.querySelector('[data-testid="hiking-total"]').textContent;
const setInput = (id, value) =>
  fireEvent.change(document.getElementById(id), { target: { value } });

describe("Toolkit", () => {
  it("renders the hiking estimator", () => {
    expect(document.querySelector('[data-testid="hiking-time-calculator"]')).toBeTruthy();
  });

  it("shows the default worked example on first paint", () => {
    // Defaults are 8 mi / 500 ft with 15 min rest per moving hour.
    // 4h flat + 0.5h climb + 4.5×15min rest = 5.625h → 5 h 38 m
    expect(total()).toBe("5 h 38 m");
  });

  it("recalculates as the hiker changes distance", () => {
    // 16 mi = 8 h walking, +0.5 h for 500 ft, +15 min per moving hour.
    setInput("hike-miles", "16");
    expect(total()).toBe("10 h 38 m");
  });

  it("charges more time for elevation than for flat miles", () => {
    setInput("hike-miles", "4");
    setInput("hike-gain", "0");
    const flat = total();
    setInput("hike-gain", "4000");
    expect(total()).not.toBe(flat);
    expect(document.querySelector(".toolkit-bar-seg--climb").style.width).not.toBe("0%");
  });

  it("survives an emptied input instead of rendering NaN", () => {
    setInput("hike-miles", "");
    setInput("hike-gain", "");
    expect(total()).toBe("0 m");
  });

  it("applies a preset when its button is clicked", () => {
    const preset = Array.from(document.querySelectorAll(".toolkit-preset")).find(
      (b) => b.textContent === "Mailbox Peak"
    );
    fireEvent.click(preset);
    expect(document.getElementById("hike-miles").value).toBe("9.4");
    expect(document.getElementById("hike-gain").value).toBe("4000");
  });

  it("keeps the tuning controls collapsed until asked for", () => {
    expect(document.getElementById("tune-paceMph")).toBeNull();
    fireEvent.click(document.querySelector(".toolkit-disclosure"));
    expect(document.getElementById("tune-paceMph")).toBeTruthy();
  });

  it("lets a faster pace shorten the estimate", () => {
    const bookTime = total();
    fireEvent.click(document.querySelector(".toolkit-disclosure"));
    setInput("tune-paceMph", "4");
    expect(total()).not.toBe(bookTime);
    expect(document.querySelector(".toolkit-tuned-flag")).toBeTruthy();
  });
});
