export type Theme = "light" | "dark";

export function getTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

export function setTheme(theme: Theme) {
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // localStorage can throw in private/blocked contexts — theme still applies for this load.
  }
}

export function toggleTheme(): Theme {
  const next: Theme = getTheme() === "light" ? "dark" : "light";
  setTheme(next);
  return next;
}
