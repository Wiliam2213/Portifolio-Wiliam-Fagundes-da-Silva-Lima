import { useEffect, useRef, useState } from "react";
import { ExternalLink, Globe } from "lucide-react";

interface ProjectPreviewProps {
  url: string;
  title: string;
  thumbnail?: string;
}

/**
 * Tries to render the live website inside an iframe.
 * If the site blocks embedding (X-Frame-Options / CSP frame-ancestors),
 * falls back to a screenshot thumbnail (via Microlink) and an "Open site" CTA.
 */
export function ProjectPreview({ url, title, thumbnail }: ProjectPreviewProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "blocked">("loading");
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // If iframe doesn't fire onLoad within 4s, assume the site blocks embedding.
    timerRef.current = setTimeout(() => {
      setStatus((prev) => (prev === "loading" ? "blocked" : prev));
    }, 4000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [url]);

  const handleLoad = () => {
    // Some browsers fire onLoad even when the frame was blocked by the server.
    // Heuristic: if we cannot access contentDocument and it stays empty, treat as blocked.
    try {
      const doc = iframeRef.current?.contentDocument;
      // Cross-origin docs throw; that's actually a good sign — page rendered.
      if (doc && doc.body && doc.body.children.length === 0) {
        setStatus("blocked");
        return;
      }
    } catch {
      // Cross-origin access denied → page loaded successfully from another origin.
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    setStatus("loaded");
  };

  // Microlink generates an automatic screenshot of any public URL.
  const screenshotSrc =
    thumbnail ||
    `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;

  return (
    <div className="relative group aspect-[4/3] bg-card overflow-hidden flex-shrink-0">
      {status !== "blocked" && (
        <iframe
          ref={iframeRef}
          src={url}
          title={title}
          onLoad={handleLoad}
          onError={() => setStatus("blocked")}
          className="w-full h-full border-0 scale-100 group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
        />
      )}

      {status === "blocked" && (
        <div className="absolute inset-0 w-full h-full">
          <img
            src={screenshotSrc}
            alt={`Preview de ${title}`}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              // Final fallback: hide broken image, show placeholder underneath.
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-background/40 to-background/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <Globe className="w-10 h-10 text-primary drop-shadow-lg" />
            <span className="text-xs font-mono text-foreground/80 bg-background/70 px-2 py-1 rounded">
              Preview ao vivo bloqueado pelo site
            </span>
          </div>
        </div>
      )}

      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-card/80 pointer-events-none">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Hover CTA overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-md font-display font-semibold text-xs bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-lg transition-all duration-300 flex items-center gap-1.5"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Abrir site oficial
        </a>
      </div>
    </div>
  );
}