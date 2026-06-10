import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe("App", () => {
  it('successfully renders Homepage', () => {
    const { getByText, queryAllByText } = render(<App />);
    expect(getByText(/Home/i)).toBeInTheDocument();
    expect(getByText(/Welcome/i)).toBeInTheDocument();
    expect(getByText(/About Me/i)).toBeInTheDocument();
    expect(queryAllByText(/Skills/i).length).toBeGreaterThan(0);
    expect(queryAllByText(/Projects/i).length).toBeGreaterThan(0);
    expect(queryAllByText(/Experience/i).length).toBeGreaterThan(0);
    expect(queryAllByText(/Education History/i).length).toBeGreaterThan(0);
    expect(getByText(/Awards/i)).toBeInTheDocument();
    expect(getByText(/Crafted with/i)).toBeInTheDocument();
  });
});
