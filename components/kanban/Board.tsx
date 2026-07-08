"use client";

import { useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Column } from "@/components/kanban/Column";
import { TaskCard } from "@/components/kanban/TaskCard";
import { TASK_STATUSES } from "@/utils/constants";
import { sortTasks, tasksByStatus } from "@/utils/helpers";
import type { SortOption, Task, TaskStatus } from "@/types/task";

interface BoardProps {
  tasks: Task[];
  allTasks: Task[];
  statusFilter: TaskStatus | "All";
  sort: SortOption;
  onAddTask: (status: TaskStatus) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
  onMoveTask: (id: string, status: TaskStatus) => void;
  onReorderTasks: (tasks: Task[]) => void;
}

export function Board({
  tasks,
  allTasks,
  statusFilter,
  sort,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onMoveTask,
  onReorderTasks,
}: BoardProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const visibleStatuses = useMemo(
    () => (statusFilter === "All" ? TASK_STATUSES : [statusFilter]),
    [statusFilter],
  );

  const columns = useMemo(() => {
    return visibleStatuses.map((status) => ({
      status,
      tasks: sortTasks(tasksByStatus(tasks, status), sort),
    }));
  }, [visibleStatuses, tasks, sort]);

  function handleDragStart(event: DragStartEvent) {
    const task = allTasks.find((t) => t.id === event.active.id);
    setActiveTask(task ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeTaskItem = allTasks.find((t) => t.id === active.id);
    if (!activeTaskItem) return;

    const overIsColumn = over.data.current?.type === "Column";
    const overTask = allTasks.find((t) => t.id === over.id);
    const targetStatus: TaskStatus | undefined = overIsColumn
      ? (over.id as TaskStatus)
      : overTask?.status;

    if (!targetStatus) return;

    if (activeTaskItem.status !== targetStatus) {
      onMoveTask(activeTaskItem.id, targetStatus);
      return;
    }

    if (overTask && overTask.id !== activeTaskItem.id) {
      const oldIndex = allTasks.findIndex((t) => t.id === activeTaskItem.id);
      const newIndex = allTasks.findIndex((t) => t.id === overTask.id);
      const reordered = [...allTasks];
      const [moved] = reordered.splice(oldIndex, 1);
      reordered.splice(newIndex, 0, moved);
      onReorderTasks(reordered);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-1 gap-4 overflow-x-auto pb-2">
        {columns.map(({ status, tasks: columnTasks }) => (
          <Column
            key={status}
            status={status}
            tasks={columnTasks}
            onAddTask={onAddTask}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask && (
          <TaskCard task={activeTask} onEdit={() => {}} onDelete={() => {}} isOverlay />
        )}
      </DragOverlay>
    </DndContext>
  );
}
