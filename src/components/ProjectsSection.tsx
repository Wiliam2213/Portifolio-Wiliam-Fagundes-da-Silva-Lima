import { motion } from "framer-motion";
import { projects } from "../data/portfolio";

export function ProjectsSection() {
  return (
    <section id="projetos" className="py-24 relative">
      <div className="section-glow-line mb-24" />
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
          className="text-center text-muted-foreground mb-16 max-w-xl mx-auto"
        >
          Explore alguns dos meus projetos mais interessantes, com foco em qualidade, performance e
          experiência do usuário.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card rounded-xl overflow-hidden flex flex-col"
            >
              {/* Preview */}
              <div className="relative group aspect-video bg-card overflow-hidden">
                <iframe
                  src={project.url}
                  title={project.title}
                  className="w-full h-full border-0 scale-100 group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-lg font-display font-semibold text-sm
                      bg-gradient-to-r from-primary to-accent text-primary-foreground
                      hover:shadow-[0_0_30px_rgba(0,217,255,0.4)] transition-all duration-300"
                  >
                    Ver Projeto →
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-display font-bold text-primary mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">
                  {project.description}
                </p>

                {/* Problem / Solution / Impact */}
                <div className="space-y-3 mb-5">
                  <DetailRow label="Problema" text={project.problem} />
                  <DetailRow label="Solução" text={project.solution} />
                  <DetailRow label="Impacto" text={project.impact} />
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[11px] font-mono font-medium rounded border border-accent/30 text-accent bg-accent/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-lg text-center text-sm font-semibold
                      border border-primary/30 text-primary bg-primary/5
                      hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                  >
                    Ver ao Vivo
                  </a>
                </div>
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
    <div>
      <span className="font-mono text-[10px] font-bold text-primary/60 uppercase tracking-widest">
        {label}
      </span>
      <p className="text-sm text-foreground/75 leading-relaxed">{text}</p>
    </div>
  );
}
