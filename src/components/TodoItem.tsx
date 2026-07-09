import styles from './TodoItem.module.css';

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
    <li
      className={`${styles.item}${completed ? ` ${styles.completed}` : ''}`}
      data-testid={`todo-item-${id}`}
    >
      <label className={styles.label}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
          aria-label={`Mark "${text}" as ${completed ? 'incomplete' : 'complete'}`}
        />
        <span className={styles.text}>{text}</span>
      </label>
      <button
        className={styles.deleteButton}
        type="button"
        aria-label={`Delete task "${text}"`}
        onClick={() => onDelete(id)}
      >
        Delete
      </button>
    </li>
  );
}
