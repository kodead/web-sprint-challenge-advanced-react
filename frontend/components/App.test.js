import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AppFunctional from './AppFunctional';
import '@testing-library/jest-dom';
test('it shows the correct initial coordinates and steps', () => {
  // Arrange
  render(<AppFunctional />);

  // Assert (since there's no action, we only assert here)
  expect(screen.getByText('Coordinates (2, 2)')).toBeInTheDocument();
  expect(screen.getByText('You moved 0 times')).toBeInTheDocument();
});

test('it moves the "B" marker to the left and updates coordinates and steps', () => {
  // Arrange
  render(<AppFunctional />);
  
  // Act
  fireEvent.click(screen.getByText('LEFT'));

  // Assert
  expect(screen.getByText('Coordinates (1, 2)')).toBeInTheDocument();
  expect(screen.getByText('You moved 1 time')).toBeInTheDocument();
});

test('it updates email input value', () => {
  // Arrange
  render(<AppFunctional />);

  // Act
  const input = screen.getByPlaceholderText('type email');
  fireEvent.change(input, { target: { value: 'test@example.com' } });

  // Assert
  expect(input.value).toBe('test@example.com');
});