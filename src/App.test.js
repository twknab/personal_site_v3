import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe("App", () => {
  it('successfully renders Homepage', () => {
    const { getByText, queryAllByText } = render(<App />);
    expect(getByText(/Home/i)).toBeInTheDocument();
    expect(getByText(/Contact/i)).toBeInTheDocument();
    expect(getByText(/Summary/i)).toBeInTheDocument();
    expect(getByText(/About Me/i)).toBeInTheDocument();
    expect(getByText(/Skills/i)).toBeInTheDocument();
    expect(queryAllByText(/Projects/i).length).toBeGreaterThan(0);
    expect(queryAllByText(/Experience/i).length).toBeGreaterThan(0);
    expect(getByText(/Education History/i)).toBeInTheDocument();
    expect(getByText(/Awards/i)).toBeInTheDocument();
    expect(getByText(/Handcrafted with/i)).toBeInTheDocument();
  });
});