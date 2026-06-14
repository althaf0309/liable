import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Clock, Send, Linkedin, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { submitContact } from "@/lib/contact";

const GOLD = "197,160,89";
const GOLD_BRIGHT = "#E8C77E";
const CREAM = "#F5F2ED";
const DARK = "hsl(222,52%,2%)";
const DARK2 = "hsl(222,48%,4%)";

const inputCls =
  "h-14 rounded-xl bg-white/[0.04] border-white/10 text-[#F5F2ED] placeholder:text-white/40 focus-visible:ring-1 focus-visible:ring-[#C5A059]/50 focus-visible:border-[#C5A059]/50";

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitContact({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      toast({ title: "Message Sent!", description: "We'll get back to you shortly." });

      setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
    } catch (e: any) {
      toast({
        title: "Error",
        description: e?.message || "Unable to send message. Try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const infoCards = [
    { icon: MapPin, title: "Our Address", lines: ["124 City Road, London", "EC1V 2NX, United Kingdom"] },
    { icon: Mail, title: "student@lgsltd.uk", lines: ["Email us anytime for any", "kind of query."] },
    { icon: Phone, title: "+44 20 7946 0830", lines: ["24/7/365 priority Live Chat", "and ticketing support."] },
  ];

  return (
    <div className="min-h-screen" style={{ background: DARK }}>
      <Header />
      <main className="pt-24">
        {/* Hero header */}
        <section className="relative py-16 overflow-hidden" style={{ background: DARK }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 70% at 50% 0%, rgba(${GOLD},0.07) 0%, transparent 70%)` }} />
          <div className="container-custom px-4 relative z-10 text-center">
            <motion.span
              initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase rounded-full px-4 py-1.5 mb-5"
              style={{ color: GOLD_BRIGHT, background: `rgba(${GOLD},0.08)`, border: `1px solid rgba(${GOLD},0.16)` }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GOLD_BRIGHT }} />
              Contact Us
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif font-bold leading-tight mb-4" style={{ fontSize: "clamp(2.2rem,4.5vw,3.6rem)", color: CREAM }}>
              Talk to the{" "}
              <span style={{ background: `linear-gradient(135deg,#C5A059,${GOLD_BRIGHT},#C5A059)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Liable team
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.25 }}
              className="text-base leading-relaxed max-w-xl mx-auto" style={{ color: "rgba(245,242,237,0.55)" }}>
              Questions about accommodation, partnerships, or the platform? A real person will get back to you.
            </motion.p>
          </div>
        </section>

        {/* Info cards */}
        <section className="relative" style={{ background: DARK }}>
          <div className="container-custom px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {infoCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(14px)", border: `1px solid rgba(${GOLD},0.14)` }}
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: `rgba(${GOLD},0.14)`, border: `1px solid rgba(${GOLD},0.22)` }}>
                    <card.icon className="w-6 h-6" style={{ color: GOLD_BRIGHT }} />
                  </div>
                  <h3 className="font-serif text-lg font-bold mb-2" style={{ color: CREAM }}>{card.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(245,242,237,0.5)" }}>
                    {card.lines[0]}<br />{card.lines[1]}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Map + Form */}
        <section className="py-20" style={{ background: DARK2 }}>
          <div className="container-custom px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              {/* Map */}
              <motion.div
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7 }}
                className="rounded-3xl overflow-hidden relative min-h-[420px]"
                style={{ border: `1px solid rgba(${GOLD},0.18)`, boxShadow: "0 24px 70px rgba(0,0,0,0.5)" }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.4315228726957!2d-0.09397708422954!3d51.52674997963757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761ca671c13c0f%3A0x5f48a76e77e41b95!2s124%20City%20Rd%2C%20London%20EC1V%202NX%2C%20UK!5e0!3m2!1sen!2s!4v1706540000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: "absolute", inset: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.6) brightness(0.92) contrast(0.95)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                />
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl px-5 py-4 flex items-center gap-3 z-10"
                  style={{ background: "rgba(10,10,10,0.78)", backdropFilter: "blur(14px)", border: `1px solid rgba(${GOLD},0.2)` }}>
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `rgba(${GOLD},0.16)` }}>
                    <MapPin className="w-5 h-5" style={{ color: GOLD_BRIGHT }} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: CREAM }}>Liable Group Services</p>
                    <p className="text-xs" style={{ color: "rgba(245,242,237,0.5)" }}>124 City Road, London EC1V 2NX</p>
                  </div>
                </div>
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="rounded-3xl p-7 md:p-9"
                style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", border: `1px solid rgba(${GOLD},0.16)`, boxShadow: "0 24px 70px rgba(0,0,0,0.5)" }}
              >
                <span className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: GOLD_BRIGHT }}>Book Appointment</span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold mt-2 mb-6" style={{ color: CREAM }}>Send a message anytime</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className={inputCls} maxLength={100} required />
                    <Input name="phone" type="tel" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className={inputCls} maxLength={20} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className={inputCls} maxLength={255} required />
                    <Input name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} className={inputCls} maxLength={200} />
                  </div>
                  <Textarea
                    name="message"
                    placeholder="Write a Message"
                    value={formData.message}
                    onChange={handleChange}
                    className="min-h-[150px] rounded-xl bg-white/[0.04] border-white/10 text-[#F5F2ED] placeholder:text-white/40 focus-visible:ring-1 focus-visible:ring-[#C5A059]/50 focus-visible:border-[#C5A059]/50 resize-none"
                    maxLength={1000}
                    required
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 gap-2 rounded-xl text-sm font-semibold"
                    style={{ background: `linear-gradient(135deg,#C5A059,${GOLD_BRIGHT})`, color: "#0A0A0A" }}
                  >
                    {isSubmitting ? "Sending..." : <>Send a Message <Send className="w-4 h-4" /></>}
                  </Button>
                </form>

                <div className="flex items-center gap-3 mt-6 pt-6" style={{ borderTop: "1px solid rgba(245,242,237,0.08)" }}>
                  <span className="text-xs" style={{ color: "rgba(245,242,237,0.4)" }}>Follow us</span>
                  {[Linkedin, Instagram, Facebook].map((Icon, i) => (
                    <a key={i} href="#" className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                      style={{ background: "rgba(255,255,255,0.04)", border: `1px solid rgba(${GOLD},0.16)` }}>
                      <Icon className="w-4 h-4" style={{ color: GOLD_BRIGHT }} />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
