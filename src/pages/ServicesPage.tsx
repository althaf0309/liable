import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Home, Plane, CreditCard, Heart, Briefcase, FileCheck, Headset,
  ShieldCheck, Wrench, TrendingUp, ArrowRight, CheckCircle2, Play,
  Users, Building2, Activity, Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlassGlobe from "@/components/GlassGlobe";

const GOLD = "197,160,89";
const GOLD_BRIGHT = "#E8C77E";
const CREAM = "#F5F2ED";
const DARK = "hsl(222,52%,2%)";
const DARK2 = "hsl(222,48%,4%)";

const services = [
  { icon: Home, title: "Student Accommodation", body: "Verified, comfortable, and affordable places to live across the UK." },
  { icon: Plane, title: "Airport Pickup", body: "Safe, reliable, and timely airport pickup to make your arrival stress-free." },
  { icon: CreditCard, title: "Banking & SIM Setup", body: "Assistance with bank account opening and SIM card activation." },
  { icon: Heart, title: "NHS & Wellbeing", body: "Guidance for NHS registration and access to health & wellbeing support." },
  { icon: Briefcase, title: "CV & Career Support", body: "Professional CV building, career guidance, and job support." },
  { icon: FileCheck, title: "Document Support", body: "Help with essential documents, academic letters, and official applications." },
  { icon: Headset, title: "24/7 Support", body: "Round-the-clock support through multiple channels whenever you need us." },
  { icon: ShieldCheck, title: "Compliance & Safety", body: "We ensure all properties meet legal standards and your safety." },
  { icon: Wrench, title: "Property Maintenance", body: "Prompt maintenance and emergency repair services you can rely on." },
  { icon: TrendingUp, title: "Guaranteed Occupancy", body: "We minimise voids and maximise returns for landlords." },
];

const stats = [
  { value: "10K+", label: "Students Supported", icon: Users },
  { value: "2K+", label: "Properties Managed", icon: Building2 },
  { value: "99%", label: "Occupancy Rate", icon: Activity },
  { value: "5", label: "Countries Supported", icon: Globe },
  { value: "24/7", label: "Support Available", icon: Headset },
];

const journeys = [
  {
    eyebrow: "For Students", title: "Start Your Journey with LGS",
    body: "Register now to access verified accommodation, essential services, and dedicated support.",
    features: ["Easy Registration", "Secure & Verified", "Tailored for Students", "24/7 Support"],
    cta: { label: "Register as Student", href: "/services/students" }, icon: Users,
  },
  {
    eyebrow: "For Landlords", title: "Maximize Your Property Potential",
    body: "Partner with LGS for guaranteed occupancy, reliable tenants, and hassle-free management.",
    features: ["Verified Student Tenants", "Guaranteed Rent", "Full Property Care", "Legal Compliance"],
    cta: { label: "Register as Landlord", href: "/services/landlords" }, icon: Building2,
  },
];

const eyebrow = "inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase rounded-full px-4 py-1.5";

export default function ServicesPage() {
  return (
    <div className="min-h-screen" style={{ background: DARK }}>
      <Header />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-24" style={{ background: DARK }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 60% at 72% 45%, rgba(${GOLD},0.07) 0%, transparent 65%)` }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(${GOLD},0.4), transparent)` }} />
        <div className="container-custom relative z-10 px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[70vh]">
            <motion.div initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className={eyebrow} style={{ color: GOLD_BRIGHT, background: `rgba(${GOLD},0.08)`, border: `1px solid rgba(${GOLD},0.2)` }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GOLD_BRIGHT }} />
                Our Services
              </span>
              <h1 className="font-serif font-bold leading-[1.07] my-6" style={{ fontSize: "clamp(2.4rem,5vw,4rem)", color: CREAM }}>
                End-to-End Solutions for{" "}
                <span style={{ background: `linear-gradient(135deg,#C5A059,${GOLD_BRIGHT},#C5A059)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Students, Landlords & Properties
                </span>
              </h1>
              <p className="text-base md:text-lg leading-relaxed mb-9 max-w-xl" style={{ color: "rgba(245,242,237,0.58)" }}>
                LGS provides a complete infrastructure ecosystem that connects students, landlords,
                and essential services through trust, technology, and care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/services/students">
                  <Button className="h-12 px-7 gap-2 rounded-full text-sm font-semibold" style={{ background: `linear-gradient(135deg,#C5A059,${GOLD_BRIGHT})`, color: "#0A0A0A" }}>
                    Explore All Services <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/quantum-link">
                  <Button variant="outline" className="h-12 px-6 gap-2.5 rounded-full text-sm font-semibold" style={{ borderColor: "rgba(245,242,237,0.2)", color: CREAM, background: "rgba(255,255,255,0.03)" }}>
                    <span className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: `rgba(${GOLD},0.16)` }}>
                      <Play className="w-3 h-3 fill-current" style={{ color: GOLD_BRIGHT }} />
                    </span>
                    Watch Services Video
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="relative h-[380px] sm:h-[460px] lg:h-[540px] order-first lg:order-last">
              <GlassGlobe />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CORE SERVICES GRID ────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden" style={{ background: DARK2 }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 70% 50% at 50% 0%, rgba(${GOLD},0.05) 0%, transparent 70%)` }} />
        <div className="container-custom px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-14">
            <span className={eyebrow} style={{ color: GOLD_BRIGHT, background: `rgba(${GOLD},0.08)`, border: `1px solid rgba(${GOLD},0.16)` }}>Our Core Services</span>
            <h2 className="font-serif font-bold mt-5" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: CREAM }}>
              Everything You Need.{" "}
              <span style={{ background: `linear-gradient(135deg,#C5A059,${GOLD_BRIGHT})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>All in One Place.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 5) * 0.07 }}
                whileHover={{ y: -5 }}
                className="group relative rounded-2xl p-6 text-center"
                style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ border: `1px solid rgba(${GOLD},0.3)`, boxShadow: `0 0 36px rgba(${GOLD},0.15)` }} />
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: `rgba(${GOLD},0.14)`, border: `1px solid rgba(${GOLD},0.22)` }}>
                  <s.icon className="w-5 h-5" style={{ color: GOLD_BRIGHT }} />
                </div>
                <h3 className="font-serif font-bold text-sm mb-2" style={{ color: CREAM }}>{s.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(245,242,237,0.5)" }}>{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STUDENT / LANDLORD JOURNEYS ───────────────────────── */}
      <section className="relative py-24 overflow-hidden" style={{ background: DARK }}>
        <div className="container-custom px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {journeys.map((j, i) => (
              <motion.div
                key={j.title}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="relative rounded-3xl p-8 md:p-10"
                style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", border: `1px solid rgba(${GOLD},0.16)`, boxShadow: "0 24px 70px rgba(0,0,0,0.5)" }}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `rgba(${GOLD},0.14)`, border: `1px solid rgba(${GOLD},0.22)` }}>
                  <j.icon className="w-6 h-6" style={{ color: GOLD_BRIGHT }} />
                </div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: GOLD_BRIGHT }}>{j.eyebrow}</p>
                <h3 className="font-serif font-bold text-2xl mb-3" style={{ color: CREAM }}>{j.title}</h3>
                <p className="text-sm leading-relaxed mb-6 max-w-md" style={{ color: "rgba(245,242,237,0.55)" }}>{j.body}</p>
                <div className="grid grid-cols-2 gap-3 mb-7">
                  {j.features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: GOLD_BRIGHT }} />
                      <span className="text-sm" style={{ color: "rgba(245,242,237,0.7)" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link to={j.cta.href}>
                  <Button className="h-11 px-6 gap-2 rounded-full text-sm font-semibold" style={{ background: `linear-gradient(135deg,#C5A059,${GOLD_BRIGHT})`, color: "#0A0A0A" }}>
                    {j.cta.label} <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────── */}
      <section className="relative" style={{ background: DARK2, borderTop: `1px solid rgba(${GOLD},0.12)`, borderBottom: `1px solid rgba(${GOLD},0.12)` }}>
        <div className="container-custom px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="py-8 px-4 text-center flex flex-col items-center"
                style={{ borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.06)" }}
              >
                <s.icon className="w-5 h-5 mb-2" style={{ color: "#C5A059" }} />
                <p className="font-serif font-bold text-3xl mb-1" style={{ color: GOLD_BRIGHT }}>{s.value}</p>
                <p className="text-xs" style={{ color: "rgba(245,242,237,0.5)" }}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
