import { motion } from "framer-motion";
import { projects } from "../data/portfolio";
import { ProjectPreview } from "./ProjectPreview";

export function ProjectsSection() {
  return (
    <section id="projetos" className="py-20 relative">
      <div className="section-glow-line mb-20" />
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-display font-bold text-center mb-4 neon-gradient-text"
        >
          Projetos em Destaque
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-muted-foreground mb-12 max-w-xl mx-auto"
        >
          Explore alguns dos meus projetos mais interessantes.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-lg overflow-hidden flex flex-col h-96 hover:shadow-2xl transition-all duration-300"
            >
              {/* Live Preview with screenshot fallback */}
              <ProjectPreview url={project.url} title={project.title} />

              {/* Content */}
              <div className="p-4 flex flex-col flex-grow space-y-2">
                <h3 className="text-lg font-display font-bold text-primary line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Problem / Solution / Impact - Compact */}
                <div className="space-y-1 text-xs">
                  <DetailRow label="💡 Solução" text={project.solution} />
                  <DetailRow label="📈 Impacto" text={project.impact} />
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs font-mono font-medium rounded border border-accent/30 text-accent bg-accent/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto pt-2 pb-1 border-t border-border/50 pt-3"
                >
                  <span className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                    Ver Projeto → 
                  </span>
                </a>
              </div>
            </motion.article>
          ))}  
        </div>
      </div>
    </section>
  );
}

function DetailRow({ label, text }: { label: string; text: string }) {
  return (
    <div className="space-y-0.5">
      <span className="font-mono text-[10px] font-bold text-primary/70 uppercase tracking-wider">
        {label}
      </span>
      <p className="text-[11px] text-foreground/80 leading-tight line-clamp-2">{text}</p>
    </div>
  );
}

