"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { CommandPalette } from "./CommandPalette";

const links = [
  { href: "#about", label: "about" },
  { href: "#work", label: "work" },
  { href: "#projects", label: "projects" },
  { href: "#retrieval", label: "retrieval" },
  { href: "#skills", label: "skills" },
  { href: "#education", label: "education" },
  { href: "#contact", label: "contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = links
      .map((l) => ({ href: l.href, el: document.querySelector<HTMLElement>(l.href) }))
      .filter((s): s is { href: string; el: HTMLElement } => s.el !== null);

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(y / scrollable, 1) : 0);

      // A section is "current" once its top passes the upper third of the
      // viewport — the last such section wins.
      const line = y + window.innerHeight * 0.35;
      let current: string | null = null;
      for (const s of sections) {
        if (s.el.offsetTop <= line) current = s.href;
      }
      // Nothing is highlighted while the hero still fills most of the screen.
      setActive(y < window.innerHeight * 0.4 ? null : current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen
          ? "bg-background/85 backdrop-blur border-b border-border"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-5 md:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="font-display font-semibold tracking-tight text-sm">
          Nishka Shrimali
          <span className="text-accent">.</span>
        </a>
        <ul className="hidden lg:flex items-center gap-6 font-mono-tag text-xs text-muted">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                aria-current={active === l.href ? "true" : undefined}
                className={`relative transition-colors ${
                  active === l.href ? "text-accent" : "hover:text-foreground"
                }`}
              >
                {l.label}
                {active === l.href && (
                  <motion.span
                    layoutId="nav-active"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    className="absolute -bottom-1.5 left-0 right-0 h-px bg-accent"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <CommandPalette />
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="lg:hidden font-mono-tag text-xs px-2.5 py-1.5 rounded-md border border-border text-muted hover:text-foreground hover:border-accent/50 transition-colors cursor-pointer"
          >
            {menuOpen ? "close()" : "menu()"}
          </button>
        </div>
      </nav>

      {/* Reading progress — sits on the header's bottom edge. */}
      <div
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-accent"
        style={{ transform: `scaleX(${progress})`, opacity: scrolled ? 1 : 0 }}
        aria-hidden
      />

      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden border-t border-border bg-background"
          >
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block font-mono-tag text-sm px-5 py-4 transition-colors border-b border-border last:border-b-0 ${
                    active === l.href ? "text-accent" : "text-muted hover:text-foreground"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
