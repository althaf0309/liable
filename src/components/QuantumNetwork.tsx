import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, GraduationCap, Headset, FileCheck, Briefcase } from "lucide-react";

const GOLD = "197,160,89";
const GOLD_BRIGHT = "#E8C77E";
const CREAM = "#F5F2ED";
const DARK2 = "hsl(222,48%,4%)";

const FEATURES = [
  { name: "Student Matching", icon: GraduationCap, desc: "Compatibility-based allocation on budget, suitability, and occupancy rules — never open browsing." },
  { name: "Property Care", icon: Home, desc: "Maintenance tracking, safety compliance, and structured property trust scoring." },
  { name: "Support Services", icon: Headset, desc: "Arrival, settlement, and round-the-clock student welfare support." },
  { name: "Documentation", icon: FileCheck, desc: "Right-to-rent, identity verification, and GDPR-compliant document handling." },
  { name: "Agent Services", icon: Briefcase, desc: "Partner and agent coordination with role-gated platform access." },
];

// node positions in % (ellipse around a central hub)
const RX = 36, RY = 33;
const NODE_POS = FEATURES.map((_, i) => {
  const a = (-90 + i * (360 / FEATURES.length)) * (Math.PI / 180);
  return { x: 50 + Math.cos(a) * RX, y: 50 + Math.sin(a) * RY };
});

function LinkCanvas({ active }: { active: number | null }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef<number | null>(active);
  activeRef.current = active;

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    const resize = () => { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    let running = true;
    const io = new IntersectionObserver(([e]) => { running = e.isIntersecting; }, { threshold: 0.05 });
    io.observe(c);

    const hub = { x: 50, y: 50 };
    let t = 0;
    let id: number;
    const draw = () => {
      id = requestAnimationFrame(draw);
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      const act = activeRef.current;

      NODE_POS.forEach((p, i) => {
        const ax = (hub.x / 100) * W, ay = (hub.y / 100) * H;
        const bx = (p.x / 100) * W, by = (p.y / 100) * H;
        const on = act === i;

        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        const g = ctx.createLinearGradient(ax, ay, bx, by);
        g.addColorStop(0, on ? "rgba(232,199,126,0.85)" : `rgba(${GOLD},0.42)`);
        g.addColorStop(1, on ? "rgba(232,199,126,0.3)" : `rgba(${GOLD},0.12)`);
        ctx.strokeStyle = g;
        ctx.lineWidth = on ? 1.8 : 1.1;
        ctx.stroke();

        // traveling pulse
        const tt = (t * 0.4 + i * 0.2) % 1;
        const px = ax + (bx - ax) * tt;
        const py = ay + (by - ay) * tt;
        ctx.beginPath();
        ctx.arc(px, py, on ? 3 : 2, 0, Math.PI * 2);
        ctx.fillStyle = GOLD_BRIGHT;
        ctx.shadowColor = GOLD_BRIGHT;
        ctx.shadowBlur = on ? 14 : 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // ring around the hub between adjacent nodes
      ctx.beginPath();
      NODE_POS.forEach((p, i) => {
        const x = (p.x / 100) * W, y = (p.y / 100) * H;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.strokeStyle = `rgba(${GOLD},0.1)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      t += 0.01;
    };
    draw();

    return () => {
      cancelAnimationFrame(id);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export default function QuantumNetwork() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative py-28 overflow-hidden" style={{ background: DARK2 }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 60% at 50% 45%, rgba(${GOLD},0.05) 0%, transparent 70%)` }} />

      <div className="container-custom px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase rounded-full px-4 py-1.5 mb-5"
            style={{ color: GOLD_BRIGHT, background: `rgba(${GOLD},0.08)`, border: `1px solid rgba(${GOLD},0.16)` }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GOLD_BRIGHT }} />
            Quantum Network
          </span>
          <h2 className="font-serif font-bold leading-tight mb-4" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: CREAM }}>
            Transform complex processes into{" "}
            <span style={{ background: `linear-gradient(135deg,#C5A059,${GOLD_BRIGHT},#C5A059)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              connected experiences
            </span>
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "rgba(245,242,237,0.55)" }}>
            Every service is a node. Hover a node to see how it links back to the Quantum Link™ core.
          </p>
        </motion.div>

        {/* Interactive graph */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto"
          style={{ maxWidth: 720, height: 520 }}
          onMouseLeave={() => setActive(null)}
        >
          <LinkCanvas active={active} />

          {/* Central hub */}
          <div className="absolute -translate-x-1/2 -translate-y-1/2 z-10" style={{ left: "50%", top: "50%" }}>
            <div className="relative" style={{ width: 152, height: 152 }}>
              <div className="absolute inset-0 rounded-full" style={{ border: `1px dashed rgba(${GOLD},0.32)`, animation: "spin 20s linear infinite" }} />
              <div className="absolute inset-[10px] rounded-full flex flex-col items-center justify-center text-center"
                style={{ background: `radial-gradient(circle at 50% 38%, rgba(${GOLD},0.16), rgba(10,12,18,0.94) 72%)`, border: `1px solid rgba(${GOLD},0.5)`, boxShadow: `0 0 26px rgba(${GOLD},0.22), inset 0 0 28px rgba(${GOLD},0.1)` }}>
                <span className="font-serif font-bold text-2xl" style={{ color: CREAM, textShadow: `0 0 18px rgba(${GOLD},0.7)` }}>LGS</span>
                <span className="text-[8px] font-bold tracking-[0.28em] mt-1" style={{ color: GOLD_BRIGHT }}>QUANTUM LINK</span>
              </div>
            </div>
          </div>

          {/* Feature nodes */}
          {FEATURES.map((f, i) => {
            const p = NODE_POS[i];
            const on = active === i;
            return (
              <div key={f.name} className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}>
                <motion.button
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  whileHover={{ scale: 1.12 }}
                  className="relative flex flex-col items-center justify-center rounded-2xl outline-none transition-colors"
                  style={{
                    width: 96, height: 96,
                    background: on ? `rgba(${GOLD},0.14)` : "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(14px)",
                    border: `1px solid ${on ? `rgba(${GOLD},0.5)` : `rgba(${GOLD},0.18)`}`,
                    boxShadow: on ? `0 0 36px rgba(${GOLD},0.35)` : "none",
                  }}
                >
                  <span className="w-9 h-9 rounded-xl flex items-center justify-center mb-1.5"
                    style={{ background: `rgba(${GOLD},0.16)` }}>
                    <f.icon className="w-4.5 h-4.5" style={{ color: GOLD_BRIGHT }} />
                  </span>
                  <span className="text-[9px] font-semibold leading-tight text-center px-1" style={{ color: CREAM }}>{f.name}</span>
                </motion.button>
              </div>
            );
          })}
        </motion.div>

        {/* Active feature description */}
        <div className="max-w-md mx-auto mt-8 text-center min-h-[60px]">
          <motion.div
            key={active ?? "default"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-serif font-bold text-lg mb-1.5" style={{ color: active !== null ? GOLD_BRIGHT : CREAM }}>
              {active !== null ? FEATURES[active].name : "Five services. One core."}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(245,242,237,0.55)" }}>
              {active !== null ? FEATURES[active].desc : "Hover any node to explore how each service connects through Quantum Link™."}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
