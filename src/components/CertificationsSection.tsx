import { motion } from "framer-motion";
import { achievements } from "../data/portfolio";

export function CertificationsSection() {
  return (
    <section id="certificados" className="py-20 relative">
      <div className="section-glow-line mb-20 bg-gradient-to-r from-orange-400/20 to-yellow-400/20" />
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-display font-bold text-center mb-4 bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent"
        >
          Formação & Certificados
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto text-lg"
        >
          Formado na Fundação Tênis, Geração Caldeira e múltiplos cursos Alura.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, i) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 rounded-xl text-center group hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 border border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-yellow-500/5"
            >

              <motion.div 
                className="w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-orange-400/30 group-hover:scale-110 transition-all duration-500"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <img 
                  src={`/images/planets/p-${achievement.title.toLowerCase().replace(/ /g, '-')}.png`} 
                  alt={achievement.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <h3 className="text-xl font-display font-bold text-primary mb-3 leading-tight">
                {achievement.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {achievement.description}
              </p>
              <div className="flex flex-col gap-2">
                <span className="text-xs bg-gradient-to-r from-orange-400/20 to-yellow-400/20 text-orange-400 px-3 py-1 rounded-full font-mono uppercase tracking-wider">
                  Fundação Tênis
                </span>
                <span className="text-xs bg-gradient-to-r from-emerald-400/20 to-blue-400/20 text-emerald-400 px-3 py-1 rounded-full font-mono uppercase tracking-wider">
                  Geração Caldeira
                </span>
                <span className="text-xs bg-gradient-to-r from-purple-400/20 to-pink-400/20 text-purple-400 px-3 py-1 rounded-full font-mono uppercase tracking-wider">
                  Alura
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16 p-8 bg-gradient-to-r from-orange-500/5 to-yellow-500/5 rounded-2xl border border-orange-500/10 backdrop-blur-sm"
        >
          <h3 className="text-2xl font-display font-bold text-primary mb-4">
            +20 Cursos Concluídos
          </h3>
          <p className="text-muted-foreground mb-6">
            Especializações em React, Node.js, TypeScript, Supabase e Desenvolvimento Full Stack
          </p>
          <div className="flex justify-center gap-4 text-sm font-mono text-orange-400">
            <span>React Complete</span>
            <span>Node.js Expert</span>
            <span>Supabase</span>
            <span>Git Advanced</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

