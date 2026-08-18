import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { PlanetId } from "../data/portfolio";
import { Planet3D } from "./Planet3D";

interface FloatingPlanet {
  id: PlanetId;
  size: number;
  x: number;
  y: number;
  color: string;
  glow: string;
  duration: number;
  delay: number;
  hasRing?: boolean;
}

interface FloatingPlanetsProps {
  variant?: "fixed" | "section";
  planetIds?: PlanetId[];
  className?: string;
  opacity?: number;
}

const planetConfigs: FloatingPlanet[] = [
  {
    id: "mercury",
    size: 24,
    x: 8,
    y: 15,
    color: "#c4a35a",
    glow: "rgba(196,163,90,0.35)",
    duration: 18,
    delay: 0,
  },
  {
    id: "venus",
    size: 36,
    x: 88,
    y: 25,
    color: "#e8c468",
    glow: "rgba(232,196,104,0.35)",
    duration: 22,
    delay: 2,
  },
  {
    id: "earth",
    size: 40,
    x: 12,
    y: 55,
    color: "#4a9eff",
    glow: "rgba(74,158,255,0.4)",
    duration: 20,
    delay: 1,
  },
  {
    id: "mars",
    size: 28,
    x: 92,
    y: 65,
    color: "#e05533",
    glow: "rgba(224,85,51,0.35)",
    duration: 24,
    delay: 3,
  },
  {
    id: "jupiter",
    size: 60,
    x: 85,
    y: 85,
    color: "#d4a574",
    glow: "rgba(212,165,116,0.3)",
    duration: 30,
    delay: 4,
  },
  {
    id: "saturn",
    size: 48,
    x: 6,
    y: 88,
    color: "#e8d5a3",
    glow: "rgba(232,213,163,0.3)",
    duration: 28,
    delay: 2,
    hasRing: true,
  },
];

export function FloatingPlanets({
  variant = "fixed",
  planetIds,
  className,
  opacity = 0.5,
}: FloatingPlanetsProps) {
  const [scrollY, setScrollY] = useState(0);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const sectionTopRef = useRef(0);

  const visible = planetIds ? planetConfigs.filter((p) => planetIds.includes(p.id)) : planetConfigs;

  useEffect(() => {
    const measure = () => {
      const rect = wrapRef.current?.getBoundingClientRect();
      sectionTopRef.current = (rect?.top ?? 0) + window.scrollY;
    };
    const onScroll = () => setScrollY(window.scrollY);
    const onResize = () => {
      measure();
      setScrollY(window.scrollY);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", measure);
    };
  }, []);

  const parallaxFactor = variant === "section" ? 0.045 : 0.03;

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={
        variant === "fixed"
          ? `fixed inset-0 pointer-events-none z-[1] overflow-hidden ${className ?? ""}`
          : `absolute inset-0 pointer-events-none z-0 overflow-hidden ${className ?? ""}`
      }
    >
      {visible.map((planet) => {
        const baseY = scrollY - (variant === "section" ? sectionTopRef.current : 0);
        const offsetY = baseY * parallaxFactor * (planet.duration / 20);
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
              className="animate-orbit-drift-wide"
              style={{
                animationDuration: `${planet.duration * 0.65}s`,
                animationDelay: `${-planet.delay * 0.5}s`,
              }}
            >
              {/* Decorative orbit path */}
              <div
                className="absolute rounded-full border pointer-events-none"
                style={{
                  width: planet.size * 3.4,
                  height: planet.size * 1.5,
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%) rotateX(72deg) rotate(18deg)",
                  borderColor: `${planet.color}1f`,
                  borderWidth: 1,
                }}
              />
              <div
                className="animate-float-slow"
                style={{
                  animationDuration: `${planet.duration}s`,
                  animationDelay: `${planet.delay}s`,
                }}
              >
                <div
                  className="absolute rounded-full animate-glow-breathing pointer-events-none"
                  style={{
                    left: "50%",
                    top: "50%",
                    width: planet.size * 2.2,
                    height: planet.size * 2.2,
                    transform: "translate(-50%, -50%)",
                    background: `radial-gradient(circle, ${planet.glow} 0%, transparent 65%)`,
                    animationDuration: `${planet.duration * 0.45}s`,
                  }}
                />
                <Planet3D
                  size={planet.size}
                  color={planet.color}
                  glow={planet.glow}
                  image={`/images/planets/p-${planet.id}.png`}
                  spinDuration={planet.duration * 2.2}
                  ring={planet.hasRing}
                  opacity={opacity}
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
