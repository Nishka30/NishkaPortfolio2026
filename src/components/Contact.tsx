import { profile } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 md:px-8 py-16 md:py-24">
      <Reveal>
        <div className="rounded-2xl border border-border bg-panel p-8 md:p-14 text-center">
          <p className="font-mono-tag text-xs uppercase tracking-[0.18em] text-accent mb-4">
            Contact
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-balance max-w-2xl mx-auto">
            Building agentic systems, and open to conversations about them.
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="font-mono-tag text-sm px-5 py-3 rounded-md border border-accent text-accent hover:bg-accent hover:text-accent-fg transition-colors"
            >
              {profile.email}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="font-mono-tag text-sm px-5 py-3 rounded-md border border-border text-muted hover:text-foreground hover:border-accent/50 transition-colors"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="font-mono-tag text-sm px-5 py-3 rounded-md border border-border text-muted hover:text-foreground hover:border-accent/50 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={profile.resumeHref}
              className="font-mono-tag text-sm px-5 py-3 rounded-md border border-border text-muted hover:text-foreground hover:border-accent/50 transition-colors"
            >
              Résumé (PDF)
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
