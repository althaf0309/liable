import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Quote, ShieldCheck, Users, Lightbulb, BadgeCheck, Globe, Building2, Activity } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlassGlobe from "@/components/GlassGlobe";

// ── Drifting particle canvas ────────────────────────────────────
function DriftCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.2 + 0.4,
    }));
    let id: number;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > c.width) p.vx *= -1;
        if (p.y < 0 || p.y > c.height) p.vy *= -1;
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 130) {
            ctx.strokeStyle = `rgba(197,160,89,${(1 - d / 130) * 0.12})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(197,160,89,0.38)"; ctx.fill();
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.5 }} />;
}

const DARK = "hsl(222,52%,2%)";
const DARK2 = "hsl(222,48%,4%)";

const principles = [
  { icon: ShieldCheck, label: "Trust", desc: "We build confidence through transparency, honesty, and accountability." },
  { icon: Users, label: "People First", desc: "Students, landlords, and partners sit at the heart of everything we do." },
  { icon: Lightbulb, label: "Innovation", desc: "We use technology and smart systems to create simpler, better experiences." },
  { icon: BadgeCheck, label: "Integrity", desc: "We operate with fairness, respect, and professional responsibility." },
  { icon: Globe, label: "Global Impact", desc: "We support communities and create long-term positive impact." },
];

const aboutStats = [
  { value: "10K+", label: "Students Supported", icon: Users },
  { value: "2K+", label: "Properties Managed", icon: Building2 },
  { value: "99%", label: "Occupancy Rate", icon: Activity },
  { value: "5", label: "Countries Supported", icon: Globe },
  { value: "24/7", label: "Support Available", icon: ShieldCheck },
];

const timeline = [
  { year: "2022", event: "Liable Group Services Ltd founded in London by a former international student." },
  { year: "2023", event: "First 10 properties brought under management. Student intake program launched." },
  { year: "2024", event: "ISRA assessment framework developed. PropMatch allocation engine begins development." },
  { year: "2025", event: "Quantum Platform launched — full-stack student housing infrastructure live." },
  { year: "2026", event: "Escrow and CVS modules enter development. National expansion planning begins." },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen" style={{ background: DARK }}>
      <Header />
      <main className="pt-20">

        {/* ── HERO BANNER ──────────────────────────────────────────── */}
        <section
          className="relative min-h-[55vh] flex items-center overflow-hidden"
          style={{ background: DARK2 }}
        >
          <DriftCanvas />

          {/* Aurora glows */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 70% at 20% 50%, rgba(197,160,89,0.07) 0%, transparent 65%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 50% 60% at 80% 50%, rgba(74,158,255,0.05) 0%, transparent 65%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(197,160,89,0.4), transparent)",
            }}
          />

          <div className="container-custom relative z-10 px-4 py-24">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <span
                  className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase rounded-full px-4 py-1.5 mb-6"
                  style={{
                    color: "#C5A059",
                    background: "rgba(197,160,89,0.08)",
                    border: "1px solid rgba(197,160,89,0.18)",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  About Company
                </span>

                <h1
                  className="font-serif font-bold leading-tight mb-6"
                  style={{ fontSize: "clamp(2.4rem,5vw,4rem)", color: "#fff" }}
                >
                  Elevating Living,{" "}
                  <span
                    style={{
                      background: "linear-gradient(135deg,#C5A059,#E8C77E,#C5A059)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Simplifying Renting
                  </span>
                </h1>

                <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.56)" }}>
                  Liable Group Services Ltd is a UK-based company committed to elevating the living
                  experience for international students through controlled, fair, and affordable housing.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative h-[340px] sm:h-[420px] lg:h-[480px]"
              >
                <GlassGlobe />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── STATS BAR ────────────────────────────────────────────── */}
        <section className="relative" style={{ background: DARK2, borderTop: "1px solid rgba(197,160,89,0.12)", borderBottom: "1px solid rgba(197,160,89,0.12)" }}>
          <div className="container-custom px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {aboutStats.map((s, i) => (
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
                  <p className="font-serif font-bold text-3xl mb-1" style={{ color: "#E8C77E" }}>{s.value}</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT COPY ──────────────────────────────────────────── */}
        <section className="relative py-24 overflow-hidden" style={{ background: DARK }}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(197,160,89,0.04) 0%, transparent 70%)",
            }}
          />
          <div className="container-custom px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-lg leading-relaxed"
                style={{ color: "rgba(255,255,255,0.62)" }}
              >
                Our services include student accommodation, building management, and tailored student
                support — from arrival assistance to practical settlement help. We provide accommodation
                to everyone with the Right to Rent in the UK, ensuring inclusive access to quality
                housing. With{" "}
                <span style={{ color: "#E8C77E" }}>affordability, quality, and international reach</span>{" "}
                at our core, we aim to redefine the standards of modern living.
              </motion.p>
            </div>
          </div>
        </section>

        {/* ── VISION & MISSION ─────────────────────────────────────── */}
        <section className="relative py-20 overflow-hidden" style={{ background: DARK2 }}>
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(197,160,89,0.3), transparent)",
            }}
          />
          <div className="container-custom px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.22 } }}
                className="group relative rounded-2xl p-8"
                style={{
                  background: "rgba(197,160,89,0.06)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(197,160,89,0.18)",
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                  style={{
                    background: "linear-gradient(90deg, transparent, #C5A059, transparent)",
                  }}
                />
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.22em] mb-4"
                  style={{ color: "#C5A059" }}
                >
                  Our Vision
                </p>
                <h3 className="font-serif text-2xl font-bold mb-4" style={{ color: "#fff" }}>
                  Redefine modern living
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.62)" }}>
                  To create inclusive, high-quality, and affordable accommodation experiences that empower
                  individuals and communities across the UK and beyond.
                </p>
              </motion.div>

              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.2 }}
                whileHover={{ y: -5, transition: { duration: 0.22 } }}
                className="group relative rounded-2xl p-8"
                style={{
                  background: "rgba(197,160,89,0.06)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(197,160,89,0.18)",
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                  style={{
                    background: "linear-gradient(90deg, transparent, #E8C77E, transparent)",
                  }}
                />
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.22em] mb-4"
                  style={{ color: "#E8C77E" }}
                >
                  Our Mission
                </p>
                <h3 className="font-serif text-2xl font-bold mb-4" style={{ color: "#fff" }}>
                  Support every tenant
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.62)" }}>
                  To enhance modern living through inclusive, affordable, and quality housing — supporting
                  tenants with tailored services that make settling in the UK easier, safer, and smoother.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── VALUES ───────────────────────────────────────────────── */}
        <section className="relative py-24 overflow-hidden" style={{ background: DARK }}>
          <div className="container-custom px-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-14"
            >
              <span
                className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase rounded-full px-4 py-1.5 mb-5"
                style={{
                  color: "#C5A059",
                  background: "rgba(197,160,89,0.08)",
                  border: "1px solid rgba(197,160,89,0.16)",
                }}
              >
                What drives us
              </span>
              <h2
                className="font-serif font-bold"
                style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "#fff" }}
              >
                Our Core Principles
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
              {principles.map((v, i) => (
                <motion.div
                  key={v.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  whileHover={{ y: -6, transition: { duration: 0.22 } }}
                  className="group relative rounded-2xl p-6 text-center"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ border: "1px solid rgba(197,160,89,0.22)" }}
                  />
                  <div
                    className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                    style={{
                      background: "rgba(197,160,89,0.1)",
                      border: "1px solid rgba(197,160,89,0.2)",
                    }}
                  >
                    <v.icon className="w-5 h-5" style={{ color: "#E8C77E" }} />
                  </div>
                  <h3 className="font-serif font-bold text-lg mb-2" style={{ color: "#fff" }}>
                    {v.label}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.48)" }}>
                    {v.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOUNDER'S NOTE ───────────────────────────────────────── */}
        <section className="relative py-24 overflow-hidden" style={{ background: DARK2 }}>
          <DriftCanvas />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(197,160,89,0.05) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(197,160,89,0.3), transparent)",
            }}
          />

          <div className="container-custom px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-8"
                style={{
                  background: "rgba(197,160,89,0.1)",
                  border: "1px solid rgba(197,160,89,0.22)",
                }}
              >
                <Quote className="w-5 h-5" style={{ color: "#C5A059" }} />
              </div>

              <h2
                className="font-serif font-bold mb-8"
                style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", color: "#C5A059" }}
              >
                Founder's Note
              </h2>

              <blockquote
                className="font-serif text-lg leading-relaxed italic"
                style={{ color: "rgba(255,255,255,0.72)" }}
              >
                "Liable Group was born from struggle. As an international student in London, I faced cramped,{" "}
                <span style={{ color: "#E8C77E" }}>overpriced housing</span> — until I found a better
                way. Today, we cut out the middlemen to offer{" "}
                <span style={{ color: "#E8C77E" }}>students and tenants affordable, dignified homes</span>.
                No compromises."
              </blockquote>

              <div className="mt-8 flex items-center justify-center gap-3">
                <div
                  className="h-px w-12"
                  style={{ background: "rgba(197,160,89,0.4)" }}
                />
                <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Founder, Liable Group Services Ltd
                </p>
                <div
                  className="h-px w-12"
                  style={{ background: "rgba(197,160,89,0.4)" }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── TIMELINE ─────────────────────────────────────────────── */}
        <section className="relative py-24 overflow-hidden" style={{ background: DARK }}>
          <div className="container-custom px-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-14"
            >
              <span
                className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase rounded-full px-4 py-1.5 mb-5"
                style={{
                  color: "#C5A059",
                  background: "rgba(197,160,89,0.08)",
                  border: "1px solid rgba(197,160,89,0.16)",
                }}
              >
                Our journey
              </span>
              <h2
                className="font-serif font-bold"
                style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "#fff" }}
              >
                The Liable story
              </h2>
            </motion.div>

            <div className="max-w-2xl mx-auto relative">
              {/* Vertical line */}
              <div
                className="absolute left-[22px] top-0 bottom-0 w-px"
                style={{ background: "rgba(197,160,89,0.15)" }}
              />

              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: i * 0.1 }}
                    className="flex gap-6"
                  >
                    {/* Year dot */}
                    <div className="flex flex-col items-center flex-shrink-0 w-11">
                      <div
                        className="w-3 h-3 rounded-full mt-1 z-10"
                        style={{ background: "#C5A059", boxShadow: "0 0 8px rgba(197,160,89,0.5)" }}
                      />
                    </div>
                    <div
                      className="rounded-xl p-5 flex-1"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <p
                        className="text-xs font-bold uppercase tracking-widest mb-2"
                        style={{ color: "#C5A059" }}
                      >
                        {item.year}
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.62)" }}>
                        {item.event}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CAREERS CTA ──────────────────────────────────────────── */}
        <section className="relative py-24 overflow-hidden" style={{ background: DARK2 }}>
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(197,160,89,0.35), transparent)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(197,160,89,0.04) 0%, transparent 70%)",
            }}
          />

          <div className="container-custom px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span
                className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase rounded-full px-4 py-1.5 mb-6"
                style={{
                  color: "#C5A059",
                  background: "rgba(197,160,89,0.08)",
                  border: "1px solid rgba(197,160,89,0.16)",
                }}
              >
                Working at Liable
              </span>
              <h2
                className="font-serif font-bold mb-4"
                style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "#fff" }}
              >
                Join the team
              </h2>
              <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.50)" }}>
                Please send your CV to one of the contacts below
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="mailto:studlet@lgsltd.uk"
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-200 hover:opacity-90"
                  style={{
                    background: "rgba(197,160,89,0.12)",
                    border: "1px solid rgba(197,160,89,0.25)",
                    color: "#E8C77E",
                  }}
                >
                  <Mail className="w-4 h-4" />
                  studlet@lgsltd.uk
                </a>
                <a
                  href="tel:08801236S499"
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-200 hover:opacity-90"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.72)",
                  }}
                >
                  <Phone className="w-4 h-4" />
                  088 0123 654 99
                </a>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
