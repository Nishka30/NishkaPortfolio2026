import { painScript } from "@/lib/content";
import { Reveal } from "../Reveal";
import { HealthCheckSweep } from "./HealthCheckSweep";

export function PainScriptSection() {
  return (
    <div className="rounded-2xl border border-border bg-panel p-6 md:p-10">
      <div className="max-w-2xl mb-8">
        <p className="font-mono-tag text-[11px] uppercase tracking-wide text-accent mb-2">
          {painScript.eyebrow}
        </p>
        <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
          {painScript.name}
          <span className="text-muted font-normal text-lg md:text-xl"> — {painScript.subtitle}</span>
        </h3>
        <p className="mt-1.5 font-mono-tag text-xs text-muted">{painScript.role}</p>
        <p className="mt-3 text-muted leading-relaxed">{painScript.pitch}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="font-mono-tag text-[11px] uppercase tracking-wide text-muted mb-4">
            Full-stack work
          </p>
          <ul className="space-y-3">
            {painScript.details.map((d) => (
              <li key={d} className="flex gap-3 text-sm text-muted leading-relaxed">
                <span className="text-accent mt-1.5 shrink-0" aria-hidden>
                  ▸
                </span>
                {d}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {painScript.tech.map((t) => (
              <span
                key={t}
                className="font-mono-tag text-[11px] px-2 py-0.5 rounded border border-border text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono-tag text-[11px] uppercase tracking-wide text-muted mb-4">
            {painScript.aiPoc.title}
          </p>
          <p className="text-sm text-muted leading-relaxed mb-4">{painScript.aiPoc.description}</p>
          <Reveal>
            <HealthCheckSweep />
          </Reveal>
        </div>
      </div>

      <p className="mt-6 text-xs text-muted italic max-w-2xl">{painScript.note}</p>
    </div>
  );
}
