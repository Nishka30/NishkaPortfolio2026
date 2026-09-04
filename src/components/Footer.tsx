import { profile } from "@/lib/content";

const buildDate = new Date().toISOString().slice(0, 10);

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-8 flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono-tag text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="font-mono-tag text-xs text-muted">
          {profile.education.degree} · {profile.education.school}
        </p>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 md:px-8 py-3">
          <p className="font-mono-tag text-[11px] text-muted/70 flex items-center gap-2">
            <span className="inline-flex size-1.5 rounded-full bg-risk-low shrink-0" />
            all systems documented · last updated {buildDate} · built with Next.js, TypeScript,
            Tailwind, Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
