"use client";

import { ArrowUpDown, ListFilter } from "lucide-react";
import { SORT_OPTIONS, TASK_PRIORITIES, TASK_STATUSES } from "@/utils/constants";
import type { SortOption, TaskPriority, TaskStatus } from "@/types/task";

interface FilterBarProps {
  priority: TaskPriority | "All";
  status: TaskStatus | "All";
  sort: SortOption;
  onPriorityChange: (value: TaskPriority | "All") => void;
  onStatusChange: (value: TaskStatus | "All") => void;
  onSortChange: (value: SortOption) => void;
}

const selectClasses =
  "focus-ring h-11 rounded-xl border border-border-strong bg-surface-2 pl-9 pr-8 text-sm text-text-primary transition-colors hover:border-border-strong/80 appearance-none";

export function FilterBar({
  priority,
  status,
  sort,
  onPriorityChange,
  onStatusChange,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative">
        <ListFilter
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
          aria-hidden="true"
        />
        <select
          aria-label="Filter by priority"
          value={priority}
          onChange={(event) => onPriorityChange(event.target.value as TaskPriority | "All")}
          className={selectClasses}
        >
          <option value="All">All Priorities</option>
          {TASK_PRIORITIES.map((item) => (
            <option key={item} value={item}>
              {item} Priority
            </option>
          ))}
        </select>
      </div>

      <div className="relative">
        <ListFilter
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
          aria-hidden="true"
        />
        <select
          aria-label="Filter by status"
          value={status}
          onChange={(event) => onStatusChange(event.target.value as TaskStatus | "All")}
          className={selectClasses}
        >
          <option value="All">All Statuses</option>
          {TASK_STATUSES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="relative">
        <ArrowUpDown
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
          aria-hidden="true"
        />
        <select
          aria-label="Sort tasks"
          value={sort}
          onChange={(event) => onSortChange(event.target.value as SortOption)}
          className={selectClasses}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
