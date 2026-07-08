"use client";

import { AlertTriangle, Trash2 } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Modal } from "@/components/common/Modal";
import type { Task } from "@/types/task";

interface DeleteModalProps {
  task: Task | null;
  onClose: () => void;
  onConfirm: (task: Task) => void;
}

export function DeleteModal({ task, onClose, onConfirm }: DeleteModalProps) {
  if (!task) return null;

  return (
    <Modal isOpen={!!task} onClose={onClose} title="Delete Task" className="max-w-md">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3 rounded-xl border border-danger/20 bg-danger/10 p-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-danger" aria-hidden="true" />
          <p className="text-sm text-text-secondary">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-text-primary">&ldquo;{task.title}&rdquo;</span>?
            This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" variant="danger" onClick={() => onConfirm(task)}>
            <Trash2 className="h-4 w-4" />
            Delete Task
          </Button>
        </div>
      </div>
    </Modal>
  );
}
