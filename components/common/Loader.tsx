"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/helpers";

interface LoaderProps {
  fullScreen?: boolean;
  label?: string;
  className?: string;
}

export function Loader({ fullScreen, label = "Loading", className }: LoaderProps) {
  const spinner = (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <motion.div
        className="h-9 w-9 rounded-full border-2 border-border-strong border-t-accent"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        role="status"
        aria-label={label}
      />
      {label && <p className="text-sm text-text-muted">{label}...</p>}
    </div>
  );

  if (!fullScreen) return spinner;

  return (
    <div className="flex min-h-screen w-full items-center justify-center">{spinner}</div>
  );
}
