"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const STEPS = [
  "discovered",
  "schema validated",
  "AST security scan",
  "registered",
] as const;

const STEP_DURATION = 1100;

export function ToolDropDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });
  const [step, setStep] = useState(-1);
  const [registered, setRegistered] = useState<string[]>(["query_latency", "check_health"]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      // One-time read of a platform media-query preference to pick the resting
      // state of a decorative loop — not a response to a React-visible change.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStep(STEPS.length - 1);
      setRegistered(["query_latency", "check_health", "disk_usage"]);
      return;
    }
    if (!inView) {
      setStep(-1);
      return;
    }
    let cancelled = false;
    let i = -1;

    function tick() {
      if (cancelled) return;
      i += 1;
      if (i > STEPS.length) {
        i = -1;
        setRegistered(["query_latency", "check_health"]);
      }
      setStep(i);
      if (i === STEPS.length - 1) {
        setRegistered((prev) =>
          prev.includes("disk_usage") ? prev : [...prev, "disk_usage"]
        );
      }
      setTimeout(tick, STEP_DURATION);
    }

    const start = setTimeout(tick, 300);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, [inView]);

  return (
    <div ref={ref} className="rounded-xl border border-border bg-panel-2 p-6 md:p-8">
      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
        {/* Source files */}
        <div className="flex flex-col items-center gap-3">
          <p className="font-mono-tag text-[11px] text-muted mb-1">you write</p>
          <motion.div
            animate={{
              x: step >= 0 ? 12 : 0,
              opacity: step >= 0 && step < STEPS.length ? 0.3 : 1,
            }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[180px] rounded-lg border border-border bg-background px-4 py-3 font-mono-tag text-xs"
          >
            <p className="text-accent">disk_usage.py</p>
            <p className="text-muted mt-1">def run(path): ...</p>
          </motion.div>
          <motion.div
            animate={{
              x: step >= 0 ? 12 : 0,
              opacity: step >= 0 && step < STEPS.length ? 0.3 : 1,
            }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="w-full max-w-[180px] rounded-lg border border-border bg-background px-4 py-3 font-mono-tag text-xs"
          >
            <p className="text-accent">disk_usage.yaml</p>
            <p className="text-muted mt-1">name: disk_usage</p>
          </motion.div>
        </div>

        {/* Pipeline */}
        <div className="flex md:flex-col items-center gap-2 justify-center">
          <div aria-hidden className="hidden md:block w-px h-6 bg-border" />
          <div className="flex flex-col gap-1.5 w-full min-w-[160px]">
            {STEPS.map((s, i) => {
              const active = step === i;
              const done = step > i;
              return (
                <div
                  key={s}
                  className={`font-mono-tag text-[11px] px-3 py-1.5 rounded-md border flex items-center gap-2 transition-colors duration-300 ${
                    active
                      ? "border-accent text-accent bg-accent/10"
                      : done
                      ? "border-border text-muted"
                      : "border-border/50 text-muted/40"
                  }`}
                >
                  <span
                    className={`size-1.5 rounded-full shrink-0 ${
                      active ? "bg-accent" : done ? "bg-risk-low" : "bg-border"
                    }`}
                  />
                  {s}
                </div>
              );
            })}
          </div>
          <div aria-hidden className="hidden md:block w-px h-6 bg-border" />
        </div>

        {/* Registered tools */}
        <div className="flex flex-col items-center gap-3">
          <p className="font-mono-tag text-[11px] text-muted mb-1">registered tools</p>
          <div className="w-full max-w-[200px] rounded-lg border border-border bg-background p-3 space-y-1.5 min-h-[132px]">
            <AnimatePresence>
              {registered.map((t) => (
                <motion.div
                  key={t}
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className={`font-mono-tag text-[11px] px-2.5 py-1.5 rounded border flex items-center gap-2 ${
                    t === "disk_usage" && step === STEPS.length - 1
                      ? "border-accent/50 text-accent bg-accent/10"
                      : "border-border text-muted"
                  }`}
                >
                  <span className="size-1.5 rounded-full bg-risk-low shrink-0" />
                  {t}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
