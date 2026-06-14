import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GraduationCap, Building2, Briefcase, TrendingUp, ArrowRight, User, Home, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const GOLD = "197,160,89";
const GOLD_BRIGHT = "#E8C77E";
const CREAM = "#F5F2ED";
const DARK2 = "hsl(222,48%,4%)";

// ── Mini node-network illustration inside each card ──────────────
function NetworkMotif({ nodes, links }: { nodes: { icon: LucideIcon; x: number; y: number }[]; links: [number, number][] }) {
  return (
    <div className="relative w-full h-28 mt-5">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 56" preserveAspectRatio="none">
        {links.map(([a, b], i) => (
          <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
            stroke={`rgba(${GOLD},0.4)`} strokeWidth="0.5" />
        ))}
        {links.map(([a, b], i) => (
          <motion.circle key={`p${i}`} r="0.9" fill={GOLD_BRIGHT}
            initial={{ cx: nodes[a].x, cy: nodes[a].y }}
            animate={{ cx: [nodes[a].x, nodes[b].x], cy: [nodes[a].y, nodes[b].y] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }} />
        ))}
      </svg>
      {nodes.map((n, i) => (
        <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${n.x}%`, top: `${(n.y / 56) * 100}%` }}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: "rgba(10,10,10,0.7)", border: `1px solid rgba(${GOLD},0.4)`, boxShadow: `0 0 12px rgba(${GOLD},0.25)` }}>
            <n.icon className="w-3.5 h-3.5" style={{ color: GOLD_BRIGHT }} />
          </div>
        </div>
      ))}
    </div>
  );
}

const FEATURED = [
  {
    name: "I'm a Student", icon: GraduationCap, href: "/services/students",
    desc: "Find verified accommodation, get visa & university support, and settle in with confidence.",
    features: ["Accommodation Search", "Visa Assistance", "University Support", "Property Matching"],
    motif: {
      nodes: [{ icon: User, x: 20, y: 42 }, { icon: User, x: 40, y: 18 }, { icon: GraduationCap, x: 62, y: 38 }, { icon: User, x: 84, y: 20 }],
      links: [[0, 1], [1, 2], [2, 3]] as [number, number][],
    },
  },
  {
    name: "I'm a Landlord", icon: Building2, href: "/services/landlords",
    desc: "List property, get matched with qualified tenants, and protect occupancy year-round.",
    features: ["Property Listing", "Tenant Matching", "Verification", "Maintenance Tracking"],
    motif: {
      nodes: [{ icon: Building2, x: 22, y: 22 }, { icon: Home, x: 46, y: 40 }, { icon: MapPin, x: 70, y: 20 }, { icon: Building2, x: 86, y: 42 }],
      links: [[0, 1], [1, 2], [2, 3], [1, 3]] as [number, number][],
    },
  },
];

const SECONDARY = [
  { name: "I'm a Partner", icon: Briefcase, href: "/contact", desc: "Work with us to deliver exceptional services and create impact together." },
  { name: "I'm an Investor", icon: TrendingUp, href: "/contact", desc: "Invest in a future-ready platform with scalable growth and strong returns." },
];

export default function PortalEcosystem() {
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: DARK2 }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(${GOLD},0.35), transparent)` }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 30%, rgba(${GOLD},0.06) 0%, transparent 70%)` }} />
      {/* starfield dots */}
      <div className="absolute inset-0 pointer-events-none opacity-40"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 0.5px, transparent 0.5px)", backgroundSize: "40px 40px" }} />

      <div className="container-custom px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase rounded-full px-4 py-1.5 mb-5"
            style={{ color: GOLD_BRIGHT, background: `rgba(${GOLD},0.08)`, border: `1px solid rgba(${GOLD},0.16)` }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GOLD_BRIGHT }} />
            Choose Your Journey
          </span>
          <h2 className="font-serif font-bold leading-tight" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: CREAM }}>
            How can we{" "}
            <span style={{ background: `linear-gradient(135deg,#C5A059,${GOLD_BRIGHT},#C5A059)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              help you today?
            </span>
          </h2>
        </motion.div>

        {/* Featured frosted cards */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* gold divider */}
          <div className="hidden lg:block absolute left-1/2 top-6 bottom-6 -translate-x-1/2 w-px pointer-events-none"
            style={{ background: `linear-gradient(to bottom, transparent, rgba(${GOLD},0.4), transparent)` }} />

          {FEATURED.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="group relative"
            >
              <Link to={p.href}>
                <div className="relative h-full rounded-[28px] p-8 md:p-10 overflow-hidden transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(28px)", border: "1px solid rgba(255,255,255,0.14)", boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }}>
                  {/* top sheen */}
                  <div className="absolute inset-x-0 top-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)" }} />
                  <div className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ border: `1px solid rgba(${GOLD},0.45)`, boxShadow: `0 0 60px rgba(${GOLD},0.2)` }} />

                  <div className="relative z-10">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                      style={{ background: `radial-gradient(circle at 40% 35%, rgba(${GOLD},0.3), rgba(10,10,10,0.6))`, border: `1px solid rgba(${GOLD},0.4)`, boxShadow: `0 0 40px rgba(${GOLD},0.3)` }}>
                      <p.icon className="w-9 h-9" style={{ color: GOLD_BRIGHT }} />
                    </div>

                    <h3 className="font-serif font-bold text-2xl mb-3 tracking-wide" style={{ color: CREAM }}>{p.name}</h3>
                    <p className="text-sm leading-relaxed mb-5 max-w-sm" style={{ color: "rgba(245,242,237,0.55)" }}>{p.desc}</p>

                    <div className="flex flex-wrap gap-2 mb-2">
                      {p.features.map((f) => (
                        <span key={f} className="text-[11px] px-3 py-1 rounded-full"
                          style={{ background: `rgba(${GOLD},0.08)`, border: `1px solid rgba(${GOLD},0.18)`, color: "rgba(245,242,237,0.7)" }}>{f}</span>
                      ))}
                    </div>

                    <NetworkMotif nodes={p.motif.nodes} links={p.motif.links} />

                    <span className="inline-flex items-center gap-2 text-sm font-semibold mt-2" style={{ color: GOLD_BRIGHT }}>
                      Get Started
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Secondary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {SECONDARY.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <Link to={p.href}>
                <div className="relative rounded-2xl p-6 flex items-center gap-5 transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ border: `1px solid rgba(${GOLD},0.4)`, boxShadow: `0 0 40px rgba(${GOLD},0.15)` }} />
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `rgba(${GOLD},0.14)`, border: `1px solid rgba(${GOLD},0.22)` }}>
                    <p.icon className="w-6 h-6" style={{ color: GOLD_BRIGHT }} />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg mb-1" style={{ color: CREAM }}>{p.name}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(245,242,237,0.5)" }}>{p.desc}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 ml-auto flex-shrink-0 transition-transform group-hover:translate-x-1" style={{ color: GOLD_BRIGHT }} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
