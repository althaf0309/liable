import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import GlassGlobe from "@/components/GlassGlobe";
import {
  Activity, Award, Building2, CheckCircle2, EyeOff,
  FileCheck, Gauge, GitBranch, LockKeyhole, ShieldCheck, WalletCards, ArrowRight,
} from "lucide-react";

// ── Particle canvas for section backgrounds ─────────────────────
function ParticleCanvas({ density = 40, opacity = 0.4 }: { density?: number; opacity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: density }, () => ({
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
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(197,160,89,0.4)`;
        ctx.fill();
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, [density]);
  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
    />
  );
}

// ── Data ────────────────────────────────────────────────────────
const innovations = [
  {
    title: "ISRA",
    name: "International Student Reliability Assessment",
    purpose: "Alternative tenancy readiness layer for international students who may not have UK credit history or UK guarantors.",
    positioning: "Liable evaluates tenancy readiness using operational indicators instead of relying only on traditional UK credit systems.",
    sees: ["Student: reliability tier, affordability range, improvement guidance", "Admin: score breakdown, risk indicators, completeness, behavioural signals", "Landlord: tier only, no personal scoring details"],
    icon: ShieldCheck,
    color: "#C5A059",
    accent: "rgba(197,160,89,0.10)",
    border: "rgba(197,160,89,0.20)",
  },
  {
    title: "PropMatch",
    name: "Controlled Allocation Engine",
    purpose: "Controlled matching between students and properties instead of public profile browsing.",
    positioning: "Properties are allocated through suitability, affordability, availability, occupancy rules, and tenancy stability.",
    sees: ["Hard filters: budget, availability, occupancy rules, tenancy suitability", "Soft factors: lifestyle compatibility, commute, property preferences", "Landlords cannot browse, filter, or rank student profiles"],
    icon: Building2,
    color: "#4a9eff",
    accent: "rgba(74,158,255,0.09)",
    border: "rgba(74,158,255,0.18)",
  },
  {
    title: "THS",
    name: "Tenancy Health Score",
    purpose: "Live tenancy stability tracking during occupancy.",
    positioning: "Liable monitors tenancy health during occupancy to support stable housing and reduce avoidable tenancy breakdown.",
    sees: ["Tracks rent behaviour, complaints, communication, tenancy stability, property care, and occupancy continuity", "Presented as Healthy, Stable, or Needs Attention", "Internal tenancy operational health indicator"],
    icon: Activity,
    color: "#22c55e",
    accent: "rgba(34,197,94,0.09)",
    border: "rgba(34,197,94,0.18)",
  },
  {
    title: "PTR",
    name: "Property Trust Record",
    purpose: "Creates a structured record of property reliability and landlord operational quality.",
    positioning: "Liable records property trust through responsiveness, maintenance history, safety documentation, rent and deposit handling, and tenant feedback signals.",
    sees: ["Landlord responsiveness and maintenance history", "Safety documentation and compliance follow-ups", "Rent and deposit handling with tenant feedback summary", "Property-level trust status without exposing private student details"],
    icon: FileCheck,
    color: "#C5A059",
    accent: "rgba(197,160,89,0.10)",
    border: "rgba(197,160,89,0.20)",
  },
  {
    title: "VTR",
    name: "Verified Tenancy Record",
    purpose: "Creates verified tenancy history after successful student occupancy.",
    positioning: "Students can build recognised UK tenancy history after successful occupancy.",
    sees: ["Tenancy completion status", "Payment consistency and tenancy duration", "Property care summary without sensitive personal details", "No immigration details, raw complaints, or personal sensitive data"],
    icon: Award,
    color: "#a78bfa",
    accent: "rgba(167,139,250,0.09)",
    border: "rgba(167,139,250,0.18)",
  },
  {
    title: "Escrow",
    name: "Controlled Payment Flow",
    purpose: "Future controlled payment layer for reducing uncertainty between landlord and tenant.",
    positioning: "Liable plans rent and deposit traceability through clearer transaction records and controlled payment visibility.",
    sees: ["Roadmap layer, not a live payment gateway in Year 1", "Rent and deposit traceability", "Clearer payment status records for admin oversight"],
    icon: WalletCards,
    color: "#4a9eff",
    accent: "rgba(74,158,255,0.09)",
    border: "rgba(74,158,255,0.18)",
  },
  {
    title: "PYO",
    name: "Portfolio Yield & Occupancy Planning",
    purpose: "Plans intake cycles, renewals, and property availability around student demand periods.",
    positioning: "Liable monitors occupancy continuity and identifies vacancy risk windows early to reduce void periods.",
    sees: ["Current proof: 60-day void-risk alert", "Future: seasonal intake intelligence", "Connects to 12-month occupancy continuity"],
    icon: Gauge,
    color: "#C5A059",
    accent: "rgba(197,160,89,0.10)",
    border: "rgba(197,160,89,0.20)",
  },
  {
    title: "CVS",
    name: "Controlled Visibility System",
    purpose: "Limits what tenants, landlords, and admins can see based on role, verified status, readiness stage, and compliance clearance.",
    positioning: "Role-based visibility protects student privacy and reduces open-selection bias.",
    sees: ["Student: own dashboard, support guidance, matched properties", "Landlord: assigned property, tenancy status, tier labels only", "Admin: operational controls, compliance tools, full workflow"],
    icon: EyeOff,
    color: "#22c55e",
    accent: "rgba(34,197,94,0.09)",
    border: "rgba(34,197,94,0.18)",
  },
];

const flows = [
  "Student Intake",
  "ISRA Assessment",
  "PropMatch",
  "Admin Review",
  "Allocation",
  "Tenancy Monitoring",
  "Property Trust Record",
];

const tenancyHealthItems = [
  "Rent behaviour",
  "Complaints",
  "Communication",
  "Tenancy stability",
  "Property care",
  "Occupancy continuity",
];

const ptrIncludes = [
  "Landlord responsiveness",
  "Maintenance history",
  "Safety documentation",
  "Rent & deposit handling",
  "Tenant feedback summary",
];

const ptrExclusions = [
  "Private student identity",
  "Raw complaint narratives",
  "Immigration or financial documents",
];

const complianceItems = [
  {
    title: "Controlled Documents",
    body: "Private document handling, authenticated access, and admin review at every stage.",
    icon: LockKeyhole,
  },
  {
    title: "Operational Audit",
    body: "Admin activity is structured around audit-oriented platform controls.",
    icon: GitBranch,
  },
  {
    title: "Managed Issue Flow",
    body: "Complaints use status tracking, evidence uploads, and controlled landlord visibility.",
    icon: FileCheck,
  },
];

const DARK = "hsl(222,52%,2%)";
const DARK2 = "hsl(222,48%,4%)";

export default function InnovationPage() {
  return (
    <div className="min-h-screen" style={{ background: DARK }}>
      <Header />
      <main className="pt-20">

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section
          className="relative min-h-[70vh] flex items-center overflow-hidden"
          style={{ background: DARK2 }}
        >
          <ParticleCanvas density={50} opacity={0.5} />

          {/* Gold aurora */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(197,160,89,0.07) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(197,160,89,0.4), transparent)",
            }}
          />

          <div className="container-custom relative z-10 px-4 py-24">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <span
                  className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase rounded-full px-4 py-1.5 mb-6"
                  style={{
                    color: "#C5A059",
                    background: "rgba(197,160,89,0.08)",
                    border: "1px solid rgba(197,160,89,0.18)",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Liable Innovation Model
                </span>

                <h1
                  className="font-serif font-bold leading-tight mb-6"
                  style={{ fontSize: "clamp(2.4rem,5vw,4rem)", color: "#fff" }}
                >
                  Controlled student housing{" "}
                  <span
                    style={{
                      background: "linear-gradient(135deg,#C5A059,#E8C77E,#C5A059)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontStyle: "italic",
                    }}
                  >
                    infrastructure
                  </span>
                </h1>

                <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.58)" }}>
                  Liable is a managed operational platform for international student housing —
                  controlled allocation, tenancy support, privacy, and occupancy continuity.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative h-[340px] sm:h-[420px] lg:h-[480px]"
              >
                <GlassGlobe />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── SYSTEM FLOW ──────────────────────────────────────────── */}
        <section className="relative py-20 overflow-hidden" style={{ background: DARK }}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(197,160,89,0.04) 0%, transparent 70%)",
            }}
          />
          <div className="container-custom px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-12"
            >
              <span
                className="text-[11px] font-semibold tracking-[0.22em] uppercase"
                style={{ color: "#C5A059" }}
              >
                System Flow
              </span>
              <h2
                className="font-serif font-bold mt-2"
                style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "#fff" }}
              >
                How the controlled workflow operates
              </h2>
            </motion.div>

            {/* Flow steps */}
            <div className="relative">
              {/* Connecting line */}
              <div
                className="hidden md:block absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 z-0"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(197,160,89,0.2), transparent)",
                }}
              />
              <div className="grid grid-cols-2 md:grid-cols-7 gap-3 relative z-10">
                {flows.map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="relative group rounded-xl p-4 text-center"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ border: "1px solid rgba(197,160,89,0.25)" }}
                    />
                    <p
                      className="font-bold text-xs tracking-widest mb-2"
                      style={{ color: "#C5A059" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="font-semibold text-xs" style={{ color: "rgba(255,255,255,0.75)" }}>
                      {step}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── MODULE CARDS ─────────────────────────────────────────── */}
        <section className="relative py-24 overflow-hidden" style={{ background: DARK2 }}>
          <ParticleCanvas density={35} opacity={0.35} />

          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(197,160,89,0.3), transparent)",
            }}
          />

          <div className="container-custom px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-2xl mx-auto mb-14"
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
                Platform Modules
              </span>
              <h2
                className="font-serif font-bold leading-tight mb-4"
                style={{ fontSize: "clamp(2rem,4vw,3.2rem)", color: "#fff" }}
              >
                Eight operational layers
              </h2>
              <p style={{ color: "rgba(255,255,255,0.50)" }}>
                Each layer is designed to protect students, build landlord trust, and give operators complete control.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {innovations.map((item, i) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: i * 0.06 }}
                  whileHover={{ y: -5, transition: { duration: 0.22 } }}
                  className="group relative rounded-2xl overflow-hidden"
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

                  {/* Top accent strip */}
                  <div
                    className="h-0.5 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-350"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${item.color}60, transparent)`,
                    }}
                  />

                  <div className="p-6">
                    {/* Icon + title row */}
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: item.accent, border: `1px solid ${item.border}` }}
                      >
                        <item.icon className="w-5 h-5" style={{ color: item.color }} />
                      </div>
                      <div>
                        <p
                          className="text-[10px] font-bold uppercase tracking-[0.2em] mb-0.5"
                          style={{ color: item.color }}
                        >
                          {item.title}
                        </p>
                        <h3 className="font-serif text-lg font-bold leading-tight" style={{ color: "#fff" }}>
                          {item.name}
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.50)" }}>
                      {item.purpose}
                    </p>

                    {/* Positioning box */}
                    <div
                      className="rounded-lg p-3.5 mb-4"
                      style={{
                        background: `${item.accent}`,
                        border: `1px solid ${item.border}`,
                      }}
                    >
                      <p
                        className="text-[9px] font-bold uppercase tracking-[0.18em] mb-1"
                        style={{ color: item.color }}
                      >
                        Platform positioning
                      </p>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.58)" }}>
                        {item.positioning}
                      </p>
                    </div>

                    {/* Bullet list */}
                    <ul className="space-y-1.5">
                      {item.sees.map((line) => (
                        <li key={line} className="flex items-start gap-2 text-xs" style={{ color: "rgba(255,255,255,0.48)" }}>
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0"
                            style={{ background: item.color }}
                          />
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ── THS SECTION ──────────────────────────────────────────── */}
        <section className="relative py-24 overflow-hidden" style={{ background: DARK }}>
          <div className="container-custom px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Visual card side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div
                className="rounded-2xl p-8 relative overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(34,197,94,0.2)",
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{
                    background: "linear-gradient(90deg, transparent, #22c55e60, transparent)",
                  }}
                />
                <div className="flex flex-col gap-4">
                  {["Healthy", "Stable", "Needs Attention"].map((label, i) => {
                    const bars = [82, 58, 28];
                    const cols = ["#22c55e", "#C5A059", "#ef4444"];
                    return (
                      <div key={label}>
                        <div className="flex justify-between mb-2">
                          <span className="text-xs font-bold" style={{ color: cols[i] }}>{label}</span>
                          <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{bars[i]}%</span>
                        </div>
                        <div
                          className="h-1.5 rounded-full overflow-hidden"
                          style={{ background: "rgba(255,255,255,0.08)" }}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${bars[i]}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{ background: cols[i] }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Shadow frame */}
              <div
                className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl -z-10"
                style={{ border: "1px solid rgba(34,197,94,0.1)" }}
              />
            </motion.div>

            {/* Text side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <span
                className="text-[11px] font-semibold tracking-[0.22em] uppercase"
                style={{ color: "#C5A059" }}
              >
                Live Tenancy Monitoring
              </span>
              <h2
                className="font-serif font-bold mt-2 mb-5"
                style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "#fff" }}
              >
                THS supports stable occupancy during the tenancy
              </h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.52)" }}>
                The Tenancy Health Score is an internal operational health indicator. It helps Liable identify
                where support may be needed during occupancy, without presenting the system as surveillance or a tenant ranking engine.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tenancyHealthItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl p-3"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: "#22c55e" }} />
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.68)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── PTR SECTION ──────────────────────────────────────────── */}
        <section className="relative py-24 overflow-hidden" style={{ background: DARK2 }}>
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(197,160,89,0.25), transparent)",
            }}
          />
          <div className="container-custom px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span
                className="text-[11px] font-semibold tracking-[0.22em] uppercase"
                style={{ color: "#C5A059" }}
              >
                Property Trust Record
              </span>
              <h2
                className="font-serif font-bold mt-2 mb-5"
                style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "#fff" }}
              >
                PTR records property reliability inside the platform
              </h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.52)" }}>
                Property Trust Record gives Liable a structured way to monitor property reliability, landlord responsiveness,
                maintenance history, safety documentation, and tenant feedback signals.
              </p>
              <div
                className="rounded-xl p-5 text-center"
                style={{
                  background: "rgba(197,160,89,0.05)",
                  border: "1px solid rgba(197,160,89,0.15)",
                }}
              >
                <p className="text-sm font-semibold mb-3" style={{ color: "#fff" }}>
                  Property Operations → PTR Status Generated
                </p>
                <div className="flex gap-3 justify-center">
                  {["Strong", "Stable", "Needs Review"].map((s) => (
                    <span
                      key={s}
                      className="text-xs font-bold px-3 py-1 rounded-full"
                      style={{
                        color: "#C5A059",
                        background: "rgba(197,160,89,0.1)",
                        border: "1px solid rgba(197,160,89,0.2)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-xl p-6"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <p
                  className="text-[10px] font-bold uppercase tracking-widest mb-4"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  PTR includes
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ptrIncludes.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: "#C5A059" }} />
                      <span className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-xl p-6"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <p
                  className="text-[10px] font-bold uppercase tracking-widest mb-4"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  PTR does not expose
                </p>
                <div className="grid grid-cols-1 gap-2.5">
                  {ptrExclusions.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span
                        className="w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0"
                        style={{ borderColor: "rgba(255,255,255,0.15)" }}
                      >
                        <span className="w-1.5 h-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.3)" }} />
                      </span>
                      <span className="text-sm" style={{ color: "rgba(255,255,255,0.50)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── COMPLIANCE ───────────────────────────────────────────── */}
        <section className="relative py-24 overflow-hidden" style={{ background: DARK }}>
          <ParticleCanvas density={30} opacity={0.3} />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(197,160,89,0.05) 0%, transparent 70%)",
            }}
          />

          <div className="container-custom px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-14"
            >
              <span
                className="text-[11px] font-semibold tracking-[0.22em] uppercase"
                style={{ color: "#C5A059" }}
              >
                Compliance-Led Infrastructure
              </span>
              <h2
                className="font-serif font-bold mt-2"
                style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "#fff" }}
              >
                Trust is built into the workflow
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {complianceItems.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -6, transition: { duration: 0.22 } }}
                  className="group relative rounded-2xl p-7"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ border: "1px solid rgba(197,160,89,0.2)" }}
                  />
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{
                      background: "rgba(197,160,89,0.1)",
                      border: "1px solid rgba(197,160,89,0.2)",
                    }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: "#C5A059" }} />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3" style={{ color: "#fff" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.52)" }}>
                    {item.body}
                  </p>
                  <div className="mt-5 flex items-center gap-1.5 transition-all duration-200 group-hover:gap-2.5">
                    <ArrowRight className="w-3.5 h-3.5" style={{ color: "#C5A059" }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
