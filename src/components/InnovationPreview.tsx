import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Building2,
  EyeOff,
  FileCheck,
  Gauge,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ── Animated canvas network background ───────────────────────────

function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = 45;
    const nodes = Array.from({ length: count }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }));

    const maxDist = 160;
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Move nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDist) {
            const a = (1 - d / maxDist) * 0.18;
            ctx.strokeStyle = `rgba(197,160,89,${a})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(197,160,89,0.45)";
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.45 }}
    />
  );
}

// ── Module card data ──────────────────────────────────────────────

const items = [
  {
    title: "ISRA",
    subtitle: "Tenancy readiness",
    body: "A structured reliability assessment for students without relying only on traditional UK credit history.",
    icon: ShieldCheck,
    color: "#C5A059",
    accent: "rgba(197,160,89,0.10)",
    border: "rgba(197,160,89,0.20)",
    featured: true,
  },
  {
    title: "PropMatch",
    subtitle: "Controlled allocation",
    body: "Matching is controlled by suitability, affordability, occupancy rules, and admin review.",
    icon: Building2,
    color: "#4a9eff",
    accent: "rgba(74,158,255,0.09)",
    border: "rgba(74,158,255,0.18)",
    featured: false,
  },
  {
    title: "THS",
    subtitle: "Live tenancy health",
    body: "An internal operational health indicator for rent behaviour, complaints, communication, and stability.",
    icon: Activity,
    color: "#22c55e",
    accent: "rgba(34,197,94,0.09)",
    border: "rgba(34,197,94,0.18)",
    featured: false,
  },
  {
    title: "PTR",
    subtitle: "Property trust record",
    body: "Property reliability structured through maintenance history, safety docs, responsiveness, and feedback.",
    icon: FileCheck,
    color: "#C5A059",
    accent: "rgba(197,160,89,0.10)",
    border: "rgba(197,160,89,0.20)",
    featured: false,
  },
  {
    title: "PYO",
    subtitle: "Portfolio planning",
    body: "Void-risk alerts help Liable act before properties become empty.",
    icon: Gauge,
    color: "#a78bfa",
    accent: "rgba(167,139,250,0.09)",
    border: "rgba(167,139,250,0.18)",
    featured: false,
  },
  {
    title: "Escrow",
    subtitle: "Payment control",
    body: "Roadmap payment controls improve rent and deposit traceability.",
    icon: WalletCards,
    color: "#4a9eff",
    accent: "rgba(74,158,255,0.09)",
    border: "rgba(74,158,255,0.18)",
    featured: false,
  },
  {
    title: "CVS",
    subtitle: "Controlled visibility",
    body: "Students, landlords, and admins see different data levels to reduce bias and protect privacy.",
    icon: EyeOff,
    color: "#22c55e",
    accent: "rgba(34,197,94,0.09)",
    border: "rgba(34,197,94,0.18)",
    featured: false,
  },
];

// ── Mini ISRA gauge animation ─────────────────────────────────────

function ISRAGauge() {
  return (
    <div className="flex items-center gap-6 mt-5">
      {["LOW", "MED", "HIGH"].map((band, i) => {
        const widths = ["75%", "48%", "22%"];
        const colors = ["#22c55e", "#C5A059", "#ef4444"];
        return (
          <div key={band} className="flex-1">
            <div className="flex justify-between mb-1.5">
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em" }}>
                {band}
              </span>
            </div>
            <div
              className="h-1 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: widths[i] }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: colors[i] }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Module card ───────────────────────────────────────────────────

function ModuleCard({
  item,
  index,
  featured = false,
}: {
  item: (typeof items)[0];
  index: number;
  featured?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ y: -5, transition: { duration: 0.22 } }}
      className={`relative group ${featured ? "md:row-span-2" : ""}`}
    >
      <div
        className="relative h-full rounded-2xl p-6 transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-350 pointer-events-none"
          style={{
            border: `1px solid ${item.border}`,
            boxShadow: `0 0 40px ${item.accent}`,
          }}
        />

        {/* Icon */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
          style={{ background: item.accent, border: `1px solid ${item.border}` }}
        >
          <item.icon className="w-5 h-5" style={{ color: item.color }} />
        </div>

        {/* Label */}
        <p
          className="text-[11px] font-bold uppercase tracking-[0.18em] mb-1"
          style={{ color: item.color }}
        >
          {item.title}
        </p>

        {/* Subtitle */}
        <h3 className="font-serif text-lg font-bold mb-3" style={{ color: "#fff" }}>
          {item.subtitle}
        </h3>

        {/* Body */}
        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.50)" }}>
          {item.body}
        </p>

        {/* Featured: ISRA gauge */}
        {featured && <ISRAGauge />}
      </div>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────

export default function InnovationPreview() {
  const [featured, ...rest] = items;

  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: "hsl(222,48%,2%)" }}
    >
      {/* Animated particle network */}
      <NetworkCanvas />

      {/* Top edge fade */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, hsl(222,48%,3%) 0%, transparent 100%)",
        }}
      />
      {/* Bottom edge fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to top, hsl(222,48%,3%) 0%, transparent 100%)",
        }}
      />

      <div className="container-custom px-4 relative z-20">
        {/* Section header */}
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
              style={{
                color: "#C5A059",
                background: "rgba(197,160,89,0.08)",
                border: "1px solid rgba(197,160,89,0.16)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Platform Innovations
            </span>
            <h2
              className="font-serif font-bold leading-tight mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff" }}
            >
              Built as infrastructure,{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #C5A059, #E8C77E, #C5A059)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                not an advert board
              </span>
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.52)" }}>
              Intake data, tenancy readiness, controlled allocation, live monitoring, and
              role-based visibility — one managed workflow.
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
                View Innovation Model
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Bento grid — featured (ISRA) + 6 modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Featured ISRA — spans 1 col but taller */}
          <ModuleCard item={featured} index={0} featured />

          {/* Remaining 6 items — 2-col section */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rest.map((item, i) => (
              <ModuleCard key={item.title} item={item} index={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
