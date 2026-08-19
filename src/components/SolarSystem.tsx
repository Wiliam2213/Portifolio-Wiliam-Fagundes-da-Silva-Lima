import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PlanetData, PlanetId } from "../data/portfolio";
import { planets } from "../data/portfolio";
import { Planet3D } from "./Planet3D";

interface SolarSystemProps {
  onPlanetClick: (id: PlanetId) => void;
  activePlanet: PlanetId | null;
  showSunLabel?: boolean;
  className?: string;
}

/** tilt of the orbital plane, in degrees */
const PLANE_TILT = 62;

export function SolarSystem({
  onPlanetClick,
  activePlanet,
  showSunLabel = true,
  className,
}: SolarSystemProps) {
  const [hoveredPlanet, setHoveredPlanet] = useState<PlanetId | null>(null);

  const centerX = 50;
  const centerY = 50;

  return (
    <div
      className={`relative w-full h-full overflow-hidden pointer-events-none ${
        className ?? ""
      }`}
      style={{ perspective: "1400px", perspectiveOrigin: "50% 42%" }}
    >
      {/* Sun corona */}
      <div
        className="absolute rounded-full animate-glow-breathing pointer-events-none"
        style={{
          left: `${centerX}%`,
          top: `${centerY}%`,
          width: 320,
          height: 320,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(255,180,80,0.28) 0%, rgba(255,110,0,0.12) 40%, transparent 70%)",
          zIndex: 5,
        }}
      />
      {/* Sun */}
      <div
        className="absolute rounded-full animate-float"
        style={{
          left: `${centerX}%`,
          top: `${centerY}%`,
          width: 84,
          height: 84,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle at 42% 40%, #fffdf0 0%, #ffe08a 24%, #ffb347 52%, #ff6b00 78%, #b83200 100%)",
          boxShadow:
            "0 0 70px 24px rgba(255,179,71,0.55), 0 0 140px 60px rgba(255,107,0,0.3), 0 0 240px 100px rgba(255,60,0,0.15)",
          zIndex: 10,
        }}
      />

      {showSunLabel && (
        <div
          className="absolute text-center pointer-events-none"
          style={{
            left: `${centerX}%`,
            top: `${centerY}%`,
            transform: "translate(-50%, 56px)",
            zIndex: 11,
          }}
        >
          <p className="font-display text-sm font-bold text-accent">Wiliam Fagundes</p>
          <p className="font-mono text-[10px] text-muted-foreground">Full Stack Developer</p>
        </div>
      )}

      {planets.map((planet) => (
        <OrbitRing
          key={planet.id}
          planet={planet}
          centerX={centerX}
          centerY={centerY}
          isHovered={hoveredPlanet === planet.id}
          isActive={activePlanet === planet.id}
          dimmed={hoveredPlanet !== null && hoveredPlanet !== planet.id}
          onHover={setHoveredPlanet}
          onClick={onPlanetClick}
        />
      ))}
    </div>
  );
}

interface OrbitRingProps {
  planet: PlanetData;
  centerX: number;
  centerY: number;
  isHovered: boolean;
  isActive: boolean;
  dimmed: boolean;
  onHover: (id: PlanetId | null) => void;
  onClick: (id: PlanetId) => void;
}

function OrbitRing({
  planet,
  centerX,
  centerY,
  isHovered,
  isActive,
  dimmed,
  onHover,
  onClick,
}: OrbitRingProps) {
  const orbitSize = planet.orbitRadius * 2;
  const focused = isHovered || isActive;
  const duration = planet.orbitDuration * 1.44;

  return (
    <div
      className="absolute orbit-plane"
      style={{
        left: `${centerX}%`,
        top: `${centerY}%`,
        width: orbitSize,
        height: orbitSize,
        transform: `translate(-50%, -50%) rotateX(${PLANE_TILT}deg)`,
        zIndex: 20 + planets.indexOf(planet),
      }}
    >
      {/* Orbit path */}
      <div
        className="absolute inset-0 rounded-full border pointer-events-none"
        style={{
          borderColor: focused ? `${planet.color}66` : "rgba(255,255,255,0.07)",
          boxShadow: focused ? `0 0 24px ${planet.glowColor}` : "none",
          transition: "border-color .3s, box-shadow .3s",
        }}
      />

      {/* Revolving arm */}
      <div
        className="absolute inset-0"
        style={{
          animation: `orbit ${duration}s linear infinite`,
          animationPlayState: focused ? "paused" : "running",
          transformStyle: "preserve-3d",
        }}
      >
        <motion.button
          className="absolute cursor-pointer pointer-events-auto"
          style={{
            left: "50%",
            top: 0,
            width: planet.size,
            height: planet.size,
            transform: "translate(-50%, -50%)",
            transformStyle: "preserve-3d",
          }}
          aria-label={`${planet.name}: ${planet.section}`}
          whileHover={{ scale: 1.45 }}
          animate={{ scale: focused ? 1.45 : 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => onHover(planet.id)}
          onHoverEnd={() => onHover(null)}
          onFocus={() => onHover(planet.id)}
          onBlur={() => onHover(null)}
          onClick={() => onClick(planet.id)}
        >
          {/* counter-rotate the orbital revolution */}
          <div
            style={{
              width: "100%",
              height: "100%",
              animation: `orbit ${duration}s linear infinite reverse`,
              animationPlayState: focused ? "paused" : "running",
              transformStyle: "preserve-3d",
            }}
          >
            {/* stand the planet back up out of the orbital plane */}
            <div
              className="relative"
              style={{
                width: "100%",
                height: "100%",
                transform: `rotateX(-${PLANE_TILT}deg)`,
                opacity: dimmed ? 0.55 : 1,
                transition: "opacity .3s",
              }}
            >
              <Planet3D
                size={planet.size}
                color={planet.color}
                glow={planet.glowColor}
                image={planet.image}
                spinDuration={planet.orbitDuration * (focused ? 0.7 : 1.6)}
                ring={planet.id === "saturn"}
                highlighted={focused}
              />

              <AnimatePresence>
                {focused && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute left-1/2 whitespace-nowrap pointer-events-none"
                    style={{ top: planet.size + 10, transform: "translateX(-50%)" }}
                  >
                    <p
                      className="font-mono text-[10px] font-bold"
                      style={{ color: planet.color }}
                    >
                      {planet.name}
                    </p>
                    <p className="font-mono text-[9px] text-muted-foreground text-center">
                      {planet.section}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.button>
      </div>
    </div>
  );
}
