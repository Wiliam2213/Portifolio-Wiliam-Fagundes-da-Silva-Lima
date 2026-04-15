import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { StarField } from "../components/StarField";
import { SolarSystem } from "../components/SolarSystem";
import { PlanetPanel } from "../components/PlanetPanel";
import { MobileSolar } from "../components/MobileSolar";
import { useIsMobile } from "../hooks/use-mobile";
import type { PlanetId } from "../data/portfolio";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Wiliam Fagundes — Full Stack Developer Portfolio" },
      { name: "description", content: "Interactive solar system portfolio of Wiliam Fagundes. Full Stack Developer from Porto Alegre, Brazil." },
      { property: "og:title", content: "Wiliam Fagundes — Full Stack Developer" },
      { property: "og:description", content: "Explore my universe — an interactive solar system portfolio." },
    ],
  }),
});

function Index() {
  const [activePlanet, setActivePlanet] = useState<PlanetId | null>(null);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <StarField />

      {/* Navigation hint */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <p className="font-mono text-[10px] text-muted-foreground/60 tracking-widest uppercase">
          Click a planet to explore
        </p>
      </div>

      {isMobile ? (
        <MobileSolar onPlanetClick={setActivePlanet} />
      ) : (
        <div className="w-screen h-screen flex items-center justify-center relative z-10">
          <div className="w-[960px] h-[960px] max-w-[95vw] max-h-[95vh] relative">
            <SolarSystem
              onPlanetClick={setActivePlanet}
              activePlanet={activePlanet}
            />
          </div>
        </div>
      )}

      <PlanetPanel
        activePlanet={activePlanet}
        onClose={() => setActivePlanet(null)}
      />
    </div>
  );
}
