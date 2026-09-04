import { aaf } from "@/lib/content";
import { Reveal } from "../Reveal";
import { LayerStack } from "./LayerStack";
import { AAFSimulator } from "./AAFSimulator";

export function AAFSection() {
  return (
    <div className="rounded-2xl border border-border bg-panel p-6 md:p-10">
      <div className="max-w-2xl mb-8">
        <p className="font-mono-tag text-[11px] uppercase tracking-wide text-accent mb-2">
          {aaf.eyebrow}
        </p>
        <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
          {aaf.name} <span className="text-accent">({aaf.shortName})</span>
          <span className="text-muted font-normal text-lg md:text-xl block sm:inline">
            {" "}
            — {aaf.subtitle}
          </span>
        </h3>
        <p className="mt-3 text-muted leading-relaxed">{aaf.pitch}</p>
      </div>

      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 mb-10">
        <div>
          <p className="font-mono-tag text-[11px] uppercase tracking-wide text-muted mb-4">
            Three layers
          </p>
          <LayerStack />
        </div>
        <div>
          <h4 className="font-display font-semibold text-base mb-1">{aaf.pipelineHeading}</h4>
          <p className="font-mono-tag text-[11px] uppercase tracking-wide text-muted mb-4">
            Try the request pipeline
          </p>
          <Reveal>
            <AAFSimulator />
          </Reveal>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {aaf.principles.map((p) => (
          <div key={p.title} className="rounded-lg border border-border bg-panel-2 p-4">
            <h4 className="font-semibold text-sm mb-1.5">{p.title}</h4>
            <p className="text-sm text-muted leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {aaf.tech.map((t) => (
          <span
            key={t}
            className="font-mono-tag text-[11px] px-2 py-0.5 rounded border border-border text-muted"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
