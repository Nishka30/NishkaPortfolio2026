"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    // One-time read of the attribute the blocking inline script (ThemeScript)
    // already set before paint, so React's state matches the DOM it inherited.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLight(document.documentElement.getAttribute("data-theme") === "light");
  }, []);

  function toggle() {
    const next = !isLight;
    setIsLight(next);
    if (next) {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
    }
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
