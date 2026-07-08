"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Modal } from "@/components/common/Modal";
import { Textarea } from "@/components/common/Textarea";
import { cn } from "@/utils/helpers";
import { PRIORITY_META, TASK_PRIORITIES, TASK_STATUSES } from "@/utils/constants";
import { taskSchema, type TaskSchema } from "@/utils/validators";
import type { Task, TaskFormValues, TaskStatus } from "@/types/task";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task | null;
  defaultStatus?: TaskStatus;
  onSave: (values: TaskFormValues, taskId?: string) => void;
}

export function TaskModal({ isOpen, onClose, task, defaultStatus, onSave }: TaskModalProps) {
  const isEditMode = !!task;

  const [descriptionLength, setDescriptionLength] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "Medium",
      status: defaultStatus ?? "Todo",
    },
  });

  useEffect(() => {
    if (!isOpen) return;
    // Re-syncing the form (and its derived character count) to the task prop
    // requires an imperative reset, per react-hook-form's own recommended pattern.
    reset({
      title: task?.title ?? "",
      description: task?.description ?? "",
      priority: task?.priority ?? "Medium",
      status: task?.status ?? defaultStatus ?? "Todo",
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDescriptionLength(task?.description?.length ?? 0);
  }, [isOpen, task, defaultStatus, reset]);

  function onSubmit(values: TaskSchema) {
    const payload: TaskFormValues = {
      title: values.title,
      description: values.description ?? "",
      priority: values.priority,
      status: values.status,
    };
    onSave(payload, task?.id);
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Task" : "Add New Task"}
      description={isEditMode ? "Update the task details below." : "Fill in the details for your new task."}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        <Input
          label="Title"
          placeholder="e.g. Design the onboarding flow"
          error={errors.title?.message}
          {...register("title")}
        />

        <Textarea
          label="Description"
          placeholder="Add more context about this task (optional)"
          error={errors.description?.message}
          hint={`${descriptionLength}/500`}
          maxLength={500}
          {...register("description", {
            onChange: (event) => setDescriptionLength(event.target.value.length),
          })}
        />

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-text-secondary">Priority</span>
          <Controller
            control={control}
            name="priority"
            render={({ field }) => (
              <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Priority">
                {TASK_PRIORITIES.map((priority) => {
                  const isSelected = field.value === priority;
                  return (
                    <button
                      key={priority}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => field.onChange(priority)}
                      className={cn(
                        "focus-ring rounded-xl border px-3 py-2 text-sm font-medium transition-colors",
                        isSelected
                          ? PRIORITY_META[priority].className
                          : "border-border-strong bg-surface-2 text-text-muted hover:text-text-primary",
                      )}
                    >
                      {priority}
                    </button>
                  );
                })}
              </div>
            )}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="task-status" className="text-sm font-medium text-text-secondary">
            Status
          </label>
          <select
            id="task-status"
            {...register("status")}
            className="focus-ring h-11 w-full rounded-xl border border-border-strong bg-surface-2 px-3.5 text-sm text-text-primary transition-colors hover:border-border-strong/80"
          >
            {TASK_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-2 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            <Save className="h-4 w-4" />
            {isEditMode ? "Save Changes" : "Add Task"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
