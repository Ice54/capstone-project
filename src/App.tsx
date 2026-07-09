import { TodoFilters } from './components/TodoFilters';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { useTodos } from './hooks/useTodos';
import styles from './App.module.css';

export default function App() {
  const {
    todos,
    filter,
    activeCount,
    completedCount,
    totalCount,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
  } = useTodos();

  return (
    <main className={styles.app}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Capstone Project</p>
          <h1 className={styles.title}>Todo List</h1>
          <p className={styles.subtitle}>
            Add tasks, mark them complete, and filter what matters.
          </p>
        </header>

        <section className={styles.card} aria-label="Todo application">
          <TodoForm onAdd={addTodo} />

          {totalCount > 0 && (
            <TodoFilters
              filter={filter}
              activeCount={activeCount}
              completedCount={completedCount}
              onFilterChange={setFilter}
              onClearCompleted={clearCompleted}
            />
          )}

          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </section>
      </div>
    </main>
  );
}
