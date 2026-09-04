import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeScript } from "@/components/ThemeScript";

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
  metadataBase: new URL("https://nishkashrimali.dev"),
  openGraph: {
    title: "Nishka Shrimali — AI Systems Engineer",
    description:
      "MCP tool orchestration, retrieval architecture, and production-grade LLM systems — not prompt wrappers.",
    type: "website",
  },
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
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}
