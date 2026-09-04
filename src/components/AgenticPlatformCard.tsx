"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { agenticPlatform } from "@/lib/content";

export function AgenticPlatformCard({ data }: { data: typeof agenticPlatform }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-accent/30 bg-gradient-to-br from-accent/[0.06] to-transparent p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono-tag text-[11px] uppercase tracking-wide text-accent mb-1.5">
            {data.subtitle}
          </p>
          <h4 className="font-display font-semibold text-lg">{data.title}</h4>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="font-mono-tag text-xs px-3 py-1.5 rounded-md border border-border text-muted hover:text-foreground hover:border-accent/50 transition-colors cursor-pointer shrink-0"
        >
          {open ? "hide detail" : "expand detail"}
        </button>
      </div>

      <p className="mt-3 text-sm text-muted leading-relaxed max-w-3xl">{data.description}</p>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ul className="mt-5 space-y-3">
              {data.points.map((p) => (
                <li key={p} className="flex gap-3 text-sm text-muted leading-relaxed">
                  <span className="text-accent mt-1.5 shrink-0" aria-hidden>
                    ▸
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted italic">{data.note}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {data.tech.map((t) => (
          <span
            key={t}
            className="font-mono-tag text-[11px] px-2 py-0.5 rounded border border-accent/30 text-accent"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
