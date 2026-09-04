import { skillGroups } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 md:px-8 py-16 md:py-24">
      <SectionHeading eyebrow="Skills" title="Grouped by where it's used, not alphabetized" />

      <div className="grid gap-4 md:grid-cols-2">
        {skillGroups.map((g, i) => (
          <Reveal
            key={g.title}
            delay={i * 0.04}
            className={g.emphasis ? "md:col-span-2" : undefined}
          >
            <div
              className={`h-full rounded-xl border p-6 ${
                g.emphasis
                  ? "border-accent/30 bg-gradient-to-br from-accent/[0.06] to-transparent"
                  : "border-border bg-panel"
              }`}
            >
              <h3
                className={`font-mono-tag text-xs uppercase tracking-wide mb-4 ${
                  g.emphasis ? "text-accent" : "text-muted"
                }`}
              >
                {g.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className={`text-sm px-3 py-1.5 rounded-md border transition-colors ${
                      g.emphasis
                        ? "border-accent/30 text-foreground hover:border-accent hover:bg-accent/10"
                        : "border-border text-muted hover:text-foreground hover:border-accent/40"
                    }`}
                  >
                    {item}
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
