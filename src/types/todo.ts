export type TodoFilter = 'all' | 'active' | 'completed';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export type AddTodoResult =
  | { ok: true }
  | { ok: false; reason: 'empty' | 'duplicate' };
