import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  alpha: number;
  speed: number;
  phase: number;
  parallax: number;
}

interface Dust {
  x: number;
  y: number;
  r: number;
  alpha: number;
  speedX: number;
  speedY: number;
  phase: number;
  parallax: number;
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  hue: number;
  sat: number;
  light: number;
  alpha: number;
  driftX: number;
  driftY: number;
  parallax: number;
}

const NEBULA_COLORS = [
  { hue: 275, sat: 72, light: 58 },
  { hue: 225, sat: 68, light: 55 },
  { hue: 330, sat: 68, light: 62 },
  { hue: 190, sat: 60, light: 52 },
  { hue: 265, sat: 70, light: 50 },
];

const ZONES = [
  { id: "inicio", r: 8, g: 30, b: 52 },
  { id: "sobre", r: 46, g: 16, b: 66 },
  { id: "habilidades", r: 68, g: 54, b: 18 },
  { id: "projetos", r: 12, g: 40, b: 92 },
  { id: "experiencia", r: 70, g: 58, b: 22 },
  { id: "contato", r: 62, g: 54, b: 32 },
];

const DEFAULT_ZONE = ZONES[0];

const wrap = (v: number, size: number, margin: number) => {
  const range = size + margin * 2;
  return ((((v + margin) % range) + range) % range) - margin;
};

export function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    const starCount = reducedMotion ? 260 : isMobile ? 140 : 720;
    const dustCount = reducedMotion ? 0 : isMobile ? 24 : 110;
    const nebulaCount = isMobile ? 3 : 5;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.3 + Math.random() * 0.9,
      alpha: 0.2 + Math.random() * 0.6,
      speed: 0.5 + Math.random() * 2.4,
      phase: Math.random() * Math.PI * 2,
      parallax: 0.015 + Math.random() * 0.05,
    }));

    const dust: Dust[] = Array.from({ length: dustCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.5 + Math.random() * 1.3,
      alpha: 0.18 + Math.random() * 0.45,
      speedX: 0.004 + Math.random() * 0.012,
      speedY: 0.002 + Math.random() * 0.006,
      phase: Math.random() * Math.PI * 2,
      parallax: 0.08 + Math.random() * 0.14,
    }));

    const nebulae: Nebula[] = Array.from({ length: nebulaCount }, (_, i) => {
      const c = NEBULA_COLORS[i % NEBULA_COLORS.length];
      return {
        x: Math.random(),
        y: Math.random(),
        radius: 0.18 + Math.random() * 0.28,
        hue: c.hue,
        sat: c.sat,
        light: c.light,
        alpha: 0.05 + Math.random() * 0.06,
        driftX: 0.0015 + Math.random() * 0.003,
        driftY: 0.0008 + Math.random() * 0.0018,
        parallax: 0.04 + Math.random() * 0.05,
      };
    });

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let measuredZones: { top: number; height: number; r: number; g: number; b: number }[] = [];
    const tint = { r: DEFAULT_ZONE.r, g: DEFAULT_ZONE.g, b: DEFAULT_ZONE.b };

    const measureZones = () => {
      const next: { top: number; height: number; r: number; g: number; b: number }[] = [];
      document.querySelectorAll("section[id]").forEach((el) => {
        const id = el.id;
        const zone = ZONES.find((z) => z.id === id);
        if (!zone) return;
        const rect = el.getBoundingClientRect();
        next.push({
          top: rect.top + window.scrollY,
          height: rect.height,
          r: zone.r,
          g: zone.g,
          b: zone.b,
        });
      });
      if (next.length) measuredZones = next;
    };
    measureZones();
    window.addEventListener("load", measureZones);
    const remeasureTimer = window.setTimeout(measureZones, 2000);

    let prevScrollY = window.scrollY;
    let velocity = 0;

    const drawFrame = (time: number) => {
      if (document.hidden) return;
      const t = time / 1000;
      const scrollY = window.scrollY;
      velocity = velocity * 0.88 + (scrollY - prevScrollY) * 0.12;
      prevScrollY = scrollY;
      const streak = Math.min(Math.max(Math.abs(velocity) - 40, 0), 220);

      let zone: { r: number; g: number; b: number } = DEFAULT_ZONE;
      const midY = scrollY + height * 0.5;
      for (const z of measuredZones) {
        if (midY >= z.top && midY < z.top + z.height) {
          zone = z;
          break;
        }
      }
      tint.r += (zone.r - tint.r) * 0.06;
      tint.g += (zone.g - tint.g) * 0.06;
      tint.b += (zone.b - tint.b) * 0.06;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = `rgba(${Math.round(tint.r)},${Math.round(tint.g)},${Math.round(tint.b)},0.1)`;
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      for (const n of nebulae) {
        const r = n.radius * height;
        const x = wrap(n.x * width + t * n.driftX * 60, width, r);
        const y = wrap(n.y * height - scrollY * n.parallax + t * n.driftY * 40, height, r);
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, `hsla(${n.hue}, ${n.sat}%, ${n.light}%, ${n.alpha})`);
        grad.addColorStop(1, `hsla(${n.hue}, ${n.sat}%, ${n.light}%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const s of stars) {
        const x = s.x * width;
        const y = wrap(s.y * height - scrollY * s.parallax, height, 4);
        const twinkle = 0.55 + 0.45 * Math.sin(t * s.speed + s.phase);
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha * twinkle})`;
        ctx.fill();
      }

      for (const d of dust) {
        const span = width + 8;
        const x = ((((d.x * width - t * d.speedX * 50) % span) + span) % span) - 4;
        const y = wrap(d.y * height - scrollY * d.parallax, height, 8);
        const a = 0.35 + 0.65 * Math.abs(Math.sin(t * 0.6 + d.phase));
        ctx.beginPath();
        if (streak > 0) {
          ctx.strokeStyle = `rgba(200,225,255,${d.alpha * a})`;
          ctx.lineWidth = d.r * 0.8;
          ctx.moveTo(x, y);
          ctx.lineTo(x, y - streak * 0.6);
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(200,225,255,${d.alpha * a})`;
          ctx.arc(x, y, d.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    if (reducedMotion) {
      drawFrame(0);
      return () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("load", measureZones);
        window.clearTimeout(remeasureTimer);
      };
    }

    let frame = 0;
    const loop = (time: number) => {
      drawFrame(time);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("load", measureZones);
      window.clearTimeout(remeasureTimer);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />
  );
}
