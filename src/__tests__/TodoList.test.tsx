import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TodoList } from '../components/TodoList';
import type { Todo } from '../types/todo';

const todos: Todo[] = [
  { id: '1', text: 'First task', completed: false, createdAt: 1 },
  { id: '2', text: 'Second task', completed: true, createdAt: 2 },
];

describe('TodoList', () => {
  it('renders an empty state when there are no todos', () => {
    render(
      <TodoList todos={[]} onToggle={vi.fn()} onDelete={vi.fn()} />,
    );

    expect(screen.getByRole('status')).toHaveTextContent(/no tasks to show/i);
  });

  it('renders all provided todos', () => {
    render(
      <TodoList todos={todos} onToggle={vi.fn()} onDelete={vi.fn()} />,
    );

    expect(screen.getByLabelText(/task list/i)).toBeInTheDocument();
    expect(screen.getByText('First task')).toBeInTheDocument();
    expect(screen.getByText('Second task')).toBeInTheDocument();
  });
});
