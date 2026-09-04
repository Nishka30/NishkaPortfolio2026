import { beyondRetrieval } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function BeyondRetrieval() {
  return (
    <section className="mx-auto max-w-6xl px-5 md:px-8 pb-16 md:pb-24">
      <SectionHeading eyebrow={beyondRetrieval.eyebrow} title={beyondRetrieval.title} />

      <div className="grid md:grid-cols-4 gap-4 items-stretch">
        {beyondRetrieval.steps.map((s, i) => (
          <Reveal key={s.key} delay={i * 0.06} className="h-full">
            <div className="relative h-full rounded-xl border border-border bg-panel p-5">
              {i > 0 && (
                <span
                  aria-hidden
                  className="hidden md:block absolute top-8 -left-4 w-4 h-px bg-border"
                />
              )}
              <p className="font-mono-tag text-[11px] text-accent mb-1.5">{`0${i + 1}`}</p>
              <h3 className="font-semibold text-sm">{s.give}</h3>
              <p className="mt-1.5 text-sm text-foreground">{s.how}</p>
              <p className="mt-1.5 text-xs text-muted leading-relaxed">{s.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <p className="mt-8 text-sm text-muted text-center max-w-2xl mx-auto leading-relaxed">
        {beyondRetrieval.closing}
      </p>
    </section>
  );
}
