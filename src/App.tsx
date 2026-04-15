import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { FloatingPlanets } from "./components/FloatingPlanets";
import { HeroSection } from "./components/HeroSection";
import { Navbar } from "./components/Navbar";
import { ProjectsSection } from "./components/ProjectsSection";
import { SkillsSection } from "./components/SkillsSection";
import { StarField } from "./components/StarField";
import "./styles.css";

export default function App() {
  return (
    <>
      <div className="relative min-h-screen bg-background">
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
    </>
  );
}

