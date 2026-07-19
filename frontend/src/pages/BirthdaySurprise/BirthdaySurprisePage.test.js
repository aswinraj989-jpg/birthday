import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import BirthdaySurprisePage from './BirthdaySurprisePage';

test('renders the birthday website with a home screen and continue button', () => {
  render(<BirthdaySurprisePage />);
  expect(screen.getByText(/HBD SPECIAL/i)).toBeInTheDocument();
  expect(screen.getByText(/Continue/i)).toBeInTheDocument();
  expect(screen.getByText(/A gift made for you/i)).toBeInTheDocument();
});
