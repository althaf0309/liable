import { useRef, useEffect } from "react";

/**
 * Mission visual — a glowing gold core that repeatedly "blasts" small bright
 * dots outward (expanding + fading), with a few small glowing orbs drifting
 * around it. Lightweight canvas, pauses off-screen.
 */
type Particle = { x: number; y: number; vx: number; vy: number; r: number; life: number; maxLife: number };

export default function MissionOrbs() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    let W = 0, H = 0, cx = 0, cy = 0;
    const resize = () => {
      W = c.offsetWidth; H = c.offsetHeight;
      c.width = W * dpr; c.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = W / 2; cy = H / 2;
    };
    resize();
    window.addEventListener("resize", resize);

    let parts: Particle[] = [];
    const spawnBlast = (n: number) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = 0.5 + Math.random() * 2.6;
        parts.push({
          x: cx, y: cy,
          vx: Math.cos(a) * sp, vy: Math.sin(a) * sp * 0.82,
          r: 0.5 + Math.random() * 1.6, life: 0, maxLife: 80 + Math.random() * 80,
        });
      }
    };

    // drifting small orbs
    const orbs = Array.from({ length: 6 }, () => ({
      ang: Math.random() * Math.PI * 2,
      rad: 45 + Math.random() * 120,
      sp: (Math.random() - 0.5) * 0.012,
      size: 2.5 + Math.random() * 5,
      phase: Math.random() * Math.PI * 2,
    }));

    let running = true;
    const io = new IntersectionObserver(([e]) => { running = e.isIntersecting; }, { threshold: 0.02 });
    io.observe(c);

    let t = 0, blastTimer = 50, id = 0;
    const draw = () => {
      id = requestAnimationFrame(draw);
      if (!running) return;
      t += 1;
      ctx.clearRect(0, 0, W, H);

      // central core glow (gentle breathing)
      const coreR = 7 + Math.sin(t * 0.05) * 2.5;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 6);
      g.addColorStop(0, "rgba(255,238,200,0.95)");
      g.addColorStop(0.3, "rgba(232,199,126,0.45)");
      g.addColorStop(1, "rgba(197,160,89,0)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(cx, cy, coreR * 6, 0, Math.PI * 2); ctx.fill();

      // emit a blast wave periodically
      blastTimer++;
      if (blastTimer > 72) { blastTimer = 0; spawnBlast(44); }

      // particles — additive for a luminous burst
      ctx.globalCompositeOperation = "lighter";
      parts = parts.filter((p) => p.life < p.maxLife);
      for (const p of parts) {
        p.life++; p.x += p.vx; p.y += p.vy; p.vx *= 0.984; p.vy *= 0.984;
        const lifeT = p.life / p.maxLife;
        const alpha = 1 - lifeT;
        const rr = p.r * (1 + lifeT * 1.8); // start small, grow as it travels
        ctx.beginPath(); ctx.arc(p.x, p.y, rr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,216,138,${alpha})`;
        ctx.shadowColor = "#E8C77E";
        ctx.shadowBlur = 8;
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // drifting small orbs
      for (const o of orbs) {
        o.ang += o.sp;
        const ox = cx + Math.cos(o.ang) * o.rad;
        const oy = cy + Math.sin(o.ang) * o.rad * 0.78 + Math.sin(t * 0.02 + o.phase) * 6;
        const og = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.size * 2.2);
        og.addColorStop(0, "rgba(255,240,205,0.95)");
        og.addColorStop(0.5, "rgba(232,199,126,0.5)");
        og.addColorStop(1, "rgba(197,160,89,0)");
        ctx.fillStyle = og;
        ctx.beginPath(); ctx.arc(ox, oy, o.size * 2.2, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };
    draw();

    return () => {
      cancelAnimationFrame(id);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}
