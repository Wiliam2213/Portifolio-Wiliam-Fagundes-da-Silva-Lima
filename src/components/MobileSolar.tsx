import { motion } from "framer-motion";
import type { PlanetId } from "../data/portfolio";
import { planets } from "../data/portfolio";

interface MobileSolarProps {
  onPlanetClick: (id: PlanetId) => void;
}

export function MobileSolar({ onPlanetClick }: MobileSolarProps) {
  return (
    <div className="min-h-screen px-4 py-20 relative z-10">
      {/* Sun / Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div
          className="w-24 h-24 rounded-full mx-auto mb-6"
          style={{
            background: "radial-gradient(circle, #fff7d4 0%, #ffb347 40%, #ff6b00 70%, transparent 100%)",
            boxShadow: "0 0 40px 15px rgba(255,179,71,0.4), 0 0 80px 30px rgba(255,107,0,0.2)",
          }}
        />
        <h1 className="font-display text-3xl font-bold text-foreground">Wiliam Fagundes</h1>
        <p className="font-mono text-sm text-muted-foreground mt-2">Full Stack Developer · Porto Alegre, Brazil</p>
      </motion.div>

      {/* Planet cards */}
      <div className="max-w-sm mx-auto space-y-4">
        {planets.map((planet, i) => (
          <motion.button
            key={planet.id}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i }}
            onClick={() => onPlanetClick(planet.id)}
            className="w-full flex items-center gap-4 p-4 rounded-xl border transition-all hover:scale-[1.02] text-left"
            style={{ borderColor: `${planet.color}33`, background: "rgba(255,255,255,0.03)" }}
          >
            <div
              className="w-12 h-12 rounded-full shrink-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${planet.image})`,
                backgroundColor: planet.color,
                boxShadow: `0 0 12px 4px ${planet.glowColor}`,
              }}
            />
            <div>
              <p className="font-display font-bold" style={{ color: planet.color }}>{planet.section}</p>
              <p className="font-mono text-[10px] text-muted-foreground">{planet.name}</p>
            </div>
            <span className="ml-auto text-muted-foreground">→</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
