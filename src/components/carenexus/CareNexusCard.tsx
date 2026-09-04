"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { careNexus } from "@/lib/content";

const moduleColors: Record<string, string> = {
  sdoh: "var(--accent)",
  severity: "var(--risk-high)",
  adherence: "var(--risk-medium)",
};

export function CareNexusCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div className="rounded-2xl border border-border bg-panel p-6 md:p-10">
      <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start">
        <div>
          <p className="font-mono-tag text-[11px] uppercase tracking-wide text-muted mb-2">
            Also built
          </p>
          <h3 className="font-display text-xl md:text-2xl font-semibold tracking-tight">
            {careNexus.name}
            <span className="text-muted font-normal text-base md:text-lg"> — {careNexus.subtitle}</span>
          </h3>
          <p className="mt-3 text-sm text-muted leading-relaxed max-w-xl">{careNexus.pitch}</p>

          <ul className="mt-5 space-y-2.5">
            {careNexus.details.map((d) => (
              <li key={d} className="flex gap-3 text-sm text-muted leading-relaxed">
                <span className="text-accent mt-1.5 shrink-0" aria-hidden>
                  ▸
                </span>
                {d}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {careNexus.tech.map((t) => (
              <span
                key={t}
                className="font-mono-tag text-[11px] px-2 py-0.5 rounded border border-border text-muted"
              >
                {t}
              </span>
            ))}
          </div>

          <p className="mt-4 text-xs text-muted italic">{careNexus.note}</p>
        </div>

        <div ref={ref} className="w-full md:w-64 shrink-0 rounded-xl border border-border bg-panel-2 p-5">
          <p className="font-mono-tag text-[11px] uppercase tracking-wide text-muted mb-4">
            Overall risk score
          </p>
          <div className="h-3 rounded-full overflow-hidden flex bg-border">
            {careNexus.modules.map((m, i) => (
              <motion.div
                key={m.key}
                initial={{ width: 0 }}
                animate={inView ? { width: `${m.weight * 100}%` } : { width: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                style={{ background: moduleColors[m.key] }}
              />
            ))}
          </div>
          <ul className="mt-4 space-y-2.5">
            {careNexus.modules.map((m) => (
              <li key={m.key} className="flex items-center justify-between gap-3 text-xs">
                <span className="flex items-center gap-2 text-muted">
                  <span
                    className="size-1.5 rounded-full shrink-0"
                    style={{ background: moduleColors[m.key] }}
                  />
                  {m.label}
                </span>
                <span className="font-mono-tag text-muted shrink-0">
                  {(m.weight * 100).toFixed(0)}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
