import { motion } from "framer-motion";
import { experience } from "../data/portfolio";

export function ExperienceSection() {
  return (
    <section id="experiencia" className="py-24 relative">
      <div className="section-glow-line mb-24" />
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-display font-bold text-center mb-4 neon-gradient-text"
        >
          Experiência
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-muted-foreground mb-16 max-w-xl mx-auto"
        >
          Minha trajetória profissional e background diversificado.
        </motion.p>

        <div className="space-y-0">
          {experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex gap-6 mb-10 last:mb-0"
            >
              {/* Timeline marker */}
              <div className="flex flex-col items-center shrink-0">
                <div
                  className="w-4 h-4 rounded-full border-2 border-background mt-2"
                  style={{
                    background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                    boxShadow: "0 0 12px rgba(0,217,255,0.5)",
                  }}
                />
                {i < experience.length - 1 && (
                  <div className="w-0.5 flex-1 mt-2 bg-gradient-to-b from-primary/40 to-transparent" />
                )}
              </div>

              {/* Content */}
              <div className="glass-card rounded-xl p-6 flex-grow">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-display font-bold text-lg text-foreground">{exp.role}</h3>
                    <p className="text-primary text-sm font-medium">{exp.company}</p>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full self-start">
                    {exp.period}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.highlights.map((h) => (
                    <span
                      key={h}
                      className="px-2.5 py-1 text-xs font-medium rounded-md bg-primary/8 text-primary border border-primary/20"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-center text-primary font-display font-semibold text-xl mb-8">Conquistas & Diferenciais</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: "🚀", title: "Sole Developer", desc: "Construindo sistemas em produção na Mercado Net Zero" },
              { icon: "🤝", title: "Reporte Direto ao CTO", desc: "Decisões técnicas estratégicas diretamente com a liderança" },
              { icon: "🌍", title: "3 Idiomas", desc: "Português (nativo), Inglês e Espanhol (intermediário)" },
              { icon: "🎤", title: "Palestrante", desc: "Voluntário e palestrante, compartilhando conhecimento" },
              { icon: "💡", title: "Empreendedor", desc: "Fundou negócio de alimentação, visão de negócios" },
              { icon: "⚡", title: "Autodidata", desc: "Aprendizado contínuo e adaptação a novas tecnologias" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card rounded-xl p-5 flex items-start gap-3"
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h4 className="font-display font-semibold text-sm text-primary">{item.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
