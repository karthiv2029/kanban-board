"use client";

import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import * as storage from "@/services/localStorage";
import { showSuccess } from "@/services/toast";
import { TOAST_MESSAGES } from "@/utils/constants";
import type { Task, TaskFormValues, TaskStatus } from "@/types/task";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Reading localStorage must happen after mount to avoid SSR/hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTasks(storage.getTasks());
    setIsLoaded(true);
  }, []);

  const addTask = useCallback((values: TaskFormValues) => {
    const now = new Date().toISOString();
    const task: Task = {
      id: uuidv4(),
      title: values.title,
      description: values.description ?? "",
      priority: values.priority,
      status: values.status,
      createdAt: now,
      updatedAt: now,
    };
    setTasks(storage.addTask(task));
    showSuccess(TOAST_MESSAGES.TASK_ADDED);
  }, []);

  const editTask = useCallback((id: string, values: TaskFormValues) => {
    setTasks(
      storage.updateTask(id, {
        title: values.title,
        description: values.description ?? "",
        priority: values.priority,
        status: values.status,
      }),
    );
    showSuccess(TOAST_MESSAGES.TASK_UPDATED);
  }, []);

  const removeTask = useCallback((id: string) => {
    setTasks(storage.deleteTask(id));
    showSuccess(TOAST_MESSAGES.TASK_DELETED);
  }, []);

  const moveTask = useCallback((id: string, status: TaskStatus) => {
    setTasks(storage.updateTask(id, { status }));
    showSuccess(TOAST_MESSAGES.TASK_MOVED);
  }, []);

  const reorderTasks = useCallback((next: Task[]) => {
    storage.saveTasks(next);
    setTasks(next);
  }, []);

  return {
    tasks,
    isLoaded,
    addTask,
    editTask,
    removeTask,
    moveTask,
    reorderTasks,
  };
}
