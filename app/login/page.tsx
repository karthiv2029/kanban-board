"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { KeyRound, LayoutGrid, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";
import { Loader } from "@/components/common/Loader";
import { DEMO_CREDENTIALS } from "@/utils/constants";
import { useAuth } from "@/hooks/useAuth";

const FEATURES = [
  { icon: LayoutGrid, text: "Drag-and-drop Kanban board with three workflow stages" },
  { icon: Zap, text: "Instant search, filters, and sorting across every task" },
  { icon: ShieldCheck, text: "Everything saved locally — no backend, no data leaves your browser" },
];

export default function LoginPage() {
  const { isAuthenticated, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isLoaded, isAuthenticated, router]);

  if (!isLoaded || isAuthenticated) {
    return <Loader fullScreen label="Checking session" />;
  }

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden p-12 lg:flex">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-accent-3/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-accent-3/20 blur-3xl"
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex items-center gap-2.5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 shadow-lg shadow-accent/30">
            <LayoutGrid className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-text-primary">Kanban Board</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 max-w-md space-y-6"
        >
          <h1 className="text-4xl font-semibold leading-tight text-text-primary">
            Organize work like a <span className="gradient-text">premium studio</span>
          </h1>
          <p className="text-text-secondary">
            Plan, track, and ship tasks with a beautifully animated board built for focus.
          </p>
          <ul className="space-y-4">
            {FEATURES.map(({ icon: Icon, text }, index) => (
              <motion.li
                key={text}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                className="flex items-start gap-3 text-sm text-text-secondary"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-surface-3 text-accent-2">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                {text}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <p className="relative z-10 text-xs text-text-muted">
          Built with Next.js, TypeScript &amp; Tailwind CSS
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-1.5 text-center lg:text-left"
          >
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 shadow-lg shadow-accent/30 lg:hidden">
              <LayoutGrid className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-text-primary">Welcome back</h2>
            <p className="text-sm text-text-muted">Sign in to access your board</p>
          </motion.div>

          <LoginForm />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="glass flex items-start gap-3 rounded-xl p-4"
          >
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent-2">
              <KeyRound className="h-4 w-4" />
            </span>
            <div className="space-y-1.5 text-sm">
              <p className="flex items-center gap-1.5 font-medium text-text-primary">
                <Sparkles className="h-3.5 w-3.5 text-accent-2" />
                Demo Credentials
              </p>
              <p className="text-text-secondary">
                Username : <span className="font-mono text-text-primary">{DEMO_CREDENTIALS.username}</span>
              </p>
              <p className="text-text-secondary">
                Password : <span className="font-mono text-text-primary">{DEMO_CREDENTIALS.password}</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
