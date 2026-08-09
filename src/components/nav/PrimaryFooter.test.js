import React from "react";
import { render, screen } from "@testing-library/react";
import PrimaryFooter from "./PrimaryFooter";

beforeEach(() => {
  render(<PrimaryFooter />);
});

describe("PrimaryFooter", () => {
  it("successfully renders primary footer", () => {
    const footer = screen.getByTestId("primary-footer");
    expect(footer).toHaveTextContent("Crafted with 💚");
    expect(footer).toHaveTextContent(
      `${new Date().getFullYear()} timknab.dev`
    );
  });

  it("renders as a real fluid container", () => {
    expect(screen.getByTestId("primary-footer")).toHaveClass("container-fluid");
  });
});
