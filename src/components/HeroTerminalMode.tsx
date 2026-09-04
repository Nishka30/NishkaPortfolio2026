"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/content";

const LINES: [string, string][] = [
  ["name", profile.name],
  ["role", profile.tagline],
  ["focus", "MCP orchestration, retrieval architecture, agentic infra"],
  ["location", profile.location],
  ["status", "[ok] building infrastructure other engineers reach for AI through"],
];

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export function HeroTerminalMode() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [typedLast, setTypedLast] = useState("");
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    async function run() {
      if (prefersReduced) {
        setVisibleLines(LINES.length);
        return;
      }
      for (let i = 0; i < LINES.length; i++) {
        if (cancelled) return;
        setVisibleLines(i);
        const value = LINES[i][1];
        for (let c = 1; c <= value.length; c++) {
          if (cancelled) return;
          setTypedLast(value.slice(0, c));
          await sleep(14);
        }
        await sleep(180);
      }
      if (cancelled) return;
      setVisibleLines(LINES.length);
    }
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-xl border border-border bg-panel-2 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background/40">
        <span className="size-2.5 rounded-full bg-risk-high/70" />
        <span className="size-2.5 rounded-full bg-risk-medium/70" />
        <span className="size-2.5 rounded-full bg-risk-low/70" />
        <span className="ml-2 font-mono-tag text-[11px] text-muted">nishka@prolifics ~</span>
      </div>
      <div className="p-5 md:p-6 font-mono-tag text-sm leading-relaxed">
        <p className="text-accent mb-3">$ sentinel scan --self</p>
        <dl className="space-y-1.5">
          {LINES.map(([key, value], i) => {
            const shown = i < visibleLines ? value : i === visibleLines ? typedLast : "";
            if (i > visibleLines) return null;
            return (
              <div key={key} className="flex gap-3">
                <dt className="text-muted w-20 shrink-0">{key}</dt>
                <dd className={key === "status" ? "text-risk-low" : "text-foreground"}>
                  {shown}
                  {i === visibleLines && (
                    <span className={cursorOn ? "opacity-100" : "opacity-0"}>▍</span>
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
}
