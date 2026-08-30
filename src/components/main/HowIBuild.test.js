import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HowIBuild from "./HowIBuild";

// react-scroll's <Element> registers its anchor internally and renders no
// `name` attribute, which is exactly why a `nameName=` typo was invisible in
// the DOM when it shipped on another section. Mocking it makes the prop the
// component actually passes observable.
jest.mock("react-scroll", () => ({
  Element: (props) => (
    <div
      data-testid="scroll-anchor"
      data-anchor-name={props.name === undefined ? "MISSING" : props.name}
      data-anchor-badprop={Object.keys(props)
        .filter((k) => k !== "name" && k !== "children")
        .join(",")}
    />
  ),
}));
import { flow, lastRevised, stages } from "./how-i-build/methodology";

describe("HowIBuild", () => {
  it("shows every stage name and summary without any interaction", () => {
    render(<HowIBuild />);

    // FR-013 / SC-008: the whole methodology is legible before the reader
    // touches anything.
    stages.forEach((stage) => {
      expect(screen.getByText(stage.name)).toBeInTheDocument();
      expect(screen.getByText(stage.summary)).toBeInTheDocument();
    });
  });

  it("keeps stage detail collapsed until its control is activated", async () => {
    const user = userEvent.setup();
    render(<HowIBuild />);

    const [first] = stages;
    const control = screen.getByRole("button", {
      name: new RegExp(first.name, "i"),
    });

    expect(control).toHaveAttribute("aria-expanded", "false");

    await user.click(control);

    expect(control).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(first.detail[0])).toBeVisible();
  });

  it("toggles each stage independently", async () => {
    const user = userEvent.setup();
    render(<HowIBuild />);

    const controls = stages.map((stage) =>
      screen.getByRole("button", { name: new RegExp(stage.name, "i") })
    );

    await user.click(controls[1]);

    expect(controls[1]).toHaveAttribute("aria-expanded", "true");
    expect(controls[0]).toHaveAttribute("aria-expanded", "false");
  });

  it("renders every pipeline step in the diagram", () => {
    const { container } = render(<HowIBuild />);
    const steps = container.querySelectorAll(".hib-flow-step");

    expect(steps).toHaveLength(flow.length);
    flow.forEach(({ label }) => {
      expect(within(container.querySelector(".hib-flow")).getByText(label))
        .toBeInTheDocument();
    });
  });

  it("joins every step to the next one, including the loop target", () => {
    // The connectors were pseudo-elements once, and the loop target spends its
    // ::after on the conic ring — so the connector leaving that step silently
    // did not exist, leaving a gap mid-pipeline. Asserting the count here and
    // the position below makes that break visible in the suite rather than
    // only on the rendered page.
    const { container } = render(<HowIBuild />);
    const steps = [...container.querySelectorAll(".hib-flow-step")];

    expect(container.querySelectorAll(".hib-flow-connector")).toHaveLength(
      flow.length - 1
    );

    steps.forEach((step, i) => {
      const connector = step.querySelector(".hib-flow-connector");
      const isLast = i === steps.length - 1;
      // Every step leads somewhere except the last, whatever else it is.
      expect(Boolean(connector)).toBe(!isLast);
    });
  });

  it("hides the diagram from assistive tech, since the stages carry the same content", () => {
    // The diagram restates the stage list visually. Exposing both would make a
    // screen reader read the whole pipeline twice.
    const { container } = render(<HowIBuild />);
    expect(container.querySelector(".hib-flow")).toHaveAttribute(
      "aria-hidden",
      "true"
    );
  });

  it("gives every stage an icon", () => {
    const { container } = render(<HowIBuild />);
    expect(container.querySelectorAll(".hib-stage-icon svg")).toHaveLength(
      stages.length
    );
  });

  it("renders inline tags as either plain labels or real links, never buttons", () => {
    // A tag either goes somewhere or it does not. What it must never be is a
    // button, which would promise a click that does nothing.
    const { container } = render(<HowIBuild />);
    const inlineTags = container.querySelectorAll(".hib-tools .hib-tag");

    expect(inlineTags.length).toBeGreaterThan(0);
    inlineTags.forEach((tag) => {
      expect(["LI", "A"]).toContain(tag.tagName);
      if (tag.tagName === "A") {
        expect(tag.getAttribute("href")).toMatch(/^https:\/\//);
        expect(tag).toHaveAttribute("rel", expect.stringContaining("noopener"));
      }
    });
  });

  it("links every tool that has a destination, and leaves the rest as labels", () => {
    const { container } = render(<HowIBuild />);
    const linked = container.querySelectorAll(".hib-tools .hib-tag-link");

    // Every linked tag carries a brand mark alongside its name.
    linked.forEach((tag) => expect(tag.querySelector("svg")).toBeTruthy());
    expect(linked.length).toBeGreaterThan(5);
  });

  it("offers a tag cloud that opens the stage using that tool", async () => {
    const user = userEvent.setup();
    const { container } = render(<HowIBuild />);

    const cloudTag = container.querySelector(".hib-cloud-list .hib-tag-button");
    expect(cloudTag).toBeInTheDocument();

    const tool = cloudTag.textContent.trim();
    const target = stages.find((st) => (st.tools || []).includes(tool));
    const control = screen.getByRole("button", {
      name: new RegExp(target.name, "i"),
    });

    expect(control).toHaveAttribute("aria-expanded", "false");
    await user.click(cloudTag);
    expect(control).toHaveAttribute("aria-expanded", "true");
  });

  it("states when the methodology was last revised", () => {
    render(<HowIBuild />);
    expect(
      screen.getByText(new RegExp(`last revised ${lastRevised}`, "i"))
    ).toBeInTheDocument();
  });

  it("registers the scroll anchor under the exact name the nav calls", () => {
    // Regression guard. A `nameName=` typo on the Experience anchor shipped
    // once: react-scroll never registered it, the nav item scrolled nowhere,
    // and nothing failed — the bad prop just leaked to the DOM. Assert both
    // that the anchor exists and that no misspelled variant leaked.
    render(<HowIBuild />);
    const anchor = screen.getByTestId("scroll-anchor");

    expect(anchor).toHaveAttribute("data-anchor-name", "how-i-build");
    // Any prop other than `name` means a typo like `nameName` slipped in.
    expect(anchor).toHaveAttribute("data-anchor-badprop", "");
  });

  it("does not log React warnings about unknown DOM props", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    render(<HowIBuild />);
    const unknownProp = spy.mock.calls.find((args) =>
      String(args[0]).includes("does not recognize")
    );
    spy.mockRestore();
    expect(unknownProp).toBeUndefined();
  });
});
