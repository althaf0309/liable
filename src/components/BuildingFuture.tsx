import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck, Cpu, HeartHandshake, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const GOLD = "197,160,89";
const GOLD_BRIGHT = "#E8C77E";
const CREAM = "#F5F2ED";
const DARK = "hsl(222,52%,2%)";

const features = [
  { icon: ShieldCheck, title: "Verified & Trusted", body: "Rigorous verification for complete peace of mind at every stage." },
  { icon: Cpu, title: "Technology First", body: "Smart matching, real-time updates, and secure operational systems." },
  { icon: HeartHandshake, title: "Human Focused", body: "Support that cares — a real operator at every key decision." },
  { icon: Globe, title: "Global Standards", body: "Compliance, security, and excellence built into everything." },
];

export default function BuildingFuture() {
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: DARK }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(${GOLD},0.4), transparent)` }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 60% at 25% 50%, rgba(${GOLD},0.05) 0%, transparent 65%)` }} />

      <div className="container-custom px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase rounded-full px-4 py-1.5 mb-6"
              style={{ color: GOLD_BRIGHT, background: `rgba(${GOLD},0.08)`, border: `1px solid rgba(${GOLD},0.16)` }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GOLD_BRIGHT }} />
              About LGS
            </span>
            <h2 className="font-serif font-bold leading-tight mb-6" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", color: CREAM }}>
              Building the Future of{" "}
              <span style={{ background: `linear-gradient(135deg,#C5A059,${GOLD_BRIGHT},#C5A059)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Living Infrastructure
              </span>
            </h2>
            <p className="text-base leading-relaxed mb-8 max-w-md" style={{ color: "rgba(245,242,237,0.58)" }}>
              LGS (Liable Group Services) is more than a letting service. We are a technology-driven
              ecosystem that ensures seamless connections, verified trust, and exceptional experiences
              for students and property owners.
            </p>
            <Link to="/about">
              <Button className="h-11 px-6 gap-2 rounded-full text-sm font-semibold"
                style={{ background: `linear-gradient(135deg,#C5A059,${GOLD_BRIGHT})`, color: "#0A0A0A" }}>
                Discover More About Us
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Right — 4 pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative rounded-2xl p-6"
                style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ border: `1px solid rgba(${GOLD},0.3)`, boxShadow: `0 0 36px rgba(${GOLD},0.15)` }} />
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `rgba(${GOLD},0.14)`, border: `1px solid rgba(${GOLD},0.22)` }}>
                  <f.icon className="w-5 h-5" style={{ color: GOLD_BRIGHT }} />
                </div>
                <h3 className="font-serif font-bold text-base mb-2" style={{ color: CREAM }}>{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(245,242,237,0.5)" }}>{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
