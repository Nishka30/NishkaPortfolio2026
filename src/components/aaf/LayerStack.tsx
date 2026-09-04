import { aaf } from "@/lib/content";

export function LayerStack() {
  return (
    <div className="rounded-xl border border-border bg-panel-2 p-5 md:p-6 space-y-3">
      {aaf.layers.map((layer, i) => (
        <div key={layer.key} className="flex gap-4 items-start">
          <div className="flex flex-col items-center pt-1.5 shrink-0">
            <span className="font-mono-tag text-[11px] text-accent">{`0${i + 1}`}</span>
            {i < aaf.layers.length - 1 && (
              <span aria-hidden className="w-px flex-1 min-h-[2.25rem] bg-border mt-2" />
            )}
          </div>
          <div className="pb-1">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <h4 className="font-semibold text-sm">{layer.name}</h4>
              <span className="font-mono-tag text-[10px] uppercase tracking-wide text-accent">
                {layer.role}
              </span>
            </div>
            <p className="mt-1.5 text-sm text-muted leading-relaxed">{layer.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
