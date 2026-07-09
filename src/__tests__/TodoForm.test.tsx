import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TodoForm } from '../components/TodoForm';

describe('TodoForm', () => {
  it('calls onAdd with input text on submit', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn(() => ({ ok: true as const }));

    render(<TodoForm onAdd={onAdd} />);

    await user.type(screen.getByLabelText(/new task/i), 'Write tests');
    await user.click(screen.getByRole('button', { name: /add task/i }));

    expect(onAdd).toHaveBeenCalledWith('Write tests');
  });

  it('shows an error for empty input', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn(() => ({ ok: false as const, reason: 'empty' as const }));

    render(<TodoForm onAdd={onAdd} />);
    await user.click(screen.getByRole('button', { name: /add task/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(/enter a task/i);
  });

  it('shows an error for duplicate tasks', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn(() => ({ ok: false as const, reason: 'duplicate' as const }));

    render(<TodoForm onAdd={onAdd} />);

    await user.type(screen.getByLabelText(/new task/i), 'Duplicate task');
    await user.click(screen.getByRole('button', { name: /add task/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(/already exists/i);
  });

  it('clears the input after a successful add', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn(() => ({ ok: true as const }));

    render(<TodoForm onAdd={onAdd} />);

    const input = screen.getByLabelText(/new task/i);
    await user.type(input, 'New task');
    await user.click(screen.getByRole('button', { name: /add task/i }));

    expect(input).toHaveValue('');
  });
});
