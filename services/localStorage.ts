import { getItem, removeItem, setItem } from "@/lib/storage";
import { DEMO_CREDENTIALS, STORAGE_KEYS } from "@/utils/constants";
import type { AuthState, LoginCredentials } from "@/types/auth";
import type { Task } from "@/types/task";

const DEFAULT_AUTH: AuthState = { isAuthenticated: false, username: null };

export function getTasks(): Task[] {
  return getItem<Task[]>(STORAGE_KEYS.TASKS, []);
}

export function saveTasks(tasks: Task[]): void {
  setItem(STORAGE_KEYS.TASKS, tasks);
}

export function addTask(task: Task): Task[] {
  const next = [...getTasks(), task];
  saveTasks(next);
  return next;
}

export function updateTask(id: string, updates: Partial<Task>): Task[] {
  const next = getTasks().map((task) =>
    task.id === id
      ? { ...task, ...updates, updatedAt: new Date().toISOString() }
      : task,
  );
  saveTasks(next);
  return next;
}

export function deleteTask(id: string): Task[] {
  const next = getTasks().filter((task) => task.id !== id);
  saveTasks(next);
  return next;
}

export function getAuth(): AuthState {
  return getItem<AuthState>(STORAGE_KEYS.AUTH, DEFAULT_AUTH);
}

export function saveAuth(auth: AuthState): void {
  setItem(STORAGE_KEYS.AUTH, auth);
}

export function logout(): void {
  removeItem(STORAGE_KEYS.AUTH);
}

export function validateCredentials(credentials: LoginCredentials): boolean {
  return (
    credentials.username === DEMO_CREDENTIALS.username &&
    credentials.password === DEMO_CREDENTIALS.password
  );
}
