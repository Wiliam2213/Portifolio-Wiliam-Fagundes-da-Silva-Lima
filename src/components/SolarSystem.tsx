import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PlanetData, PlanetId } from "../data/portfolio";
import { planets } from "../data/portfolio";

interface SolarSystemProps {
  onPlanetClick: (id: PlanetId) => void;
  activePlanet: PlanetId | null;
}

export function SolarSystem({ onPlanetClick, activePlanet }: SolarSystemProps) {
  const [hoveredPlanet, setHoveredPlanet] = useState<PlanetId | null>(null);

  const centerX = 50; // percentage
  const centerY = 50;

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Sun */}
      <div
        className="absolute rounded-full animate-float"
        style={{
          left: `${centerX}%`,
          top: `${centerY}%`,
          width: 80,
          height: 80,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, #fff7d4 0%, #ffb347 40%, #ff6b00 70%, transparent 100%)",
          boxShadow: "0 0 60px 20px rgba(255,179,71,0.5), 0 0 120px 50px rgba(255,107,0,0.3), 0 0 200px 80px rgba(255,60,0,0.15)",
          zIndex: 10,
        }}
      />
      {/* Sun label */}
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

      {/* Orbits and planets */}
      {planets.map((planet) => (
        <OrbitRing
          key={planet.id}
          planet={planet}
          centerX={centerX}
          centerY={centerY}
          isHovered={hoveredPlanet === planet.id}
          isActive={activePlanet === planet.id}
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
  onHover: (id: PlanetId | null) => void;
  onClick: (id: PlanetId) => void;
}

function OrbitRing({ planet, centerX, centerY, isHovered, isActive, onHover, onClick }: OrbitRingProps) {
  const orbitSize = planet.orbitRadius * 2;

  return (
    <>
      {/* Orbit path */}
      <div
        className="absolute rounded-full border pointer-events-none"
        style={{
          left: `${centerX}%`,
          top: `${centerY}%`,
          width: orbitSize,
          height: orbitSize,
          transform: "translate(-50%, -50%)",
          borderColor: isHovered || isActive ? `${planet.color}44` : "rgba(255,255,255,0.08)",
          transition: "border-color 0.3s",
        }}
      />

      {/* Planet on orbit */}
      <div
        className="absolute"
        style={{
          left: `${centerX}%`,
          top: `${centerY}%`,
          width: orbitSize,
          height: orbitSize,
          transform: "translate(-50%, -50%)",
          animation: `orbit ${planet.orbitDuration}s linear infinite`,
          animationPlayState: isActive ? "paused" : "running",
          zIndex: 20 + planets.indexOf(planet),
        }}
      >
        {/* Planet body - positioned at top center of orbit */}
        <motion.button
          className="absolute cursor-pointer group"
          style={{
            left: "50%",
            top: 0,
            width: planet.size,
            height: planet.size,
            transform: "translate(-50%, -50%)",
          }}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => onHover(planet.id)}
          onHoverEnd={() => onHover(null)}
          onClick={() => onClick(planet.id)}
        >
          {/* Counter-rotate so planet doesn't spin */}
          <div
            style={{
              width: "100%",
              height: "100%",
              animation: `orbit ${planet.orbitDuration}s linear infinite reverse`,
              animationPlayState: isActive ? "paused" : "running",
            }}
          >
            <div
              className="w-full h-full rounded-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${planet.image})`,
                backgroundColor: planet.color,
                boxShadow: isHovered || isActive
                  ? `0 0 20px 8px ${planet.glowColor}, 0 0 40px 16px ${planet.glowColor}`
                  : `0 0 10px 3px ${planet.glowColor}`,
                transition: "box-shadow 0.3s",
              }}
            />
            {/* Saturn ring */}
            {planet.id === "saturn" && (
              <div
                className="absolute rounded-full border-2 pointer-events-none"
                style={{
                  width: planet.size * 1.8,
                  height: planet.size * 0.5,
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%) rotateX(70deg)",
                  borderColor: "rgba(232,213,163,0.5)",
                }}
              />
            )}
            {/* Label */}
            <AnimatePresence>
              {(isHovered || isActive) && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute left-1/2 whitespace-nowrap pointer-events-none"
                  style={{
                    top: planet.size + 8,
                    transform: "translateX(-50%)",
                  }}
                >
                  <p className="font-mono text-[10px] font-bold" style={{ color: planet.color }}>
                    {planet.name}
                  </p>
                  <p className="font-mono text-[9px] text-muted-foreground text-center">
                    {planet.section}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      </div>
    </>
  );
}
