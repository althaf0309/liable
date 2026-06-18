import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Shield, Home, Activity, FileCheck, Zap,
  Heart, Headphones, Bell, GitBranch, Users, Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const GOLD = "197,160,89";
const GOLD_BRIGHT = "#E8C77E";
const CREAM = "#F5F2ED";
const DARK = "hsl(222,52%,2%)";
const DARK2 = "hsl(222,48%,4%)";

const modules = [
  { id: "01", name: "ISRA", full: "Intake Stability & Readiness Assessment", description: "Assesses student tenancy readiness using profile completeness, affordability, residency stability, and operational trust indicators before any matching begins.", icon: Shield, color: "#C5A059" },
  { id: "02", name: "PropMatch", full: "Controlled Property Allocation", description: "Allocates properties through budget, availability, occupancy rules, and location suitability. Landlords never browse student profiles — every match is admin-reviewed.", icon: Home, color: "#E8C77E" },
  { id: "03", name: "THS", full: "Tenancy Health Score", description: "An internal operational health indicator tracking rent behaviour, complaints, communication, property care, and continuity to support stable occupancy.", icon: Activity, color: "#C5A059" },
  { id: "04", name: "PTR", full: "Property Trust Record", description: "Structures property reliability through landlord responsiveness, maintenance history, safety documentation, and deposit handling signals.", icon: FileCheck, color: "#E8C77E" },
  { id: "05", name: "Quantum Flow", full: "Lifecycle Stage Engine", description: "Manages the full student journey: Inquiry → Verify → Match → Contract → Onboard → Move-In → Active → Care → Renewal → Exit.", icon: GitBranch, color: "#C5A059" },
  { id: "06", name: "Quantum Care", full: "Maintenance & Complaint Workflow", description: "Structured maintenance request and complaint management with priority triage, landlord escalation, and THS impact tracking.", icon: Heart, color: "#E8C77E" },
  { id: "07", name: "Quantum Support", full: "Service Request Management", description: "Handles operational service requests outside maintenance — renewals, extensions, disputes — with a full event history and resolution tracking.", icon: Headphones, color: "#C5A059" },
  { id: "08", name: "Quantum Assist", full: "Proactive Reminder System", description: "Sends targeted reminders to students and operators for upcoming rent, document renewals, visa expiry, and tenancy milestones.", icon: Bell, color: "#E8C77E" },
  { id: "09", name: "PYO", full: "Property Yield Optimiser", description: "Tracks landlord yield, occupancy rate, void periods, and maintenance cost ratios to guide operational property decisions.", icon: Zap, color: "#C5A059" },
  { id: "10", name: "Agency Link", full: "Agency Partner Referral System", description: "Lets registered agency partners submit student referrals into the Quantum pipeline with commission tracking and lifecycle visibility.", icon: Users, color: "#E8C77E" },
];

const flows = [
  { role: "Student", steps: ["Register and complete profile", "ISRA assesses tenancy readiness", "PropMatch allocates a suitable property", "Admin reviews and confirms the match", "Onboarding and move-in coordinated", "THS monitors tenancy health throughout"], cta: { label: "Register as Student", href: "/auth?register=student" } },
  { role: "Landlord", steps: ["Register and submit property", "Property reviewed and approved by Liable", "PTR tracks property reliability signals", "PropMatch allocates vetted students", "Maintenance routed via Quantum Care", "PYO tracks yield and occupancy"], cta: { label: "Register as Landlord", href: "/auth?register=landlord" } },
  { role: "Agency Partner", steps: ["Partner registered by Liable admin", "Submit student referral with details", "Referred student enters Quantum Flow", "Agency tracks referral stage live", "Commission calculated on activation", "Payout processed when tenancy is live"], cta: { label: "Contact Us", href: "/contact" } },
];

const eyebrow = "inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase rounded-full px-4 py-1.5";

export default function QuantumLinkContent() {
  return (
    <>
      {/* ── Intro + Human-in-the-loop ── */}
      <section className="relative py-24 overflow-hidden" style={{ background: DARK }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(${GOLD},0.4), transparent)` }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 60% at 50% 30%, rgba(${GOLD},0.05) 0%, transparent 70%)` }} />
        <div className="container-custom px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center max-w-2xl mx-auto mb-12">
            <span className={eyebrow} style={{ color: GOLD_BRIGHT, background: `rgba(${GOLD},0.08)`, border: `1px solid rgba(${GOLD},0.16)` }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GOLD_BRIGHT }} />
              The Platform
            </span>
            <h2 className="font-serif font-bold mt-5 mb-4" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: CREAM }}>
              Powered by{" "}
              <span style={{ background: `linear-gradient(135deg,#C5A059,${GOLD_BRIGHT},#C5A059)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Quantum Link™</span>
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "rgba(245,242,237,0.55)" }}>
              Quantum Link™ is the operational infrastructure behind LGS — a structured system that
              manages every stage of the housing journey, with a human operator reviewing every decision.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto rounded-3xl p-9 md:p-12 text-center"
            style={{ background: `rgba(${GOLD},0.05)`, backdropFilter: "blur(20px)", border: `1px solid rgba(${GOLD},0.18)` }}>
            <div className="inline-flex items-center gap-3 rounded-full px-5 py-2.5 mb-6" style={{ background: `rgba(${GOLD},0.1)`, border: `1px solid rgba(${GOLD},0.25)` }}>
              <Shield className="w-4 h-4" style={{ color: GOLD_BRIGHT }} />
              <span className="text-sm font-semibold tracking-wide" style={{ color: GOLD_BRIGHT }}>Human-in-the-Loop Principle</span>
            </div>
            <p className="text-lg leading-relaxed" style={{ color: "rgba(245,242,237,0.85)" }}>
              Every scoring result, property match, and lifecycle transition is reviewed by a Liable
              operator before any action is taken.{" "}
              <span className="font-semibold" style={{ color: GOLD_BRIGHT }}>Quantum Link™ never makes autonomous decisions about tenancies.</span>
            </p>
            <div className="mt-6 flex items-center justify-center gap-2 text-sm" style={{ color: "rgba(245,242,237,0.5)" }}>
              <Eye className="w-4 h-4" style={{ color: GOLD_BRIGHT }} />
              Every action is operator-initiated, logged, and auditable.
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 10 modules ── */}
      <section className="relative py-24 overflow-hidden" style={{ background: DARK2 }}>
        <div className="container-custom px-4">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-14">
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: CREAM }}>10 integrated modules</h2>
            <p className="max-w-xl mx-auto text-base" style={{ color: "rgba(245,242,237,0.55)" }}>
              Each module is a distinct operational layer. Together they form a complete end-to-end housing management system.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((mod, i) => (
              <motion.div key={mod.id}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }} whileHover={{ y: -5 }}
                className="group relative rounded-2xl p-6"
                style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ border: `1px solid ${mod.color}55`, boxShadow: `0 0 40px ${mod.color}1f` }} />
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${mod.color}1f`, border: `1px solid ${mod.color}33` }}>
                    <mod.icon className="w-5 h-5" style={{ color: mod.color }} />
                  </div>
                  <span className="text-[11px] font-bold tracking-[0.2em]" style={{ color: `${mod.color}99` }}>{mod.id}</span>
                </div>
                <h3 className="font-serif font-bold text-lg mb-1" style={{ color: CREAM }}>{mod.name}</h3>
                <p className="text-xs font-semibold mb-3" style={{ color: mod.color }}>{mod.full}</p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(245,242,237,0.52)" }}>{mod.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 flows ── */}
      <section className="relative py-24 overflow-hidden" style={{ background: DARK }}>
        <div className="container-custom px-4">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-14">
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: CREAM }}>Three paths, one system</h2>
            <p className="max-w-xl mx-auto text-base" style={{ color: "rgba(245,242,237,0.55)" }}>
              Whether you're a student, landlord, or agency partner — Quantum Link™ manages your journey end-to-end.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {flows.map((flow, i) => (
              <motion.div key={flow.role}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-2xl p-7 h-full flex flex-col"
                style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(16px)", border: `1px solid rgba(${GOLD},0.14)` }}>
                <div className="text-xs font-bold tracking-[0.18em] uppercase mb-4 pb-5 flex items-center gap-2" style={{ color: GOLD_BRIGHT, borderBottom: `1px solid rgba(${GOLD},0.16)` }}>
                  <span className="w-2 h-2 rounded-full" style={{ background: GOLD_BRIGHT }} />
                  {flow.role}
                </div>
                <ol className="space-y-3 flex-1 mb-6">
                  {flow.steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5" style={{ background: `rgba(${GOLD},0.15)`, color: GOLD_BRIGHT }}>{idx + 1}</span>
                      <span className="text-sm leading-relaxed" style={{ color: "rgba(245,242,237,0.6)" }}>{step}</span>
                    </li>
                  ))}
                </ol>
                <Link to={flow.cta.href}>
                  <Button variant="outline" className="w-full gap-2 rounded-xl" style={{ borderColor: `rgba(${GOLD},0.35)`, color: GOLD_BRIGHT, background: "transparent" }}>
                    {flow.cta.label} <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
