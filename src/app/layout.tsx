import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeScript } from "@/components/ThemeScript";
import { ConsoleSignature } from "@/components/ConsoleSignature";
import { profile } from "@/lib/content";
import { SITE_URL } from "@/lib/llmsTxt";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Nishka Shrimali — AI Systems Engineer",
  description:
    "Nishka Shrimali builds agentic AI infrastructure: MCP tool orchestration, retrieval architecture, and production-grade LLM systems.",
  metadataBase: new URL(SITE_URL),
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  keywords: [
    "Nishka Shrimali",
    "AI Systems Engineer",
    "Agentic AI",
    "MCP",
    "Model Context Protocol",
    "RAG",
    "LLM infrastructure",
    "Prolifics",
  ],
  openGraph: {
    title: "Nishka Shrimali — AI Systems Engineer",
    description:
      "MCP tool orchestration, retrieval architecture, and production-grade LLM systems — not prompt wrappers.",
    type: "website",
    url: SITE_URL,
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Nishka Shrimali — AI Systems Engineer",
    description:
      "MCP tool orchestration, retrieval architecture, and production-grade LLM systems — not prompt wrappers.",
  },
};

// Structured data so search engines and AI crawlers get the same facts the page
// shows. Pairs with /llms.txt, which carries the long-form machine-readable copy.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.tagline,
  description: profile.positioning,
  email: `mailto:${profile.email}`,
  url: SITE_URL,
  sameAs: [profile.github, profile.linkedin],
  worksFor: { "@type": "Organization", name: profile.company },
  alumniOf: { "@type": "CollegeOrUniversity", name: profile.education.school },
  address: { "@type": "PostalAddress", addressLocality: profile.location },
  knowsAbout: [
    "Model Context Protocol (MCP)",
    "Agentic AI orchestration",
    "Retrieval-augmented generation",
    "LLM systems engineering",
    "Full-stack web development",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="Machine-readable portfolio" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <ConsoleSignature />
      </body>
    </html>
  );
}
