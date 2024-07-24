// Write your tests here
import React from "react"
import { render, screen, fireEvent } from '@testing-library/react' ;
import AppFunctional from "./AppFunctional";

test('render grid and controls', () => {
  render(<AppFunctional/>)
  expect(screen.getAllByRole('button').length).toBe(4);
  expect(screen.getByText('coordinates (2, 2)')).toBeInTheDocument();
  expect(screen.getByText('you moved 0 times')).toBeInTheDocument();

});
test('move the "B" marker', () => {
  render(<AppFunctional/>);
  fireEvent.click(screen.getByText('LEFT'));
  expect(screen.getByText('coordinates 1, 2')).toBeInTheDocument
  expect(screen.getByText('you moved 1 times')).toBeInTheDocument

  fireEvent.click(screen.getByText('UP'));
  expect(screen.getByText('coordinates 1, 1')).toBeInTheDocument
  expect(screen.getByText('you moved 2 times')).toBeInTheDocument





});
test('update email input value', () => {
  render(<AppFunctional/>);
  const input = screen.getByPlaceholderText('type email');
  fireEvent.change(input, {target: { value: 'test@examples.com' } });
  expect(input.value).toBe('test@example.com');
});
test('submit form and displays message', async () => {
  render(<AppFunctional/>);

  const input = screen.getByPlaceholderText('type email');
  fireEvent.change(input, { target: { value: 'test@examples.com' } });

  fireEvent.click(screen.getByText('submit'));

  expect(await screen.findByTex(/message/i)).toBeInTheDocument()
})
test('sanity', () => {
  expect(true).toBe(false)
})
