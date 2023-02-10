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
    expect(nav).toHaveTextContent("Contact");
  });

  it("successfully renders main content", () => {
    const { getByTestId } = screen;
    const contentSections = getByTestId("main-content");
    expect(contentSections).toHaveTextContent("Summary");
    expect(contentSections).toHaveTextContent("About Me");
    expect(contentSections).toHaveTextContent("Skills");
    expect(contentSections).toHaveTextContent("Projects");
    expect(contentSections).toHaveTextContent("Experience");
    expect(contentSections).toHaveTextContent("Education History");
    expect(contentSections).toHaveTextContent("Awards");
  });

  it("successfully renders primary footer", () => {
    const { getByTestId } = screen;
    const footer = getByTestId("primary-footer");
    expect(footer).toHaveTextContent("handcrafted with 💚");
    expect(footer).toHaveTextContent(`${new Date().getFullYear()} timknab.dev`);
  });
});
