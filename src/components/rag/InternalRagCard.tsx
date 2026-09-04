import { internalRag } from "@/lib/content";

export function InternalRagCard() {
  return (
    <div className="h-full rounded-2xl border border-border bg-panel p-6">
      <p className="font-mono-tag text-[11px] uppercase tracking-wide text-muted mb-2">
        Also built
      </p>
      <h3 className="font-display text-lg font-semibold tracking-tight">{internalRag.name}</h3>
      <p className="text-xs text-accent mt-0.5">{internalRag.subtitle}</p>
      <p className="mt-3 text-sm text-muted leading-relaxed">{internalRag.pitch}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {internalRag.tech.map((t) => (
          <span
            key={t}
            className="font-mono-tag text-[11px] px-2 py-0.5 rounded border border-border text-muted"
          >
            {t}
          </span>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted italic">{internalRag.note}</p>
    </div>
  );
}
