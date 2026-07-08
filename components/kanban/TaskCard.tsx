"use client";

import { useSortable } from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { cn, formatDate } from "@/utils/helpers";
import type { Task } from "@/types/task";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  isOverlay?: boolean;
}

export function TaskCard({ task, onEdit, onDelete, isOverlay }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { type: "Task", task },
  });

  const style = {
    x: transform?.x ?? 0,
    y: transform?.y ?? 0,
    transition: transition ?? undefined,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout={!isOverlay}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: isDragging && !isOverlay ? 0.35 : 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      whileHover={isOverlay ? undefined : { y: -2 }}
      transition={{ duration: 0.2 }}
      {...attributes}
      {...listeners}
      tabIndex={isOverlay ? -1 : 0}
      role="button"
      aria-roledescription="Draggable task card"
      aria-label={`Task: ${task.title}, priority ${task.priority}, status ${task.status}`}
      className={cn(
        "group focus-ring relative flex flex-col gap-3 rounded-xl border border-border bg-surface-2 p-4 shadow-sm shadow-black/10 transition-colors hover:border-border-strong hover:shadow-lg hover:shadow-black/20",
        isOverlay && "rotate-2 border-accent/40 shadow-2xl shadow-accent/20",
        isDragging && !isOverlay && "cursor-grabbing",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <Badge priority={task.priority} />
        <div
          className={cn(
            "flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100",
            isOverlay && "hidden",
          )}
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Edit task"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => onEdit(task)}
            className="h-7 w-7"
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Delete task"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => onDelete(task)}
            className="h-7 w-7 hover:text-danger"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-sm font-semibold leading-snug text-text-primary">{task.title}</h3>
        {task.description && (
          <p className="line-clamp-2 text-xs leading-relaxed text-text-secondary">
            {task.description}
          </p>
        )}
      </div>

      <p className="text-[11px] text-text-muted">Updated {formatDate(task.updatedAt)}</p>
    </motion.div>
  );
}
