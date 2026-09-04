import { Workflow, Search, ShieldCheck, Blocks, ArrowRight, ArrowUpRight } from "lucide-react";
import type { ComponentType } from "react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { whatIDo, impactNumbers } from "@/lib/content";

const icons: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  workflow: Workflow,
  search: Search,
  shield: ShieldCheck,
  blocks: Blocks,
};

const toneVar: Record<string, string> = {
  accent: "var(--accent)",
  low: "var(--risk-low)",
  medium: "var(--risk-medium)",
};

export function WhatIDo() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 md:px-8 py-16 md:py-24">
      <SectionHeading
        eyebrow={whatIDo.eyebrow}
        title={whatIDo.title}
        description={whatIDo.description}
      />

      <div className="grid md:grid-cols-2 gap-4">
        {whatIDo.areas.map((area, i) => {
          const Icon = icons[area.icon];
          return (
            <Reveal key={area.key} delay={i * 0.06}>
              <div className="group h-full rounded-xl border border-border bg-panel p-6 flex flex-col hover:border-accent/40 transition-colors">
                <div className="flex items-start gap-4">
                  <span className="shrink-0 grid place-items-center size-10 rounded-lg border border-accent/25 bg-accent/10 text-accent">
                    <Icon size={18} />
                  </span>
                  <h3 className="font-display text-lg font-semibold tracking-tight pt-1.5">
                    {area.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm text-muted leading-relaxed flex-1">{area.body}</p>
                <a
                  href={area.href}
                  className="mt-5 inline-flex items-center gap-1.5 font-mono-tag text-[11px] text-muted group-hover:text-accent transition-colors"
                >
                  {area.proof}
                  <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.12} className="mt-10 md:mt-12">
        <p className="font-mono-tag text-[11px] uppercase tracking-[0.18em] text-muted mb-4">
          Measured, not claimed
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {impactNumbers.map((n) => {
            const color = toneVar[n.tone];
            return (
              <div
                key={n.key}
                className="relative overflow-hidden rounded-xl border border-border bg-panel-2 p-4 md:p-5"
              >
                {/* Tone-coloured wash so the strip reads as four distinct results. */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 -top-20 h-32 opacity-20 blur-2xl"
                  style={{ background: `radial-gradient(50% 100% at 50% 100%, ${color}, transparent)` }}
                />
                <p
                  className="relative font-display text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] font-semibold tracking-tight leading-none whitespace-nowrap"
                  style={{ color }}
                >
                  {n.value}
                </p>
                <p className="relative mt-3 text-sm font-semibold leading-snug">{n.label}</p>
                <p className="relative mt-1.5 text-xs text-muted leading-relaxed">{n.detail}</p>
                {n.href && (
                  <a
                    href={n.href}
                    target="_blank"
                    rel="noreferrer"
                    className="relative mt-2 inline-flex items-center gap-1 font-mono-tag text-[11px] text-muted hover:text-accent transition-colors"
                  >
                    {n.hrefLabel}
                    <ArrowUpRight size={11} />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
