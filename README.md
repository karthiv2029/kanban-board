# Kanban Board

A premium, production-quality Kanban board built with Next.js, TypeScript, and Tailwind CSS. There is **no backend** — every task and session is persisted entirely in the browser's Local Storage.

## Overview

This project is a fully client-side task management dashboard inspired by tools like Linear, Notion, and Trello. It features a dark, glassmorphic UI, drag-and-drop task management across three workflow stages, real-time search/filter/sort, and smooth Framer Motion animations throughout.

## Features

- **Authentication** — Fixed demo credentials, session persisted in Local Storage, protected routes that redirect unauthenticated users to `/login`.
- **Kanban Board** — Three columns (Todo, In Progress, Done) with animated task counts, empty-state illustrations, and drop-area highlighting.
- **Drag and Drop** — Powered by `@dnd-kit`, with a floating drag overlay, keyboard support, and touch support for mobile.
- **Task CRUD** — Add, edit, and delete tasks through animated modals with `react-hook-form` + `zod` validation.
- **Search, Filter & Sort** — Real-time search by title/description, filter by priority/status, and sort by newest, oldest, priority, or alphabetically.
- **Statistics** — Animated counters for total tasks and per-column counts.
- **Global Toasts** — A single reusable toaster (`react-hot-toast`) with `showSuccess` / `showError` / `showInfo` / `showWarning` helpers used consistently across the app.
- **Accessibility** — Keyboard-navigable drag and drop, focus rings, ARIA labels/roles, and a focus-trapped modal dialog.
- **Responsive** — Single column on mobile, adaptive layout on tablet/desktop, with horizontal scroll for the board on small screens.

## Technology Stack

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/) (strict mode)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- [react-hot-toast](https://react-hot-toast.com/)
- [@dnd-kit](https://dndkit.com/) (core, sortable, utilities)
- [lucide-react](https://lucide.dev/)
- `uuid`, `clsx`, `tailwind-merge`

## Folder Structure

```
app/
  login/page.tsx        Login screen
  dashboard/
    layout.tsx           Route protection + Navbar
    page.tsx             Stats, filters, board, modals
  layout.tsx             Root layout, mounts AppToaster
  page.tsx               Redirects based on auth state
components/
  auth/LoginForm.tsx
  kanban/
    Board.tsx, Column.tsx, TaskCard.tsx
    TaskModal.tsx, DeleteModal.tsx
    Stats.tsx, SearchBar.tsx, FilterBar.tsx
  common/
    Button.tsx, Input.tsx, Textarea.tsx, Modal.tsx
    Badge.tsx, Card.tsx, EmptyState.tsx, Loader.tsx
    AppToaster.tsx, Navbar.tsx
hooks/
  useAuth.ts, useTasks.ts, useLocalStorage.ts
services/
  localStorage.ts        Task/auth persistence functions
  toast.ts                showSuccess/showError/showInfo/showWarning
types/
  task.ts, auth.ts
utils/
  constants.ts, helpers.ts, validators.ts
lib/
  storage.ts              Low-level Local Storage read/write wrapper
```

## Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # ESLint
```

## Credentials

| Field    | Value      |
| -------- | ---------- |
| Username | `admin`    |
| Password | `admin123` |

## Project Screenshots

_Add screenshots of the login page and dashboard here._

## Future Improvements

- Multiple boards / workspaces
- Task labels, due dates, and attachments
- Optional backend sync (REST/GraphQL) with the same Local Storage-first architecture as an offline fallback
- Undo/redo for destructive actions
- Dark/light theme toggle


Or build and host the output anywhere that serves a Next.js app:

```bash
npm run build
npm run start
```
