import { ArrowUpRight } from "lucide-react";
import { achievements } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { ContributionHeatmap } from "./achievements/ContributionHeatmap";

function findEntry(key: string) {
  const entry = achievements.entries.find((e) => e.key === key);
  if (!entry) throw new Error(`Missing achievement entry: ${key}`);
  return entry;
}

export function Achievements() {
  const featured = findEntry("hackfest23");
  const hackonova = findEntry("hackonova");
  const code4web = findEntry("code4web");
  const fronthack = findEntry("fronthack");

  return (
    <section className="mx-auto max-w-6xl px-5 md:px-8 pb-16 md:pb-24">
      <SectionHeading eyebrow={achievements.eyebrow} title={achievements.title} />

      <Reveal>
        <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <p className="font-display text-2xl md:text-3xl font-semibold text-accent">
            {achievements.headlineStat}
          </p>
          <p className="text-sm text-muted">{achievements.headlineFollowUp}</p>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-4">
        <Reveal className="md:row-span-2">
          <div className="h-full rounded-xl border border-accent/30 bg-gradient-to-br from-accent/[0.06] to-transparent p-6 flex flex-col">
            <p className="font-mono-tag text-[11px] uppercase tracking-wide text-accent mb-2">
              {featured.placement}
            </p>
            <h3 className="font-display text-xl font-semibold">{featured.event}</h3>
            <p className="text-sm text-muted mt-0.5">
              {featured.org} · {featured.date}
            </p>
            <p className="mt-4 font-semibold text-sm">{featured.project}</p>
            <p className="mt-1.5 text-sm text-muted leading-relaxed">{featured.detail}</p>
            <p className="mt-4 text-xs text-muted italic">{featured.credit}</p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="h-full rounded-xl border border-border bg-panel p-5">
            <p className="font-mono-tag text-[11px] uppercase tracking-wide text-accent mb-1.5">
              {hackonova.placement}
            </p>
            <h3 className="font-semibold">{hackonova.event}</h3>
            <p className="text-xs text-muted mt-0.5">{hackonova.org}</p>
            <p className="mt-2 text-sm text-muted leading-relaxed">{hackonova.detail}</p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="h-full rounded-xl border border-border bg-panel p-5">
            <p className="font-mono-tag text-[11px] uppercase tracking-wide text-accent mb-1.5">
              {code4web.placement}
            </p>
            <h3 className="font-semibold">{code4web.event}</h3>
            <p className="text-xs text-muted mt-0.5">{code4web.org}</p>
            <p className="mt-2 text-sm text-muted leading-relaxed">{code4web.detail}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-2">
          <div className="rounded-xl border border-border bg-panel p-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <p className="font-mono-tag text-[11px] uppercase tracking-wide text-accent">
              {fronthack.placement}
            </p>
            <h3 className="font-semibold">{fronthack.event}</h3>
            <span className="text-xs text-muted">
              {fronthack.org} · {fronthack.date}
            </span>
            <p className="text-sm text-muted w-full mt-1">{fronthack.detail}</p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.14}>
        <div className="mt-4 rounded-xl border border-border bg-panel-2 px-5 py-4 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span className="inline-flex size-1.5 rounded-full bg-accent shrink-0" />
          <p className="text-sm flex-1 min-w-0">
            <span className="font-semibold">{achievements.dsa.title}</span>{" "}
            <span className="text-muted">— {achievements.dsa.detail}</span>
          </p>
          <a
            href={achievements.dsa.verifyUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto sm:ml-auto inline-flex items-center gap-1.5 font-mono-tag text-[11px] text-muted hover:text-accent transition-colors"
          >
            {achievements.dsa.verifyLabel}
            <ArrowUpRight size={12} />
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.18} className="mt-4">
        <ContributionHeatmap />
      </Reveal>
    </section>
  );
}
