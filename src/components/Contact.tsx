import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AnimatedSection from "./AnimatedSection";
import { submitContact } from "@/lib/contact";

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

  const dots = useMemo(() => {
    const result: { x: number; y: number }[] = [];
    for (let row = 0; row < 40; row++) {
      for (let col = 0; col < 40; col++) {
        if (Math.random() > 0.6) result.push({ x: col * 10, y: row * 10 });
      }
    }
    return result;
  }, []);

  return (
    <section id="contact" className="bg-dark py-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection direction="left">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              Book Appointment
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-background mt-3 mb-8">
              Send Message Anytime
            </h2>

            {err && <p className="text-red-400 mb-3">{err}</p>}
            {ok && <p className="text-green-400 mb-3">{ok}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Full Name*"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-transparent border-muted-foreground/30 text-background placeholder:text-muted-foreground"
                />
                <Input
                  type="email"
                  placeholder="Email Address*"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-transparent border-muted-foreground/30 text-background placeholder:text-muted-foreground"
                />
              </div>

              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger className="bg-transparent border-muted-foreground/30 text-background">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
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
                className="bg-transparent border-muted-foreground/30 text-background placeholder:text-muted-foreground resize-none"
              />

              <Button type="submit" className="rounded-full px-8" disabled={sending}>
                {sending ? "Sending..." : "Submit Message"}
              </Button>
            </form>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.3} className="hidden lg:block relative">
            <motion.div
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-full aspect-square opacity-30"
            >
              <svg viewBox="0 0 400 400" className="w-full h-full">
                {dots.map((dot, index) => (
                  <circle key={index} cx={dot.x} cy={dot.y} r="1.5" fill="hsl(var(--muted-foreground))" />
                ))}
              </svg>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;
