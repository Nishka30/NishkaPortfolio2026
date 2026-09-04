import { ImageResponse } from "next/og";
import { profile } from "@/lib/content";

export const alt = `${profile.name} — ${profile.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Matches the site's dark palette in globals.css. Satori has no CSS variables,
// so the tokens are inlined here.
const BG = "#08090b";
const PANEL = "#111318";
const BORDER = "#262a33";
const FG = "#e8eaed";
const MUTED = "#9aa0ac";
const ACCENT = "#22d3ee";

const chips = ["MCP tool registries", "Retrieval architecture", "Agent orchestration"];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          padding: 72,
          position: "relative",
        }}
      >
        {/* Accent glow behind the headline */}
        <div
          style={{
            position: "absolute",
            top: -260,
            left: -160,
            width: 900,
            height: 640,
            background: `radial-gradient(circle at 50% 50%, ${ACCENT}, transparent 62%)`,
            opacity: 0.22,
            display: "flex",
          }}
        />
        {/* Left rule */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 8,
            height: "100%",
            background: ACCENT,
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 12,
                background: ACCENT,
                display: "flex",
              }}
            />
            <div style={{ color: MUTED, fontSize: 24, letterSpacing: -0.4, display: "flex" }}>
              nishka-codes.vercel.app
            </div>
          </div>
          <div style={{ color: MUTED, fontSize: 22, display: "flex" }}>
            {profile.title} @ Prolifics
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: FG,
              fontSize: 88,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.05,
              display: "flex",
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              color: ACCENT,
              fontSize: 42,
              fontWeight: 600,
              letterSpacing: -1,
              marginTop: 14,
              display: "flex",
            }}
          >
            {profile.tagline}
          </div>
          <div
            style={{
              color: MUTED,
              fontSize: 27,
              lineHeight: 1.45,
              marginTop: 26,
              maxWidth: 940,
              display: "flex",
            }}
          >
            I build the infrastructure other engineers reach for AI through — not prompt wrappers.
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {chips.map((c) => (
            <div
              key={c}
              style={{
                display: "flex",
                color: MUTED,
                fontSize: 21,
                background: PANEL,
                border: `1px solid ${BORDER}`,
                borderRadius: 999,
                padding: "10px 20px",
              }}
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
