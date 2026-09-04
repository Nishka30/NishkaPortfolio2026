"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { painScript } from "@/lib/content";

const STEP_DURATION = 900;

export function HealthCheckSweep() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });
  const checks = painScript.aiPoc.checks;
  const [checkedCount, setCheckedCount] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      // One-time read of a platform media-query preference to pick the resting
      // state of a decorative loop — not a response to a React-visible change.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCheckedCount(checks.length);
      return;
    }
    if (!inView) {
      setCheckedCount(0);
      return;
    }
    let cancelled = false;
    let i = 0;

    function tick() {
      if (cancelled) return;
      i += 1;
      if (i > checks.length) i = 0;
      setCheckedCount(i);
      setTimeout(tick, i === 0 ? STEP_DURATION * 1.6 : STEP_DURATION);
    }

    const start = setTimeout(tick, 300);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, [inView, checks.length]);

  return (
    <div ref={ref} className="rounded-xl border border-border bg-panel-2 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background/40">
        <span className="size-2.5 rounded-full bg-risk-high/70" />
        <span className="size-2.5 rounded-full bg-risk-medium/70" />
        <span className="size-2.5 rounded-full bg-risk-low/70" />
        <span className="ml-2 font-mono-tag text-[11px] text-muted">painscript-health-agent --sweep</span>
      </div>
      <ul className="p-5 space-y-3">
        {checks.map((c, i) => {
          const done = i < checkedCount;
          return (
            <li key={c.key} className="flex items-start gap-3">
              <motion.span
                animate={{
                  backgroundColor: done ? "var(--risk-low)" : "var(--border)",
                  scale: done ? 1 : 0.9,
                }}
                transition={{ duration: 0.3 }}
                className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full text-[10px] text-background"
              >
                {done ? "✓" : ""}
              </motion.span>
              <div>
                <p className="text-sm font-medium">{c.label}</p>
                <p className="text-xs text-muted leading-relaxed">{c.detail}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
