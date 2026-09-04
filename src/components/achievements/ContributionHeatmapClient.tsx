"use client";

import { useMemo, useState } from "react";
import type { ContributionDay, ContributionView } from "@/lib/githubContributions";
import { profile } from "@/lib/content";

const LEVEL_OPACITY = [0, 30, 55, 75, 100];
const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const CELL = 11;
const GAP = 3;

type Cell = ContributionDay | null;

function cellStyle(level: number) {
  if (level <= 0) return { background: "var(--border)" };
  const clamped = Math.min(level, LEVEL_OPACITY.length - 1);
  return {
    background: `color-mix(in srgb, var(--accent) ${LEVEL_OPACITY[clamped]}%, var(--bg-panel))`,
  };
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function ContributionHeatmapClient({ views }: { views: ContributionView[] }) {
  const [activeKey, setActiveKey] = useState(views[0]?.key ?? "");
  const view = views.find((v) => v.key === activeKey) ?? views[0];

  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const { padded, monthLabels } = useMemo(() => {
    if (!view || view.days.length === 0) {
      return { padded: [] as Cell[], monthLabels: [] as (string | null)[] };
    }
    const firstDate = new Date(`${view.days[0].date}T00:00:00Z`);
    const startPad = firstDate.getUTCDay();
    const paddedDays: Cell[] = [...Array.from({ length: startPad }, () => null), ...view.days];
    const columnCount = Math.ceil(paddedDays.length / 7);

    const labels: (string | null)[] = [];
    let lastMonth = -1;
    for (let col = 0; col < columnCount; col++) {
      const slice = paddedDays.slice(col * 7, col * 7 + 7);
      const firstReal = slice.find((d): d is ContributionDay => d !== null);
      if (!firstReal) {
        labels.push(null);
        continue;
      }
      const month = new Date(`${firstReal.date}T00:00:00Z`).getUTCMonth();
      labels.push(month !== lastMonth ? MONTH_NAMES[month] : null);
      lastMonth = month;
    }

    return { padded: paddedDays, monthLabels: labels };
  }, [view]);

  if (!view) return null;

  const stats = [
    { value: view.total.toLocaleString(), label: `contributions${view.key === "last12" ? "" : ` in ${view.key}`}` },
    view.currentStreak !== null ? { value: String(view.currentStreak), label: "day current streak" } : null,
    { value: String(view.longestStreak), label: "day longest streak" },
    view.peakDay && view.peakDay.count > 0
      ? { value: String(view.peakDay.count), label: `busiest day — ${formatDate(view.peakDay.date)}` }
      : null,
  ].filter((s): s is { value: string; label: string } => s !== null);

  return (
    <div className="rounded-xl border border-border bg-panel-2 overflow-hidden">
      <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-border bg-background/40">
        <span className="size-2.5 rounded-full bg-risk-high/70" />
        <span className="size-2.5 rounded-full bg-risk-medium/70" />
        <span className="size-2.5 rounded-full bg-risk-low/70" />
        <span className="ml-2 font-mono-tag text-[11px] text-muted">
          git log --author=nishka --since=&quot;{view.key === "last12" ? "1 year ago" : `${view.key}-01-01`}&quot;
        </span>
        {view.currentStreak !== null && view.currentStreak > 0 && (
          <span className="ml-auto flex items-center gap-1.5 font-mono-tag text-[10px] text-risk-low">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-risk-low opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-risk-low" />
            </span>
            active streak
          </span>
        )}
      </div>

      <div className="p-5 md:p-6">
        <div className="flex flex-wrap gap-1.5 mb-6">
          {views.map((v) => (
            <button
              key={v.key}
              onClick={() => setActiveKey(v.key)}
              className={`font-mono-tag text-xs px-3 py-1.5 rounded-md border transition-colors cursor-pointer ${
                v.key === activeKey
                  ? "border-accent text-accent bg-accent/10"
                  : "border-border text-muted hover:text-foreground hover:border-accent/50"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 mb-6">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-2xl font-semibold text-accent">{s.value}</p>
              <p className="font-mono-tag text-[11px] text-muted leading-snug">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto">
          <div className="w-max">
            <div
              className="grid grid-flow-col mb-1"
              style={{ gridAutoColumns: CELL + GAP, columnGap: 0 }}
            >
              {monthLabels.map((label, i) => (
                <div key={i} className="font-mono-tag text-[9px] text-muted whitespace-nowrap">
                  {label}
                </div>
              ))}
            </div>
            <div
              className="grid grid-flow-col grid-rows-7"
              style={{ gridAutoColumns: CELL, gap: GAP }}
            >
              {padded.map((day, i) =>
                day === null ? (
                  <div key={`pad-${i}`} style={{ width: CELL, height: CELL }} />
                ) : (
                  <div
                    key={day.date}
                    title={`${day.date}: ${day.count} contribution${day.count === 1 ? "" : "s"}`}
                    className={`rounded-[2px] transition-transform hover:scale-125 ${
                      day.date === todayStr ? "ring-1 ring-accent" : ""
                    }`}
                    style={{ width: CELL, height: CELL, ...cellStyle(day.level) }}
                  />
                )
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <p className="font-mono-tag text-[11px] text-muted">
            pulling live from{" "}
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              github.com/Nishka30
            </a>
          </p>
          <div className="flex items-center gap-1.5 font-mono-tag text-[10px] text-muted">
            Less
            {LEVEL_OPACITY.map((opacity, i) => (
              <span
                key={i}
                className="rounded-[2px]"
                style={{
                  width: CELL - 1,
                  height: CELL - 1,
                  background:
                    i === 0
                      ? "var(--border)"
                      : `color-mix(in srgb, var(--accent) ${opacity}%, var(--bg-panel))`,
                }}
              />
            ))}
            More
          </div>
        </div>
      </div>
    </div>
  );
}
