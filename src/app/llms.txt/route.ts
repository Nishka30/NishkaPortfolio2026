import { buildLlmsTxt } from "@/lib/llmsTxt";

// Static: the content is derived entirely from content.ts, so it can be
// generated once at build time.
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
