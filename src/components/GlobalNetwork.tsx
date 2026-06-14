import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Plane, FileText, ShieldCheck, HeartHandshake, Home } from "lucide-react";

// LGS palette
const GOLD = "197,160,89";
const GOLD_BRIGHT = "#E8C77E";
const CREAM = "#F5F2ED";
const DARK = "hsl(222,52%,2%)";

// Rough continent ellipses in normalized map space [x:0-1, y:0-1]
const CONTINENTS: [number, number, number, number][] = [
  [0.17, 0.30, 0.10, 0.13], [0.22, 0.40, 0.07, 0.08], [0.12, 0.26, 0.05, 0.06], // N. America
  [0.29, 0.66, 0.05, 0.13], [0.32, 0.80, 0.03, 0.06],                            // S. America
  [0.47, 0.27, 0.05, 0.06], [0.50, 0.33, 0.04, 0.04],                            // Europe
  [0.52, 0.55, 0.07, 0.14],                                                       // Africa
  [0.66, 0.34, 0.13, 0.12], [0.78, 0.29, 0.07, 0.08], [0.72, 0.47, 0.05, 0.06],  // Asia
  [0.84, 0.72, 0.06, 0.05],                                                       // Australia
];

// Service nodes positioned across the map (frames 2 & 3)
const NODES = [
  { name: "Student", icon: GraduationCap, x: 0.205, y: 0.40 },
  { name: "Arrival", icon: Plane, x: 0.455, y: 0.205 },
  { name: "Housing", icon: FileText, x: 0.73, y: 0.265 },
  { name: "Verification", icon: ShieldCheck, x: 0.53, y: 0.56 },
  { name: "Support", icon: HeartHandshake, x: 0.82, y: 0.66 },
  { name: "Property", icon: Home, x: 0.30, y: 0.66 },
];

const ROUTES: [number, number][] = [
  [0, 1], [1, 2], [0, 3], [3, 4], [2, 4], [1, 3], [5, 3], [0, 5],
];

// city light dots
const CITY_LIGHTS: [number, number][] = [
  [0.2, 0.34], [0.24, 0.42], [0.17, 0.3], [0.47, 0.26], [0.5, 0.3], [0.49, 0.34],
  [0.68, 0.33], [0.74, 0.3], [0.71, 0.42], [0.3, 0.66], [0.53, 0.5], [0.82, 0.7], [0.78, 0.29],
];

function inContinent(x: number, y: number) {
  for (const [cx, cy, rx, ry] of CONTINENTS) {
    const dx = (x - cx) / rx;
    const dy = (y - cy) / ry;
    if (dx * dx + dy * dy <= 1) return true;
  }
  return false;
}

function WorldCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    let dots: { x: number; y: number }[] = [];
    const build = () => {
      W = c.width = c.offsetWidth;
      H = c.height = c.offsetHeight;
      dots = [];
      for (let nx = 0; nx <= 1; nx += 0.011) {
        for (let ny = 0; ny <= 1; ny += 0.022) {
          if (inContinent(nx, ny)) dots.push({ x: nx, y: ny });
        }
      }
    };
    build();
    window.addEventListener("resize", build);

    let running = true;
    const io = new IntersectionObserver(([e]) => { running = e.isIntersecting; }, { threshold: 0.05 });
    io.observe(c);

    let t = 0;
    let id: number;
    const draw = () => {
      id = requestAnimationFrame(draw);
      if (!running) return;
      ctx.clearRect(0, 0, W, H);

      // continent dots
      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.x * W, d.y * H, 1.1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GOLD},0.18)`;
        ctx.fill();
      }

      // city lights
      for (const [lx, ly] of CITY_LIGHTS) {
        const tw = Math.sin(t * 3 + lx * 30) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(lx * W, ly * H, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,199,126,${0.4 + tw * 0.5})`;
        ctx.fill();
      }

      // arcs + traveling pulses
      ROUTES.forEach((r, i) => {
        const a = NODES[r[0]], b = NODES[r[1]];
        const ax = a.x * W, ay = a.y * H, bx = b.x * W, by = b.y * H;
        const dist = Math.hypot(bx - ax, by - ay);
        const mx = (ax + bx) / 2;
        const my = (ay + by) / 2 - dist * 0.32;

        const grad = ctx.createLinearGradient(ax, ay, bx, by);
        grad.addColorStop(0, `rgba(${GOLD},0.1)`);
        grad.addColorStop(0.5, `rgba(232,199,126,0.55)`);
        grad.addColorStop(1, `rgba(${GOLD},0.1)`);
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.quadraticCurveTo(mx, my, bx, by);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        for (let k = 0; k < 2; k++) {
          const tt = (t * 0.22 + i * 0.13 + k * 0.5) % 1;
          const u = 1 - tt;
          const px = u * u * ax + 2 * u * tt * mx + tt * tt * bx;
          const py = u * u * ay + 2 * u * tt * my + tt * tt * by;
          ctx.beginPath();
          ctx.arc(px, py, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = GOLD_BRIGHT;
          ctx.shadowColor = GOLD_BRIGHT;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // node base glow + pulsing ring
      NODES.forEach((n, i) => {
        const x = n.x * W, y = n.y * H;
        const pr = Math.sin(t * 2 + i * 1.3) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(x, y, 4 + pr * 8, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(232,199,126,${0.4 - pr * 0.35})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      t += 0.01;
    };
    draw();

    return () => {
      cancelAnimationFrame(id);
      io.disconnect();
      window.removeEventListener("resize", build);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

export default function GlobalNetwork() {
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: DARK }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(${GOLD},0.4), transparent)` }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 70% 60% at 50% 50%, rgba(${GOLD},0.05) 0%, transparent 70%)` }} />

      <div className="container-custom px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase rounded-full px-4 py-1.5 mb-5"
            style={{ color: GOLD_BRIGHT, background: `rgba(${GOLD},0.08)`, border: `1px solid rgba(${GOLD},0.16)` }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GOLD_BRIGHT }} />
            Global Network
          </span>
          <h2 className="font-serif font-bold leading-tight mb-4" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: CREAM }}>
            One connected journey,{" "}
            <span style={{ background: `linear-gradient(135deg,#C5A059,${GOLD_BRIGHT},#C5A059)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              across borders
            </span>
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "rgba(245,242,237,0.55)" }}>
            Every year thousands arrive facing fragmented systems and disconnected services.
            Quantum Link™ links arrival, housing, verification, and support into one flow.
          </p>
        </motion.div>

        {/* Map with floating service nodes */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9 }}
          className="relative w-full mx-auto"
          style={{ maxWidth: 1000, aspectRatio: "2 / 1" }}
        >
          <WorldCanvas />
          {NODES.map((n, i) => (
            <motion.div
              key={n.name}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
              style={{ left: `${n.x * 100}%`, top: `${n.y * 100}%` }}
            >
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center gap-1.5">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(10,10,10,0.6)", backdropFilter: "blur(12px)", border: `1px solid rgba(${GOLD},0.35)`, boxShadow: `0 4px 24px rgba(${GOLD},0.25)` }}>
                  <n.icon className="w-5 h-5" style={{ color: GOLD_BRIGHT }} />
                </div>
                <span className="text-[8px] sm:text-[9px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded"
                  style={{ color: CREAM, background: "rgba(10,10,10,0.5)" }}>{n.name}</span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Reach stats */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-12">
          {[["10K+", "Students Supported"], ["2K+", "Properties Managed"], ["5", "Countries Supported"]].map(([v, l], i) => (
            <motion.div key={l}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center rounded-2xl py-5"
              style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)", border: `1px solid rgba(${GOLD},0.12)` }}>
              <p className="font-serif font-bold text-2xl mb-1" style={{ color: GOLD_BRIGHT }}>{v}</p>
              <p className="text-[11px] uppercase tracking-wider" style={{ color: "rgba(245,242,237,0.45)" }}>{l}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
