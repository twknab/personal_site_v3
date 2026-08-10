import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PrimaryNavigation from "./PrimaryNavigation";


beforeEach(() => {
  render(<PrimaryNavigation />);
});

describe("PrimaryNavigation", () => {
  it("successfully renders primary navigation", () => {
    const nav = screen.getByTestId("primary-navigation");
    expect(nav).toHaveTextContent("Home");
    expect(nav).toHaveTextContent("About");
  });

  it("successfully renders primary navigation dropdown", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByText("About"));
    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(screen.getByText("Education History")).toBeInTheDocument();
  });
});
