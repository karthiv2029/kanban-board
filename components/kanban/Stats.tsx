"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, CircleDashed, ListTodo, Timer } from "lucide-react";
import { Card } from "@/components/common/Card";
import { cn } from "@/utils/helpers";
import type { Task } from "@/types/task";

interface StatsProps {
  tasks: Task[];
}

function useCountUp(target: number, duration = 600) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const from = value;

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  return value;
}

const STAT_CONFIG = [
  { key: "total", label: "Total Tasks", icon: ListTodo, accent: "text-accent-2 bg-accent/10" },
  { key: "todo", label: "Todo", icon: CircleDashed, accent: "text-slate-300 bg-slate-500/10" },
  {
    key: "inProgress",
    label: "In Progress",
    icon: Timer,
    accent: "text-amber-300 bg-amber-500/10",
  },
  { key: "done", label: "Done", icon: CheckCircle2, accent: "text-emerald-300 bg-emerald-500/10" },
] as const;

export function Stats({ tasks }: StatsProps) {
  const counts = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === "Todo").length,
    inProgress: tasks.filter((t) => t.status === "In Progress").length,
    done: tasks.filter((t) => t.status === "Done").length,
  };

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {STAT_CONFIG.map((config, index) => (
        <StatCard key={config.key} config={config} value={counts[config.key]} index={index} />
      ))}
    </div>
  );
}

function StatCard({
  config,
  value,
  index,
}: {
  config: (typeof STAT_CONFIG)[number];
  value: number;
  index: number;
}) {
  const animated = useCountUp(value);
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
    >
      <Card className="flex items-center gap-3.5 p-4 transition-transform hover:-translate-y-0.5 sm:p-5">
        <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl", config.accent)}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-2xl font-semibold tabular-nums text-text-primary">{animated}</p>
          <p className="text-xs text-text-muted">{config.label}</p>
        </div>
      </Card>
    </motion.div>
  );
}
