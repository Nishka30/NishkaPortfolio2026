import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { NowBanner } from "@/components/NowBanner";
import { WhatIDo } from "@/components/WhatIDo";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { RetrievalCompare } from "@/components/RetrievalCompare";
import { BeyondRetrieval } from "@/components/BeyondRetrieval";
import { Skills } from "@/components/Skills";
import { Achievements } from "@/components/Achievements";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <div className="py-6 md:py-8">
          <NowBanner />
        </div>
        <WhatIDo />
        <Experience />
        <Projects />
        <RetrievalCompare />
        <BeyondRetrieval />
        <Skills />
        <Achievements />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
