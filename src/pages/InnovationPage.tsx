import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AnimatedSection from "@/components/AnimatedSection";
import {
  Activity, Award, Building2, CheckCircle2, EyeOff,
  FileCheck, Gauge, GitBranch, LockKeyhole, ShieldCheck, WalletCards, ArrowRight,
} from "lucide-react";

const IMG_HERO       = "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?fm=jpg&q=80&w=1920&auto=format&fit=crop";
const IMG_LONDON_BRIDGE = "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?fm=jpg&q=80&w=1920&auto=format&fit=crop";
const IMG_RESIDENTIAL = "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?fm=jpg&q=80&w=1200&auto=format&fit=crop";
const IMG_NIGHT      = "https://images.unsplash.com/photo-1640035012100-faf53d817838?fm=jpg&q=80&w=1920&auto=format&fit=crop";

const innovations = [
  {
    title: "ISRA",
    name: "International Student Reliability Assessment",
    purpose: "Alternative tenancy readiness layer for international students who may not have UK credit history or UK guarantors.",
    positioning: "Liable evaluates tenancy readiness using operational indicators instead of relying only on traditional UK credit systems.",
    sees: ["Student: reliability tier, affordability range, improvement guidance", "Admin: score breakdown, risk indicators, completeness, behavioural signals", "Landlord: tier only, no personal scoring details"],
    icon: ShieldCheck,
    accent: "hsl(42,80%,50%)",
    img: "https://images.unsplash.com/photo-1640035012100-faf53d817838?fm=jpg&q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "PropMatch",
    name: "Controlled Allocation Engine",
    purpose: "Controlled matching between students and properties instead of public profile browsing.",
    positioning: "Properties are allocated through suitability, affordability, availability, occupancy rules, and tenancy stability.",
    sees: ["Hard filters: budget, availability, occupancy rules, tenancy suitability", "Soft factors: lifestyle compatibility, commute, property preferences", "Landlords cannot browse, filter, or rank student profiles"],
    icon: Building2,
    accent: "hsl(210,74%,52%)",
    img: "https://images.unsplash.com/photo-1510265119258-db115b0e8172?fm=jpg&q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "THS",
    name: "Tenancy Health Score",
    purpose: "Live tenancy stability tracking during occupancy.",
    positioning: "Liable monitors tenancy health during occupancy to support stable housing and reduce avoidable tenancy breakdown.",
    sees: ["Tracks rent behaviour, complaints, communication, tenancy stability, property care, and occupancy continuity", "Presented as Healthy, Stable, or Needs Attention", "Internal tenancy operational health indicator, not a tenant ranking engine"],
    icon: Activity,
    accent: "hsl(42,80%,50%)",
    img: "https://images.unsplash.com/photo-1512359953714-f0c9a632ab85?fm=jpg&q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "PTR",
    name: "Property Trust Record",
    purpose: "Creates a structured record of property reliability and landlord operational quality.",
    positioning: "Liable records property trust through responsiveness, maintenance history, safety documentation, rent and deposit handling, and tenant feedback signals.",
    sees: ["Landlord responsiveness and maintenance history", "Safety documentation and compliance follow-ups", "Rent and deposit handling with tenant feedback summary", "Property-level trust status without exposing private student details"],
    icon: FileCheck,
    accent: "hsl(210,74%,52%)",
    img: "https://images.unsplash.com/photo-1550647512-8b8a24d4f646?fm=jpg&q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "VTR",
    name: "Verified Tenancy Record",
    purpose: "Creates verified tenancy history after successful student occupancy.",
    positioning: "Students can build recognised UK tenancy history after successful occupancy.",
    sees: ["Tenancy completion status", "Payment consistency and tenancy duration", "Property care summary without sensitive personal details", "No immigration details, raw complaints, or personal sensitive data"],
    icon: Award,
    accent: "hsl(42,80%,50%)",
    img: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?fm=jpg&q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Escrow",
    name: "Controlled Payment Flow",
    purpose: "Future controlled payment layer for reducing uncertainty between landlord and tenant.",
    positioning: "Liable plans rent and deposit traceability through clearer transaction records and controlled payment visibility.",
    sees: ["Roadmap layer, not a live payment gateway in the Year 1 proof", "Rent and deposit traceability", "Clearer payment status records for admin oversight"],
    icon: WalletCards,
    accent: "hsl(210,74%,52%)",
    img: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?fm=jpg&q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "PYO",
    name: "Portfolio Yield & Occupancy Planning",
    purpose: "Plans intake cycles, renewals, and property availability around student demand periods.",
    positioning: "Liable monitors occupancy continuity and identifies vacancy risk windows early to reduce void periods.",
    sees: ["Current proof: 60-day void-risk alert", "Future: seasonal intake intelligence", "Connects to 12-month occupancy continuity"],
    icon: Gauge,
    accent: "hsl(42,80%,50%)",
    img: "https://images.unsplash.com/photo-1480449649358-ee14c6ee0b17?fm=jpg&q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "CVS",
    name: "Controlled Visibility System",
    purpose: "Limits what tenants, landlords, and admins can see based on role, verified status, readiness stage, and compliance clearance.",
    positioning: "Role-based visibility protects student privacy and reduces open-selection bias.",
    sees: ["Student: own dashboard, support guidance, matched properties", "Landlord: assigned property, tenancy status, occupancy status, tier labels only", "Admin: operational controls, compliance tools, full workflow"],
    icon: EyeOff,
    accent: "hsl(210,74%,52%)",
    img: "https://images.unsplash.com/photo-1566515610329-94f02c3707d6?fm=jpg&q=80&w=800&auto=format&fit=crop",
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
  { title: "Controlled Documents", body: "Private document handling, authenticated access, and admin review at every stage.", icon: LockKeyhole },
  { title: "Operational Audit", body: "Admin activity is structured around audit-oriented platform controls.", icon: GitBranch },
  { title: "Managed Issue Flow", body: "Complaints use status tracking, evidence uploads, and controlled landlord visibility.", icon: FileCheck },
];

export default function InnovationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">

        {/* ── HERO ──────────────────────────────────────────────── */}
        <section className="relative h-[75vh] min-h-[520px] flex items-center overflow-hidden">
          <img
            src={IMG_HERO}
            alt="London skyline from The Shard"
            className="absolute inset-0 w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(222,48%,4%)]/95 via-[hsl(222,48%,4%)]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

          <div className="container-custom relative z-10 px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="max-w-2xl"
            >
              <span className="inline-block text-primary font-semibold text-xs tracking-[0.22em] uppercase mb-5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                Liable Innovation Model
              </span>
              <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
                Controlled student housing{" "}
                <span className="text-primary italic">infrastructure</span>
              </h1>
              <p className="text-white/70 text-lg md:text-xl leading-relaxed">
                Liable is a managed operational platform for international student housing — controlled allocation, tenancy support, privacy, and occupancy continuity.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── SYSTEM FLOW ───────────────────────────────────────── */}
        <section className="section-padding bg-[hsl(220,44%,8%)]">
          <div className="container-custom">
            <AnimatedSection className="mb-12">
              <span className="text-primary font-semibold text-xs tracking-[0.2em] uppercase">System Flow</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3">
                How the controlled workflow operates
              </h2>
            </AnimatedSection>

            <div className="relative">
              {/* connecting line */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent -translate-y-1/2 z-0" />
              <div className="grid grid-cols-2 md:grid-cols-7 gap-3 relative z-10">
                {flows.map((step, index) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.07 }}
                    className="bg-background border border-border rounded-xl p-4 text-center hover:border-primary/30 transition-colors group"
                  >
                    <p className="text-primary font-bold text-xs tracking-widest mb-2">{String(index + 1).padStart(2, "0")}</p>
                    <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{step}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── INNOVATION MODULE CARDS ────────────────────────────── */}
        <section className="section-padding">
          <div className="container-custom">
            <AnimatedSection className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-primary font-semibold text-xs tracking-[0.2em] uppercase">Platform Modules</span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mt-3">
                Eight operational layers
              </h2>
              <p className="text-muted-foreground mt-4 text-lg">
                Each layer is designed to protect students, build landlord trust, and give operators complete control.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {innovations.map((item, i) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="group relative border border-border rounded-2xl bg-card overflow-hidden hover:border-primary/25 transition-all duration-300 hover:shadow-[0_0_30px_hsl(42_80%_50%/0.08)] hover:-translate-y-0.5"
                >
                  {/* Module image header */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(222,48%,4%)]/30 to-[hsl(222,48%,4%)]/85" />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `linear-gradient(135deg, ${item.accent}18, transparent 60%)` }}
                    />
                    {/* Top accent line */}
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)` }}
                    />
                    {/* Icon + title overlay */}
                    <div className="absolute bottom-3 left-4 flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${item.accent}20`, border: `1px solid ${item.accent}40` }}
                      >
                        <item.icon className="w-5 h-5" style={{ color: item.accent }} />
                      </div>
                      <div>
                        <p className="font-bold text-[10px] tracking-[0.2em] uppercase" style={{ color: item.accent }}>{item.title}</p>
                        <h3 className="font-serif text-base font-bold text-white leading-tight">{item.name}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-5">
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{item.purpose}</p>
                    <div className="rounded-lg bg-muted/40 p-3.5 border border-border/50 mb-4">
                      <p className="text-[10px] font-bold text-foreground uppercase tracking-widest mb-1.5">Platform positioning</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.positioning}</p>
                    </div>
                    <ul className="space-y-1.5">
                      {item.sees.map((line) => (
                        <li key={line} className="text-xs text-muted-foreground flex gap-2 items-start">
                          <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: item.accent }} />
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

        {/* ── IMAGE BREAK — London Bridge ───────────────────────── */}
        <div className="relative h-[320px] md:h-[420px] overflow-hidden">
          <img
            src={IMG_LONDON_BRIDGE}
            alt="London Bridge"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatedSection className="text-center px-4">
              <p className="font-serif text-3xl md:text-4xl font-bold text-white drop-shadow-xl">
                Built for London. Designed for the world.
              </p>
            </AnimatedSection>
          </div>
        </div>

        {/* ── THS SECTION — split with image ────────────────────── */}
        <section className="section-padding">
          <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* image side */}
            <AnimatedSection direction="left" className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img
                  src={IMG_RESIDENTIAL}
                  alt="London residential street"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex gap-2">
                    {["Healthy", "Stable", "Needs Attention"].map((label, i) => (
                      <span
                        key={label}
                        className="text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm"
                        style={{
                          background: ["hsl(142,70%,45%)/20", "hsl(42,80%,50%)/20", "hsl(0,70%,55%)/20"][i],
                          color: ["hsl(142,70%,60%)", "hsl(42,80%,65%)", "hsl(0,70%,70%)"][i],
                          border: `1px solid ${["hsl(142,70%,45%)/30", "hsl(42,80%,50%)/30", "hsl(0,70%,55%)/30"][i]}`,
                        }}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-primary/20 rounded-2xl -z-10" />
            </AnimatedSection>

            {/* text side */}
            <AnimatedSection direction="right" delay={0.2}>
              <span className="text-primary font-semibold text-xs tracking-[0.2em] uppercase">Live Tenancy Monitoring</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3 mb-5">
                THS supports stable occupancy during the tenancy
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The Tenancy Health Score is an internal tenancy operational health indicator. It helps Liable identify where support may be needed during occupancy, without presenting the system as surveillance, punishment, or a tenant ranking engine.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tenancyHealthItems.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-lg bg-card border border-border p-3">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ── PTR SECTION ───────────────────────────────────────── */}
        <section className="section-padding bg-[hsl(220,44%,8%)]">
          <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <AnimatedSection direction="left">
              <span className="text-primary font-semibold text-xs tracking-[0.2em] uppercase">Property Trust Record</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3 mb-5">
                PTR records property reliability inside the platform
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Property Trust Record gives Liable a structured way to monitor property reliability, landlord responsiveness, maintenance history, safety documentation, and tenant feedback signals — balancing ISRA and THS by assessing the property side of the housing relationship.
              </p>
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 text-center">
                <p className="text-sm font-semibold text-foreground">Property Operations → PTR Status Generated</p>
                <div className="flex gap-3 justify-center mt-3">
                  {["Strong", "Stable", "Needs Review"].map((s) => (
                    <span key={s} className="text-xs font-bold text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">{s}</span>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 gap-5">
              <AnimatedSection direction="right" delay={0.1}>
                <div className="rounded-xl border border-border bg-card p-6">
                  <p className="text-sm font-bold text-foreground uppercase tracking-wide mb-4">PTR includes</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ptrIncludes.map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-lg bg-muted/60 p-3">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
              <AnimatedSection direction="right" delay={0.2}>
                <div className="rounded-xl border border-border bg-card p-6">
                  <p className="text-sm font-bold text-foreground uppercase tracking-wide mb-4">PTR does not expose</p>
                  <div className="grid grid-cols-1 gap-3">
                    {ptrExclusions.map((item) => (
                      <div key={item} className="flex items-center gap-2 rounded-lg bg-muted/40 p-3">
                        <span className="w-4 h-4 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                          <span className="w-1.5 h-0.5 bg-muted-foreground rounded-full" />
                        </span>
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ── COMPLIANCE — full-bleed dark image ────────────────── */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <img
            src={IMG_NIGHT}
            alt="London aerial at night"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[hsl(222,48%,4%)]/88" />

          <div className="container-custom relative z-10">
            <AnimatedSection className="mb-14">
              <span className="text-primary font-semibold text-xs tracking-[0.2em] uppercase">Compliance-Led Infrastructure</span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mt-3">
                Trust is built into the workflow
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {complianceItems.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-7 backdrop-blur-sm hover:bg-white/8 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center mb-5">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/65 text-sm leading-relaxed">{item.body}</p>
                  <div className="mt-5 flex items-center gap-2 text-primary text-xs font-semibold group-hover:gap-3 transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
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
