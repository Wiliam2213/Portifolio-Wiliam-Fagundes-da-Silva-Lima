import { motion } from "framer-motion";
import { contactLinks, profile } from "../data/portfolio";
import { FloatingPlanets } from "./FloatingPlanets";
import { SectionDivider } from "./SectionDivider";
import curriculo from "../assets/curriculo.pdf.asset.json";

const iconMap: Record<string, React.ReactNode> = {
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.736 0-9.646h3.554v1.348c.42-.648 1.36-1.573 3.322-1.573 2.429 0 4.251 1.574 4.251 4.963v5.908zM5.337 8.855c-1.144 0-1.915-.762-1.915-1.715 0-.955.77-1.715 1.958-1.715 1.187 0 1.927.76 1.927 1.715 0 .953-.74 1.715-1.97 1.715zm1.946 11.597H3.392V9.806h3.891v10.646zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M20.52 3.449A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.548 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.423-8.452ZM12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981.999-3.648-.235-.374a9.86 9.86 0 0 1-1.511-5.26c.002-5.45 4.437-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.898 9.825 9.825 0 0 1 2.892 6.994c-.003 5.45-4.437 9.885-9.884 9.885Z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
};

export function ContactSection() {
  return (
    <section id="contato" className="py-24 relative overflow-hidden">
      <SectionDivider className="mb-24" />

      {/* Destination planet */}
      <div
        className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[560px] h-[560px] pointer-events-none z-0"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 rounded-full animate-glow-breathing"
          style={{
            background:
              "radial-gradient(circle, rgba(232,213,163,0.18) 0%, rgba(232,213,163,0.06) 45%, transparent 70%)",
            animationDuration: "6s",
          }}
        />
        <div
          className="absolute inset-16 rounded-full bg-cover bg-center animate-float-slow opacity-60"
          style={{
            backgroundImage: "url(/images/planets/p-saturn.png)",
            backgroundColor: "#e8d5a3",
            boxShadow: "0 0 60px 10px rgba(232,213,163,0.25)",
          }}
        />
      </div>

      <FloatingPlanets variant="section" planetIds={["venus"]} opacity={0.3} />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-display font-bold text-center mb-4 neon-gradient-text"
        >
          Contato
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-center text-muted-foreground mb-16 max-w-md mx-auto"
        >
          Vamos conectar! Estou sempre aberto a novas oportunidades e parcerias.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="mb-10 flex justify-center"
        >
          <a
            href={curriculo.url}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent px-6 py-3 font-display text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:scale-105"
          >
            Baixar curriculo (PDF)
          </a>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 mb-12">
          {contactLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 26px -4px rgba(232,213,163,0.4)",
              }}
              className="glass-card rounded-xl p-5 flex items-center gap-4 group cursor-pointer"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/10 text-primary
                group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300
                group-hover:shadow-[0_0_20px_rgba(0,217,255,0.4)]"
              >
                {iconMap[link.icon]}
              </div>
              <div className="flex-grow">
                <p className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                  {link.label}
                </p>
                <p className="font-mono text-xs text-muted-foreground break-all">{link.value}</p>
              </div>
              <span className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 text-lg">
                →
              </span>
            </motion.a>
          ))}
        </div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center space-y-3"
        >
          <div className="section-glow-line mb-8" />
          <p className="font-display text-2xl font-bold neon-gradient-text">{profile.shortName}</p>
          <p className="font-mono text-sm text-muted-foreground">
            {profile.title} · {profile.location}
          </p>
          <div className="flex justify-center gap-3 mt-4">
            <span className="px-3 py-1.5 rounded-lg text-xs font-mono bg-secondary text-muted-foreground">
              🇧🇷 Português
            </span>
            <span className="px-3 py-1.5 rounded-lg text-xs font-mono bg-secondary text-muted-foreground">
              🇺🇸 English
            </span>
          </div>
          <p className="text-xs text-muted-foreground/50 mt-8 font-mono">
            © {new Date().getFullYear()} {profile.shortName}. Todos os direitos reservados.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
