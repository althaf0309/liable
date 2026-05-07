import { motion } from "framer-motion";
import { Activity, FileCheck, Home, ShieldCheck } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const services = [
  {
    number: "01",
    title: "Tenancy Readiness Assessment",
    description:
      "ISRA helps Liable assess tenancy readiness using profile completeness, affordability, residency stability, and operational trust indicators.",
    icon: ShieldCheck,
  },
  {
    number: "02",
    title: "Controlled Allocation",
    description:
      "PropMatch allocates properties through budget, availability, occupancy rules, location suitability, and admin review. Landlords do not browse student profiles.",
    icon: Home,
  },
  {
    number: "03",
    title: "Live Tenancy Monitoring",
    description:
      "THS tracks tenancy health through rent behaviour, complaints, communication, and continuity so the platform can support stable occupancy.",
    icon: Activity,
  },
  {
    number: "04",
    title: "Verified Tenancy Reputation",
    description:
      "PTR creates a verified tenancy record after successful completion, helping international students build recognised UK tenancy history.",
    icon: FileCheck,
  },
];

const Services = () => {
  return (
    <section id="services" className="section-padding bg-cream">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Operational Infrastructure
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-3">
            A Managed System for <span className="text-primary">Student Housing</span>
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-background rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-4xl font-light text-muted-foreground/30 font-serif">
                  {service.number}
                </span>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-14 h-14 rounded-full bg-primary flex items-center justify-center"
                >
                  <service.icon className="w-6 h-6 text-primary-foreground" />
                </motion.div>
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
