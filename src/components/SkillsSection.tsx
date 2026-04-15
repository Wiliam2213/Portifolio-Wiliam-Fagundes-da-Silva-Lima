import { motion } from "framer-motion";

const skillCategories = [
  {
    icon: "🎨",
    title: "Frontend",
    skills: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Next.js"],
  },
  {
    icon: "⚙️",
    title: "Backend",
    skills: ["Node.js", "Express", "REST APIs", "Supabase", "Python"],
  },
  {
    icon: "🗄️",
    title: "Databases",
    skills: ["PostgreSQL", "NoSQL", "Supabase", "SQL"],
  },
  {
    icon: "🔧",
    title: "Ferramentas",
    skills: ["Git", "FlutterFlow", "N8N", "Docker", "VS Code"],
  },
  {
    icon: "🤖",
    title: "Automação & AI",
    skills: ["N8N Workflows", "API Integration", "AI/ML", "Data Analysis"],
  },
  {
    icon: "⚡",
    title: "Performance",
    skills: ["Otimização", "SEO", "Web Vitals", "Code Splitting"],
  },
];

const proficiency = [
  { label: "React, TypeScript, Tailwind CSS", level: 90, title: "Muito Proficiente" },
  { label: "Node.js, Supabase, N8N", level: 85, title: "Proficiente" },
  { label: "FlutterFlow, SQL, APIs", level: 75, title: "Competente" },
  { label: "Docker, Python, DevOps", level: 40, title: "Aprendendo" },
];

export function SkillsSection() {
  return (
    <section id="habilidades" className="py-24 relative">
      <div className="section-glow-line mb-24" />
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-display font-bold text-center mb-4 neon-gradient-text"
        >
          Habilidades Técnicas
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-muted-foreground mb-16 max-w-xl mx-auto"
        >
          Tecnologias e ferramentas que utilizo para criar soluções robustas e escaláveis.
        </motion.p>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card rounded-xl p-6 text-center"
            >
              <div className="text-3xl mb-3">{cat.icon}</div>
              <h3 className="font-display font-semibold text-primary mb-4">{cat.title}</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs font-medium rounded-md border border-primary/25 text-primary bg-primary/5
                      hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Proficiency bars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-xl p-8"
        >
          <h3 className="text-center text-primary font-display font-semibold text-lg mb-8">
            Nível de Proficiência
          </h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {proficiency.map((item) => (
              <div key={item.title}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-foreground">{item.title} ({item.level}%)</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden mb-1.5">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, var(--color-primary), var(--color-accent))" }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
