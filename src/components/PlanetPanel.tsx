import { motion, AnimatePresence } from "framer-motion";
import type { PlanetId } from "../data/portfolio";
import {
  planets,
  skills,
  experience,
  projects,
  achievements,
  contactLinks,
} from "../data/portfolio";

interface PlanetPanelProps {
  activePlanet: PlanetId | null;
  onClose: () => void;
}

export function PlanetPanel({ activePlanet, onClose }: PlanetPanelProps) {
  const planet = planets.find((p) => p.id === activePlanet);

  return (
    <AnimatePresence>
      {activePlanet && planet && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-lg z-50 overflow-y-auto"
            style={{
              background: "linear-gradient(135deg, rgba(10,10,30,0.97), rgba(15,15,40,0.97))",
              borderLeft: `2px solid ${planet.color}33`,
            }}
          >
            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${planet.image})`,
                      backgroundColor: planet.color,
                      boxShadow: `0 0 15px 5px ${planet.glowColor}`,
                    }}
                  />
                  <div>
                    <h2 className="font-display text-xl font-bold" style={{ color: planet.color }}>
                      {planet.section}
                    </h2>
                    <p className="font-mono text-xs text-muted-foreground">{planet.name}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <PlanetContent planetId={activePlanet} color={planet.color} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function PlanetContent({ planetId, color }: { planetId: PlanetId; color: string }) {
  switch (planetId) {
    case "mercury":
      return <SkillsContent color={color} />;
    case "venus":
      return <ExperienceContent color={color} />;
    case "earth":
      return <ProjectsContent color={color} />;
    case "mars":
      return <TechStackContent color={color} />;
    case "jupiter":
      return <AchievementsContent color={color} />;
    case "saturn":
      return <ContactContent color={color} />;
  }
}

function SectionDivider({ color }: { color: string }) {
  return (
    <div
      className="h-px my-6"
      style={{ background: `linear-gradient(to right, transparent, ${color}44, transparent)` }}
    />
  );
}

function SkillsContent({ color }: { color: string }) {
  return (
    <div className="space-y-6">
      {skills.map((cat) => (
        <div key={cat.category}>
          <h3 className="font-display text-sm font-semibold mb-3" style={{ color }}>
            {cat.category}
          </h3>
          <div className="flex flex-wrap gap-2">
            {cat.items.map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-full text-xs font-mono border bg-secondary/50"
                style={{ borderColor: `${color}33` }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ExperienceContent({ color }: { color: string }) {
  return (
    <div className="space-y-6">
      {experience.map((exp, i) => (
        <div key={i}>
          <div className="flex items-start gap-3 mb-3">
            <div
              className="w-3 h-3 rounded-full mt-1.5 shrink-0"
              style={{ backgroundColor: color }}
            />
            <div>
              <h3 className="font-display font-semibold">{exp.role}</h3>
              <p className="font-mono text-xs text-muted-foreground">
                {exp.company} · {exp.period}
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground ml-6 mb-3">{exp.description}</p>
          <div className="flex flex-wrap gap-2 ml-6">
            {exp.highlights.map((h) => (
              <span key={h} className="px-2 py-1 rounded text-xs font-mono bg-secondary/50">
                {h}
              </span>
            ))}
          </div>
          {i < experience.length - 1 && <SectionDivider color={color} />}
        </div>
      ))}
    </div>
  );
}

function ProjectsContent({ color }: { color: string }) {
  return (
    <div className="space-y-6">
      <p className="text-xs font-mono text-muted-foreground">
        🌍 Earth — The most important planet
      </p>
      {projects.map((proj, i) => (
        <div
          key={i}
          className="rounded-xl border p-4"
          style={{ borderColor: `${color}33`, background: "rgba(255,255,255,0.02)" }}
        >
          <h3 className="font-display text-lg font-bold mb-2" style={{ color }}>
            {proj.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">{proj.description}</p>

          <div className="space-y-3 mb-4">
            <Detail label="Problem" text={proj.problem} />
            <Detail label="Solution" text={proj.solution} />
            <Detail label="Impact" text={proj.impact} />
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {proj.technologies.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded text-[10px] font-mono bg-primary/10 text-primary"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Live preview */}
          <div className="rounded-lg overflow-hidden border border-border mb-3 relative group">
            <div className="aspect-video bg-card">
              <iframe
                src={proj.url}
                title={proj.title}
                className="w-full h-full border-0"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <a
                href={proj.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg font-mono text-xs font-bold text-primary-foreground"
                style={{ backgroundColor: color }}
              >
                View Full Project →
              </a>
            </div>
          </div>

          <a
            href={proj.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs hover:underline"
            style={{ color }}
          >
            Open in new tab ↗
          </a>
        </div>
      ))}
    </div>
  );
}

function Detail({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <span className="font-mono text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
      <p className="text-sm text-foreground/80">{text}</p>
    </div>
  );
}

function TechStackContent({ color }: { color: string }) {
  const stack = [
    { name: "JavaScript", level: 90 },
    { name: "Node.js", level: 85 },
    { name: "React", level: 80 },
    { name: "TypeScript", level: 75 },
    { name: "Supabase", level: 85 },
    { name: "FlutterFlow", level: 80 },
    { name: "N8N", level: 85 },
    { name: "SQL / NoSQL", level: 75 },
    { name: "Git", level: 80 },
    { name: "Docker", level: 30 },
  ];
  return (
    <div className="space-y-4">
      {stack.map((s) => (
        <div key={s.name}>
          <div className="flex justify-between mb-1">
            <span className="font-mono text-xs">{s.name}</span>
            <span className="font-mono text-[10px] text-muted-foreground">{s.level}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: color }}
              initial={{ width: 0 }}
              animate={{ width: `${s.level}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function AchievementsContent({ color }: { color: string }) {
  return (
    <div className="grid gap-4">
      {achievements.map((a, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30"
        >
          <span className="text-2xl">{a.icon}</span>
          <div>
            <h4 className="font-display text-sm font-semibold" style={{ color }}>
              {a.title}
            </h4>
            <p className="text-xs text-muted-foreground">{a.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ContactContent({ color }: { color: string }) {
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Saturn's rings represent the connections that link us. Let's connect!
      </p>
      <div className="space-y-3">
        {contactLinks.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl border transition-all hover:scale-[1.02]"
            style={{ borderColor: `${color}33` }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${color}22` }}
            >
              <span style={{ color }} className="text-lg">
                {link.icon === "github" ? "⌨" : link.icon === "linkedin" ? "💼" : "✉"}
              </span>
            </div>
            <div>
              <p className="font-display font-semibold text-sm">{link.label}</p>
              <p className="font-mono text-[10px] text-muted-foreground">{link.url}</p>
            </div>
          </a>
        ))}
      </div>

      <SectionDivider color={color} />

      <div className="text-center space-y-2">
        <p className="font-display text-lg font-bold" style={{ color }}>
          Wiliam Fagundes
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          Full Stack Developer · Porto Alegre, Brazil
        </p>
        <div className="flex justify-center gap-2 mt-3">
          <span className="px-2 py-1 rounded text-[10px] font-mono bg-secondary/50">
            🇧🇷 Portuguese
          </span>
          <span className="px-2 py-1 rounded text-[10px] font-mono bg-secondary/50">
            🇺🇸 English
          </span>
          <span className="px-2 py-1 rounded text-[10px] font-mono bg-secondary/50">
            🇪🇸 Spanish
          </span>
        </div>
      </div>
    </div>
  );
}
