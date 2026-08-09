import React from "react";
import { render, screen } from "@testing-library/react";
import Reading from "./Reading";

beforeEach(() => {
  render(<Reading />);
});

describe("Reading", () => {
  it("pins in-progress books above the completed years", () => {
    expect(document.getElementById("reading-current")).toBeTruthy();
    expect(
      screen.getByAltText(
        "Clean Craftsmanship: Disciplines, Standards, and Ethics cover"
      )
    ).toBeInTheDocument();
  });

  it("renders a 2026 completed group", () => {
    expect(document.getElementById("reading-year-2026")).toBeTruthy();
    expect(screen.getByAltText("Maxalding cover")).toBeInTheDocument();
  });

  it("gives every book a cover image, falling back to the placeholder", () => {
    const covers = document.querySelectorAll("img.reading-cover");
    expect(covers.length).toBeGreaterThan(0);
    covers.forEach((img) => expect(img.getAttribute("src")).toBeTruthy());
  });
});
