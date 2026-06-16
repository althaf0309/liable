import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Mail, Globe, Facebook, Linkedin, Instagram, ChevronRight } from "lucide-react";
import logo from "@/assets/logo.png";

// continent ellipses for the dotted world-map backdrop
const CONTINENTS: [number, number, number, number][] = [
  [0.17, 0.34, 0.10, 0.18], [0.22, 0.5, 0.07, 0.12], [0.12, 0.28, 0.05, 0.08],
  [0.29, 0.74, 0.05, 0.18], [0.47, 0.30, 0.05, 0.09], [0.50, 0.4, 0.04, 0.06],
  [0.52, 0.62, 0.07, 0.2], [0.66, 0.38, 0.13, 0.17], [0.78, 0.32, 0.07, 0.1], [0.84, 0.8, 0.06, 0.07],
];
const CITY_DOTS: [number, number][] = [
  [0.2, 0.4], [0.24, 0.5], [0.47, 0.32], [0.5, 0.42], [0.68, 0.4], [0.74, 0.34], [0.3, 0.72], [0.84, 0.78],
];

function inContinent(x: number, y: number) {
  for (const [cx, cy, rx, ry] of CONTINENTS) {
    const dx = (x - cx) / rx, dy = (y - cy) / ry;
    if (dx * dx + dy * dy <= 1) return true;
  }
  return false;
}

// ── World-map dot backdrop + drifting particles ──────────────────
function FooterBackdrop() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    let dots: { x: number; y: number }[] = [];
    const build = () => {
      W = c.width = c.offsetWidth;
      H = c.height = c.offsetHeight;
      dots = [];
      for (let nx = 0; nx <= 1; nx += 0.013) {
        for (let ny = 0; ny <= 1; ny += 0.03) {
          if (inContinent(nx, ny)) dots.push({ x: nx, y: ny });
        }
      }
    };
    build();
    window.addEventListener("resize", build);

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random(), y: Math.random(), r: Math.random() * 1.3 + 0.4,
      sp: Math.random() * 0.0006 + 0.0002, op: Math.random() * 0.35 + 0.08,
    }));

    let running = true;
    const io = new IntersectionObserver(([e]) => { running = e.isIntersecting; }, { threshold: 0.02 });
    io.observe(c);

    let t = 0, id: number;
    const draw = () => {
      id = requestAnimationFrame(draw);
      if (!running) return;
      ctx.clearRect(0, 0, W, H);

      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.x * W, d.y * H, 1, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(197,160,89,0.14)";
        ctx.fill();
      }
      for (let i = 0; i < CITY_DOTS.length; i++) {
        const [lx, ly] = CITY_DOTS[i];
        const tw = Math.sin(t * 2 + i) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(lx * W, ly * H, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,199,126,${0.3 + tw * 0.5})`;
        ctx.shadowColor = "#E8C77E";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      for (const p of particles) {
        p.y -= p.sp;
        if (p.y < 0) p.y = 1;
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(197,160,89,${p.op})`;
        ctx.fill();
      }
      t += 0.01;
    };
    draw();

    return () => { cancelAnimationFrame(id); io.disconnect(); window.removeEventListener("resize", build); };
  }, []);

  return (
    <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6, maskImage: "radial-gradient(ellipse 80% 90% at 50% 60%, #000 0%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 80% 90% at 50% 60%, #000 0%, transparent 80%)" }} />
  );
}

const quickLinks = [
  { name: "About LGS", href: "/about" },
  { name: "Quantum Link™", href: "/quantum-link" },
  { name: "News", href: "/news" },
  { name: "Contact", href: "/contact" },
];

const otherLinks = [
  { name: "Terms & Conditions", href: "/terms-and-conditions" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "News", href: "/news" },
  { name: "Contact Us", href: "/contact" },
];

const contactItems = [
  { icon: Mail, label: "Email", value: "student@lgsltd.uk" },
  { icon: Globe, label: "Web", value: "www.liablegroupservices.com" },
  { icon: MapPin, label: "Location", value: "London, United Kingdom" },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden" style={{ background: "hsl(222,48%,2%)" }}>
      <FooterBackdrop />

      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(197,160,89,0.5) 30%, rgba(197,160,89,0.5) 70%, transparent 100%)" }} />
      <div className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: 200, background: "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(197,160,89,0.06) 0%, transparent 70%)" }} />

      {/* Brand banner */}
      <div className="relative z-10 container-custom pt-14 pb-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <Link to="/" className="inline-flex items-center justify-center mb-4">
            <img src={logo} alt="LGS — Liable Group Services" className="h-16 md:h-20 w-auto drop-shadow-[0_0_24px_rgba(197,160,89,0.4)]" />
          </Link>
          <p className="font-serif text-lg md:text-xl font-bold" style={{ color: "#F5F2ED" }}>
            Student &amp; Migrant Lifestyle Infrastructure
          </p>
          <p className="text-[11px] uppercase tracking-[0.3em] mt-1.5" style={{ color: "#C5A059" }}>
            Elevating Living Experience
          </p>
        </motion.div>
      </div>

      {/* Glass panel with columns */}
      <div className="relative z-10 container-custom pb-12">
        <div className="rounded-3xl p-8 md:p-10"
          style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(16px)", border: "1px solid rgba(197,160,89,0.14)" }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Company */}
            <div>
              <h4 className="font-serif font-bold mb-5 pb-2 text-sm tracking-wider uppercase" style={{ color: "#fff", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>Company</h4>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="group flex items-center gap-2 text-sm transition-colors" style={{ color: "rgba(255,255,255,0.5)" }}>
                      <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" style={{ color: "#C5A059" }} />
                      <span className="group-hover:text-white transition-colors">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support / Legal */}
            <div>
              <h4 className="font-serif font-bold mb-5 pb-2 text-sm tracking-wider uppercase" style={{ color: "#fff", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>LGS Support</h4>
              <ul className="space-y-2.5">
                {otherLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="group flex items-center gap-2 text-sm transition-colors" style={{ color: "rgba(255,255,255,0.5)" }}>
                      <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" style={{ color: "#C5A059" }} />
                      <span className="group-hover:text-white transition-colors">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-serif font-bold mb-5 pb-2 text-sm tracking-wider uppercase" style={{ color: "#fff", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>Contact</h4>
              <ul className="space-y-4">
                {contactItems.map((item) => (
                  <li key={item.label} className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(197,160,89,0.1)", border: "1px solid rgba(197,160,89,0.2)" }}>
                      <item.icon className="w-4 h-4" style={{ color: "#C5A059" }} />
                    </span>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider block" style={{ color: "rgba(255,255,255,0.35)" }}>{item.label}</span>
                      <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.82)" }}>{item.value}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Platform + social */}
            <div>
              <h4 className="font-serif font-bold mb-5 pb-2 text-sm tracking-wider uppercase" style={{ color: "#fff", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>Platform</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {["ISRA", "PropMatch", "THS", "PTR", "PYO", "Escrow"].map((mod) => (
                  <span key={mod} className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{ color: "rgba(197,160,89,0.9)", background: "rgba(197,160,89,0.07)", border: "1px solid rgba(197,160,89,0.15)" }}>{mod}</span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Follow</span>
                {[Facebook, Linkedin, Instagram].map((Icon, i) => (
                  <motion.a key={i} href="#" whileHover={{ scale: 1.2, y: -2 }}
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(197,160,89,0.16)", color: "#C5A059" }}>
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative z-10" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container-custom py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>© 2026 Liable Group Services Ltd · All Rights Reserved.</p>
          <p className="text-[10px] uppercase tracking-[0.25em]" style={{ color: "rgba(255,255,255,0.2)" }}>Established · Intelligent · Controlled</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
