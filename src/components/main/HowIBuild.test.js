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
import {
  caseStudies,
  lastRevised,
  stages,
} from "./how-i-build/methodology";

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

  it("renders no empty containers for a stage without tools or evidence", () => {
    // FR-012: at least one stage deliberately cites nothing. It must not leave
    // an orphaned "Evidence:" label or an empty chip row behind.
    const bare = stages.find((s) => !s.evidence || s.evidence.length === 0);
    expect(bare).toBeDefined();

    const { container } = render(<HowIBuild />);
    const panel = container.querySelector(`#hib-panel-${bare.id}`);

    expect(within(panel).queryByText("Evidence:")).not.toBeInTheDocument();
  });

  it("renders the case studies and their links", () => {
    const { container } = render(<HowIBuild />);
    // Scoped to the case list: some PRs are legitimately cited both as stage
    // evidence and as a case study, so a document-wide query is ambiguous.
    const cases = container.querySelector(".hib-cases");

    caseStudies.forEach((study) => {
      const item = within(cases).getByText(study.title).closest(".hib-case");
      const link = within(item).getByRole("link");
      expect(link).toHaveAttribute("href", study.link.href);
      expect(link).toHaveTextContent(study.link.label);
    });
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
