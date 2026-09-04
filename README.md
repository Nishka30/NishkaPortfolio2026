# Nishka Shrimali — Portfolio

**Live:** [nishka-codes.vercel.app](https://nishka-codes.vercel.app/)

Personal portfolio site, positioned around agentic AI systems engineering rather than general web dev: MCP tool orchestration, retrieval architecture, and production-grade agentic infrastructure. Built with Next.js (App Router), TypeScript, Tailwind CSS v4, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build   # production build (also type-checks)
npm run start   # serve the production build
npm run lint    # eslint
```

## Editing content

Almost all copy — bio, experience bullets, project details, stats, skills — lives in one place: [`src/lib/content.ts`](src/lib/content.ts). Components read from these exports rather than hardcoding text, so most updates (a new stat, a reworded bullet, a new skill) only touch that file.

Update `profile.resumeHref` (currently `/resume.pdf`) by dropping a new PDF into `public/`, and keep `profile.linkedin` / `profile.github` current if either handle changes. `nowBuilding` (used by the "Now" banner under the hero) is worth revisiting periodically — it's dated, and a stale "Now" line reads worse than no "Now" line.

Two stats are fetched live rather than hardcoded, so they never go stale:

- `src/lib/pypi.ts` — Sentinel's PyPI download count (pypistats.org public API)
- `src/lib/github.ts` — Sentinel's GitHub star count (GitHub public REST API)

Both are called from `sentinel/SentinelSection.tsx` (an async Server Component) with `next: { revalidate: 3600 }` and fail closed — if a fetch errors or the API is down, that stat is simply omitted rather than showing stale or fabricated numbers.

## Structure

```text
src/
  app/
    layout.tsx           fonts, metadata, theme bootstrap script
    globals.css          theme tokens (light/dark), base styles
    page.tsx             assembles the sections below, in order
  lib/
    content.ts           all copy and structured data
    pypi.ts, github.ts   live-stat fetch helpers (see above)
  components/
    Nav.tsx               sticky nav + mobile menu
    Hero.tsx              headline, CTA links, terminal preview, spotlight, terminal-mode toggle
    TerminalPreview.tsx    animated CLI-style panel in the hero
    HeroTerminalMode.tsx   the hero's terminal-mode Easter egg (toggled by Hero.tsx)
    NowBanner.tsx          dated "currently building" strip below the hero
    Experience.tsx         Prolifics + prior internships
    AgenticPlatformCard.tsx  expandable "agentic backend platform" detail card
    Projects.tsx           wraps all project case studies below, in display order
    aaf/                   Agentic Assembly Framework — layer stack + interactive request-pipeline simulator
    sentinel/              Sentinel case study + animated risk gauge/card + live PyPI/GitHub stats
    mcp/                   Monitoring MCP Toolkit case study + tool-registration diagram
    painscript/            PainScript case study + animated AI health-check sweep
    rag/                   Internal Vectorless RAG (Prolifics) compact card
    carenexus/             CareNexus (healthcare risk analytics) compact card
    RetrievalCompare.tsx   Vector RAG / Vectorless RAG / GraphRAG comparison
    Skills.tsx             grouped skill tags
    Achievements.tsx, Contact.tsx, Footer.tsx
    Reveal.tsx             shared scroll-reveal wrapper (Framer Motion)
    ThemeToggle.tsx, ThemeScript.tsx   dark/light theme (dark is the default identity)
    icons/BrandIcons.tsx   inline GitHub/LinkedIn marks (lucide-react dropped brand icons)
```

## Design notes

- **Dark by default, not dark-only.** Theme tokens are defined in `globals.css`; `ThemeScript` sets `data-theme` before paint to avoid a flash, `ThemeToggle` flips it and persists the choice to `localStorage`.
- **Motion respects `prefers-reduced-motion`.** Looping/decorative animations (the tool-registration diagram, the terminal typing effects, the health-check sweep) check the media query directly and render their resting state instead of animating; scroll-reveals and one-off transitions are handled by Framer Motion, which already honors it.
- **Interactive case-study pieces render real UI, not screenshots**: an animated risk gauge (`sentinel/RiskGauge.tsx`), a user-driven request-pipeline simulator (`aaf/AAFSimulator.tsx`) that walks five named failure modes (401/403/404/503) instead of an ambiguous 500, a looping tool-registration pipeline (`mcp/ToolDropDiagram.tsx`), and an animated health-check sweep (`painscript/HealthCheckSweep.tsx`).
- **The terminal-mode Easter egg** (`HeroTerminalMode.tsx`, toggled from `Hero.tsx`) is deliberately contained to one moment in the hero — the rest of the site keeps a cleaner "enterprise systems" look rather than leaning into the CLI aesthetic everywhere.

## Deployment

Static-friendly Next.js app — deploys as-is to Vercel (`vercel deploy`) or any Node host that runs `next build && next start`. The live-stat fetches use Next's ISR (`revalidate: 3600`), so a static export (`next export`) would need those two calls reworked as client-side fetches instead.
