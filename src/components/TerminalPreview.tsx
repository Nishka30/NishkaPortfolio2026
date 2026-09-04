"use client";

import { useEffect, useRef, useState } from "react";

type Entry = {
  cmd: string;
  output: string[];
};

const ENTRIES: Entry[] = [
  {
    cmd: "sentinel score --diff HEAD~1",
    output: ["risk: 67/100 [HIGH]", "5 factors flagged — see Sentinel below"],
  },
  {
    cmd: "mcp tools list --registered",
    output: ["query_latency", "check_health", "disk_usage"],
  },
  {
    cmd: "whoami",
    output: ["nishka — AI Systems Engineer", "Prolifics · Hyderabad, IN"],
  },
];

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

function lineTone(line: string) {
  if (line.includes("[HIGH]")) return "text-risk-high";
  return "text-muted";
}

export function TerminalPreview() {
  const [cmdText, setCmdText] = useState("");
  const [outputLines, setOutputLines] = useState<string[]>([]);
  const [cursorOn, setCursorOn] = useState(true);
  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    async function run() {
      if (prefersReduced) {
        setCmdText(ENTRIES[0].cmd);
        setOutputLines(ENTRIES[0].output);
        return;
      }
      let i = 0;
      while (!cancelledRef.current) {
        const entry = ENTRIES[i % ENTRIES.length];
        setOutputLines([]);
        setCmdText("");
        for (let c = 1; c <= entry.cmd.length; c++) {
          if (cancelledRef.current) return;
          setCmdText(entry.cmd.slice(0, c));
          await sleep(26);
        }
        await sleep(400);
        for (let l = 0; l < entry.output.length; l++) {
          if (cancelledRef.current) return;
          setOutputLines(entry.output.slice(0, l + 1));
          await sleep(260);
        }
        await sleep(2000);
        i++;
      }
    }
    run();
    return () => {
      cancelledRef.current = true;
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full max-w-md rounded-xl border border-border bg-panel-2 overflow-hidden shadow-2xl shadow-black/20">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background/40">
        <span className="size-2.5 rounded-full bg-risk-high/70" />
        <span className="size-2.5 rounded-full bg-risk-medium/70" />
        <span className="size-2.5 rounded-full bg-risk-low/70" />
        <span className="ml-2 font-mono-tag text-[11px] text-muted">nishka@prolifics ~</span>
      </div>
      <div className="p-5 font-mono-tag text-[13px] leading-relaxed min-h-[172px]">
        <div className="flex gap-2">
          <span className="text-accent shrink-0">$</span>
          <span className="break-all">
            {cmdText}
            <span className={cursorOn ? "opacity-100" : "opacity-0"}>▍</span>
          </span>
        </div>
        <div className="mt-2.5 space-y-1.5">
          {outputLines.map((line, idx) => (
            <p key={idx} className={lineTone(line)}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
