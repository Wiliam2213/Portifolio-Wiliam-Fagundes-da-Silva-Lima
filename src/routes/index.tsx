import { createFileRoute } from "@tanstack/react-router";
import { StarField } from "../components/StarField";
import { FloatingPlanets } from "../components/FloatingPlanets";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { ContactSection } from "../components/ContactSection";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Wiliam Fagundes — Desenvolvedor Full Stack" },
      { name: "description", content: "Portfólio profissional de Wiliam Fagundes — Desenvolvedor Full Stack de Porto Alegre, Brasil. React, TypeScript, Node.js." },
      { property: "og:title", content: "Wiliam Fagundes — Desenvolvedor Full Stack" },
      { property: "og:description", content: "Portfólio com tema espacial. Explore meus projetos e habilidades." },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background relative">
      <StarField />
      <FloatingPlanets />
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
