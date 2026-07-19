import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the birthday surprise experience', () => {
  render(<App />);
  expect(screen.getByText(/HBD SPECIAL/i)).toBeInTheDocument();
  expect(screen.getByText(/Continue/i)).toBeInTheDocument();
});
