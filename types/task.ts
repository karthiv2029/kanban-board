export type TaskPriority = "Low" | "Medium" | "High";

export type TaskStatus = "Todo" | "In Progress" | "Done";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFormValues {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
}

export type SortOption = "newest" | "oldest" | "priority" | "alphabetical";

export interface TaskFilters {
  search: string;
  priority: TaskPriority | "All";
  status: TaskStatus | "All";
  sort: SortOption;
}
