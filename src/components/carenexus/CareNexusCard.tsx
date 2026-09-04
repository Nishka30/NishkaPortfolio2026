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
    <div className="h-full rounded-2xl border border-border bg-panel p-6">
      <p className="font-mono-tag text-[11px] uppercase tracking-wide text-muted mb-2">
        Also built
      </p>
      <h3 className="font-display text-lg font-semibold tracking-tight">{careNexus.name}</h3>
      <p className="text-xs text-accent mt-0.5">{careNexus.subtitle}</p>
      <p className="mt-3 text-sm text-muted leading-relaxed">{careNexus.pitch}</p>

      <ul className="mt-4 space-y-2">
        {careNexus.details.slice(0, 2).map((d) => (
          <li key={d} className="flex gap-2.5 text-sm text-muted leading-relaxed">
            <span className="text-accent mt-1.5 shrink-0" aria-hidden>
              ▸
            </span>
            {d}
          </li>
        ))}
      </ul>

      <div ref={ref} className="mt-5 rounded-lg border border-border bg-panel-2 p-4">
        <p className="font-mono-tag text-[10px] uppercase tracking-wide text-muted mb-3">
          Overall risk score
        </p>
        <div className="h-2.5 rounded-full overflow-hidden flex bg-border">
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
        <ul className="mt-3 space-y-1.5">
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

      <div className="mt-4 flex flex-wrap gap-1.5">
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
  );
}
