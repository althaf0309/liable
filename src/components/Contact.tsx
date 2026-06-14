import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, Linkedin, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { submitContact } from "@/lib/contact";

const GOLD = "197,160,89";
const GOLD_BRIGHT = "#E8C77E";
const CREAM = "#F5F2ED";

const inputCls =
  "h-12 rounded-xl bg-white/[0.04] border-white/10 text-[#F5F2ED] placeholder:text-white/40 focus-visible:ring-1 focus-visible:ring-[#C5A059]/50 focus-visible:border-[#C5A059]/50";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "", // student/landlord/tenant/other
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setOk(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErr("Please fill required fields.");
      return;
    }

    setSending(true);
    try {
      await submitContact({
        name: formData.name,
        email: formData.email,
        contact_type: (formData.type as any) || "",
        subject: "Homepage Contact",
        message: formData.message,
      });

      setFormData({ name: "", email: "", type: "", message: "" });
      setOk("Message sent successfully!");
    } catch (e: any) {
      setErr(e?.message || "Unable to send message");
    } finally {
      setSending(false);
    }
  };

  const channels = [
    { icon: Mail, label: "Email", value: "student@lgsltd.uk", href: "mailto:student@lgsltd.uk" },
    { icon: Phone, label: "Phone", value: "+44 20 7946 0830", href: "tel:+442079460830" },
    { icon: MapPin, label: "Office", value: "124 City Road, London EC1V 2NX", href: undefined },
    { icon: Clock, label: "Support", value: "24/7 Live Chat & Ticketing", href: undefined },
  ];

  return (
    <section id="contact" className="relative py-28 overflow-hidden" style={{ background: "hsl(222,52%,2%)" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(${GOLD},0.4), transparent)` }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 60% at 25% 40%, rgba(${GOLD},0.06) 0%, transparent 70%)` }} />

      <div className="container-custom px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* Left — intro + channels */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase rounded-full px-4 py-1.5 mb-5"
              style={{ color: GOLD_BRIGHT, background: `rgba(${GOLD},0.08)`, border: `1px solid rgba(${GOLD},0.16)` }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GOLD_BRIGHT }} />
              Get in Touch
            </span>
            <h2 className="font-serif font-bold leading-tight mb-5" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: CREAM }}>
              Let's build your{" "}
              <span style={{ background: `linear-gradient(135deg,#C5A059,${GOLD_BRIGHT},#C5A059)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                living infrastructure
              </span>
            </h2>
            <p className="text-base leading-relaxed mb-8 max-w-md" style={{ color: "rgba(245,242,237,0.55)" }}>
              Whether you're a student, landlord, or partner — reach out and a real person on the
              Liable team will get back to you.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {channels.map((ch) => {
                const Inner = (
                  <div className="flex items-center gap-3 rounded-2xl p-4 h-full transition-all duration-300 group-hover:-translate-y-0.5"
                    style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)", border: `1px solid rgba(${GOLD},0.12)` }}>
                    <span className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `rgba(${GOLD},0.14)`, border: `1px solid rgba(${GOLD},0.2)` }}>
                      <ch.icon className="w-4 h-4" style={{ color: GOLD_BRIGHT }} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "rgba(245,242,237,0.4)" }}>{ch.label}</p>
                      <p className="text-sm font-medium truncate" style={{ color: CREAM }}>{ch.value}</p>
                    </div>
                  </div>
                );
                return ch.href ? (
                  <a key={ch.label} href={ch.href} className="group block">{Inner}</a>
                ) : (
                  <div key={ch.label} className="group">{Inner}</div>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              {[Linkedin, Instagram, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                  style={{ background: "rgba(255,255,255,0.04)", border: `1px solid rgba(${GOLD},0.16)` }}>
                  <Icon className="w-4 h-4" style={{ color: GOLD_BRIGHT }} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — form card */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-3xl p-7 md:p-9"
            style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", border: `1px solid rgba(${GOLD},0.16)`, boxShadow: "0 24px 70px rgba(0,0,0,0.5)" }}
          >
            <h3 className="font-serif font-bold text-xl mb-1" style={{ color: CREAM }}>Send a message</h3>
            <p className="text-sm mb-6" style={{ color: "rgba(245,242,237,0.45)" }}>We typically reply within one business day.</p>

            {err && <p className="text-sm mb-3 rounded-lg px-3 py-2" style={{ color: "#fca5a5", background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)" }}>{err}</p>}
            {ok && <p className="text-sm mb-3 rounded-lg px-3 py-2" style={{ color: "#86efac", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>{ok}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Full Name*"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputCls}
                />
                <Input
                  type="email"
                  placeholder="Email Address*"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputCls}
                />
              </div>

              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger className={inputCls}>
                  <SelectValue placeholder="I am a..." />
                </SelectTrigger>
                <SelectContent className="bg-[hsl(222,44%,6%)] border-white/10 text-[#F5F2ED]">
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="landlord">Landlord</SelectItem>
                  <SelectItem value="tenant">Tenant</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              <Textarea
                placeholder="Your Message*"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                className="rounded-xl bg-white/[0.04] border-white/10 text-[#F5F2ED] placeholder:text-white/40 focus-visible:ring-1 focus-visible:ring-[#C5A059]/50 focus-visible:border-[#C5A059]/50 resize-none"
              />

              <Button
                type="submit"
                disabled={sending}
                className="w-full h-12 gap-2 rounded-xl text-sm font-semibold"
                style={{ background: `linear-gradient(135deg,#C5A059,${GOLD_BRIGHT})`, color: "#0A0A0A" }}
              >
                {sending ? "Sending..." : <>Submit Message <Send className="w-4 h-4" /></>}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
