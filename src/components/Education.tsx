import { GraduationCap, MapPin, Clock } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { profile, educationSection } from "@/lib/content";

export function Education() {
  const { education } = profile;

  return (
    <section id="education" className="mx-auto max-w-6xl px-5 md:px-8 py-16 md:py-24">
      <SectionHeading
        eyebrow={educationSection.eyebrow}
        title={educationSection.title}
        description={educationSection.description}
      />

      <div className="grid md:grid-cols-5 gap-4">
        <Reveal className="md:col-span-3">
          <div className="relative h-full overflow-hidden rounded-xl border border-border bg-panel p-6 md:p-7">
            <span
              aria-hidden
              className="absolute -top-24 -left-16 size-64 rounded-full opacity-[0.12] blur-3xl bg-accent"
            />
            <div className="relative flex items-start gap-4">
              <span className="shrink-0 grid place-items-center size-11 rounded-lg border border-accent/25 bg-accent/10 text-accent">
                <GraduationCap size={20} />
              </span>
              <div>
                <h3 className="font-display text-lg md:text-xl font-semibold tracking-tight">
                  {education.degree}
                </h3>
                <p className="mt-1 text-muted">{education.school}</p>
                <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono-tag text-xs">
                  <span className="uppercase tracking-[0.14em] text-muted">{education.years}</span>
                  <span className="text-border" aria-hidden>
                    |
                  </span>
                  <span className="text-accent">{education.gpa}</span>
                </p>
              </div>
            </div>

            <ul className="relative mt-6 pt-5 border-t border-border space-y-2.5">
              {educationSection.highlights.map((h) => (
                <li key={h} className="flex gap-2.5 text-sm text-muted leading-relaxed">
                  <span className="mt-2 size-1 rounded-full bg-accent shrink-0" aria-hidden />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="md:col-span-2">
          <div className="h-full rounded-xl border border-border bg-panel-2 p-6 md:p-7 flex flex-col gap-5">
            <div className="flex items-start gap-3">
              <MapPin size={17} className="text-muted shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{profile.location}</p>
                <p className="font-mono-tag text-[11px] text-muted mt-0.5">
                  {profile.company}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock size={17} className="text-muted shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{profile.timezone}</p>
                <p className="font-mono-tag text-[11px] text-muted mt-0.5">
                  Overlaps a European morning and a US morning
                </p>
              </div>
            </div>

            <div className="mt-auto pt-5 border-t border-border">
              <p className="font-mono-tag text-[11px] text-muted leading-relaxed">
                <span className="inline-flex size-1.5 rounded-full bg-risk-low mr-2 align-middle" />
                Open to conversations about agentic and AI systems work
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
