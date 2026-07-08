import type { SortOption, TaskPriority, TaskStatus } from "@/types/task";

export const STORAGE_KEYS = {
  TASKS: "kanban_tasks",
  AUTH: "kanban_auth",
} as const;

export const DEMO_CREDENTIALS = {
  username: "admin",
  password: "admin123",
} as const;

export const TASK_STATUSES: TaskStatus[] = ["Todo", "In Progress", "Done"];

export const TASK_PRIORITIES: TaskPriority[] = ["Low", "Medium", "High"];

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "priority", label: "Priority" },
  { value: "alphabetical", label: "Alphabetical" },
];

export const COLUMN_META: Record<
  TaskStatus,
  { label: string; description: string; dot: string; accent: string }
> = {
  Todo: {
    label: "Todo",
    description: "Not started yet",
    dot: "bg-slate-400",
    accent: "from-slate-500/20 to-slate-500/0",
  },
  "In Progress": {
    label: "In Progress",
    description: "Currently being worked on",
    dot: "bg-amber-400",
    accent: "from-amber-500/20 to-amber-500/0",
  },
  Done: {
    label: "Done",
    description: "Completed tasks",
    dot: "bg-emerald-400",
    accent: "from-emerald-500/20 to-emerald-500/0",
  },
};

export const PRIORITY_META: Record<
  TaskPriority,
  { label: string; className: string; ring: string }
> = {
  Low: {
    label: "Low",
    className: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    ring: "ring-emerald-500/30",
  },
  Medium: {
    label: "Medium",
    className: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    ring: "ring-amber-500/30",
  },
  High: {
    label: "High",
    className: "bg-rose-500/10 text-rose-300 border-rose-500/20",
    ring: "ring-rose-500/30",
  },
};

export const TOAST_MESSAGES = {
  TASK_ADDED: "Task Added Successfully",
  TASK_UPDATED: "Task Updated Successfully",
  TASK_DELETED: "Task Deleted Successfully",
  TASK_MOVED: "Task Moved Successfully",
  LOGIN_SUCCESS: "Login Successful",
  LOGGED_OUT: "Logged Out",
  INVALID_CREDENTIALS: "Invalid username or password",
  VALIDATION_ERROR: "Validation Error",
} as const;
