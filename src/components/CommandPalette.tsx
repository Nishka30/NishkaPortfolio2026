"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import {
  Command as CommandIcon,
  Search,
  ExternalLink,
  Sun,
  Moon,
  Terminal,
  FileText,
  Mail,
  Layers,
  Bot,
  Copy,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons/BrandIcons";
import { profile, sentinel, aaf } from "@/lib/content";
import { getTheme, toggleTheme } from "@/lib/theme";

type Command = {
  id: string;
  label: string;
  group: string;
  keywords?: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  run: () => void;
};

function scrollToSection(hash: string) {
  document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
}

function openExternal(url: string) {
  window.open(url, url.startsWith("mailto:") ? "_self" : "_blank", "noopener,noreferrer");
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(id);
  }, [toast]);

  const commands = useMemo<Command[]>(
    () => [
      { id: "nav-about", label: "Go to What I Do", group: "Navigate", keywords: "about", icon: Layers, run: () => scrollToSection("#about") },
      { id: "nav-work", label: "Go to Experience", group: "Navigate", icon: Layers, run: () => scrollToSection("#work") },
      { id: "nav-projects", label: "Go to Projects", group: "Navigate", icon: Layers, run: () => scrollToSection("#projects") },
      { id: "nav-retrieval", label: "Go to Retrieval", group: "Navigate", icon: Layers, run: () => scrollToSection("#retrieval") },
      { id: "nav-skills", label: "Go to Skills", group: "Navigate", icon: Layers, run: () => scrollToSection("#skills") },
      { id: "nav-education", label: "Go to Education", group: "Navigate", keywords: "degree college", icon: Layers, run: () => scrollToSection("#education") },
      { id: "nav-contact", label: "Go to Contact", group: "Navigate", icon: Layers, run: () => scrollToSection("#contact") },
      {
        id: "theme",
        label: "Toggle light / dark theme",
        group: "Site",
        icon: getTheme() === "light" ? Moon : Sun,
        run: () => {
          const next = toggleTheme();
          window.dispatchEvent(new CustomEvent("theme-change", { detail: next }));
        },
      },
      {
        id: "terminal-mode",
        group: "Site",
        label: "Toggle hero terminal mode",
        icon: Terminal,
        run: () => {
          scrollToSection("#top");
          window.dispatchEvent(new Event("toggle-terminal-mode"));
        },
      },
      {
        id: "llms",
        label: "Read the machine-readable version (/llms.txt)",
        group: "Site",
        keywords: "agent llm curl plaintext",
        icon: Bot,
        run: () => openExternal("/llms.txt"),
      },
      { id: "github", label: "Open GitHub profile", group: "Links", keywords: "nishka30", icon: GithubIcon, run: () => openExternal(profile.github) },
      { id: "linkedin", label: "Open LinkedIn", group: "Links", icon: LinkedinIcon, run: () => openExternal(profile.linkedin) },
      { id: "email", label: `Email ${profile.email}`, group: "Links", icon: Mail, run: () => openExternal(`mailto:${profile.email}`) },
      {
        id: "copy-email",
        label: "Copy email address",
        group: "Links",
        keywords: "clipboard",
        icon: Copy,
        run: () => {
          navigator.clipboard
            ?.writeText(profile.email)
            .then(() => setToast("Email copied to clipboard"))
            .catch(() => setToast(`Couldn't copy — it's ${profile.email}`));
        },
      },
      { id: "resume", label: "Open résumé (PDF)", group: "Links", icon: FileText, run: () => openExternal(profile.resumeHref) },
      { id: "pypi", label: "Open SentinelScan on PyPI", group: "Links", keywords: "pip install", icon: ExternalLink, run: () => openExternal(sentinel.pypiUrl) },
      { id: "sentinel-gh", label: "Open SentinelScan on GitHub", group: "Links", keywords: aaf.shortName, icon: ExternalLink, run: () => openExternal(sentinel.githubUrl) },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.group} ${c.keywords ?? ""}`.toLowerCase().includes(q)
    );
  }, [commands, query]);

  function openPalette() {
    setQuery("");
    setActiveIndex(0);
    setOpen(true);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isMod = e.metaKey || e.ctrlKey;
      if (isMod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => {
          if (v) return false;
          openPalette();
          return true;
        });
        return;
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  function handleQueryChange(value: string) {
    setQuery(value);
    setActiveIndex(0);
  }

  function runCommand(cmd: Command) {
    cmd.run();
    setOpen(false);
  }

  function handleInputKeyDown(e: ReactKeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = filtered[activeIndex];
      if (cmd) runCommand(cmd);
    }
  }

  return (
    <>
      <button
        onClick={openPalette}
        aria-label="Open command palette"
        className="hidden md:flex items-center gap-1.5 font-mono-tag text-xs px-2.5 py-1.5 rounded-md border border-border text-muted hover:text-foreground hover:border-accent/50 transition-colors cursor-pointer"
      >
        <Search size={12} />
        <kbd className="text-[10px]">⌘K</kbd>
      </button>

      {/* Portalled to <body>: the nav's backdrop-blur creates a containing block,
          which would otherwise anchor these fixed layers to the header. */}
      {open && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-xl border border-border bg-panel shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5 px-4 py-3.5 border-b border-border">
              <CommandIcon size={16} className="text-accent shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted"
              />
              <kbd className="font-mono-tag text-[10px] text-muted border border-border rounded px-1.5 py-0.5 shrink-0">
                esc
              </kbd>
            </div>

            <ul className="max-h-80 overflow-y-auto py-2">
              {filtered.length === 0 && (
                <li className="px-4 py-8 text-center text-sm text-muted">No matching commands</li>
              )}
              {filtered.map((cmd, i) => {
                const Icon = cmd.icon;
                return (
                  <li key={cmd.id}>
                    <button
                      onClick={() => runCommand(cmd)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`w-full text-left px-4 py-2.5 flex items-center gap-3 text-sm transition-colors cursor-pointer ${
                        i === activeIndex ? "bg-accent/10 text-accent" : "text-foreground"
                      }`}
                    >
                      <Icon size={15} className="shrink-0" />
                      <span className="flex-1">{cmd.label}</span>
                      <span className="font-mono-tag text-[10px] text-muted">{cmd.group}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-4 px-4 py-2.5 border-t border-border font-mono-tag text-[10px] text-muted">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span>esc close</span>
            </div>
          </div>
        </div>,
        document.body
      )}

      {toast && createPortal(
        <div
          role="status"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] rounded-md border border-accent/40 bg-panel px-4 py-2.5 font-mono-tag text-xs text-accent shadow-lg"
        >
          {toast}
        </div>,
        document.body
      )}
    </>
  );
}
