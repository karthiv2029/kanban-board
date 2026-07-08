import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { SortOption, Task, TaskPriority, TaskStatus } from "@/types/task";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const PRIORITY_WEIGHT: Record<TaskPriority, number> = {
  High: 0,
  Medium: 1,
  Low: 2,
};

export function sortTasks(tasks: Task[], sort: SortOption): Task[] {
  const copy = [...tasks];
  switch (sort) {
    case "oldest":
      return copy.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    case "priority":
      return copy.sort(
        (a, b) => PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority],
      );
    case "alphabetical":
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    case "newest":
    default:
      return copy.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }
}

interface FilterOptions {
  search: string;
  priority: TaskPriority | "All";
}

export function filterTasks(tasks: Task[], { search, priority }: FilterOptions): Task[] {
  const query = search.trim().toLowerCase();
  return tasks.filter((task) => {
    const matchesSearch =
      query.length === 0 ||
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query);
    const matchesPriority = priority === "All" || task.priority === priority;
    return matchesSearch && matchesPriority;
  });
}

export function tasksByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((task) => task.status === status);
}
