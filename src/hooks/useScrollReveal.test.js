import React from "react";
import { render } from "@testing-library/react";
import useScrollReveal from "./useScrollReveal";

function Harness({ selector }) {
  useScrollReveal(selector);
  return (
    <div>
      <section className="alpha" />
      <section className="beta" />
    </div>
  );
}

let observed;
let options;
let trigger;

beforeEach(() => {
  observed = [];
  options = undefined;
  trigger = undefined;

  class FakeIntersectionObserver {
    constructor(callback, opts) {
      options = opts;
      this.callback = callback;
      // Let a test fire the callback the way the browser would.
      trigger = (targets) =>
        this.callback(
          targets.map((target) => ({ target, isIntersecting: true })),
          this
        );
    }
    observe(el) {
      observed.push(el);
    }
    unobserve() {}
    disconnect() {}
  }

  global.IntersectionObserver = FakeIntersectionObserver;
  window.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {} });
});

describe("useScrollReveal", () => {
  it("marks the matched sections and observes them", () => {
    render(<Harness selector=".alpha, .beta" />);
    expect(observed).toHaveLength(2);
    observed.forEach((el) => expect(el.classList.contains("reveal")).toBe(true));
  });

  // The regression guard. A section's intersection ratio can never exceed
  // (viewport height / section height), so a fractional threshold silently
  // becomes a maximum section height — past it the section never reveals and
  // renders at opacity 0. Projects hit exactly that on a phone. Timing belongs
  // to the rootMargin, which is height-independent.
  it("uses a zero threshold so tall sections can still reveal", () => {
    render(<Harness selector=".alpha" />);
    const threshold = options.threshold;
    if (Array.isArray(threshold)) {
      expect(threshold).toContain(0);
    } else {
      expect(threshold).toBe(0);
    }
    expect(options.rootMargin).toContain("-8%");
  });

  it("adds in-view when a section intersects", () => {
    render(<Harness selector=".alpha" />);
    const el = observed[0];
    expect(el.classList.contains("in-view")).toBe(false);
    trigger([el]);
    expect(el.classList.contains("in-view")).toBe(true);
  });

  it("reveals immediately when reduced motion is preferred", () => {
    window.matchMedia = () => ({ matches: true });
    render(<Harness selector=".alpha" />);
    const el = document.querySelector(".alpha");
    expect(el.classList.contains("in-view")).toBe(true);
  });
});
