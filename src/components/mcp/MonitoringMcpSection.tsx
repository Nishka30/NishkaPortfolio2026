import { monitoringMcp } from "@/lib/content";
import { Reveal } from "../Reveal";
import { ToolDropDiagram } from "./ToolDropDiagram";

export function MonitoringMcpSection() {
  return (
    <div className="rounded-2xl border border-border bg-panel p-6 md:p-10">
      <div className="max-w-2xl mb-8">
        <p className="font-mono-tag text-[11px] uppercase tracking-wide text-accent mb-2">
          Featured project
        </p>
        <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
          {monitoringMcp.name}
        </h3>
        <p className="mt-3 text-muted leading-relaxed">{monitoringMcp.pitch}</p>
      </div>

      <Reveal>
        <ToolDropDiagram />
      </Reveal>

      <div className="grid md:grid-cols-2 gap-8 mt-10">
        <ul className="space-y-3">
          {monitoringMcp.details.map((d) => (
            <li key={d} className="flex gap-3 text-sm text-muted leading-relaxed">
              <span className="text-accent mt-1.5 shrink-0" aria-hidden>
                ▸
              </span>
              {d}
            </li>
          ))}
        </ul>
        <div>
          <p className="font-mono-tag text-[11px] uppercase tracking-wide text-muted mb-4">
            Tech
          </p>
          <div className="flex flex-wrap gap-1.5">
            {monitoringMcp.tech.map((t) => (
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
