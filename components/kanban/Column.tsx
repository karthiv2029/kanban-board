"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/common/Button";
import { EmptyState } from "@/components/common/EmptyState";
import { TaskCard } from "@/components/kanban/TaskCard";
import { COLUMN_META } from "@/utils/constants";
import { cn } from "@/utils/helpers";
import type { Task, TaskStatus } from "@/types/task";

interface ColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onAddTask: (status: TaskStatus) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
}

export function Column({ status, tasks, onAddTask, onEditTask, onDeleteTask }: ColumnProps) {
  const meta = COLUMN_META[status];
  const { setNodeRef, isOver } = useDroppable({
    id: status,
    data: { type: "Column", status },
  });

  return (
    <div className="flex min-w-[280px] flex-1 flex-col gap-3 sm:min-w-[300px]">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className={cn("h-2 w-2 rounded-full", meta.dot)} aria-hidden="true" />
          <h2 className="text-sm font-semibold text-text-primary">{meta.label}</h2>
          <span className="rounded-full bg-surface-3 px-2 py-0.5 text-xs font-medium text-text-muted">
            {tasks.length}
          </span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={`Add task to ${meta.label}`}
          onClick={() => onAddTask(status)}
          className="h-7 w-7"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div
        ref={setNodeRef}
        className={cn(
          "flex flex-1 flex-col gap-3 rounded-2xl border border-border bg-gradient-to-b p-3 transition-colors",
          meta.accent,
          isOver ? "border-accent/50 bg-accent/5" : "bg-surface/40",
        )}
      >
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          <AnimatePresence mode="popLayout">
            {tasks.length === 0 ? (
              <EmptyState
                key="empty"
                title={`No tasks in ${meta.label.toLowerCase()}`}
                description={meta.description}
              />
            ) : (
              tasks.map((task) => (
                <TaskCard key={task.id} task={task} onEdit={onEditTask} onDelete={onDeleteTask} />
              ))
            )}
          </AnimatePresence>
        </SortableContext>

        {isOver && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.7 }}
            animate={{ opacity: 1, scaleY: 1 }}
            className="h-14 shrink-0 rounded-xl border-2 border-dashed border-accent/50 bg-accent/5"
          />
        )}
      </div>
    </div>
  );
}
