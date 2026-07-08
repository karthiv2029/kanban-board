"use client";

import { type TextareaHTMLAttributes, forwardRef, useId } from "react";
import { cn } from "@/utils/helpers";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const errorId = `${textareaId}-error`;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-text-secondary">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "focus-ring min-h-28 w-full resize-none rounded-xl border border-border-strong bg-surface-2 px-3.5 py-3 text-sm text-text-primary placeholder:text-text-muted transition-colors",
            "hover:border-border-strong/80",
            error && "border-danger/60",
            className,
          )}
          {...props}
        />
        <div className="flex items-center justify-between">
          {error ? (
            <p id={errorId} role="alert" className="text-xs font-medium text-danger">
              {error}
            </p>
          ) : (
            <span />
          )}
          {hint && <span className="text-xs text-text-muted">{hint}</span>}
        </div>
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
