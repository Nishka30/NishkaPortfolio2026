import { retrievalApproaches, retrievalIntro } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function RetrievalCompare() {
  return (
    <section id="retrieval" className="mx-auto max-w-6xl px-5 md:px-8 py-16 md:py-24">
      <SectionHeading
        eyebrow={retrievalIntro.eyebrow}
        title={retrievalIntro.title}
        description={retrievalIntro.description}
      />

      <div className="grid gap-5 md:grid-cols-3">
        {retrievalApproaches.map((r, i) => (
          <Reveal key={r.key} delay={i * 0.06}>
            <div className="h-full rounded-xl border border-border bg-panel p-6">
              <div className="flex items-center justify-between gap-2 mb-4">
                <h3 className="font-display font-semibold text-lg">{r.name}</h3>
                {r.builtAt && (
                  <span className="font-mono-tag text-[10px] px-2 py-0.5 rounded border border-accent/40 text-accent uppercase tracking-wide shrink-0">
                    Built at Prolifics
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-0">
                {r.flow.map((step, idx) => (
                  <div key={step} className="flex flex-col items-center">
                    <div
                      className={`w-full text-center font-mono-tag text-xs px-3 py-2.5 rounded-md border ${
                        idx === r.flow.length - 1
                          ? "border-accent/40 text-accent bg-accent/[0.06]"
                          : "border-border text-muted"
                      }`}
                    >
                      {step}
                    </div>
                    {idx < r.flow.length - 1 && (
                      <span aria-hidden className="text-muted my-1 text-xs">
                        ↓
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted leading-relaxed">{r.note}</p>
              {r.builtAt && <p className="mt-2 text-xs text-accent leading-relaxed">{r.builtAt}</p>}
            </div>
          </Reveal>
        ))}
      </div>

      <p className="mt-8 text-sm text-muted text-center max-w-2xl mx-auto leading-relaxed">
        {retrievalIntro.closing}
      </p>
    </section>
  );
}
