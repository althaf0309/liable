import { motion } from "framer-motion";
import { Activity, FileCheck, Home, ShieldCheck } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Tenancy Readiness Assessment",
    description:
      "ISRA assesses tenancy readiness using profile completeness, affordability, residency stability, and operational trust indicators — without relying on traditional UK credit history.",
    icon: ShieldCheck,
    color: "#C5A059",
    accent: "rgba(197,160,89,0.12)",
    border: "rgba(197,160,89,0.22)",
  },
  {
    number: "02",
    title: "Controlled Allocation",
    description:
      "PropMatch allocates properties through budget, availability, occupancy rules, location suitability, and admin review. Landlords do not browse student profiles.",
    icon: Home,
    color: "#4a9eff",
    accent: "rgba(74,158,255,0.10)",
    border: "rgba(74,158,255,0.20)",
  },
  {
    number: "03",
    title: "Live Tenancy Monitoring",
    description:
      "THS tracks rent behaviour, complaints, communication, property care, and continuity so Liable can actively support stable occupancy across the portfolio.",
    icon: Activity,
    color: "#22c55e",
    accent: "rgba(34,197,94,0.10)",
    border: "rgba(34,197,94,0.20)",
  },
  {
    number: "04",
    title: "Property Trust Record",
    description:
      "PTR structures property reliability through landlord responsiveness, maintenance history, safety documentation, rent and deposit handling, and tenant feedback signals.",
    icon: FileCheck,
    color: "#C5A059",
    accent: "rgba(197,160,89,0.12)",
    border: "rgba(197,160,89,0.22)",
  },
];

const Services = () => {
  return (
    <section
      id="services"
      className="relative py-24 overflow-hidden"
      style={{ background: "hsl(222,48%,3%)" }}
    >
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(197,160,89,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="container-custom px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span
            className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase rounded-full px-4 py-1.5 mb-5"
            style={{
              color: "#C5A059",
              background: "rgba(197,160,89,0.08)",
              border: "1px solid rgba(197,160,89,0.18)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Operational Infrastructure
          </span>
          <h2
            className="font-serif font-bold leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#fff" }}
          >
            A Managed System for{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #C5A059 0%, #E8C77E 60%, #C5A059 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Student Housing
            </span>
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: index * 0.12 }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="relative group cursor-default"
            >
              {/* Glass card */}
              <div
                className="relative rounded-2xl p-8 h-full transition-all duration-350"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
                }}
              >
                {/* Hover border + glow overlay */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{
                    border: `1px solid ${service.border}`,
                    boxShadow: `0 0 50px ${service.accent}, inset 0 0 30px ${service.accent}`,
                  }}
                />

                {/* Corner radial glow */}
                <div
                  className="absolute top-0 left-0 w-40 h-40 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{
                    background: `radial-gradient(ellipse at top left, ${service.accent} 0%, transparent 70%)`,
                  }}
                />

                {/* Top row: icon + number */}
                <div className="relative flex items-start justify-between mb-7">
                  <motion.div
                    whileHover={{ scale: 1.12, rotate: 6 }}
                    transition={{ duration: 0.2 }}
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{
                      background: service.accent,
                      border: `1px solid ${service.border}`,
                    }}
                  >
                    <service.icon
                      className="w-6 h-6"
                      style={{ color: service.color }}
                    />
                  </motion.div>

                  <span
                    className="font-serif font-light leading-none select-none"
                    style={{
                      fontSize: "3.5rem",
                      color: `${service.color}18`,
                    }}
                  >
                    {service.number}
                  </span>
                </div>

                {/* Text */}
                <h3
                  className="font-serif text-xl font-bold mb-3"
                  style={{ color: "#fff" }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.52)" }}
                >
                  {service.description}
                </p>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-8 right-8 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${service.color}40, transparent)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
