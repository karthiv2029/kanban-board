import type { HTMLAttributes } from "react";
import { cn } from "@/utils/helpers";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface shadow-lg shadow-black/20",
        className,
      )}
      {...props}
    />
  );
}
