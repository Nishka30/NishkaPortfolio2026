// Inline, blocking script that sets the theme before paint to avoid a flash.
// Dark is the default identity; a stored preference or explicit light choice can override it.
const script = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    if (stored === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else if (stored === "dark") {
      document.documentElement.removeAttribute("data-theme");
    }
  } catch (e) {}
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
