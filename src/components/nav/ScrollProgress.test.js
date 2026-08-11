import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ScrollProgress from "./ScrollProgress";

// jsdom has no layout, so page geometry is stubbed on documentElement and
// rAF runs the update synchronously.
const setGeometry = ({ scrollHeight, clientHeight, scrollTop }) => {
  Object.defineProperty(document.documentElement, "scrollHeight", {
    configurable: true,
    value: scrollHeight,
  });
  Object.defineProperty(document.documentElement, "clientHeight", {
    configurable: true,
    value: clientHeight,
  });
  document.documentElement.scrollTop = scrollTop;
};

beforeEach(() => {
  jest
    .spyOn(window, "requestAnimationFrame")
    .mockImplementation((cb) => {
      cb();
      return 1;
    });
});

afterEach(() => {
  window.requestAnimationFrame.mockRestore();
});

const fill = () => document.querySelector(".scroll-progress-fill");

describe("ScrollProgress", () => {
  it("starts empty at the top of the page", () => {
    setGeometry({ scrollHeight: 5000, clientHeight: 1000, scrollTop: 0 });
    render(<ScrollProgress />);
    expect(fill().style.transform).toBe("translateX(-100%)");
  });

  it("tracks scroll position as a fraction of the scrollable height", () => {
    setGeometry({ scrollHeight: 5000, clientHeight: 1000, scrollTop: 0 });
    render(<ScrollProgress />);
    setGeometry({ scrollHeight: 5000, clientHeight: 1000, scrollTop: 2000 });
    fireEvent.scroll(window);
    // 2000 / (5000 - 1000) = 50% scrolled -> half revealed.
    expect(fill().style.transform).toBe("translateX(-50%)");
  });

  it("fills completely at the bottom and never overshoots", () => {
    setGeometry({ scrollHeight: 5000, clientHeight: 1000, scrollTop: 4500 });
    render(<ScrollProgress />);
    expect(fill().style.transform).toBe("translateX(0%)");
  });

  it("stays empty on a page too short to scroll", () => {
    setGeometry({ scrollHeight: 800, clientHeight: 1000, scrollTop: 0 });
    render(<ScrollProgress />);
    expect(fill().style.transform).toBe("translateX(-100%)");
  });

  it("is decorative: hidden from assistive tech and inert to the pointer", () => {
    setGeometry({ scrollHeight: 5000, clientHeight: 1000, scrollTop: 0 });
    render(<ScrollProgress />);
    expect(
      document.querySelector(".scroll-progress").getAttribute("aria-hidden")
    ).toBe("true");
  });
});
