import { createFileRoute } from "@tanstack/react-router";
import { AboutSection } from "../components/AboutSection";
import { ContactSection } from "../components/ContactSection";
import { CursorTrail } from "../components/CursorTrail";
import { ExperienceSection } from "../components/ExperienceSection";
import { HeroSection } from "../components/HeroSection";
import { MeteorShower } from "../components/MeteorShower";
import { Navbar } from "../components/Navbar";
import { ProjectsSection } from "../components/ProjectsSection";
import { SkillsSection } from "../components/SkillsSection";
import { SpaceBackground } from "../components/SpaceBackground";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Wiliam Fagundes - Desenvolvedor Full Stack" },
      {
        name: "description",
        content:
          "Portfólio profissional de Wiliam Fagundes, desenvolvedor Full Stack de Porto Alegre, Brasil. React, TypeScript e Node.js.",
      },
      { property: "og:title", content: "Wiliam Fagundes - Desenvolvedor Full Stack" },
      {
        property: "og:description",
        content: "Portfólio com tema espacial para explorar projetos, experiência e habilidades.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background">
      <SpaceBackground />
      <MeteorShower />
      <CursorTrail />
      <Navbar />

      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
    </div>
  );
}
