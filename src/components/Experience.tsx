import { prolifics, agenticPlatform, priorExperience } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { AgenticPlatformCard } from "./AgenticPlatformCard";

export function Experience() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-5 md:px-8 py-16 md:py-24">
      <SectionHeading
        eyebrow="Experience"
        title="Production software, with the AI layer built in-house"
        description="ITMS is a real, currently-deployed logistics platform with real users. The agentic platform work sits alongside it — not instead of it."
      />

      <Reveal>
        <div className="rounded-2xl border border-border bg-panel p-6 md:p-10">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 mb-8">
            <div>
              <h3 className="font-display text-xl md:text-2xl font-semibold">
                {prolifics.role}
              </h3>
              <p className="text-muted mt-1">
                {prolifics.company} · {prolifics.location}
              </p>
            </div>
            <p className="font-mono-tag text-xs text-accent shrink-0">{prolifics.period}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-10">
            {prolifics.bullets.map((b) => (
              <div key={b.title} className="rounded-lg border border-border bg-panel-2 p-5">
                <h4 className="font-semibold text-sm mb-2">{b.title}</h4>
                <p className="text-sm text-muted leading-relaxed">{b.body}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {b.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono-tag text-[11px] px-2 py-0.5 rounded border border-border text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <AgenticPlatformCard data={agenticPlatform} />
        </div>
      </Reveal>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {priorExperience.map((exp, i) => (
          <Reveal key={exp.company} delay={i * 0.06}>
            <div className="h-full rounded-xl border border-border bg-panel p-6">
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <h4 className="font-semibold">{exp.role}</h4>
                <p className="font-mono-tag text-xs text-muted shrink-0">{exp.period}</p>
              </div>
              <p className="text-sm text-accent mb-3">
                {exp.company} · {exp.location}
              </p>
              <p className="text-sm text-muted leading-relaxed">{exp.body}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {exp.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono-tag text-[11px] px-2 py-0.5 rounded border border-border text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
