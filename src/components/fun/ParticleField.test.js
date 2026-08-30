import React from "react";
import { render } from "@testing-library/react";
import ParticleField from "./ParticleField";

// The field is a canvas driven by requestAnimationFrame, so none of it is
// reachable through the rendered DOM. These tests stand in for what a browser
// would show: that it sizes itself to its host, actually paints, answers a
// pointer only where one exists, and — the part that is easy to get wrong —
// stops working when nobody is looking.

// Mutable so a test can simulate a host that has not been laid out yet.
const PANEL = { width: 800, height: 400 };

let ctx;
let frames;
let observeCallbacks;

/** Runs the queued animation frames n times. */
const advance = (n = 1) => {
  for (let i = 0; i < n; i += 1) {
    const queued = frames.splice(0, frames.length);
    queued.forEach((cb) => cb(performance.now()));
  }
};

const setMedia = ({ reducedMotion = false, finePointer = true }) => {
  window.matchMedia = jest.fn((query) => ({
    matches: query.includes("prefers-reduced-motion")
      ? reducedMotion
      : finePointer,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }));
};

beforeEach(() => {
  frames = [];
  jest.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
    frames.push(cb);
    return frames.length;
  });
  jest.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});

  ctx = {
    setTransform: jest.fn(),
    clearRect: jest.fn(),
    beginPath: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
    globalAlpha: 1,
    fillStyle: "",
  };
  jest
    .spyOn(HTMLCanvasElement.prototype, "getContext")
    .mockImplementation(() => ctx);

  // jsdom reports every element as zero-sized, which the component correctly
  // treats as "not laid out yet" and skips. Give it a real panel to measure.
  // `clientWidth/Height` is what sizing reads (the padding box); the bounding
  // rect is what pointer positions are read from.
  PANEL.width = 800;
  PANEL.height = 400;
  jest
    .spyOn(HTMLElement.prototype, "clientWidth", "get")
    .mockImplementation(() => PANEL.width);
  jest
    .spyOn(HTMLElement.prototype, "clientHeight", "get")
    .mockImplementation(() => PANEL.height);
  jest
    .spyOn(Element.prototype, "getBoundingClientRect")
    .mockImplementation(() => ({
      width: PANEL.width,
      height: PANEL.height,
      top: 0,
      left: 0,
      right: PANEL.width,
      bottom: PANEL.height,
      x: 0,
      y: 0,
      toJSON: () => {},
    }));

  // Both observers only ever deliver during a rendering update, so neither
  // fires in a headless run (nor, as it happens, in a backgrounded tab).
  // Capturing their callbacks is the only way to exercise those paths.
  observeCallbacks = { resize: null, intersect: null };
  global.ResizeObserver = class {
    constructor(cb) {
      observeCallbacks.resize = cb;
    }
    observe() {}
    disconnect() {}
  };
  global.IntersectionObserver = class {
    constructor(cb) {
      observeCallbacks.intersect = cb;
    }
    observe() {}
    disconnect() {}
  };

  setMedia({});
});

afterEach(() => {
  jest.restoreAllMocks();
  delete global.ResizeObserver;
  delete global.IntersectionObserver;
});

describe("ParticleField", () => {
  it("renders a canvas that is hidden from assistive tech", () => {
    const { container } = render(<ParticleField className="welcome-particles" />);
    const canvas = container.querySelector("canvas");

    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute("aria-hidden", "true");
    expect(canvas).toHaveClass("welcome-particles");
  });

  it("sizes its backing store to the host, scaled for the display", () => {
    window.devicePixelRatio = 2;
    const { container } = render(<ParticleField />);
    const canvas = container.querySelector("canvas");

    // Backing store in device pixels, CSS box in layout pixels — the two must
    // not be conflated or the field renders at half resolution or double size.
    expect(canvas.width).toBe(PANEL.width * 2);
    expect(canvas.height).toBe(PANEL.height * 2);
    expect(canvas.style.width).toBe(`${PANEL.width}px`);
    expect(ctx.setTransform).toHaveBeenCalledWith(2, 0, 0, 2, 0, 0);
    window.devicePixelRatio = 1;
  });

  it("paints particles once the loop runs", () => {
    render(<ParticleField />);
    expect(ctx.arc).not.toHaveBeenCalled();

    advance(1);

    expect(ctx.clearRect).toHaveBeenCalled();
    expect(ctx.arc).toHaveBeenCalled();
    expect(ctx.fill).toHaveBeenCalled();
  });

  it("keeps the particle count in its intended band", () => {
    render(<ParticleField />);
    advance(1);

    // One draw per particle per frame.
    const drawn = ctx.arc.mock.calls.length;
    expect(drawn).toBeGreaterThanOrEqual(14);
    expect(drawn).toBeLessThanOrEqual(70);
  });

  it("under reduced motion it paints a still frame and never starts a loop", () => {
    setMedia({ reducedMotion: true });
    render(<ParticleField />);

    // Painted, so the panel does not lose the texture entirely...
    expect(ctx.arc).toHaveBeenCalled();
    // ...but nothing was ever scheduled, so it cannot move.
    expect(window.requestAnimationFrame).not.toHaveBeenCalled();
  });

  it("tracks the pointer only where there is a real one", () => {
    // React binds its delegated listeners to the root container, so the field
    // is wrapped in a div of its own — that wrapper is the host, and the spy
    // is narrowed to the events actually bound on it.
    const listen = jest.spyOn(HTMLElement.prototype, "addEventListener");
    const eventsOnHost = (container) => {
      const host = container.querySelector("canvas").parentElement;
      return listen.mock.calls
        .filter((_, i) => listen.mock.instances[i] === host)
        .map(([event]) => event);
    };

    setMedia({ finePointer: false });
    const touch = render(
      <div>
        <ParticleField />
      </div>
    );
    expect(eventsOnHost(touch.container)).not.toContain("pointermove");
    touch.unmount();

    listen.mockClear();
    setMedia({ finePointer: true });
    const mouse = render(
      <div>
        <ParticleField />
      </div>
    );
    expect(eventsOnHost(mouse.container)).toContain("pointermove");
  });

  it("follows the host when it is resized", () => {
    const { container } = render(<ParticleField />);
    const canvas = container.querySelector("canvas");
    expect(canvas.width).toBe(800);

    PANEL.width = 1400;
    PANEL.height = 600;
    observeCallbacks.resize();

    expect(canvas.width).toBe(1400);
    expect(canvas.height).toBe(600);
    expect(canvas.style.width).toBe("1400px");
  });

  it("stops animating while the panel is off screen", () => {
    render(<ParticleField />);
    advance(1);
    expect(frames.length).toBeGreaterThan(0);

    observeCallbacks.intersect([{ isIntersecting: false }]);
    frames = [];
    advance(1);
    expect(frames).toHaveLength(0);

    // ...and picks back up when it returns.
    observeCallbacks.intersect([{ isIntersecting: true }]);
    expect(frames.length).toBeGreaterThan(0);
  });

  it("stops animating when the tab goes to the background", () => {
    render(<ParticleField />);
    advance(1);
    const beforeHide = ctx.arc.mock.calls.length;
    expect(beforeHide).toBeGreaterThan(0);

    Object.defineProperty(document, "hidden", {
      value: true,
      configurable: true,
    });
    document.dispatchEvent(new Event("visibilitychange"));

    // Whatever frame was already queued may still run; what matters is that no
    // further frame is scheduled, so the loop dies rather than burning battery
    // on a panel nobody is looking at.
    frames = [];
    advance(1);
    expect(frames).toHaveLength(0);

    Object.defineProperty(document, "hidden", {
      value: false,
      configurable: true,
    });
  });

  it("tears everything down on unmount", () => {
    const remove = jest.spyOn(HTMLElement.prototype, "removeEventListener");
    const docRemove = jest.spyOn(document, "removeEventListener");

    const { unmount } = render(<ParticleField />);
    advance(1);
    unmount();

    expect(window.cancelAnimationFrame).toHaveBeenCalled();
    expect(remove.mock.calls.map(([e]) => e)).toContain("pointermove");
    expect(docRemove.mock.calls.map(([e]) => e)).toContain("visibilitychange");
  });

  it("skips painting when the host has not been laid out yet", () => {
    PANEL.width = 0;
    PANEL.height = 0;

    render(<ParticleField />);
    advance(1);

    // A host with no dimensions yet must not produce particles at NaN
    // coordinates; the component waits for a real measurement instead.
    expect(ctx.setTransform).not.toHaveBeenCalled();
    expect(ctx.arc).not.toHaveBeenCalled();
  });
});
