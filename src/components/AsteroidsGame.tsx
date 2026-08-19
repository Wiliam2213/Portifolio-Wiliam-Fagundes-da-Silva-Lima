import { useCallback, useEffect, useRef, useState } from "react";

type Ship = { x: number; y: number; vx: number; vy: number; a: number; inv: number };
type Rock = { x: number; y: number; vx: number; vy: number; r: number; a: number; va: number; sh: number[] };
type Bullet = { x: number; y: number; vx: number; vy: number; life: number };
type Particle = { x: number; y: number; vx: number; vy: number; life: number; hue: number };

const W = 900;
const H = 520;

const rand = (a: number, b: number) => a + Math.random() * (b - a);

function makeRock(x: number, y: number, r: number): Rock {
  const pts = 9 + Math.floor(Math.random() * 4);
  return {
    x,
    y,
    vx: rand(-1.2, 1.2) * (40 / r),
    vy: rand(-1.2, 1.2) * (40 / r),
    r,
    a: rand(0, Math.PI * 2),
    va: rand(-0.02, 0.02),
    sh: Array.from({ length: pts }, () => rand(0.72, 1.25)),
  };
}

export function AsteroidsGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [running, setRunning] = useState(false);
  const [over, setOver] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [best, setBest] = useState(0);

  const state = useRef({
    ship: { x: W / 2, y: H / 2, vx: 0, vy: 0, a: -Math.PI / 2, inv: 120 } as Ship,
    rocks: [] as Rock[],
    bullets: [] as Bullet[],
    parts: [] as Particle[],
    keys: {} as Record<string, boolean>,
    score: 0,
    lives: 3,
    level: 1,
    cool: 0,
    over: false,
  });

  const spawnLevel = useCallback((level: number) => {
    const s = state.current;
    s.rocks = [];
    const n = 3 + level;
    for (let i = 0; i < n; i++) {
      let x = 0;
      let y = 0;
      do {
        x = rand(0, W);
        y = rand(0, H);
      } while (Math.hypot(x - s.ship.x, y - s.ship.y) < 140);
      s.rocks.push(makeRock(x, y, rand(38, 52)));
    }
  }, []);

  const reset = useCallback(() => {
    const s = state.current;
    s.ship = { x: W / 2, y: H / 2, vx: 0, vy: 0, a: -Math.PI / 2, inv: 120 };
    s.bullets = [];
    s.parts = [];
    s.score = 0;
    s.lives = 3;
    s.level = 1;
    s.over = false;
    setScore(0);
    setLives(3);
    setOver(false);
    spawnLevel(1);
  }, [spawnLevel]);

  useEffect(() => {
    const saved = Number(localStorage.getItem("asteroids-best") || 0);
    setBest(saved);
    spawnLevel(1);
  }, [spawnLevel]);

  useEffect(() => {
    const keys = state.current.keys;
    const block = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "];
    const down = (e: KeyboardEvent) => {
      if (!running) return;
      if (block.includes(e.key)) e.preventDefault();
      keys[e.key] = true;
    };
    const up = (e: KeyboardEvent) => {
      keys[e.key] = false;
    };
    window.addEventListener("keydown", down, { passive: false });
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [running]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frame = 0;

    const wrap = (o: { x: number; y: number }) => {
      if (o.x < 0) o.x += W;
      if (o.x > W) o.x -= W;
      if (o.y < 0) o.y += H;
      if (o.y > H) o.y -= H;
    };

    const boom = (x: number, y: number, n: number, hue: number) => {
      for (let i = 0; i < n; i++) {
        const a = rand(0, Math.PI * 2);
        const sp = rand(0.5, 3.5);
        state.current.parts.push({
          x,
          y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          life: rand(20, 50),
          hue,
        });
      }
    };

    const step = () => {
      const s = state.current;
      if (running && !s.over) {
        const k = s.keys;
        if (k.ArrowLeft || k.a || k.A) s.ship.a -= 0.062;
        if (k.ArrowRight || k.d || k.D) s.ship.a += 0.062;
        const thrust = k.ArrowUp || k.w || k.W;
        if (thrust) {
          s.ship.vx += Math.cos(s.ship.a) * 0.14;
          s.ship.vy += Math.sin(s.ship.a) * 0.14;
          boom(
            s.ship.x - Math.cos(s.ship.a) * 12,
            s.ship.y - Math.sin(s.ship.a) * 12,
            1,
            rand(180, 200),
          );
        }
        s.ship.vx *= 0.99;
        s.ship.vy *= 0.99;
        s.ship.x += s.ship.vx;
        s.ship.y += s.ship.vy;
        wrap(s.ship);
        if (s.ship.inv > 0) s.ship.inv--;

        s.cool--;
        if ((k[" "] || k.Spacebar) && s.cool <= 0) {
          s.cool = 10;
          s.bullets.push({
            x: s.ship.x + Math.cos(s.ship.a) * 14,
            y: s.ship.y + Math.sin(s.ship.a) * 14,
            vx: Math.cos(s.ship.a) * 6.5 + s.ship.vx,
            vy: Math.sin(s.ship.a) * 6.5 + s.ship.vy,
            life: 70,
          });
        }

        s.bullets = s.bullets.filter((b) => {
          b.x += b.vx;
          b.y += b.vy;
          b.life--;
          wrap(b);
          return b.life > 0;
        });

        for (const r of s.rocks) {
          r.x += r.vx;
          r.y += r.vy;
          r.a += r.va;
          wrap(r);
        }

        // bullet vs rock
        outer: for (let i = s.rocks.length - 1; i >= 0; i--) {
          const r = s.rocks[i];
          for (let j = s.bullets.length - 1; j >= 0; j--) {
            const b = s.bullets[j];
            if (Math.hypot(b.x - r.x, b.y - r.y) < r.r) {
              s.bullets.splice(j, 1);
              s.rocks.splice(i, 1);
              boom(r.x, r.y, 18, 30);
              s.score += r.r > 34 ? 20 : r.r > 20 ? 50 : 100;
              setScore(s.score);
              if (r.r > 20) {
                for (let n = 0; n < 2; n++) s.rocks.push(makeRock(r.x, r.y, r.r * 0.55));
              }
              continue outer;
            }
          }
          if (s.ship.inv <= 0 && Math.hypot(s.ship.x - r.x, s.ship.y - r.y) < r.r + 10) {
            boom(s.ship.x, s.ship.y, 40, 190);
            s.lives--;
            setLives(s.lives);
            s.ship = { x: W / 2, y: H / 2, vx: 0, vy: 0, a: -Math.PI / 2, inv: 140 };
            if (s.lives <= 0) {
              s.over = true;
              setOver(true);
              setBest((prev) => {
                const nb = Math.max(prev, s.score);
                localStorage.setItem("asteroids-best", String(nb));
                return nb;
              });
            }
          }
        }

        if (!s.rocks.length) {
          s.level++;
          s.ship.inv = 100;
          spawnLevel(s.level);
        }

        s.parts = s.parts.filter((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.97;
          p.vy *= 0.97;
          p.life--;
          return p.life > 0;
        });
      }

      // render
      ctx.clearRect(0, 0, W, H);
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "rgba(6,10,26,0.9)");
      g.addColorStop(1, "rgba(3,5,16,0.95)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      for (const p of s.parts) {
        ctx.globalAlpha = Math.max(p.life / 50, 0);
        ctx.fillStyle = `hsl(${p.hue} 100% 65%)`;
        ctx.fillRect(p.x, p.y, 2, 2);
      }
      ctx.globalAlpha = 1;

      ctx.strokeStyle = "rgba(200,220,255,0.85)";
      ctx.lineWidth = 1.6;
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(120,180,255,0.6)";
      for (const r of s.rocks) {
        ctx.beginPath();
        r.sh.forEach((m, i) => {
          const ang = r.a + (i / r.sh.length) * Math.PI * 2;
          const x = r.x + Math.cos(ang) * r.r * m;
          const y = r.y + Math.sin(ang) * r.r * m;
          i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        });
        ctx.closePath();
        ctx.stroke();
      }

      ctx.fillStyle = "#00d9ff";
      ctx.shadowColor = "#00d9ff";
      for (const b of s.bullets) {
        ctx.beginPath();
        ctx.arc(b.x, b.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!s.over && (s.ship.inv <= 0 || Math.floor(frame / 6) % 2 === 0)) {
        ctx.save();
        ctx.translate(s.ship.x, s.ship.y);
        ctx.rotate(s.ship.a);
        ctx.strokeStyle = "#ff4ecd";
        ctx.shadowColor = "#ff4ecd";
        ctx.beginPath();
        ctx.moveTo(15, 0);
        ctx.lineTo(-10, 9);
        ctx.lineTo(-5, 0);
        ctx.lineTo(-10, -9);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      }
      ctx.shadowBlur = 0;

      frame++;
      raf = requestAnimationFrame(step);
    };

    let raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [running, spawnLevel]);

  const press = (key: string, on: boolean) => () => {
    state.current.keys[key] = on;
  };

  return (
    <div className="relative w-full">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 font-mono text-sm">
        <div className="flex gap-4 text-muted-foreground">
          <span>
            PONTOS <span className="text-primary">{score}</span>
          </span>
          <span>
            RECORDE <span className="text-accent">{best}</span>
          </span>
          <span>
            VIDAS <span className="text-foreground">{"▲".repeat(Math.max(lives, 0)) || "—"}</span>
          </span>
        </div>
        <button
          onClick={() => {
            reset();
            setRunning(true);
          }}
          className="px-4 py-1.5 rounded-full border border-primary/50 text-primary hover:bg-primary/10 transition"
        >
          {running ? "Reiniciar" : "Jogar"}
        </button>
      </div>

      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm shadow-[0_0_40px_rgba(0,217,255,0.12)]">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="w-full h-auto block touch-none"
          aria-label="Jogo Asteroids"
        />
        {(!running || over) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/70 backdrop-blur-sm text-center px-6">
            <h3 className="font-display text-2xl md:text-3xl neon-gradient-text">
              {over ? "Game Over" : "Asteroids"}
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              {over
                ? `Você fez ${score} pontos. Bora de novo?`
                : "Setas ou WASD para pilotar, Espaço para atirar. No celular use os botões abaixo."}
            </p>
            <button
              onClick={() => {
                reset();
                setRunning(true);
              }}
              className="mt-1 px-6 py-2 rounded-full bg-primary/15 border border-primary/50 text-primary font-mono hover:bg-primary/25 transition"
            >
              {over ? "Jogar novamente" : "Iniciar missão"}
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 md:hidden font-mono">
        {[
          { label: "◀", key: "ArrowLeft" },
          { label: "▲", key: "ArrowUp" },
          { label: "▶", key: "ArrowRight" },
          { label: "FIRE", key: " " },
        ].map((b) => (
          <button
            key={b.key}
            onPointerDown={press(b.key, true)}
            onPointerUp={press(b.key, false)}
            onPointerLeave={press(b.key, false)}
            onContextMenu={(e) => e.preventDefault()}
            className="py-3 rounded-xl border border-white/15 bg-white/5 text-foreground active:bg-primary/20 select-none"
          >
            {b.label}
          </button>
        ))}
      </div>
    </div>
  );
}
