import { achievements } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Achievements() {
  return (
    <section className="mx-auto max-w-6xl px-5 md:px-8 pb-16 md:pb-24">
      <div className="grid gap-4 sm:grid-cols-3">
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.05}>
            <div className="h-full rounded-xl border border-border bg-panel p-6">
              <p className="font-display font-semibold">{a.title}</p>
              <p className="mt-1 text-sm text-muted">{a.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
