import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  life: number;
  maxLife: number;
  hue: number;
}

const MAX_PARTICLES = 36;

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

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

    const particles: Particle[] = [];
    const mouse = { x: -100, y: -100, lastX: -100, lastY: -100, speed: 0 };

    const onMove = (e: MouseEvent) => {
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      const dx = mouse.x - mouse.lastX;
      const dy = mouse.y - mouse.lastY;
      mouse.speed = Math.sqrt(dx * dx + dy * dy);
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const spawn = () => {
      if (particles.length >= MAX_PARTICLES) particles.shift();
      const hue = Math.random() > 0.5 ? 195 : 325;
      const spread = Math.min(mouse.speed, 2);
      particles.push({
        x: mouse.x + (Math.random() - 0.5) * 4,
        y: mouse.y + (Math.random() - 0.5) * 4,
        vx: (Math.random() - 0.5) * (0.3 + spread),
        vy: (Math.random() - 0.5) * (0.3 + spread) - 0.2,
        r: 0.6 + Math.random() * 1.6,
        life: 0,
        maxLife: 30 + Math.random() * 30,
        hue,
      });
    };

    let last = 0;
    let frame = 0;

    const loop = (time: number) => {
      frame = requestAnimationFrame(loop);
      if (document.hidden) return;
      const dt = Math.min(time - last || 16, 50);
      last = time;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      if (mouse.speed > 0.5 && time % 12 < 6) {
        spawn();
        if (mouse.speed > 1) spawn();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += dt;
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.002;
        const fade = 1 - p.life / p.maxLife;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 72%, ${0.55 * fade})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = `hsla(${p.hue}, 90%, 65%, ${0.5 * fade})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 60 }} />
  );
}
