"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { sentinel } from "@/lib/content";
import { RiskGauge } from "./RiskGauge";

const bandStyles: Record<string, string> = {
  low: "text-risk-low border-risk-low/40 bg-risk-low/10",
  medium: "text-risk-medium border-risk-medium/40 bg-risk-medium/10",
  high: "text-risk-high border-risk-high/40 bg-risk-high/10",
};

export function RiskCard() {
  const { demo } = sentinel;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div
      ref={ref}
      className="rounded-xl border border-border bg-panel-2 overflow-hidden"
    >
      <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-background/40">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-risk-high/70" />
          <span className="size-2.5 rounded-full bg-risk-medium/70" />
          <span className="size-2.5 rounded-full bg-risk-low/70" />
        </div>
        <p className="font-mono-tag text-[11px] text-muted">sentinel score --diff HEAD~1</p>
        <span className={`font-mono-tag text-[10px] px-2 py-0.5 rounded border uppercase ${bandStyles[demo.band]}`}>
          {demo.band}
        </span>
      </div>

      <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 p-6 md:p-8 items-start">
        <RiskGauge score={demo.score} />

        <div>
          <p className="font-mono-tag text-[11px] uppercase tracking-wide text-muted mb-4">
            top contributing factors
          </p>
          <ul className="space-y-3.5">
            {demo.reasons.map((r, i) => (
              <li key={r.factor}>
                <div className="flex items-baseline justify-between gap-3 mb-1">
                  <span className="text-sm font-medium">{r.factor}</span>
                  <span className="font-mono-tag text-xs text-muted shrink-0">
                    {(r.weight * 100).toFixed(0)}%
                  </span>
                </div>
                <p className="text-xs text-muted leading-relaxed mb-1.5">{r.detail}</p>
                <div className="h-1.5 rounded-full bg-border overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-accent"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${r.weight * 100}%` } : { width: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="px-6 md:px-8 pb-6 text-xs text-muted italic">{demo.disclaimer}</p>
    </div>
  );
}
