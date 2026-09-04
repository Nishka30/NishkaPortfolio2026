import { profile } from "@/lib/content";

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
    </footer>
  );
}
