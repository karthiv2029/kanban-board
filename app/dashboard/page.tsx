"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Board } from "@/components/kanban/Board";
import { DeleteModal } from "@/components/kanban/DeleteModal";
import { FilterBar } from "@/components/kanban/FilterBar";
import { SearchBar } from "@/components/kanban/SearchBar";
import { Stats } from "@/components/kanban/Stats";
import { TaskModal } from "@/components/kanban/TaskModal";
import { Button } from "@/components/common/Button";
import { Loader } from "@/components/common/Loader";
import { useTasks } from "@/hooks/useTasks";
import { filterTasks } from "@/utils/helpers";
import type { SortOption, Task, TaskFormValues, TaskPriority, TaskStatus } from "@/types/task";

export default function DashboardPage() {
  const { tasks, isLoaded, addTask, editTask, removeTask, moveTask, reorderTasks } = useTasks();

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "All">("All");
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "All">("All");
  const [sort, setSort] = useState<SortOption>("newest");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<TaskStatus>("Todo");
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  const filteredTasks = useMemo(
    () => filterTasks(tasks, { search, priority: priorityFilter }),
    [tasks, search, priorityFilter],
  );

  function openAddModal(status: TaskStatus) {
    setEditingTask(null);
    setDefaultStatus(status);
    setIsModalOpen(true);
  }

  function openEditModal(task: Task) {
    setEditingTask(task);
    setIsModalOpen(true);
  }

  function handleSave(values: TaskFormValues, taskId?: string) {
    if (taskId) {
      editTask(taskId, values);
    } else {
      addTask(values);
    }
  }

  function handleDeleteConfirm(task: Task) {
    removeTask(task.id);
    setDeletingTask(null);
  }

  if (!isLoaded) {
    return <Loader fullScreen label="Loading your board" />;
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <Stats tasks={tasks} />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBar value={search} onChange={setSearch} className="sm:max-w-xs" />
          <FilterBar
            priority={priorityFilter}
            status={statusFilter}
            sort={sort}
            onPriorityChange={setPriorityFilter}
            onStatusChange={setStatusFilter}
            onSortChange={setSort}
          />
        </div>
        <Button type="button" onClick={() => openAddModal("Todo")} className="shrink-0">
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </motion.div>

      <Board
        tasks={filteredTasks}
        allTasks={tasks}
        statusFilter={statusFilter}
        sort={sort}
        onAddTask={openAddModal}
        onEditTask={openEditModal}
        onDeleteTask={setDeletingTask}
        onMoveTask={moveTask}
        onReorderTasks={reorderTasks}
      />

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={editingTask}
        defaultStatus={defaultStatus}
        onSave={handleSave}
      />

      <DeleteModal
        task={deletingTask}
        onClose={() => setDeletingTask(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
