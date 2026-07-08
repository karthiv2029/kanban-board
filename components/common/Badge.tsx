import type { HTMLAttributes } from "react";
import { cn } from "@/utils/helpers";
import { PRIORITY_META } from "@/utils/constants";
import type { TaskPriority } from "@/types/task";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  priority: TaskPriority;
}

export function Badge({ priority, className, ...props }: BadgeProps) {
  const meta = PRIORITY_META[priority];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        meta.className,
        className,
      )}
      {...props}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {meta.label}
    </span>
  );
}
