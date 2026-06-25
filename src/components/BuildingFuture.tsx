import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck, Cpu, HeartHandshake, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const GOLD = "197,160,89";
const GOLD_DEEP = "#9A6F2A";
const BG = "#F5F2ED";        // Heirloom Cream
const HEAD = "#241C14";      // near-obsidian heading
const BODY = "#5A4F44";      // warm body text

const features = [
  { icon: ShieldCheck, title: "Verified & Trusted", body: "Rigorous verification for complete peace of mind at every stage." },
  { icon: Cpu, title: "Technology First", body: "Smart matching, real-time updates, and secure operational systems." },
  { icon: HeartHandshake, title: "Human Focused", body: "Support that cares — a real operator at every key decision." },
  { icon: Globe, title: "Global Standards", body: "Compliance, security, and excellence built into everything." },
];

export default function BuildingFuture() {
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: BG }}>
      <div className="absolute inset-0 pointer-events-none opacity-60"
        style={{ backgroundImage: `radial-gradient(rgba(${GOLD},0.14) 1px, transparent 1px)`, backgroundSize: "30px 30px", maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, #000 0%, transparent 78%)", WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, #000 0%, transparent 78%)" }} />

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
              style={{ color: GOLD_DEEP, background: `rgba(${GOLD},0.14)`, border: `1px solid rgba(${GOLD},0.3)` }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD_DEEP }} />
              About LGS
            </span>
            <h2 className="font-serif font-bold leading-tight mb-6" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", color: HEAD }}>
              Building the Future of{" "}
              <span style={{ color: GOLD_DEEP }}>Living Infrastructure</span>
            </h2>
            <p className="text-base leading-relaxed mb-8 max-w-md" style={{ color: BODY }}>
              LGS (Liable Group Services) is more than a letting service. We are a technology-driven
              ecosystem that ensures seamless connections, verified trust, and exceptional experiences
              for students and property owners.
            </p>
            <Link to="/about">
              <Button className="h-11 px-6 gap-2 rounded-full text-sm font-semibold"
                style={{ background: `linear-gradient(135deg,#C5A059,#E8C77E)`, color: "#0A0A0A" }}>
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
                style={{ background: "#FFFFFF", border: "1px solid rgba(36,28,20,0.08)", boxShadow: "0 10px 34px rgba(36,28,20,0.07)" }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `rgba(${GOLD},0.14)`, border: `1px solid rgba(${GOLD},0.28)` }}>
                  <f.icon className="w-5 h-5" style={{ color: GOLD_DEEP }} />
                </div>
                <h3 className="font-serif font-bold text-base mb-2" style={{ color: HEAD }}>{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: BODY }}>{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
