import { Plane, Home, Coins, Briefcase } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Arrival & Orientation",
    description:
      "Seamless airport pickup, welcome pack, and local SIM assistance. We guide you with travel support and help you settle in. Connect with fellow students through our community network.",
    icon: Plane,
  },
  {
    number: "02",
    title: "Accommodation Support",
    description:
      "Verified student housing with flexible lease options. Explore virtual tours, short stays, and long-term homes. We help match you with the right accommodation easily.",
    icon: Home,
  },
  {
    number: "03",
    title: "Student Startup Kit – Free Access",
    description:
      "Complimentary registration and student starter guide. Access tools, offers, and resources made for students. Everything you need to begin your student life smoothly.",
    icon: Coins,
  },
  {
    number: "04",
    title: "Job & Career Support",
    description:
      "Get a professional, ATS-optimized CV tailored for the UK market. We offer expert resume formatting, job search tips, and guidance. From part-time roles to full-time careers, we help you prepare confidently.",
    icon: Briefcase,
  },
];

const Services = () => {
  return (
    <section id="services" className="section-padding bg-cream">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Our Services
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-3">
            Explore Our Services for{" "}
            <span className="text-primary">Tenants</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.number}
              className="bg-background rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-4xl font-light text-muted-foreground/30 font-serif">
                  {service.number}
                </span>
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                  <service.icon className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
