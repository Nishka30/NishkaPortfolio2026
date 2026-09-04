"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "#work", label: "work" },
  { href: "#projects", label: "projects" },
  { href: "#retrieval", label: "retrieval" },
  { href: "#skills", label: "skills" },
  { href: "#contact", label: "contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
        <ul className="hidden md:flex items-center gap-7 font-mono-tag text-xs text-muted">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-foreground transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="md:hidden font-mono-tag text-xs px-2.5 py-1.5 rounded-md border border-border text-muted hover:text-foreground hover:border-accent/50 transition-colors cursor-pointer"
          >
            {menuOpen ? "close()" : "menu()"}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-border bg-background"
          >
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block font-mono-tag text-sm px-5 py-4 text-muted hover:text-foreground transition-colors border-b border-border last:border-b-0"
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
