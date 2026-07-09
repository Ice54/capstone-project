import { useState, type FormEvent } from 'react';
import type { AddTodoResult } from '../types/todo';
import styles from './TodoForm.module.css';

interface TodoFormProps {
  onAdd: (text: string) => AddTodoResult;
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = onAdd(text);

    if (result.ok) {
      setText('');
      setError(null);
      return;
    }

    setError(
      result.reason === 'duplicate'
        ? 'This task already exists.'
        : 'Enter a task before adding.',
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label className={styles.srOnly} htmlFor="todo-input">
        New task
      </label>
      <input
        id="todo-input"
        className={styles.input}
        type="text"
        value={text}
        onChange={(event) => {
          setText(event.target.value);
          if (error) setError(null);
        }}
        placeholder="What needs to be done?"
        autoComplete="off"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? 'todo-input-error' : undefined}
      />
      <button className={styles.addButton} type="submit" aria-label="Add task">
        Add
      </button>
      {error && (
        <p id="todo-input-error" className={styles.error} role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
