# Nishka Shrimali — Portfolio

Personal portfolio site, positioned around agentic AI systems engineering rather than general web dev: MCP tool orchestration, retrieval architecture, and production-grade LLM infrastructure. Built with Next.js (App Router), TypeScript, Tailwind CSS v4, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The page hot-reloads as you edit.

Other scripts:

```bash
npm run build   # production build (also type-checks)
npm run start   # serve the production build
npm run lint    # eslint
```

## Editing content

Almost all copy — bio, experience bullets, project details, stats, skills — lives in one place: [`src/lib/content.ts`](src/lib/content.ts). Components read from these exports rather than hardcoding text, so most updates (a new stat, a reworded bullet, a new skill) only touch that file.

Update `profile.resumeHref` (currently `/resume.pdf`) by dropping a new PDF into `public/`, and keep `profile.linkedin` / `profile.github` current if either handle changes.

## Structure

```text
src/
  app/
    layout.tsx        fonts, metadata, theme bootstrap script
    globals.css        theme tokens (light/dark), base styles
    page.tsx            assembles the sections below, in order
  lib/
    content.ts          all copy and structured data
  components/
    Nav.tsx              sticky nav + mobile menu
    Hero.tsx             headline, CTA links, terminal preview, spotlight
    TerminalPreview.tsx  animated CLI-style panel in the hero
    Experience.tsx        Prolifics + prior internships
    AgenticPlatformCard.tsx  expandable "agentic backend platform" detail card
    Projects.tsx          wraps the three project case studies below
    sentinel/              Sentinel case study + animated risk gauge/card
    mcp/                   Monitoring MCP Toolkit case study + tool-registration diagram
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
- **Motion respects `prefers-reduced-motion`.** Looping/decorative animations (the tool-registration diagram, the terminal typing effect) check the media query directly and render their resting state instead of animating; scroll-reveals and one-off transitions are handled by Framer Motion, which already honors it.
- **Two interactive case-study pieces** — an animated risk gauge (`sentinel/RiskGauge.tsx`) and a looping tool-registration pipeline (`mcp/ToolDropDiagram.tsx`) — render real UI instead of static screenshots, using illustrative numbers pulled from each project's own README/CLI output format.

## Deployment

Static-friendly Next.js app — deploys as-is to Vercel (`vercel deploy`) or any Node host that runs `next build && next start`.
