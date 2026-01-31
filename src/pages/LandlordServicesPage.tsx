import { motion } from "framer-motion";
import { Building2, Shield, Users, Wallet, ClipboardCheck, Wrench, BarChart3, Handshake, Phone, Mail, CheckCircle, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-slide-2.jpg";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Building2,
    title: "Property Management",
    description: "Complete end-to-end property management services. We handle everything from tenant sourcing to maintenance, so you can enjoy passive income without the hassle.",
    features: ["Full property oversight", "Tenant communication", "Regular inspections", "24/7 emergency support", "Legal compliance"],
  },
  {
    icon: Users,
    title: "Tenant Sourcing & Vetting",
    description: "We find reliable, vetted tenants for your property. Our rigorous screening process ensures you get quality tenants who pay on time and care for your property.",
    features: ["Comprehensive background checks", "Credit verification", "Employment verification", "Reference checks", "Right to Rent verification"],
  },
  {
    icon: Wallet,
    title: "Rent Collection & Accounting",
    description: "Hassle-free rent collection with transparent accounting. Receive your payments on time with detailed monthly statements and annual reports.",
    features: ["Automated rent collection", "Monthly statements", "Annual tax reports", "Arrears management", "Transparent pricing"],
  },
  {
    icon: Wrench,
    title: "Maintenance & Repairs",
    description: "Quick and reliable maintenance services. Our trusted network of contractors ensures your property is always in top condition at competitive rates.",
    features: ["24/7 emergency repairs", "Vetted contractors", "Competitive pricing", "Regular upkeep", "Quality assurance"],
  },
];

const benefits = [
  {
    icon: Shield,
    title: "Guaranteed Rent",
    description: "Receive your rent on time, every time, regardless of tenant payment status.",
  },
  {
    icon: ClipboardCheck,
    title: "Legal Compliance",
    description: "We ensure your property meets all UK legal and safety requirements.",
  },
  {
    icon: BarChart3,
    title: "Market Insights",
    description: "Data-driven rental pricing to maximize your property's earning potential.",
  },
  {
    icon: Handshake,
    title: "Dedicated Support",
    description: "A dedicated property manager for personalized attention and quick responses.",
  },
];

const stats = [
  { value: "500+", label: "Properties Managed" },
  { value: "98%", label: "Occupancy Rate" },
  { value: "£2M+", label: "Rent Collected Annually" },
  { value: "4.9/5", label: "Landlord Satisfaction" },
];

const LandlordServicesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Banner */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img 
            src={heroImage} 
            alt="Landlord Services" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-background mb-4">
              Services for Landlords
            </h1>
            <div className="flex items-center gap-2 text-background/80 text-sm">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-primary">Landlord Services</span>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <div className="section-padding">
          <div className="container-custom">
            <AnimatedSection className="text-center max-w-4xl mx-auto">
              <span className="text-primary font-semibold text-sm tracking-widest uppercase">
                Landlord Support
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 leading-tight">
                Maximize Your <span className="text-primary">Property Investment</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                Whether you own a single property or a portfolio, our comprehensive landlord services
                help you maximize returns while minimizing the stress of property management.
                Let us handle the details while you enjoy the benefits of property ownership.
              </p>
            </AnimatedSection>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-12 bg-navy">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <AnimatedSection key={stat.label} delay={index * 0.1} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-background/80 text-sm">{stat.label}</div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>

        {/* Main Services */}
        <div className="section-padding bg-cream">
          <div className="container-custom">
            <AnimatedSection className="text-center mb-12">
              <span className="text-primary font-semibold text-sm tracking-widest uppercase">
                Our Services
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-4">
                Comprehensive Property Solutions
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <AnimatedSection key={service.title} delay={index * 0.1}>
                  <motion.div
                    className="bg-background rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 h-full"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-full bg-navy flex items-center justify-center flex-shrink-0">
                        <service.icon className="w-7 h-7 text-background" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {service.description}
                        </p>
                        <ul className="space-y-2">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="section-padding">
          <div className="container-custom">
            <AnimatedSection className="text-center mb-12">
              <span className="text-primary font-semibold text-sm tracking-widest uppercase">
                Why Choose Us
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-4">
                Benefits of Partnering With Us
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <AnimatedSection key={benefit.title} delay={index * 0.1}>
                  <motion.div
                    className="bg-muted/30 rounded-xl p-6 text-center hover:bg-muted/50 transition-colors h-full"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>

        {/* List Your Property CTA */}
        <div className="py-16 md:py-20 bg-primary">
          <div className="container-custom">
            <AnimatedSection className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  Ready to List Your Property?
                </h2>
                <p className="text-primary-foreground/90 max-w-xl">
                  Join our network of satisfied landlords. Get a free property valuation
                  and discover how much your property could earn.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link to="/contact">
                  <Button size="lg" variant="secondary" className="gap-2">
                    Get Free Valuation
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <a href="tel:+447867108050">
                  <Button size="lg" variant="outline" className="gap-2 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    <Phone className="w-4 h-4" />
                    Call Us
                  </Button>
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Contact Info */}
        <div className="py-12 bg-navy">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center">
              <a 
                href="mailto:landlord@lgsltd.com" 
                className="flex items-center gap-2 text-background hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
                landlord@lgsltd.com
              </a>
              <a 
                href="tel:+447867108050" 
                className="flex items-center gap-2 text-background hover:text-primary transition-colors"
              >
                <Phone className="w-5 h-5" />
                +44 7867 108050
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default LandlordServicesPage;
