interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({
  id,
  text,
  completed,
  onToggle,
  onDelete,
}: TodoItemProps) {
  return (
    <li className={`todo-item${completed ? ' todo-item--completed' : ''}`}>
      <label className="todo-item__label">
        <input
          className="todo-item__checkbox"
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
        />
        <span className="todo-item__text">{text}</span>
      </label>
      <button
        className="btn btn-ghost"
        type="button"
        aria-label={`Delete "${text}"`}
        onClick={() => onDelete(id)}
      >
        Delete
      </button>
    </li>
  );
}
