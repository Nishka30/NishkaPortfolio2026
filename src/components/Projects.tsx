import { SectionHeading } from "./SectionHeading";
import { AAFSection } from "./aaf/AAFSection";
import { SentinelSection } from "./sentinel/SentinelSection";
import { MonitoringMcpSection } from "./mcp/MonitoringMcpSection";
import { PainScriptSection } from "./painscript/PainScriptSection";
import { InternalRagCard } from "./rag/InternalRagCard";
import { CareNexusCard } from "./carenexus/CareNexusCard";
import { Reveal } from "./Reveal";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 md:px-8 py-16 md:py-24">
      <SectionHeading
        eyebrow="Featured Projects"
        title="Runnable, inspectable systems — not screenshots"
        description="Each case study below renders real interaction, not static images: an interactive request-pipeline simulator for the Agentic Assembly Framework, a live risk score from Sentinel's own CLI output format, the tool-registration pipeline behind the Monitoring MCP Toolkit, and a health-check sweep from the PainScript AI proof of concept."
      />
      <div className="space-y-8">
        <Reveal>
          <AAFSection />
        </Reveal>
        <Reveal delay={0.05}>
          <SentinelSection />
        </Reveal>
        <Reveal delay={0.05}>
          <MonitoringMcpSection />
        </Reveal>
        <Reveal delay={0.05}>
          <PainScriptSection />
        </Reveal>
        <div className="grid md:grid-cols-2 gap-8">
          <Reveal delay={0.08}>
            <InternalRagCard />
          </Reveal>
          <Reveal delay={0.1}>
            <CareNexusCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
