import { render, screen } from '@testing-library/react';

import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const textElement = screen.getByText(/testing unit tests/i);
  expect(textElement).toBeInTheDocument();
});
