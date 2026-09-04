"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { aaf } from "@/lib/content";

type StageState = "idle" | "active" | "passed" | "failed";

const toneClasses: Record<string, string> = {
  low: "text-risk-low border-risk-low/40 bg-risk-low/10",
  medium: "text-risk-medium border-risk-medium/40 bg-risk-medium/10",
  high: "text-risk-high border-risk-high/40 bg-risk-high/10",
};

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export function AAFSimulator() {
  const [current, setCurrent] = useState<(typeof aaf.scenarios)[number] | null>(null);
  const [stageStates, setStageStates] = useState<StageState[]>(aaf.pipeline.map(() => "idle"));
  const [done, setDone] = useState(false);
  const runIdRef = useRef(0);

  async function run(scenario: (typeof aaf.scenarios)[number]) {
    const runId = ++runIdRef.current;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCurrent(scenario);
    setDone(false);
    setStageStates(aaf.pipeline.map(() => "idle"));

    const stopAt = scenario.failAt >= 0 ? scenario.failAt : aaf.pipeline.length - 1;
    const delay = prefersReduced ? 0 : 420;

    for (let i = 0; i <= stopAt; i++) {
      if (runIdRef.current !== runId) return;
      setStageStates((prev) => prev.map((s, idx) => (idx === i ? "active" : s)));
      await sleep(delay);
      if (runIdRef.current !== runId) return;
      const isFailure = i === scenario.failAt;
      setStageStates((prev) => prev.map((s, idx) => (idx === i ? (isFailure ? "failed" : "passed") : s)));
      if (!prefersReduced) await sleep(120);
    }

    if (runIdRef.current !== runId) return;
    setDone(true);
  }

  const result = done ? current : null;

  return (
    <div className="rounded-xl border border-border bg-panel-2 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background/40">
        <span className="size-2.5 rounded-full bg-risk-high/70" />
        <span className="size-2.5 rounded-full bg-risk-medium/70" />
        <span className="size-2.5 rounded-full bg-risk-low/70" />
        <span className="ml-2 font-mono-tag text-[11px] text-muted">aaf request-simulator</span>
      </div>

      <div className="p-5 md:p-6">
        <p className="font-mono-tag text-[11px] uppercase tracking-wide text-muted mb-3">
          Pick a request
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {aaf.scenarios.map((s) => (
            <button
              key={s.key}
              onClick={() => run(s)}
              className={`font-mono-tag text-xs px-3 py-2 rounded-md border transition-colors cursor-pointer ${
                current?.key === s.key
                  ? "border-accent text-accent bg-accent/10"
                  : "border-border text-muted hover:text-foreground hover:border-accent/50"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5">
          {aaf.pipeline.map((stage, i) => {
            const state = stageStates[i];
            return (
              <div key={stage.key} className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-full aspect-square rounded-md border flex items-center justify-center transition-colors duration-300 ${
                    state === "active"
                      ? "border-accent text-accent bg-accent/10"
                      : state === "passed"
                      ? "border-risk-low/40 text-risk-low bg-risk-low/10"
                      : state === "failed"
                      ? toneClasses[current?.tone ?? "high"]
                      : "border-border text-muted/40"
                  }`}
                >
                  <span className="font-mono-tag text-[11px] sm:text-xs">
                    {state === "passed" ? "✓" : state === "failed" ? "✕" : i + 1}
                  </span>
                </div>
                <span
                  className={`font-mono-tag text-[9px] sm:text-[10px] text-center leading-tight ${
                    state === "idle" ? "text-muted/50" : "text-muted"
                  }`}
                >
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-6 min-h-[64px]">
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key={result.key}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`rounded-lg border p-4 flex items-start gap-3 ${toneClasses[result.tone]}`}
              >
                <span className="font-mono-tag text-sm font-semibold shrink-0">
                  {result.status} {result.statusLabel}
                </span>
                <span className="text-sm leading-relaxed">{result.note}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
