"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { Mail, FileText, ArrowDown, Terminal, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons/BrandIcons";
import { profile } from "@/lib/content";
import { TerminalPreview } from "./TerminalPreview";
import { HeroTerminalMode } from "./HeroTerminalMode";

const links = [
  { label: "Résumé", href: profile.resumeHref, icon: FileText, primary: true },
  { label: "GitHub", href: profile.github, icon: GithubIcon },
  { label: "LinkedIn", href: profile.linkedin, icon: LinkedinIcon },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
];

const headline = [
  "I",
  "build",
  "the",
  "infrastructure",
  "other",
  "engineers",
  "reach",
  { accent: "for AI" },
  "through.",
];

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [terminalMode, setTerminalMode] = useState(false);

  useEffect(() => {
    const onToggle = () => setTerminalMode((v) => !v);
    window.addEventListener("toggle-terminal-mode", onToggle);
    return () => window.removeEventListener("toggle-terminal-mode", onToggle);
  }, []);

  function handlePointerMove(e: PointerEvent<HTMLElement>) {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <section
      id="top"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="relative overflow-hidden"
      style={{ "--mx": "50%", "--my": "0px" } as CSSProperties}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-fade-mask opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          background:
            "radial-gradient(480px circle at var(--mx) var(--my), color-mix(in srgb, var(--accent) 10%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8 pt-20 pb-16 md:pt-28 md:pb-20 grid md:grid-cols-[1.15fr_0.85fr] gap-12 md:gap-8 items-center">
        <div>
          <div className="flex items-center justify-between gap-3 mb-5">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-mono-tag text-xs uppercase tracking-[0.18em] text-accent flex items-center gap-2"
            >
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
              </span>
              {profile.tagline} · {profile.location}
            </motion.p>
            <button
              onClick={() => setTerminalMode((v) => !v)}
              aria-label={terminalMode ? "Exit terminal mode" : "Enter terminal mode"}
              className="font-mono-tag text-[11px] px-2.5 py-1.5 rounded-md border border-border text-muted hover:text-accent hover:border-accent/50 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              {terminalMode ? <X size={12} /> : <Terminal size={12} />}
              {terminalMode ? "exit" : "terminal"}
            </button>
          </div>

          <AnimatePresence mode="wait">
            {terminalMode ? (
              <motion.div
                key="terminal"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-xl"
              >
                <HeroTerminalMode />
              </motion.div>
            ) : (
              <motion.div key="prose" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.h1
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="font-display font-semibold tracking-tight text-4xl sm:text-5xl md:text-6xl max-w-3xl leading-[1.08]"
                >
                  {headline.map((w, i) =>
                    typeof w === "string" ? (
                      <motion.span key={i} variants={wordVariants} className="inline-block mr-[0.28em]">
                        {w}
                      </motion.span>
                    ) : (
                      <motion.span key={i} variants={wordVariants} className="relative inline-block mr-[0.28em]">
                        <span
                          aria-hidden
                          className="absolute inset-0 -z-10 scale-150 rounded-full bg-accent opacity-30 blur-2xl"
                        />
                        <span className="text-accent">{w.accent}</span>
                      </motion.span>
                    )
                  )}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-6 max-w-xl text-base md:text-lg text-muted leading-relaxed"
                >
                  Tool registries, MCP servers, retrieval architecture, and orchestration
                  layers — not prompt wrappers. Currently{" "}
                  <span className="text-foreground">{profile.title}</span> at{" "}
                  <span className="text-foreground">{profile.company}</span>.
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.58 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            {links.map((l) => {
              const Icon = l.icon;
              return (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                  className={`group font-mono-tag text-sm pl-3.5 pr-4 py-2.5 rounded-md border transition-colors flex items-center gap-2 ${
                    l.primary
                      ? "border-accent text-accent hover:bg-accent hover:text-accent-fg"
                      : "border-border text-muted hover:text-foreground hover:border-accent/50"
                  }`}
                >
                  <Icon size={15} className="shrink-0" />
                  {l.label}
                </a>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center md:justify-end"
        >
          <TerminalPreview />
        </motion.div>
      </div>

      <motion.a
        href="#work"
        aria-label="Scroll to experience"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 text-muted hover:text-foreground transition-colors"
      >
        <span className="font-mono-tag text-[10px] uppercase tracking-widest">scroll</span>
        <motion.span
          animate={reduceMotion ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.span>
      </motion.a>
    </section>
  );
}
