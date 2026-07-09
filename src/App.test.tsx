import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import App from './App';

describe('Todo app', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('adds a todo from the form', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/new todo/i), 'Ship capstone project');
    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getByText('Ship capstone project')).toBeInTheDocument();
  });

  it('toggles a todo as completed', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/new todo/i), 'Write tests');
    await user.click(screen.getByRole('button', { name: /add/i }));

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it('filters completed todos', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/new todo/i), 'Active task');
    await user.click(screen.getByRole('button', { name: /add/i }));
    await user.type(screen.getByLabelText(/new todo/i), 'Done task');
    await user.click(screen.getByRole('button', { name: /add/i }));

    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[0]);

    await user.click(screen.getByRole('tab', { name: /completed/i }));

    expect(screen.getByText('Done task')).toBeInTheDocument();
    expect(screen.queryByText('Active task')).not.toBeInTheDocument();
  });
});
