import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Play, ArrowRight, Phone, Target, Eye,
  ShieldCheck, Users, Lightbulb, BadgeCheck, Globe, Building2, Activity, Headset, BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuantumLinkContent from "@/components/QuantumLinkContent";

const GOLD = "197,160,89";
const GOLD_BRIGHT = "#E8C77E";
const CREAM = "#F5F2ED";
const DARK = "hsl(222,52%,2%)";
const DARK2 = "hsl(222,48%,4%)";

const HERO_IMG = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fm=jpg&q=80&w=1600&auto=format&fit=crop";
const SKYLINE = "https://images.unsplash.com/photo-1519501025264-65ba15a82390?fm=jpg&q=80&w=1920&auto=format&fit=crop";

// ── Drifting network canvas ──────────────────────────────────────
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
    const pts = Array.from({ length: 46 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, r: Math.random() * 1.2 + 0.4,
    }));
    let running = true;
    const io = new IntersectionObserver(([e]) => { running = e.isIntersecting; }, { threshold: 0.02 });
    io.observe(c);
    let id: number;
    const draw = () => {
      id = requestAnimationFrame(draw);
      if (!running) return;
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
            ctx.strokeStyle = `rgba(${GOLD},${(1 - d / 130) * 0.12})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GOLD},0.38)`; ctx.fill();
      }
    };
    draw();
    return () => { cancelAnimationFrame(id); io.disconnect(); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.6 }} />;
}

const aboutStats = [
  { value: "10K+", label: "Students Supported", icon: Users },
  { value: "2K+", label: "Properties Managed", icon: Building2 },
  { value: "99%", label: "Occupancy Rate", icon: ShieldCheck },
  { value: "5", label: "Countries Supported", icon: Globe },
  { value: "24/7", label: "Support Available", icon: Headset },
];

const principles = [
  { icon: ShieldCheck, label: "Trust", desc: "We build confidence through transparency, honesty, and accountability." },
  { icon: Users, label: "People First", desc: "Students, landlords, and partners sit at the heart of everything we do." },
  { icon: Lightbulb, label: "Innovation", desc: "We use technology and smart systems to create simpler, better experiences." },
  { icon: BadgeCheck, label: "Integrity", desc: "We operate with fairness, respect, and professional responsibility." },
  { icon: Globe, label: "Global Impact", desc: "We support communities and create long-term positive impact." },
];

const timeline = [
  { year: "2018", title: "The Beginning", desc: "LGS was founded with a simple belief: living experiences can be better." },
  { year: "2020", title: "Growth", desc: "Expanded services and supported more students and landlords." },
  { year: "2022", title: "Technology Leap", desc: "Launched our digital platform and smart management systems." },
  { year: "2023", title: "Global Expansion", desc: "Extended our reach internationally and built strong partnerships." },
  { year: "Future", title: "Limitless", desc: "Continuing to innovate and elevate living experiences worldwide." },
];

const eyebrow = "inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase rounded-full px-4 py-1.5";

const AboutPage = () => {
  return (
    <div className="min-h-screen" style={{ background: DARK }}>
      <Header />
      <main className="pt-24">

        {/* ── HERO ──────────────────────────────────────────────── */}
        <section className="relative overflow-hidden" style={{ background: DARK }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 60% at 72% 40%, rgba(${GOLD},0.07) 0%, transparent 65%)` }} />
          <div className="container-custom relative z-10 px-4 py-16">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Left copy */}
              <motion.div initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <span className={eyebrow} style={{ color: GOLD_BRIGHT, background: `rgba(${GOLD},0.08)`, border: `1px solid rgba(${GOLD},0.2)` }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GOLD_BRIGHT }} />
                  About LGS
                </span>
                <h1 className="font-serif font-bold leading-[1.08] my-6" style={{ fontSize: "clamp(2.4rem,5vw,4rem)", color: CREAM }}>
                  Building the Future of{" "}
                  <span style={{ background: `linear-gradient(135deg,#C5A059,${GOLD_BRIGHT},#C5A059)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    Living Infrastructure
                  </span>
                </h1>
                <p className="text-base leading-relaxed mb-6 max-w-xl" style={{ color: "rgba(245,242,237,0.58)" }}>
                  LGS (Liable Group Services) is more than a letting agency. We are a technology-driven
                  ecosystem that connects students, landlords, and essential services through intelligent
                  infrastructure and human care.
                </p>
                <div className="h-px w-16 mb-5" style={{ background: `rgba(${GOLD},0.5)` }} />
                <p className="text-sm leading-relaxed mb-9 max-w-md" style={{ color: GOLD_BRIGHT }}>
                  Our mission is to create seamless living experiences powered by trust, technology, and transparency.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#our-journey">
                    <Button className="h-12 px-7 gap-2 rounded-full text-sm font-semibold" style={{ background: `linear-gradient(135deg,#C5A059,${GOLD_BRIGHT})`, color: "#0A0A0A" }}>
                      Discover Our Journey <ArrowRight className="w-4 h-4" />
                    </Button>
                  </a>
                  <Link to="/quantum-link">
                    <Button variant="outline" className="h-12 px-6 gap-2.5 rounded-full text-sm font-semibold" style={{ borderColor: "rgba(245,242,237,0.2)", color: CREAM, background: "rgba(255,255,255,0.03)" }}>
                      <span className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: `rgba(${GOLD},0.16)` }}>
                        <Play className="w-3 h-3 fill-current" style={{ color: GOLD_BRIGHT }} />
                      </span>
                      Watch Our Story
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Right — building image with network glow */}
              <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="relative">
                <DriftCanvas />
                <div className="relative rounded-3xl overflow-hidden" style={{ border: `1px solid rgba(${GOLD},0.18)`, boxShadow: "0 30px 80px rgba(0,0,0,0.55)" }}>
                  <img src={HERO_IMG} alt="LGS living infrastructure" className="w-full h-[340px] lg:h-[440px] object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 45%)" }} />
                  <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 70% 30%, rgba(${GOLD},0.12) 0%, transparent 60%)` }} />
                  <span className="absolute top-6 right-7 font-serif font-bold text-3xl" style={{ color: "rgba(245,242,237,0.85)", textShadow: `0 0 20px rgba(${GOLD},0.6)` }}>LGS</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── STATS BAR ─────────────────────────────────────────── */}
        <section className="relative" style={{ background: DARK2, borderTop: `1px solid rgba(${GOLD},0.12)`, borderBottom: `1px solid rgba(${GOLD},0.12)` }}>
          <div className="container-custom px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {aboutStats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
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

        {/* ── MISSION / VISION ──────────────────────────────────── */}
        <section className="relative py-24 overflow-hidden" style={{ background: DARK }}>
          <div className="absolute inset-0 pointer-events-none opacity-[0.5]"
            style={{
              backgroundImage: `radial-gradient(rgba(${GOLD},0.16) 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
              maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, #000 0%, transparent 72%)",
              WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, #000 0%, transparent 72%)",
            }} />
          <div className="container-custom px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-6 items-center max-w-5xl mx-auto">
              {/* Mission */}
              <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                className="flex flex-col items-center md:items-end gap-4 text-center md:text-right">
                <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: `rgba(${GOLD},0.1)`, border: `1px solid rgba(${GOLD},0.25)` }}>
                  <Target className="w-6 h-6" style={{ color: GOLD_BRIGHT }} />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] mb-2" style={{ color: GOLD_BRIGHT }}>Our Mission</p>
                  <p className="text-sm leading-relaxed max-w-xs" style={{ color: "rgba(245,242,237,0.6)" }}>
                    To deliver trusted, tech-enabled living solutions that empower students and landlords
                    while raising the standard of property management.
                  </p>
                </div>
              </motion.div>

              {/* Central LGS badge */}
              <motion.div initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
                className="mx-auto w-24 h-24 rounded-full flex items-center justify-center"
                style={{ background: `radial-gradient(circle at 50% 40%, rgba(${GOLD},0.18), rgba(10,12,18,0.95))`, border: `1px solid rgba(${GOLD},0.5)`, boxShadow: `0 0 40px rgba(${GOLD},0.3)` }}>
                <span className="font-serif font-bold text-2xl" style={{ color: CREAM, textShadow: `0 0 18px rgba(${GOLD},0.7)` }}>LGS</span>
              </motion.div>

              {/* Vision */}
              <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
                <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: `rgba(${GOLD},0.1)`, border: `1px solid rgba(${GOLD},0.25)` }}>
                  <Eye className="w-6 h-6" style={{ color: GOLD_BRIGHT }} />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] mb-2" style={{ color: GOLD_BRIGHT }}>Our Vision</p>
                  <p className="text-sm leading-relaxed max-w-xs" style={{ color: "rgba(245,242,237,0.6)" }}>
                    To become the world's most reliable living infrastructure platform — where every
                    connection creates value and every experience builds trust.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CORE PRINCIPLES ───────────────────────────────────── */}
        <section className="relative py-20 overflow-hidden" style={{ background: DARK2 }}>
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(${GOLD},0.3), transparent)` }} />
          <div className="container-custom px-4">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="font-serif font-bold text-center mb-14" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", color: CREAM }}>
              Our Core Principles
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {principles.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="px-5 py-4 text-center flex flex-col items-center"
                  style={{ borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `rgba(${GOLD},0.1)`, border: `1px solid rgba(${GOLD},0.2)` }}>
                    <p.icon className="w-5 h-5" style={{ color: GOLD_BRIGHT }} />
                  </div>
                  <h3 className="font-bold text-sm uppercase tracking-wide mb-2" style={{ color: GOLD_BRIGHT }}>{p.label}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(245,242,237,0.5)" }}>{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── JOURNEY ───────────────────────────────────────────── */}
        <section id="our-journey" className="relative py-24 overflow-hidden" style={{ background: DARK }}>
          <img src={SKYLINE} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.14 }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, hsl(222,52%,2%) 0%, transparent 35%, transparent 65%, hsl(222,52%,2%) 100%)" }} />
          <div className="container-custom px-4 relative z-10">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="font-serif font-bold text-center mb-16" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", color: CREAM }}>
              Our Journey
            </motion.h2>

            <div className="relative">
              <div className="hidden md:block absolute left-0 right-0 h-px" style={{ top: 5, background: `linear-gradient(90deg, transparent, rgba(${GOLD},0.45), rgba(${GOLD},0.45), transparent)` }} />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 md:gap-4">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                    className="relative text-center"
                  >
                    <div className="hidden md:block w-3 h-3 rounded-full mx-auto mb-6" style={{ background: GOLD_BRIGHT, boxShadow: `0 0 12px rgba(${GOLD},0.8)`, marginTop: -1 }} />
                    <p className="font-serif font-bold text-2xl mb-1" style={{ color: GOLD_BRIGHT }}>{item.year}</p>
                    <p className="font-semibold text-sm mb-2" style={{ color: CREAM }}>{item.title}</p>
                    <p className="text-xs leading-relaxed max-w-[200px] mx-auto" style={{ color: "rgba(245,242,237,0.5)" }}>{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── QUANTUM LINK PLATFORM (moved into About) ──────────── */}
        <QuantumLinkContent />

        {/* ── CTA BAR ───────────────────────────────────────────── */}
        <section className="relative py-16 overflow-hidden" style={{ background: DARK2 }}>
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(${GOLD},0.4), transparent)` }} />
          <div className="container-custom px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="rounded-3xl p-7 md:p-9 flex flex-col md:flex-row items-center justify-between gap-6"
              style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(18px)", border: `1px solid rgba(${GOLD},0.16)` }}
            >
              <div className="flex items-center gap-4 text-center md:text-left">
                <div className="hidden sm:flex w-12 h-12 rounded-xl items-center justify-center flex-shrink-0" style={{ background: `rgba(${GOLD},0.12)`, border: `1px solid rgba(${GOLD},0.22)` }}>
                  <BarChart3 className="w-5 h-5" style={{ color: GOLD_BRIGHT }} />
                </div>
                <p className="font-serif font-bold text-lg md:text-xl" style={{ color: CREAM }}>
                  Ready to experience the future of living infrastructure?
                </p>
              </div>
              <div className="flex items-center gap-6">
                <Link to="/auth">
                  <Button className="h-12 px-7 gap-2 rounded-full text-sm font-semibold" style={{ background: `linear-gradient(135deg,#C5A059,${GOLD_BRIGHT})`, color: "#0A0A0A" }}>
                    Join the LGS Community <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <a href="tel:+442079460830" className="hidden lg:flex items-center gap-2 text-sm" style={{ color: "rgba(245,242,237,0.6)" }}>
                  <Phone className="w-4 h-4" style={{ color: GOLD_BRIGHT }} />
                  <span>
                    <span className="block text-[10px] uppercase tracking-wider" style={{ color: "rgba(245,242,237,0.4)" }}>Get in touch</span>
                    +44 20 7946 0830
                  </span>
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
