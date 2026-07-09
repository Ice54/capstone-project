import type { TodoFilter } from '../types/todo';

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
    <div className="todo-filters">
      <p className="todo-filters__count" role="status">
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </p>

      <div className="todo-filters__tabs" role="tablist" aria-label="Filter todos">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            className={`filter-tab${filter === value ? ' filter-tab--active' : ''}`}
            type="button"
            role="tab"
            aria-selected={filter === value}
            onClick={() => onFilterChange(value)}
          >
            {label}
          </button>
        ))}
      </div>

      {completedCount > 0 && (
        <button
          className="btn btn-ghost"
          type="button"
          onClick={onClearCompleted}
        >
          Clear completed
        </button>
      )}
    </div>
  );
}
