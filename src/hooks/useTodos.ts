import { useCallback, useEffect, useMemo, useState } from 'react';
import type { AddTodoResult, Todo, TodoFilter } from '../types/todo';

export const STORAGE_KEY = 'capstone-todos';

export function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Todo[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveTodos(todos: Todo[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {
    // Storage may be full or unavailable in private browsing.
  }
}

function createTodo(text: string): Todo {
  return {
    id: crypto.randomUUID(),
    text: text.trim(),
    completed: false,
    createdAt: Date.now(),
  };
}

function isDuplicate(todos: Todo[], text: string): boolean {
  const normalized = text.trim().toLowerCase();
  return todos.some((todo) => todo.text.toLowerCase() === normalized);
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [filter, setFilter] = useState<TodoFilter>('all');

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = useCallback((text: string): AddTodoResult => {
    const trimmed = text.trim();
    if (!trimmed) {
      return { ok: false, reason: 'empty' };
    }

    if (isDuplicate(todos, trimmed)) {
      return { ok: false, reason: 'duplicate' };
    }

    setTodos((current) => [createTodo(trimmed), ...current]);
    return { ok: true };
  }, [todos]);

  const toggleTodo = useCallback((id: string) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((current) => current.filter((todo) => !todo.completed));
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [filter, todos]);

  const activeCount = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos],
  );

  const completedCount = todos.length - activeCount;

  return {
    todos: filteredTodos,
    filter,
    activeCount,
    completedCount,
    totalCount: todos.length,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
  };
}
