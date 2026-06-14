import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// ── Animated network canvas ─────────────────────────────────────
function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 50 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
    }));
    let id: number;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > c.width) p.vx *= -1;
        if (p.y < 0 || p.y > c.height) p.vy *= -1;
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 140) {
            ctx.strokeStyle = `rgba(197,160,89,${(1 - d / 140) * 0.14})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(197,160,89,0.4)"; ctx.fill();
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.4 }} />;
}

// ── Module data ─────────────────────────────────────────────────
const modules = [
  {
    name: "Quantum Match™", code: "QM", subtitle: "Intelligent Matching",
    desc: "Matches people and properties using compatibility factors, budget, and occupancy rules — not open listings.",
    color: "#C5A059", accent: "rgba(197,160,89,0.1)", border: "rgba(197,160,89,0.2)", featured: true,
  },
  {
    name: "ISRA™", code: "IS", subtitle: "Readiness Assessment",
    desc: "International Student Reliability Assessment — tenancy readiness without relying on UK credit history.",
    color: "#4a9eff", accent: "rgba(74,158,255,0.09)", border: "rgba(74,158,255,0.18)", featured: false,
  },
  {
    name: "Property Care™", code: "PC", subtitle: "Asset Monitoring",
    desc: "Maintenance tracking, safety compliance records, and structured property trust scoring.",
    color: "#22c55e", accent: "rgba(34,197,94,0.09)", border: "rgba(34,197,94,0.18)", featured: false,
  },
  {
    name: "Verification™", code: "VR", subtitle: "Identity & Compliance",
    desc: "Right-to-rent checks, document authentication, and compliance clearance at intake.",
    color: "#C5A059", accent: "rgba(197,160,89,0.1)", border: "rgba(197,160,89,0.2)", featured: false,
  },
  {
    name: "Continuity™", code: "CT", subtitle: "Occupancy Continuity",
    desc: "60-day void-risk alerts and seasonal intake intelligence to protect portfolio occupancy.",
    color: "#a78bfa", accent: "rgba(167,139,250,0.09)", border: "rgba(167,139,250,0.18)", featured: false,
  },
  {
    name: "Student Support™", code: "SS", subtitle: "Student Welfare",
    desc: "Arrival, settlement, career guidance, and ongoing student welfare services.",
    color: "#4a9eff", accent: "rgba(74,158,255,0.09)", border: "rgba(74,158,255,0.18)", featured: false,
  },
  {
    name: "Landlord Portal™", code: "LP", subtitle: "Landlord Dashboard",
    desc: "Property management and tenancy oversight with role-gated visibility — no student profile browsing.",
    color: "#22c55e", accent: "rgba(34,197,94,0.09)", border: "rgba(34,197,94,0.18)", featured: false,
  },
  {
    name: "Analytics™", code: "AN", subtitle: "Platform Intelligence",
    desc: "Operational reporting, trend analysis, and admin controls for platform operators.",
    color: "#f97316", accent: "rgba(249,115,22,0.09)", border: "rgba(249,115,22,0.18)", featured: false,
  },
];

const [featured, ...rest] = modules;

export default function QuantumEcosystem() {
  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{ background: "hsl(222,48%,2%)" }}
    >
      <NetworkCanvas />

      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-28 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, hsl(222,48%,2%) 0%, transparent 100%)" }} />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, hsl(222,48%,2%) 0%, transparent 100%)" }} />

      <div className="container-custom px-4 relative z-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <span
              className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase rounded-full px-4 py-1.5 mb-5"
              style={{ color: "#C5A059", background: "rgba(197,160,89,0.08)", border: "1px solid rgba(197,160,89,0.16)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Quantum Link™ Ecosystem
            </span>
            <h2
              className="font-serif font-bold leading-tight mb-4"
              style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#fff" }}
            >
              Eight layers.{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#C5A059,#E8C77E,#C5A059)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                One coordinated system.
              </span>
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.52)" }}>
              Every module connects to the others. Intake flows into matching. Matching connects to monitoring.
              Monitoring informs continuity — one managed workflow.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/innovation">
              <Button className="gap-2 h-11 px-6">
                Full Platform Details
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Featured Quantum Match™ — tall */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -5, transition: { duration: 0.22 } }}
            className="relative group md:row-span-2"
          >
            <div
              className="relative h-full rounded-2xl p-7 transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-350 pointer-events-none"
                style={{ border: `1px solid ${featured.border}`, boxShadow: `0 0 50px ${featured.accent}` }}
              />
              {/* Code badge */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                style={{ background: featured.accent, border: `1px solid ${featured.border}` }}
              >
                <span className="font-serif font-bold text-xl" style={{ color: featured.color }}>
                  {featured.code}
                </span>
              </div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] mb-1" style={{ color: featured.color }}>
                {featured.subtitle}
              </p>
              <h3 className="font-serif text-2xl font-bold mb-3" style={{ color: "#fff" }}>{featured.name}</h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.52)" }}>{featured.desc}</p>

              {/* Matching bars visualization */}
              <div className="space-y-3 mt-4">
                {[["Student Readiness", 82], ["Property Suitability", 74], ["Budget Alignment", 91], ["Occupancy Rules", 100]].map(([label, val]) => (
                  <div key={String(label)}>
                    <div className="flex justify-between mb-1.5">
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em" }}>{label}</span>
                      <span style={{ fontSize: 10, color: featured.color }}>{val}%</span>
                    </div>
                    <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${val}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: featured.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Remaining 7 modules in 2-col grid */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rest.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                whileHover={{ y: -5, transition: { duration: 0.22 } }}
                className="group relative"
              >
                <div
                  className="relative h-full rounded-2xl p-5 transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-350 pointer-events-none"
                    style={{ border: `1px solid ${item.border}`, boxShadow: `0 0 35px ${item.accent}` }}
                  />
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: item.accent, border: `1px solid ${item.border}` }}
                  >
                    <span className="font-serif font-bold text-sm" style={{ color: item.color }}>{item.code}</span>
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] mb-0.5" style={{ color: item.color }}>{item.subtitle}</p>
                  <h3 className="font-serif font-bold text-base mb-2" style={{ color: "#fff" }}>{item.name}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.50)" }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
