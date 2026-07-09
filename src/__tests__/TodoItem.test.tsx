import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TodoItem } from '../components/TodoItem';

describe('TodoItem', () => {
  it('renders task text and checkbox state', () => {
    render(
      <TodoItem
        id="1"
        text="Buy groceries"
        completed={false}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('calls onToggle when checkbox is clicked', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();

    render(
      <TodoItem
        id="2"
        text="Read docs"
        completed={false}
        onToggle={onToggle}
        onDelete={vi.fn()}
      />,
    );

    await user.click(screen.getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledWith('2');
  });

  it('calls onDelete when delete button is clicked', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    render(
      <TodoItem
        id="3"
        text="Ship feature"
        completed={true}
        onToggle={vi.fn()}
        onDelete={onDelete}
      />,
    );

    await user.click(screen.getByRole('button', { name: /delete task "ship feature"/i }));
    expect(onDelete).toHaveBeenCalledWith('3');
  });
});
