import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Shield, Home, Activity, FileCheck, Zap,
  Heart, Headphones, Bell, GitBranch, Users, Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const IMG_HERO    = "https://images.unsplash.com/photo-1640035012100-faf53d817838?fm=jpg&q=80&w=1920&auto=format&fit=crop";
const IMG_BRIDGE  = "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?fm=jpg&q=80&w=1920&auto=format&fit=crop";
const IMG_SHARD   = "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?fm=jpg&q=80&w=1920&auto=format&fit=crop";

const modules = [
  {
    id: "01",
    name: "ISRA",
    full: "Intake Stability & Readiness Assessment",
    description: "Assesses student tenancy readiness using profile completeness, affordability, residency stability, and operational trust indicators before any matching begins.",
    icon: Shield,
    color: "hsl(42,80%,50%)",
    img: "https://images.unsplash.com/photo-1640035012100-faf53d817838?fm=jpg&q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "02",
    name: "PropMatch",
    full: "Controlled Property Allocation",
    description: "Allocates properties through budget, availability, occupancy rules, and location suitability. Landlords do not browse student profiles — every match is admin-reviewed.",
    icon: Home,
    color: "hsl(210,74%,52%)",
    img: "https://images.unsplash.com/photo-1510265119258-db115b0e8172?fm=jpg&q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "03",
    name: "THS",
    full: "Tenancy Health Score",
    description: "An internal operational health indicator tracking rent behaviour, complaints, communication, property care, and continuity to support stable occupancy.",
    icon: Activity,
    color: "hsl(42,80%,50%)",
    img: "https://images.unsplash.com/photo-1512359953714-f0c9a632ab85?fm=jpg&q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "04",
    name: "PTR",
    full: "Property Trust Record",
    description: "Structures property reliability through landlord responsiveness, maintenance history, safety documentation, and deposit handling signals.",
    icon: FileCheck,
    color: "hsl(210,74%,52%)",
    img: "https://images.unsplash.com/photo-1550647512-8b8a24d4f646?fm=jpg&q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "05",
    name: "Quantum Flow",
    full: "Lifecycle Stage Engine",
    description: "Manages the complete student journey: Inquiry → Verify → Match → Contract → Onboard → Move-In → Active → Care → Renewal → Exit.",
    icon: GitBranch,
    color: "hsl(42,80%,50%)",
    img: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?fm=jpg&q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "06",
    name: "Quantum Care",
    full: "Maintenance & Complaint Workflow",
    description: "Structured maintenance request and complaint management with priority triage, landlord escalation, and THS impact tracking.",
    icon: Heart,
    color: "hsl(210,74%,52%)",
    img: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?fm=jpg&q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "07",
    name: "Quantum Support",
    full: "Service Request Management",
    description: "Handles operational service requests outside maintenance — renewals, extensions, disputes — with a full event history and resolution tracking.",
    icon: Headphones,
    color: "hsl(42,80%,50%)",
    img: "https://images.unsplash.com/photo-1566515610329-94f02c3707d6?fm=jpg&q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "08",
    name: "Quantum Assist",
    full: "Proactive Reminder System",
    description: "Sends targeted reminders to students and operators for upcoming rent, document renewals, visa expiry, and tenancy milestones.",
    icon: Bell,
    color: "hsl(210,74%,52%)",
    img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?fm=jpg&q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "09",
    name: "PYO",
    full: "Property Yield Optimiser",
    description: "Tracks landlord yield, occupancy rate, void periods, and maintenance cost ratios to guide operational property decisions.",
    icon: Zap,
    color: "hsl(42,80%,50%)",
    img: "https://images.unsplash.com/photo-1480449649358-ee14c6ee0b17?fm=jpg&q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "10",
    name: "Agency Link",
    full: "Agency Partner Referral System",
    description: "Allows registered agency partners to submit student referrals into the Quantum pipeline with commission tracking and lifecycle visibility.",
    icon: Users,
    color: "hsl(210,74%,52%)",
    img: "https://images.unsplash.com/photo-1448906654166-444d494666b3?fm=jpg&q=80&w=800&auto=format&fit=crop",
  },
];

const stats = [
  { value: "10", label: "Integrated Modules" },
  { value: "3", label: "User Flows" },
  { value: "100%", label: "Human-Reviewed" },
  { value: "0", label: "Autonomous Decisions" },
];

const flows = [
  {
    role: "Student",
    steps: [
      "Register and complete profile",
      "ISRA assesses tenancy readiness",
      "PropMatch allocates a suitable property",
      "Admin reviews and confirms the match",
      "Contract checklist completed by operator",
      "Onboarding and move-in coordinated",
      "THS monitors tenancy health throughout",
      "Care and Support available for issues",
      "Renewal or Exit managed at lifecycle end",
    ],
    cta: { label: "Register as Student", href: "/auth?register=student" },
    color: "hsl(42,80%,50%)",
  },
  {
    role: "Landlord",
    steps: [
      "Register and submit property",
      "Property reviewed and approved by Liable",
      "PTR tracks property reliability signals",
      "PropMatch allocates vetted students",
      "Tenancy created and monitored",
      "Maintenance and complaints routed via Care",
      "PYO tracks yield and occupancy performance",
    ],
    cta: { label: "Register as Landlord", href: "/auth?register=landlord" },
    color: "hsl(210,74%,52%)",
  },
  {
    role: "Agency Partner",
    steps: [
      "Partner registered by Liable admin",
      "Submit student referral with contact details",
      "Referred student enters Quantum Flow intake",
      "Agency tracks referral stage in real time",
      "Commission calculated on tenancy activation",
      "Payout processed when tenancy is live",
    ],
    cta: { label: "Contact Us", href: "/contact" },
    color: "hsl(42,80%,50%)",
  },
];

export default function QuantumLinkPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative h-[85vh] min-h-[580px] flex items-center overflow-hidden pt-20">
        <img
          src={IMG_HERO}
          alt="London at night aerial"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(222,48%,4%)]/92 via-[hsl(222,48%,4%)]/70 to-[hsl(222,48%,4%)]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        {/* gold ambient */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[hsl(42,80%,50%)]/[0.04] to-transparent pointer-events-none" />

        <div className="container-custom relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="max-w-2xl"
          >
            <span className="inline-block text-primary font-semibold text-xs tracking-[0.22em] uppercase mb-5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25">
              Quantum Link Platform
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Operational Intelligence for{" "}
              <span className="text-primary italic">Student Housing</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              Quantum Link is not a marketplace. It is a structured operational infrastructure that manages every stage of the student housing journey — with a human operator reviewing every decision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth?register=student">
                <Button size="lg" className="gap-2 px-8 h-12">
                  Register as Student <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/auth?register=landlord">
                <Button size="lg" variant="outline" className="gap-2 px-8 h-12 border-white/20 text-white hover:bg-white/10">
                  Register as Landlord
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────── */}
      <section className="border-y border-border bg-[hsl(220,44%,8%)]">
        <div className="container-custom px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="py-8 px-6 text-center"
              >
                <p className="font-serif text-4xl md:text-5xl font-bold text-primary">{s.value}</p>
                <p className="text-muted-foreground text-sm mt-2">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HUMAN-IN-THE-LOOP ─────────────────────────────────── */}
      <section className="py-20">
        <div className="container-custom px-4">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto rounded-2xl border border-primary/20 bg-primary/5 p-10 md:p-14 text-center">
              <div className="inline-flex items-center gap-3 bg-primary/10 border border-primary/25 rounded-full px-5 py-2.5 mb-6">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-semibold tracking-wide">Human-in-the-Loop Principle</span>
              </div>
              <p className="text-foreground text-xl leading-relaxed">
                Every scoring result, property match, contract milestone, and lifecycle
                transition is reviewed by a Liable operator before any action is taken.{" "}
                <span className="text-primary font-semibold">
                  Quantum Link never makes autonomous decisions about tenancies.
                </span>
              </p>
              <div className="mt-8 flex items-center justify-center gap-2 text-muted-foreground text-sm">
                <Eye className="w-4 h-4 text-primary" />
                Every action is operator-initiated, logged, and auditable.
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── IMAGE BREAK — London Bridge ───────────────────────── */}
      <div className="relative h-[260px] md:h-[360px] overflow-hidden">
        <img
          src={IMG_BRIDGE}
          alt="London Bridge"
          className="w-full h-full object-cover object-[center_60%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background/70" />
        <AnimatedSection className="absolute inset-0 flex items-center justify-center px-4">
          <p className="font-serif text-2xl md:text-4xl font-bold text-white text-center drop-shadow-2xl max-w-2xl">
            From intake to exit — every stage tracked, every decision reviewed.
          </p>
        </AnimatedSection>
      </div>

      {/* ── 10-MODULE CHAIN ───────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-custom px-4">
          <AnimatedSection className="text-center mb-14">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">The Platform</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mt-3">
              10 Integrated Modules
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-lg">
              Each module operates as a distinct operational layer. Together they form
              a complete end-to-end housing management system.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {modules.map((mod, i) => (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/25 hover:shadow-[0_0_28px_hsl(42_80%_50%/0.08)] transition-all duration-300"
              >
                {/* Module image */}
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={mod.img}
                    alt={mod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(222,48%,4%)]/40 to-[hsl(222,48%,4%)]/90" />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(135deg, ${mod.color}18, transparent)` }}
                  />
                  {/* Module ID badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className="text-[10px] font-bold tracking-[0.2em] px-2.5 py-1 rounded-full"
                      style={{ background: `${mod.color}20`, color: mod.color, border: `1px solid ${mod.color}35` }}
                    >
                      {mod.id}
                    </span>
                  </div>
                  {/* Icon overlay */}
                  <div
                    className="absolute bottom-3 right-3 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${mod.color}20`, border: `1px solid ${mod.color}35` }}
                  >
                    <mod.icon className="w-5 h-5" style={{ color: mod.color }} />
                  </div>
                  {/* Top accent line on hover */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, transparent, ${mod.color}, transparent)` }}
                  />
                </div>

                {/* Card body */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-display font-bold text-foreground text-lg">{mod.name}</span>
                  </div>
                  <p className="text-xs font-semibold mb-3" style={{ color: mod.color }}>{mod.full}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{mod.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THREE FLOWS ───────────────────────────────────────── */}
      <section className="section-padding bg-[hsl(220,44%,8%)]">
        <div className="container-custom px-4">
          <AnimatedSection className="text-center mb-14">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">How It Works</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mt-3">
              Three Paths, One System
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Whether you are a student, landlord, or agency partner — Quantum Link manages your journey end-to-end.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {flows.map((flow, i) => (
              <AnimatedSection key={flow.role} delay={i * 0.1}>
                <div className="bg-card border border-border rounded-2xl p-7 h-full flex flex-col hover:border-primary/20 transition-colors">
                  <div
                    className="text-xs font-bold tracking-[0.18em] uppercase mb-2 pb-5 border-b flex items-center gap-2"
                    style={{ color: flow.color, borderColor: `${flow.color}20` }}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: flow.color }}
                    />
                    {flow.role}
                  </div>
                  <ol className="space-y-3 flex-1 mb-6 mt-4">
                    {flow.steps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                          style={{ background: `${flow.color}15`, color: flow.color }}
                        >
                          {idx + 1}
                        </span>
                        <span className="text-sm text-muted-foreground leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                  <Link to={flow.cta.href}>
                    <Button
                      variant="outline"
                      className="w-full gap-2 transition-all"
                      style={{ borderColor: `${flow.color}35`, color: flow.color }}
                    >
                      {flow.cta.label} <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA — London from The Shard background ────────────── */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <img
          src={IMG_SHARD}
          alt="London from The Shard"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[hsl(222,48%,4%)]/88" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

        <div className="container-custom px-4 relative z-10">
          <AnimatedSection className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-5">
              Ready to Enter the System?
            </h2>
            <p className="text-white/65 text-lg mb-10">
              Registration is the first step in the Quantum Link intake flow.
              Complete your profile and ISRA begins your readiness assessment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth?register=student">
                <Button size="lg" className="gap-2 px-10 h-12">
                  Register as Student <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/auth?register=landlord">
                <Button size="lg" variant="outline" className="gap-2 px-10 h-12 border-white/20 text-white hover:bg-white/10">
                  Register as Landlord
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
