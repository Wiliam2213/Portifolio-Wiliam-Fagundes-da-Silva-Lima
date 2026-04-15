import { motion } from "framer-motion";

const softSkills = ["Proatividade", "Escuta Ativa", "Inteligência Emocional", "Calma", "Adaptabilidade", "Curiosidade"];

export function AboutSection() {
  return (
    <section id="sobre" className="py-24 relative">
      <div className="section-glow-line mb-24" />
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-display font-bold text-center mb-4 neon-gradient-text"
        >
          Sobre Mim
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-muted-foreground mb-16 max-w-xl mx-auto"
        >
          Desenvolvedor Júnior apaixonado por inovação
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <p className="text-muted-foreground leading-relaxed">
              Sou um desenvolvedor júnior apaixonado por tecnologia e inovação. Com 20 anos, estou em uma jornada contínua de aprendizado e crescimento profissional.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Atualmente trabalho na <strong className="text-primary font-semibold">Mercado Net Zero</strong>, desenvolvendo uma plataforma white label para compra e gestão de certificados de créditos de carbono. Minha experiência inclui frontend, backend e organização de dados.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Possuo um perfil proativo, calmo sob pressão, com boa comunicação e aprendizado contínuo. Sou adaptável a diferentes ambientes e sempre buscando novos desafios.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Experience card */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-primary font-display font-semibold text-lg mb-4">Experiência</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-foreground">Desenvolvedor Júnior</p>
                  <p className="text-primary text-sm">Mercado Net Zero</p>
                  <p className="text-muted-foreground text-sm">Plataforma de créditos de carbono</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Aprendiz Desenvolvedor</p>
                  <p className="text-primary text-sm">Beta-Hauss</p>
                  <p className="text-muted-foreground text-sm">Primeiros passos na programação</p>
                </div>
              </div>
            </div>

            {/* Soft skills card */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-primary font-display font-semibold text-lg mb-4">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-medium rounded-md border border-primary/30 text-primary bg-primary/5
                      hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
