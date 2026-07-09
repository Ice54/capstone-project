import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import App from '../App';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('adds and displays a new task', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/new task/i), 'Finish capstone');
    await user.click(screen.getByRole('button', { name: /add task/i }));

    expect(screen.getByText('Finish capstone')).toBeInTheDocument();
  });

  it('filters active and completed tasks', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/new task/i), 'Active task');
    await user.click(screen.getByRole('button', { name: /add task/i }));
    await user.type(screen.getByLabelText(/new task/i), 'Done task');
    await user.click(screen.getByRole('button', { name: /add task/i }));

    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[0]);

    await user.click(screen.getByRole('button', { name: 'Completed' }));
    expect(screen.getByText('Done task')).toBeInTheDocument();
    expect(screen.queryByText('Active task')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Active' }));
    expect(screen.getByText('Active task')).toBeInTheDocument();
    expect(screen.queryByText('Done task')).not.toBeInTheDocument();
  });

  it('prevents duplicate tasks', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/new task/i), 'Unique task');
    await user.click(screen.getByRole('button', { name: /add task/i }));
    await user.type(screen.getByLabelText(/new task/i), 'unique task');
    await user.click(screen.getByRole('button', { name: /add task/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(/already exists/i);
    expect(screen.getAllByText('Unique task')).toHaveLength(1);
  });
});
