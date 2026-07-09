import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { loadTodos, saveTodos, STORAGE_KEY, useTodos } from '../hooks/useTodos';

describe('useTodos', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('adds a task and persists it to localStorage', () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      const response = result.current.addTodo('Study TypeScript');
      expect(response).toEqual({ ok: true });
    });

    expect(result.current.todos).toHaveLength(1);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')).toHaveLength(1);
  });

  it('rejects empty input', () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      const response = result.current.addTodo('   ');
      expect(response).toEqual({ ok: false, reason: 'empty' });
    });

    expect(result.current.todos).toHaveLength(0);
  });

  it('rejects duplicate tasks case-insensitively', () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo('Walk the dog');
    });

    act(() => {
      const response = result.current.addTodo('walk the dog');
      expect(response).toEqual({ ok: false, reason: 'duplicate' });
    });

    expect(result.current.todos).toHaveLength(1);
  });

  it('clears completed tasks', () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo('Keep');
      result.current.addTodo('Remove');
    });

    const removeId = result.current.todos.find((todo) => todo.text === 'Remove')!.id;

    act(() => {
      result.current.toggleTodo(removeId);
      result.current.clearCompleted();
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe('Keep');
  });

  it('returns an empty list when localStorage read fails', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });

    expect(loadTodos()).toEqual([]);
  });

  it('does not throw when localStorage write fails', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota exceeded');
    });

    expect(() => saveTodos([])).not.toThrow();
  });
});
