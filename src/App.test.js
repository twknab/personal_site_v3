import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe("App", () => {
  it('successfully renders Homepage', () => {
    const { getByText, queryAllByText, getByRole } = render(<App />);
    // Scoped to the nav link rather than a bare /Home/i text match: the page
    // now contains prose using the word "home", which made the loose matcher
    // ambiguous. The assertion was always meant to be about navigation.
    expect(getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(getByText(/Welcome/i)).toBeInTheDocument();
    expect(getByText(/About Me/i)).toBeInTheDocument();
    expect(queryAllByText(/Skills/i).length).toBeGreaterThan(0);
    expect(queryAllByText(/Projects/i).length).toBeGreaterThan(0);
    expect(queryAllByText(/Experience/i).length).toBeGreaterThan(0);
    expect(queryAllByText(/Education History/i).length).toBeGreaterThan(0);
    // Scoped like the Home link above: a project screenshot caption now
    // also contains "Awards", so the bare text matcher is ambiguous.
    expect(getByRole("heading", { name: /Awards/i })).toBeInTheDocument();
    expect(getByText(/Crafted with/i)).toBeInTheDocument();
  });
});
