import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useTodos } from './useTodos';

describe('useTodos', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('adds and persists todos', () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo('Study for exam');
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe('Study for exam');
    expect(JSON.parse(localStorage.getItem('capstone-todos') ?? '[]')).toHaveLength(1);
  });

  it('ignores blank todos', () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      const added = result.current.addTodo('   ');
      expect(added).toBe(false);
    });

    expect(result.current.todos).toHaveLength(0);
  });

  it('clears completed todos', () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo('Keep me');
      result.current.addTodo('Remove me');
    });

    const completedId = result.current.todos.find(
      (todo) => todo.text === 'Remove me',
    )!.id;

    act(() => {
      result.current.toggleTodo(completedId);
      result.current.clearCompleted();
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe('Keep me');
  });
});
