import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FloatingPlanet {
  id: string;
  size: number;
  x: number;
  y: number;
  color: string;
  glow: string;
  duration: number;
  delay: number;
  hasRing?: boolean;
}

const planetConfigs: FloatingPlanet[] = [
  { id: "mercury", size: 24, x: 8, y: 15, color: "#c4a35a", glow: "rgba(196,163,90,0.35)", duration: 18, delay: 0 },
  { id: "venus", size: 36, x: 88, y: 25, color: "#e8c468", glow: "rgba(232,196,104,0.35)", duration: 22, delay: 2 },
  { id: "earth", size: 40, x: 12, y: 55, color: "#4a9eff", glow: "rgba(74,158,255,0.4)", duration: 20, delay: 1 },
  { id: "mars", size: 28, x: 92, y: 65, color: "#e05533", glow: "rgba(224,85,51,0.35)", duration: 24, delay: 3 },
  { id: "jupiter", size: 60, x: 85, y: 85, color: "#d4a574", glow: "rgba(212,165,116,0.3)", duration: 30, delay: 4 },
  { id: "saturn", size: 48, x: 6, y: 88, color: "#e8d5a3", glow: "rgba(232,213,163,0.3)", duration: 28, delay: 2, hasRing: true },
];

export function FloatingPlanets() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const parallaxFactor = 0.03;

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {planetConfigs.map((planet) => {
        const offsetY = scrollY * parallaxFactor * (planet.duration / 20);
        return (
          <motion.div
            key={planet.id}
            className="absolute"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: planet.delay * 0.3 }}
            style={{
              left: `${planet.x}%`,
              top: `${planet.y}%`,
              transform: `translateY(${-offsetY}px)`,
            }}
          >
            <div
              className="animate-float-slow"
              style={{ animationDuration: `${planet.duration}s`, animationDelay: `${planet.delay}s` }}
            >
              <div
                className="rounded-full"
                style={{
                  width: planet.size,
                  height: planet.size,
                  background: `radial-gradient(circle at 35% 35%, ${planet.color}ee, ${planet.color}88 50%, ${planet.color}44 100%)`,
                  boxShadow: `0 0 ${planet.size * 0.6}px ${planet.size * 0.2}px ${planet.glow}`,
                  opacity: 0.5,
                }}
              />
              {planet.hasRing && (
                <div
                  className="absolute rounded-full border pointer-events-none"
                  style={{
                    width: planet.size * 1.8,
                    height: planet.size * 0.45,
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%) rotateX(70deg)",
                    borderColor: `${planet.color}44`,
                    borderWidth: 1.5,
                  }}
                />
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
