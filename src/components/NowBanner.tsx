import { nowBuilding } from "@/lib/content";

export function NowBanner() {
  return (
    <div className="mx-auto max-w-6xl px-5 md:px-8">
      <div className="rounded-xl border border-border bg-panel px-5 py-4 flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="relative flex size-1.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
        </span>
        <span className="font-mono-tag text-[11px] uppercase tracking-wide text-accent shrink-0">
          Now
        </span>
        <p className="text-sm text-muted leading-relaxed">{nowBuilding.text}</p>
        <span className="font-mono-tag text-[10px] text-muted/60 ml-auto shrink-0">
          updated {nowBuilding.updated}
        </span>
      </div>
    </div>
  );
}
