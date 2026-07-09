import { TodoFilters } from './components/TodoFilters';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { useTodos } from './hooks/useTodos';

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
    <main className="app">
      <div className="app__shell">
        <header className="app__header">
          <p className="app__eyebrow">Capstone Project</p>
          <h1 className="app__title">Todo List</h1>
          <p className="app__subtitle">
            Capture tasks, mark them done, and keep your day on track.
          </p>
        </header>

        <section className="app__card" aria-label="Todo list">
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
