# Capstone Project

A React + TypeScript todo list app on the `precise-prompt` branch.

## Features

- Add, complete, and delete tasks
- Filter by All, Active, or Completed
- Clear completed tasks
- Persist tasks in `localStorage` under `capstone-todos`
- CSS Modules styling with responsive layout
- Accessible semantic HTML, labels, and ARIA attributes

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the dev server:

   ```bash
   npm run dev
   ```

3. Open the URL shown in the terminal (usually `http://localhost:5173`).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run Vitest test suite |
| `npm run test:watch` | Run tests in watch mode |

## Project Structure

```text
src/
├── App.tsx
├── components/
│   ├── TodoForm.tsx
│   ├── TodoList.tsx
│   ├── TodoItem.tsx
│   └── TodoFilters.tsx
├── hooks/
│   └── useTodos.ts
├── types/
│   └── todo.ts
└── __tests__/
    └── *.test.tsx
```

## Author

Raahim Naveed Butt — BSCS, Bahria University Islamabad
