import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";
import MissionCluster from "@/components/MissionCluster";

const GOLD = "197,160,89";
const GOLD_BRIGHT = "#E8C77E";
const CREAM = "#F5F2ED";
const DARK = "hsl(222,52%,2%)";

export default function Mission() {
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: DARK }}>
      {/* dotted map backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.5]"
        style={{
          backgroundImage: `radial-gradient(rgba(${GOLD},0.18) 1px, transparent 1px)`,
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, #000 0%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, #000 0%, transparent 75%)",
        }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 50% 50% at 50% 50%, rgba(${GOLD},0.06) 0%, transparent 70%)` }} />

      <div className="container-custom px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Floating orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9 }}
            className="relative flex items-center justify-center order-2 lg:order-1"
            style={{ minHeight: 420 }}
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full"
              style={{ height: 420, maxWidth: 460, margin: "0 auto" }}
            >
              <MissionCluster />
            </motion.div>
          </motion.div>

          {/* Glass card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 rounded-3xl p-8 md:p-10"
            style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", border: `1px solid rgba(${GOLD},0.16)`, boxShadow: "0 24px 70px rgba(0,0,0,0.5)" }}
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase rounded-full px-4 py-1.5 mb-6"
              style={{ color: GOLD_BRIGHT, background: `rgba(${GOLD},0.08)`, border: `1px solid rgba(${GOLD},0.16)` }}>
              Our Mission
            </span>
            <h2 className="font-serif font-bold leading-tight mb-5" style={{ fontSize: "clamp(1.8rem,3.4vw,2.6rem)", color: CREAM }}>
              Living infrastructure built on{" "}
              <span style={{ background: `linear-gradient(135deg,#C5A059,${GOLD_BRIGHT})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                trust and technology
              </span>
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(245,242,237,0.6)" }}>
              To deliver trusted, tech-enabled living solutions that empower students and landlords —
              raising the standard of property management while keeping a human at every decision.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Target, title: "Mission", body: "Seamless, verified living experiences powered by intelligent systems and human care." },
                { icon: Eye, title: "Vision", body: "The world's most reliable living infrastructure — where every connection creates value." },
              ].map((it) => (
                <div key={it.title} className="rounded-2xl p-5" style={{ background: `rgba(${GOLD},0.06)`, border: `1px solid rgba(${GOLD},0.12)` }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: `rgba(${GOLD},0.14)` }}>
                    <it.icon className="w-4 h-4" style={{ color: GOLD_BRIGHT }} />
                  </div>
                  <h3 className="font-serif font-bold text-sm mb-1.5" style={{ color: CREAM }}>{it.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(245,242,237,0.5)" }}>{it.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
