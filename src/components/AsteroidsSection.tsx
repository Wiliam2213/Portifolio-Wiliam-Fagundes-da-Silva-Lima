import { motion } from "framer-motion";
import { AsteroidsGame } from "./AsteroidsGame";
import { FloatingPlanets } from "./FloatingPlanets";
import { SectionDivider } from "./SectionDivider";

export function AsteroidsSection() {
  return (
    <section id="arcade" className="py-24 relative overflow-hidden">
      <SectionDivider className="mb-24" />
      <FloatingPlanets variant="section" planetIds={["mars", "mercury"]} opacity={0.28} />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-display font-bold text-center mb-4 neon-gradient-text"
        >
          Arcade
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-muted-foreground mb-12 max-w-xl mx-auto"
        >
          Um clássico Asteroids feito em canvas puro. Desvie das rochas, destrua tudo e bata o
          recorde.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <AsteroidsGame />
        </motion.div>
      </div>
    </section>
  );
}
