"use client";

import { useEffect, useState } from "react";
import { getTheme, toggleTheme } from "@/lib/theme";

export function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    // One-time read of the attribute the blocking inline script (ThemeScript)
    // already set before paint, so React's state matches the DOM it inherited.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLight(getTheme() === "light");

    const onThemeChange = (e: Event) => setIsLight((e as CustomEvent<string>).detail === "light");
    window.addEventListener("theme-change", onThemeChange);
    return () => window.removeEventListener("theme-change", onThemeChange);
  }, []);

  function toggle() {
    const next = toggleTheme();
    setIsLight(next === "light");
    window.dispatchEvent(new CustomEvent("theme-change", { detail: next }));
  }

  return (
    <button
      onClick={toggle}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className="font-mono-tag text-xs px-2.5 py-1.5 rounded-md border border-border text-muted hover:text-foreground hover:border-accent/50 transition-colors cursor-pointer"
    >
      {isLight ? "dark()" : "light()"}
    </button>
  );
}
