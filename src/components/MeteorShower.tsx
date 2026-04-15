import { useEffect, useRef } from "react";

export function MeteorShower() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const meteors: Meteor[] = [];
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Meteor = {
      x: number;
      y: number;
      length: number;
      angle: number;
      speed: number;
      opacity: number;
    };

    const createMeteor = () => {
      const angle = Math.PI / 6 + Math.random() * Math.PI / 12; // shallow diagonal
      return {
        x: -30,
        y: Math.random() * canvas.height * 0.4,
        length: 40 + Math.random() * 20,
        angle,
        speed: 1.5 + Math.random() * 1,
        opacity: 0.6 + Math.random() * 0.4,
      };
    };

    const drawMeteors = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      meteors.forEach((meteor, index) => {
        const fade = (meteor.y / canvas.height);
        ctx.save();
        ctx.globalAlpha = meteor.opacity * (1 - fade);
        
        // Thin white trail
        const gradient = ctx.createLinearGradient(meteor.x, meteor.y, meteor.x + meteor.length * Math.cos(meteor.angle), meteor.y + meteor.length * Math.sin(meteor.angle));
        gradient.addColorStop(0, `rgba(255,255,255,${meteor.opacity})`);
        gradient.addColorStop(0.5, `rgba(255,255,255,${meteor.opacity * 0.3})`);
        gradient.addColorStop(1, `rgba(255,255,255,0)`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(255,255,255,0.8)";
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(meteor.x + meteor.length * Math.cos(meteor.angle), meteor.y + meteor.length * Math.sin(meteor.angle));
        ctx.stroke();
        ctx.restore();

        // Update
        meteor.x += meteor.speed * Math.cos(meteor.angle);
        meteor.y += meteor.speed * Math.sin(meteor.angle);
        
        if (meteor.y > canvas.height + 50 || meteor.x > canvas.width + 50) {
          meteors.splice(index, 1);
        }
      });

      // Rare spawn (small quantities)
      time += 0.1;
      if (Math.random() < 0.025 && meteors.length < 3) {
        meteors.push(createMeteor());
      }

      animationFrameId = requestAnimationFrame(drawMeteors);
    };

    drawMeteors();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[1]" 
    />
  );
}

