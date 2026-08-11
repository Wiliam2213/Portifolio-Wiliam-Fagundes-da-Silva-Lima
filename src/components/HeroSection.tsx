import { profile } from "../data/portfolio";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      {/* Central sun glow */}


      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Header: Name + Photo side by side */}
        <motion.div 
          className="flex flex-col lg:flex-row items-center justify-center gap-12 mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Name */}
          <div className="lg:order-1 text-center lg:text-left max-w-lg">
            <p className="font-mono text-sm text-primary tracking-[0.3em] uppercase mb-6">
              Full Stack Developer
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
              <span className="neon-gradient-text">Wiliam</span>
              <br />
              <span className="text-foreground">Fagundes</span>
            </h1>
          </div>

          {/* Circular Profile Photo */}
          <motion.div 
            className="lg:order-2 w-48 h-48 lg:w-64 lg:h-64 flex-shrink-0"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 100 }}
          >

            <motion.img 
              src="/images/planets/WhatsApp Image 2026-04-15 at 14.56.58.jpeg" 
              alt="Wiliam Fagundes"
className="w-full h-full object-cover rounded-full shadow-2xl ring-0 transition-all duration-500 relative z-10 cursor-default
                         hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:scale-[1.02]"
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            />

          </motion.div>
        </motion.div>

        {/* Description */}
        <motion.p 
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Desenvolvedor apaixonado por tecnologia, inovação e soluções digitais. Transformando
          ideias em código robusto e interfaces intuitivas.
        </motion.p>

        {/* Original Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <a
            href="#projetos"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projetos")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3.5 rounded-lg font-display font-semibold text-sm bg-gradient-to-r from-primary to-accent text-primary-foreground
              hover:shadow-[0_0_40px_rgba(0,217,255,0.4)] hover:-translate-y-0.5 transition-all duration-300"
          >
            Ver Projetos
          </a>
          <a
            href="#contato"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3.5 rounded-lg font-display font-semibold text-sm border border-primary text-primary bg-transparent
              hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(0,217,255,0.2)] hover:-translate-y-0.5 transition-all duration-300"
          >
            Entrar em Contato
          </a>
        </motion.div>

        {/* Social */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex gap-5 justify-center mb-20"
        >
          <SocialIcon href={profile.github} label="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338 .726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745 .083-.729 .083-.729 1.205 .084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492 .997 .107-.775 .418-1.305 .762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311 .469-2.381 1.236-3.221-.124-.303-.535-1.524 .117-3.176 0 0 1.008-.322 3.301 1.23 .957-.266 1.983-.399 3.003-.404 1.02 .005 2.047 .138 3.006 .404 2.291-1.552 3.297-1.23 3.297-1.23 .653 1.653 .242 2.874 .118 3.176 .77 .84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921 .43 .372 .823 1.102 .823 2.222v3.293c0 .319 .192 .694 .801 .576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </SocialIcon>
          <SocialIcon href={profile.linkedin} label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722 .722-2.004 1.418-.103 .249-.129 .597-.129 .946v5.441h-3.554s.05-8.736 0-9.646h3.554v1.348c.42-.648 1.36-1.573 3.322-1.573 2.429 0 4.251 1.574 4.251 4.963v5.908zM5.337 8.855c-1.144 0-1.915-.762-1.915-1.715 0-.955 .77-1.715 1.958-1.715 1.187 0 1.927 .76 1.927 1.715 0 .953-.74 1.715-1.97 1.715zm1.946 11.597H3.392V9.806h3.891v10.646zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227 .792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
            </svg>
          </SocialIcon>
          <SocialIcon href={`mailto:${profile.email}`} label="Email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </SocialIcon>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, type: "spring" }}
          className="animate-bounce-slow text-primary"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 mx-auto">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-14 h-14 flex items-center justify-center rounded-xl border border-primary/40 text-primary bg-primary/5 
                 hover:bg-primary hover:text-primary-foreground hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,217,255,0.5)] 
                 transition-all duration-300"
    >
      {children}
    </a>
  );
}

