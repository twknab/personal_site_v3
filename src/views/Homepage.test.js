import React from 'react';
import { render, screen } from '@testing-library/react';
import Homepage from './Homepage';

beforeEach(() => {
  render(<Homepage />);
});

describe("Homepage", () => {
  it('successfully renders primary navigation', () => {
    const { getByTestId } = screen;
    const nav = getByTestId("primary-navigation");
    expect(nav).toHaveTextContent("Home");
    expect(nav).toHaveTextContent("About");
  });

  it("successfully renders main content", () => {
    const { getByTestId } = screen;
    const contentSections = getByTestId("main-content");
    expect(contentSections).toHaveTextContent("Welcome");
    expect(contentSections).toHaveTextContent("About Me");
    expect(contentSections).toHaveTextContent("Skills");
    expect(contentSections).toHaveTextContent("Projects");
    expect(contentSections).toHaveTextContent("experience");
    expect(contentSections).toHaveTextContent("Education History");
    expect(contentSections).toHaveTextContent("Awards");
  });

  // Guards the horizontal-scroll regression: a string `fluid` prop renders
  // `container-true` (not a real Bootstrap class), which drops the container
  // padding that offsets the negative row gutters inside it.
  it("renders the main content as a real fluid container", () => {
    const { getByTestId } = screen;
    expect(getByTestId("main-content")).toHaveClass("container-fluid");
  });

  it("successfully renders primary footer", () => {
    const { getByTestId } = screen;
    const footer = getByTestId("primary-footer");
    expect(footer).toHaveTextContent("Crafted with 💚");
    expect(footer).toHaveTextContent(`${new Date().getFullYear()} timknab.dev`);
  });
});
