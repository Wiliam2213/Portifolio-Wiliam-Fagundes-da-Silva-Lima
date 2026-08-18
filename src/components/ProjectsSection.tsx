import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { planets, projects, profile } from "../data/portfolio";
import { ProjectPreview } from "./ProjectPreview";
import { SectionDivider } from "./SectionDivider";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.78, y: 50, filter: "blur(8px)" },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function ProjectsSection() {
  return (
    <section id="projetos" className="relative py-20 md:py-28 overflow-hidden">
      <SectionDivider className="mb-16 md:mb-20" />
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="neon-gradient-text text-center font-display text-3xl font-bold sm:text-4xl md:text-5xl"
        >
          Projetos em Destaque
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-4 mb-12 max-w-xl text-center text-sm text-muted-foreground sm:text-base"
        >
          Preview ao vivo dos sites em produção — carregados em tempo real direto da web.
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2"
        >
          {projects.map((project, i) => {
            const planet = planets[i % planets.length];
            return (
              <motion.article
                key={project.title}
                variants={item}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  boxShadow: `0 20px 60px -20px ${planet.glowColor}, 0 0 30px -5px ${planet.glowColor}`,
                }}
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
                className="group/preview glass-card flex flex-col overflow-hidden rounded-xl"
                style={{ borderColor: `${planet.color}22` }}
              >
                <ProjectPreview url={project.url} title={project.title} />

                <div className="flex flex-grow flex-col gap-3 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg font-bold text-primary">{project.title}</h3>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Abrir ${project.title}`}
                      className="shrink-0 rounded-md border border-border/60 p-1.5 text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="grid gap-2">
                    <Detail label="Solução" text={project.solution} />
                    <Detail label="Impacto" text={project.impact} />
                  </div>

                  <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-accent/30 bg-accent/5 px-2 py-0.5 font-mono text-[11px] font-medium text-accent"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border/70 px-5 py-3 font-display text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-[0_0_25px_-5px_rgba(0,217,255,0.5)]"
          >
            <Github className="h-4 w-4" />
            Ver mais no GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Detail({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-md border-l-2 border-primary/40 bg-secondary/30 px-3 py-2">
      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary/80">
        {label}
      </span>
      <p className="text-xs leading-snug text-foreground/80">{text}</p>
    </div>
  );
}
