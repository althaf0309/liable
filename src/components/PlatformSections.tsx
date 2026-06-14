/**
 * Homepage narrative sections:
 * - WhatIsQuantumLink
 * - HowItWorks
 * - JourneySection (Student + Landlord)
 * - PlatformStats
 * - QuantumCTA
 */

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, CheckCircle2, Users, Building2, ShieldCheck,
  Activity, Zap, Lock, BarChart3, Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const DARK = "hsl(222,52%,2%)";
const DARK2 = "hsl(222,48%,4%)";

// ── Shared fade-in wrapper ──────────────────────────────────────
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════
// 1. What is Quantum Link™
// ══════════════════════════════════════════════════════════════════
export function WhatIsQuantumLink() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "Controlled, not open",
      body: "Properties are matched by Liable administrators — not browsed by landlords scanning student profiles.",
      color: "#C5A059",
    },
    {
      icon: Activity,
      title: "Live monitoring",
      body: "Tenancy health, rent behaviour, and property care are tracked in real time across the portfolio.",
      color: "#4a9eff",
    },
    {
      icon: Lock,
      title: "Role-based visibility",
      body: "Students, landlords, and admins each see only what's appropriate to their role. No raw data leakage.",
      color: "#22c55e",
    },
    {
      icon: Zap,
      title: "Built as infrastructure",
      body: "Every intake, allocation, tenancy, and decision runs through one verified, auditable workflow.",
      color: "#a78bfa",
    },
  ];

  return (
    <section className="relative py-28 overflow-hidden" style={{ background: DARK2 }}>
      {/* Gold top border */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(197,160,89,0.4), transparent)" }} />

      {/* Background aurora */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(197,160,89,0.05) 0%, transparent 70%)" }} />

      <div className="container-custom px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: headline */}
          <FadeIn>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase rounded-full px-4 py-1.5 mb-6"
              style={{ color: "#C5A059", background: "rgba(197,160,89,0.08)", border: "1px solid rgba(197,160,89,0.16)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              What is Quantum Link™
            </span>
            <h2 className="font-serif font-bold leading-tight mb-6"
              style={{ fontSize: "clamp(2rem,4vw,3.2rem)", color: "#fff" }}>
              Not a listing board.{" "}
              <span style={{
                background: "linear-gradient(135deg,#C5A059,#E8C77E,#C5A059)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                A managed ecosystem.
              </span>
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
              Quantum Link™ is the operational infrastructure that connects verification,
              matching, continuity, and support into one coordinated system.
              Unlike property portals, the platform is operated by Liable staff — every
              allocation, tenancy, and decision is reviewed by a real human.
            </p>
            <Link to="/innovation">
              <Button className="gap-2 h-11 px-6">
                See How It Works
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </FadeIn>

          {/* Right: pillars grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((p, i) => (
              <FadeIn key={p.title} delay={0.1 + i * 0.1}>
                <div
                  className="group relative rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${p.color}18`, border: `1px solid ${p.color}28` }}>
                    <p.icon className="w-4.5 h-4.5" style={{ color: p.color }} />
                  </div>
                  <h3 className="font-serif font-bold text-sm mb-2" style={{ color: "#fff" }}>{p.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.48)" }}>{p.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════
// 2. How Quantum Match Works
// ══════════════════════════════════════════════════════════════════
export function HowItWorks() {
  const steps = [
    { step: "01", title: "Student Intake", body: "Complete ISRA™ assessment — reliability, affordability, residency stability, and operational trust." },
    { step: "02", title: "Admin Review", body: "Liable operators review every application. No automated decision-making at intake stage." },
    { step: "03", title: "Quantum Match™", body: "Matching runs on budget, availability, occupancy rules, suitability, and lifestyle compatibility." },
    { step: "04", title: "Allocation", body: "Property is allocated and tenancy agreement issued. Student confirmed, landlord notified." },
    { step: "05", title: "Live Monitoring", body: "THS tracks tenancy health throughout. Liable intervenes before issues escalate." },
    { step: "06", title: "Continuity", body: "PYO monitors void risk. Renewals managed proactively. Occupancy maintained year-round." },
  ];

  return (
    <section className="relative py-28 overflow-hidden" style={{ background: DARK }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 40% at 50% 50%, rgba(74,158,255,0.03) 0%, transparent 70%)" }} />

      <div className="container-custom px-4">
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase rounded-full px-4 py-1.5 mb-5"
            style={{ color: "#C5A059", background: "rgba(197,160,89,0.08)", border: "1px solid rgba(197,160,89,0.16)" }}>
            How It Works
          </span>
          <h2 className="font-serif font-bold leading-tight mb-4"
            style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#fff" }}>
            From intake to continuity,{" "}
            <span style={{
              background: "linear-gradient(135deg,#C5A059,#E8C77E,#C5A059)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              every step is managed
            </span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((s, i) => (
            <FadeIn key={s.step} delay={i * 0.08}>
              <div
                className="group relative rounded-2xl p-6 h-full transition-all duration-300 hover:-translate-y-1.5"
                style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ border: "1px solid rgba(197,160,89,0.2)" }} />
                <p className="font-bold text-xs tracking-widest mb-4" style={{ color: "#C5A059" }}>{s.step}</p>
                <h3 className="font-serif text-lg font-bold mb-2" style={{ color: "#fff" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.50)" }}>{s.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════
// 3. Journey Sections
// ══════════════════════════════════════════════════════════════════
export function JourneySection() {
  const studentSteps = [
    "Complete ISRA™ readiness assessment",
    "Submit documentation for verification",
    "Receive Quantum Match™ allocation",
    "Tenancy agreement issued by Liable",
    "Move in with operational support",
    "Build verified tenancy record (VTR™)",
  ];

  const landlordSteps = [
    "List property through Liable's managed intake",
    "Property Trust Record (PTR™) established",
    "Qualified tenants matched — no profile browsing",
    "Tenancy start confirmed with documentation",
    "Ongoing occupancy monitoring via THS™",
    "Renewal managed proactively by Liable",
  ];

  return (
    <section className="relative py-28 overflow-hidden" style={{ background: DARK2 }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(197,160,89,0.3), transparent)" }} />

      <div className="container-custom px-4">
        <FadeIn className="text-center max-w-xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase rounded-full px-4 py-1.5 mb-5"
            style={{ color: "#C5A059", background: "rgba(197,160,89,0.08)", border: "1px solid rgba(197,160,89,0.16)" }}>
            Platform Journeys
          </span>
          <h2 className="font-serif font-bold" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#fff" }}>
            Built for both sides of the tenancy
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Student Journey */}
          <FadeIn delay={0.1}>
            <div
              className="rounded-2xl p-8 h-full"
              style={{ background: "rgba(74,158,255,0.05)", backdropFilter: "blur(16px)", border: "1px solid rgba(74,158,255,0.14)" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(74,158,255,0.1)", border: "1px solid rgba(74,158,255,0.2)" }}>
                  <Users className="w-5 h-5" style={{ color: "#4a9eff" }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: "#4a9eff" }}>Student Portal™</p>
                  <h3 className="font-serif font-bold text-lg" style={{ color: "#fff" }}>Student Journey</h3>
                </div>
              </div>
              <div className="space-y-3">
                {studentSteps.map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    className="flex items-start gap-3"
                  >
                    <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "rgba(74,158,255,0.15)", border: "1px solid rgba(74,158,255,0.25)" }}>
                      <span className="text-[9px] font-bold" style={{ color: "#4a9eff" }}>{i + 1}</span>
                    </span>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{step}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6">
                <Link to="/services/students">
                  <button className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
                    style={{ color: "#4a9eff" }}>
                    Student Services
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* Landlord Journey */}
          <FadeIn delay={0.2}>
            <div
              className="rounded-2xl p-8 h-full"
              style={{ background: "rgba(197,160,89,0.05)", backdropFilter: "blur(16px)", border: "1px solid rgba(197,160,89,0.14)" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(197,160,89,0.1)", border: "1px solid rgba(197,160,89,0.2)" }}>
                  <Building2 className="w-5 h-5" style={{ color: "#C5A059" }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: "#C5A059" }}>Landlord Portal™</p>
                  <h3 className="font-serif font-bold text-lg" style={{ color: "#fff" }}>Landlord Journey</h3>
                </div>
              </div>
              <div className="space-y-3">
                {landlordSteps.map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.07 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#C5A059" }} />
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{step}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6">
                <Link to="/services/landlords">
                  <button className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
                    style={{ color: "#C5A059" }}>
                    Landlord Services
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════
// 4. Platform Statistics
// ══════════════════════════════════════════════════════════════════
export function PlatformStats() {
  const stats = [
    { value: "10K+", label: "Students Supported", icon: Users, color: "#C5A059" },
    { value: "2K+", label: "Properties Managed", icon: Building2, color: "#C5A059" },
    { value: "99%", label: "Occupancy Rate", icon: BarChart3, color: "#C5A059" },
    { value: "5", label: "Countries Supported", icon: Globe, color: "#C5A059" },
    { value: "24/7", label: "Support Available", icon: Activity, color: "#C5A059" },
  ];

  return (
    <section className="relative py-24 overflow-hidden" style={{ background: DARK }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(197,160,89,0.04) 0%, transparent 70%)" }} />

      <div className="container-custom px-4">
        <FadeIn className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase rounded-full px-4 py-1.5 mb-5"
            style={{ color: "#C5A059", background: "rgba(197,160,89,0.08)", border: "1px solid rgba(197,160,89,0.16)" }}>
            LGS Platform Statistics
          </span>
          <h2 className="font-serif font-bold" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "#fff" }}>
            Infrastructure at scale
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.07}>
              <div
                className="group relative rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1"
                style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ border: `1px solid ${s.color}28` }} />
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-3"
                  style={{ background: `${s.color}14`, border: `1px solid ${s.color}22` }}>
                  <s.icon className="w-4 h-4" style={{ color: s.color }} />
                </div>
                <p className="font-serif font-bold text-2xl mb-1" style={{ color: "#E8C77E" }}>{s.value}</p>
                <p className="text-[10px] leading-tight" style={{ color: "rgba(255,255,255,0.42)" }}>{s.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════
// 5. CTA
// ══════════════════════════════════════════════════════════════════
export function QuantumCTA() {
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: DARK2 }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(197,160,89,0.4), transparent)" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(197,160,89,0.05) 0%, transparent 70%)" }} />

      <div className="container-custom px-4 text-center relative z-10">
        <FadeIn>
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase rounded-full px-4 py-1.5 mb-8"
            style={{ color: "#C5A059", background: "rgba(197,160,89,0.08)", border: "1px solid rgba(197,160,89,0.18)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Get Started
          </span>

          <h2 className="font-serif font-bold leading-tight mb-6 max-w-2xl mx-auto"
            style={{ fontSize: "clamp(2rem,4vw,3.4rem)", color: "#fff" }}>
            Join the Quantum Link™{" "}
            <span style={{
              background: "linear-gradient(135deg,#C5A059,#E8C77E,#C5A059)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              ecosystem
            </span>
          </h2>

          <p className="text-base leading-relaxed mb-10 max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.52)" }}>
            Whether you're an international student looking for verified housing or a landlord
            seeking qualified tenants — Liable manages the entire journey.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/services/students">
              <Button className="h-12 px-8 gap-2 text-sm font-semibold">
                I'm a Student
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/services/landlords">
              <Button
                variant="outline"
                className="h-12 px-8 text-sm font-semibold"
                style={{ borderColor: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.75)", background: "transparent" }}
              >
                I'm a Landlord
              </Button>
            </Link>
            <Link to="/innovation">
              <button className="h-12 px-8 text-sm font-semibold rounded-xl transition-opacity hover:opacity-70 inline-flex items-center gap-2"
                style={{ color: "#C5A059" }}>
                Explore the Platform
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
