import type { TodoFilter } from '../types/todo';
import styles from './TodoFilters.module.css';

interface TodoFiltersProps {
  filter: TodoFilter;
  activeCount: number;
  completedCount: number;
  onFilterChange: (filter: TodoFilter) => void;
  onClearCompleted: () => void;
}

const FILTERS: { value: TodoFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export function TodoFilters({
  filter,
  activeCount,
  completedCount,
  onFilterChange,
  onClearCompleted,
}: TodoFiltersProps) {
  return (
    <section className={styles.filters} aria-label="Task filters">
      <p className={styles.count} role="status">
        {activeCount} {activeCount === 1 ? 'task' : 'tasks'} remaining
      </p>

      <div className={styles.tabs} role="group" aria-label="Filter tasks">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            className={`${styles.tab}${filter === value ? ` ${styles.activeTab}` : ''}`}
            type="button"
            aria-pressed={filter === value}
            onClick={() => onFilterChange(value)}
          >
            {label}
          </button>
        ))}
      </div>

      {completedCount > 0 && (
        <button
          className={styles.clearButton}
          type="button"
          aria-label="Clear completed tasks"
          onClick={onClearCompleted}
        >
          Clear completed
        </button>
      )}
    </section>
  );
}
