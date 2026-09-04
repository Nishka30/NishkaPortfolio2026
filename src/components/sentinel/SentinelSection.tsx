import { sentinel } from "@/lib/content";
import { getPypiRecentDownloads } from "@/lib/pypi";
import { getGithubRepoStats } from "@/lib/github";
import { Reveal } from "../Reveal";
import { RiskCard } from "./RiskCard";

export async function SentinelSection() {
  const [pypi, github] = await Promise.all([
    getPypiRecentDownloads(sentinel.pypiPackage),
    getGithubRepoStats(sentinel.githubRepo),
  ]);

  return (
    <div className="rounded-2xl border border-border bg-panel p-6 md:p-10">
      <div className="flex flex-wrap items-start justify-between gap-6 mb-6">
        <div className="max-w-xl">
          <p className="font-mono-tag text-[11px] uppercase tracking-wide text-accent mb-2">
            Featured project
          </p>
          <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
            {sentinel.name}
            <span className="text-muted font-normal text-lg md:text-xl"> — {sentinel.subtitle}</span>
          </h3>
          <p className="mt-3 text-muted leading-relaxed">{sentinel.pitch}</p>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 shrink-0">
          {sentinel.stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-xl font-semibold text-accent">{s.value}</p>
              <p className="font-mono-tag text-[11px] text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 mb-8">
        <span className="font-mono-tag text-xs px-3 py-1.5 rounded-md border border-border bg-panel-2 text-muted">
          $ {sentinel.pypiInstall}
        </span>
        <a
          href={sentinel.pypiUrl}
          target="_blank"
          rel="noreferrer"
          className="font-mono-tag text-xs px-3 py-1.5 rounded-md border border-accent/40 text-accent hover:bg-accent/10 transition-colors"
        >
          PyPI{pypi.lastMonth !== null ? ` · ${pypi.lastMonth.toLocaleString()} downloads/mo` : ""} ↗
        </a>
        <a
          href={sentinel.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="font-mono-tag text-xs px-3 py-1.5 rounded-md border border-border text-muted hover:text-foreground hover:border-accent/50 transition-colors"
        >
          GitHub{github.stars !== null ? ` · ★ ${github.stars}` : ""} ↗
        </a>
      </div>

      <Reveal>
        <RiskCard />
      </Reveal>

      <div className="grid md:grid-cols-2 gap-8 mt-10">
        <div>
          <p className="font-mono-tag text-[11px] uppercase tracking-wide text-muted mb-4">
            How it works
          </p>
          <ul className="space-y-3">
            {sentinel.details.map((d) => (
              <li key={d} className="flex gap-3 text-sm text-muted leading-relaxed">
                <span className="text-accent mt-1.5 shrink-0" aria-hidden>
                  ▸
                </span>
                {d}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono-tag text-[11px] uppercase tracking-wide text-muted mb-4">
            Non-goals — restraint as a design choice
          </p>
          <ul className="space-y-3 rounded-lg border border-border bg-panel-2 p-5">
            {sentinel.nonGoals.map((n) => (
              <li key={n} className="flex gap-3 text-sm text-muted leading-relaxed">
                <span className="text-risk-high/70 mt-0.5 shrink-0" aria-hidden>
                  ✕
                </span>
                {n}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {sentinel.tech.map((t) => (
              <span
                key={t}
                className="font-mono-tag text-[11px] px-2 py-0.5 rounded border border-border text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
