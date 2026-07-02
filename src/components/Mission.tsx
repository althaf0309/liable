import { motion } from "framer-motion";
import { Target, Eye, ShieldCheck } from "lucide-react";

const GOLD = "197,160,89";
const GOLD_DEEP = "#9A6F2A";
const TEAL = "#2F8F83";       // colour accent
const BG = "#F5F2ED";         // Heirloom Cream
const HEAD = "#241C14";       // near-obsidian heading
const BODY = "#5A4F44";       // warm body text

const MISSION_IMG = "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?fm=jpg&q=85&w=1400&auto=format&fit=crop";

export default function Mission() {
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: BG }}>
      <div className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: `radial-gradient(rgba(${GOLD},0.14) 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, #000 0%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, #000 0%, transparent 78%)",
        }} />

      <div className="container-custom px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — image */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="relative order-1"
          >
            <div className="relative rounded-3xl overflow-hidden" style={{ border: `1px solid rgba(${GOLD},0.3)`, boxShadow: "0 30px 70px rgba(36,28,20,0.18)" }}>
              <img src={MISSION_IMG} alt="London skyline and Tower Bridge" className="w-full h-[320px] lg:h-[440px] object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(36,28,20,0.45) 0%, transparent 45%)" }} />
              {/* floating accent badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-5 bottom-5 flex items-center gap-3 rounded-2xl px-4 py-3"
                style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(10px)", border: `1px solid rgba(${GOLD},0.25)`, boxShadow: "0 12px 34px rgba(36,28,20,0.22)" }}
              >
                <span className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${TEAL}1f` }}>
                  <ShieldCheck className="w-4.5 h-4.5" style={{ color: TEAL }} />
                </span>
                <div>
                  <p className="font-serif font-bold text-sm leading-none" style={{ color: HEAD }}>London Trust Layer</p>
                  <p className="text-[11px] mt-0.5" style={{ color: BODY }}>Human-led housing operations</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right — copy + cards */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="order-2"
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase rounded-full px-4 py-1.5 mb-6"
              style={{ color: GOLD_DEEP, background: `rgba(${GOLD},0.14)`, border: `1px solid rgba(${GOLD},0.3)` }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD_DEEP }} />
              Our Mission
            </span>
            <h2 className="font-serif font-bold leading-tight mb-5" style={{ fontSize: "clamp(1.9rem,3.6vw,2.8rem)", color: HEAD }}>
              Living infrastructure built on{" "}
              <span style={{ color: GOLD_DEEP }}>trust and technology</span>
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: BODY }}>
              To deliver trusted, tech-enabled living solutions that empower students and landlords —
              raising the standard of property management while keeping a human at every decision.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Target, title: "Our Mission", body: "Seamless, verified living experiences powered by intelligent systems and genuine human care.", accent: TEAL },
                { icon: Eye, title: "Our Vision", body: "The world's most reliable living infrastructure — where every connection creates value.", accent: GOLD_DEEP },
              ].map((it, i) => (
                <motion.div
                  key={it.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl p-6"
                  style={{ background: "#FFFFFF", border: "1px solid rgba(36,28,20,0.08)", boxShadow: "0 12px 38px rgba(36,28,20,0.08)" }}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `${it.accent}1f`, border: `1px solid ${it.accent}40` }}>
                    <it.icon className="w-5 h-5" style={{ color: it.accent }} />
                  </div>
                  <h3 className="font-serif font-bold text-base mb-1.5" style={{ color: HEAD }}>{it.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: BODY }}>{it.body}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
