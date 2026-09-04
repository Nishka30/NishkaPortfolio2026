"use client";

import { useEffect } from "react";
import { profile } from "@/lib/content";

// Anyone who opens DevTools on an engineer's portfolio is looking for something.
// Give them the two links worth having.
export function ConsoleSignature() {
  useEffect(() => {
    const accent = "color:#22d3ee;font-weight:600";
    const muted = "color:#9aa0ac";
    console.log(
      `%c${profile.name} %c— ${profile.tagline}\n%cMachine-readable version: ${location.origin}/llms.txt\nSource of the thing you're inspecting: ${profile.github}\nPress ⌘K / Ctrl+K anywhere on this page.`,
      accent,
      muted,
      muted
    );
  }, []);

  return null;
}
