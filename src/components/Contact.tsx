import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AnimatedSection from "./AnimatedSection";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  // Generate dots once and memoize
  const dots = useMemo(() => {
    const result: { x: number; y: number }[] = [];
    for (let row = 0; row < 40; row++) {
      for (let col = 0; col < 40; col++) {
        if (Math.random() > 0.6) {
          result.push({ x: col * 10, y: row * 10 });
        }
      }
    }
    return result;
  }, []);

  return (
    <section id="contact" className="bg-dark py-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Form */}
          <AnimatedSection direction="left">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              Book Appointment
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-background mt-3 mb-8">
              Send Message Anytime
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <Input
                    placeholder="Full Name*"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-transparent border-muted-foreground/30 text-background placeholder:text-muted-foreground focus:border-primary"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <Input
                    type="email"
                    placeholder="Email Address*"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-transparent border-muted-foreground/30 text-background placeholder:text-muted-foreground focus:border-primary"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }
                >
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
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={5}
                  className="bg-transparent border-muted-foreground/30 text-background placeholder:text-muted-foreground focus:border-primary resize-none"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button type="submit" className="rounded-full px-8">
                  Submit Message
                </Button>
              </motion.div>
            </form>
          </AnimatedSection>

          {/* Decorative World Map */}
          <AnimatedSection direction="right" delay={0.3} className="hidden lg:block relative">
            <motion.div
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-full aspect-square opacity-30"
            >
              <svg viewBox="0 0 400 400" className="w-full h-full">
                {dots.map((dot, index) => (
                  <circle
                    key={index}
                    cx={dot.x}
                    cy={dot.y}
                    r="1.5"
                    fill="hsl(var(--muted-foreground))"
                  />
                ))}
              </svg>
            </motion.div>
            {/* UK Marker */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-1/4 right-1/3 w-4 h-4 bg-primary rounded-full"
            />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;
