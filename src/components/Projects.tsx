import { SectionHeading } from "./SectionHeading";
import { SentinelSection } from "./sentinel/SentinelSection";
import { MonitoringMcpSection } from "./mcp/MonitoringMcpSection";
import { CareNexusCard } from "./carenexus/CareNexusCard";
import { Reveal } from "./Reveal";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 md:px-8 py-16 md:py-24">
      <SectionHeading
        eyebrow="Featured Projects"
        title="Runnable, inspectable systems — not screenshots"
        description="The two case studies below render real interaction, not static images: an illustrative live risk score from Sentinel's own CLI output format, and the tool-registration pipeline behind the Monitoring MCP Toolkit. A third project, on synthetic healthcare data, rounds out the range."
      />
      <div className="space-y-8">
        <Reveal>
          <SentinelSection />
        </Reveal>
        <Reveal delay={0.05}>
          <MonitoringMcpSection />
        </Reveal>
        <Reveal delay={0.08}>
          <CareNexusCard />
        </Reveal>
      </div>
    </section>
  );
}
