import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TodoFilters } from '../components/TodoFilters';

describe('TodoFilters', () => {
  it('shows active task count', () => {
    render(
      <TodoFilters
        filter="all"
        activeCount={2}
        completedCount={1}
        onFilterChange={vi.fn()}
        onClearCompleted={vi.fn()}
      />,
    );

    expect(screen.getByRole('status')).toHaveTextContent('2 tasks remaining');
  });

  it('calls onFilterChange when a filter button is clicked', async () => {
    const user = userEvent.setup();
    const onFilterChange = vi.fn();

    render(
      <TodoFilters
        filter="all"
        activeCount={1}
        completedCount={0}
        onFilterChange={onFilterChange}
        onClearCompleted={vi.fn()}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Active' }));
    expect(onFilterChange).toHaveBeenCalledWith('active');
  });

  it('shows clear completed button only when completed tasks exist', () => {
    const { rerender } = render(
      <TodoFilters
        filter="all"
        activeCount={1}
        completedCount={0}
        onFilterChange={vi.fn()}
        onClearCompleted={vi.fn()}
      />,
    );

    expect(screen.queryByRole('button', { name: /clear completed/i })).not.toBeInTheDocument();

    rerender(
      <TodoFilters
        filter="all"
        activeCount={1}
        completedCount={2}
        onFilterChange={vi.fn()}
        onClearCompleted={vi.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: /clear completed/i })).toBeInTheDocument();
  });

  it('calls onClearCompleted when clear button is clicked', async () => {
    const user = userEvent.setup();
    const onClearCompleted = vi.fn();

    render(
      <TodoFilters
        filter="all"
        activeCount={1}
        completedCount={1}
        onFilterChange={vi.fn()}
        onClearCompleted={onClearCompleted}
      />,
    );

    await user.click(screen.getByRole('button', { name: /clear completed/i }));
    expect(onClearCompleted).toHaveBeenCalledTimes(1);
  });
});
