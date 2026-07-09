import { useState, type FormEvent } from 'react';

interface TodoFormProps {
  onAdd: (text: string) => boolean;
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (onAdd(text)) {
      setText('');
    }
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="todo-input">
        New todo
      </label>
      <input
        id="todo-input"
        className="todo-input"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="What needs to be done?"
        autoComplete="off"
      />
      <button className="btn btn-primary" type="submit">
        Add
      </button>
    </form>
  );
}
