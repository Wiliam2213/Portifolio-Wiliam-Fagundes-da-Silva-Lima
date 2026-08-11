import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, RefreshCw, Globe } from "lucide-react";

interface ProjectPreviewProps {
  url: string;
  title: string;
}

/**
 * Renders the real website live inside an iframe (desktop-width viewport
 * scaled down so the layout looks like a real browser window).
 * Falls back to an automatic screenshot when the site blocks embedding.
 */
export function ProjectPreview({ url, title }: ProjectPreviewProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "blocked">("loading");
  const [nonce, setNonce] = useState(0);
  const [visible, setVisible] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Only mount the iframe once the card is near the viewport (performance).
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    setStatus("loading");
    timerRef.current = setTimeout(() => {
      setStatus((prev) => (prev === "loading" ? "blocked" : prev));
    }, 9000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible, url, nonce]);

  const handleLoad = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setStatus("loaded");
  };

  const screenshotSrc = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1280&h=960&r=${nonce}`;

  return (
    <div ref={wrapRef} className="relative group/preview">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-3 py-2 bg-secondary/60 border-b border-border/60 backdrop-blur">
        <span className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-primary/50" />
        <span className="w-2.5 h-2.5 rounded-full bg-accent/60" />
        <div className="flex-1 mx-2 truncate rounded-md bg-background/60 px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
          {url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
        </div>
        <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-primary">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          live
        </span>
        <button
          type="button"
          aria-label={`Recarregar preview de ${title}`}
          onClick={() => setNonce((n) => n + 1)}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
        </button>
      </div>

      {/* Viewport */}
      <div className="relative aspect-[16/10] overflow-hidden bg-card">
        {visible && status !== "blocked" && (
          <iframe
            key={`${url}-${nonce}`}
            src={url}
            title={`Preview ao vivo de ${title}`}
            onLoad={handleLoad}
            onError={() => setStatus("blocked")}
            loading="lazy"
            referrerPolicy="no-referrer"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            className="absolute left-0 top-0 origin-top-left border-0 pointer-events-none
              transition-transform duration-700 ease-out
              w-[1440px] h-[900px] scale-[0.28] sm:scale-[0.30] md:scale-[0.33] lg:scale-[0.29] xl:scale-[0.33]
              group-hover/preview:scale-[0.34] lg:group-hover/preview:scale-[0.32]"
          />
        )}

        {status === "blocked" && (
          <img
            src={screenshotSrc}
            alt={`Captura em tempo real do site ${title}`}
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover/preview:scale-105"
            loading="lazy"
          />
        )}

        {(status === "loading" || !visible) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-card">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              carregando site
            </span>
          </div>
        )}

        {/* Hover CTA */}
        <motion.div
          initial={false}
          className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-background via-background/40 to-transparent pb-4 opacity-0 transition-opacity duration-300 group-hover/preview:opacity-100"
        >
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-md bg-gradient-to-r from-primary to-accent px-4 py-2 font-display text-xs font-semibold text-primary-foreground shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Abrir site oficial
          </a>
        </motion.div>

        {status === "blocked" && (
          <span className="absolute left-2 top-2 flex items-center gap-1 rounded bg-background/80 px-2 py-1 font-mono text-[9px] text-muted-foreground">
            <Globe className="h-3 w-3" /> screenshot
          </span>
        )}
      </div>
    </div>
  );
}
