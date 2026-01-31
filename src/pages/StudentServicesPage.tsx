import { motion } from "framer-motion";
import { Plane, Home, Coins, Briefcase, GraduationCap, Users, FileText, CreditCard, MapPin, Phone, Mail, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Plane,
    title: "Arrival & Orientation",
    description: "Seamless airport pickup, welcome pack, and local SIM assistance. We guide you with travel support and help you settle in. Connect with fellow students through our community network.",
    features: ["Airport pickup service", "Welcome orientation pack", "Local SIM card assistance", "Travel support guidance", "Community networking"],
  },
  {
    icon: Home,
    title: "Accommodation Support",
    description: "Verified student housing with flexible lease options. Explore virtual tours, short stays, and long-term homes. We help match you with the right accommodation easily.",
    features: ["Verified student housing", "Flexible lease options", "Virtual property tours", "Short & long-term stays", "Personalized matching"],
  },
  {
    icon: Coins,
    title: "Student Startup Kit – Free Access",
    description: "Complimentary registration and student starter guide. Access tools, offers, and resources made for students. Everything you need to begin your student life smoothly.",
    features: ["Free registration", "Student starter guide", "Exclusive student offers", "Essential resources", "Smooth onboarding"],
  },
  {
    icon: Briefcase,
    title: "Job & Career Support",
    description: "Get a professional, ATS-optimized CV tailored for the UK market. We offer expert resume formatting, job search tips, and guidance. From part-time roles to full-time careers.",
    features: ["ATS-optimized CV", "UK market tailored", "Job search guidance", "Part-time opportunities", "Career preparation"],
  },
];

const additionalServices = [
  {
    icon: CreditCard,
    title: "Banking & Finance",
    description: "Assistance with opening UK bank accounts and understanding financial services.",
  },
  {
    icon: FileText,
    title: "Visa & Documentation",
    description: "Support with visa applications, extensions, and required documentation.",
  },
  {
    icon: MapPin,
    title: "City Navigation",
    description: "Guided tours and tips for navigating your new city effectively.",
  },
  {
    icon: Users,
    title: "Community Events",
    description: "Regular social events to help you connect with other international students.",
  },
];

const StudentServicesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Banner */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img 
            src={heroImage} 
            alt="Student Services" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-background mb-4">
              Services for Students
            </h1>
            <div className="flex items-center gap-2 text-background/80 text-sm">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-primary">Student Services</span>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <div className="section-padding">
          <div className="container-custom">
            <AnimatedSection className="text-center max-w-4xl mx-auto">
              <span className="text-primary font-semibold text-sm tracking-widest uppercase">
                Student Support
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 leading-tight">
                Your Journey to the <span className="text-primary">UK Starts Here</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                We understand the challenges international students face when moving to a new country.
                That's why we've designed comprehensive support services to make your transition smooth,
                comfortable, and stress-free. From arrival to settling in, we're with you every step of the way.
              </p>
            </AnimatedSection>
          </div>
        </div>

        {/* Main Services */}
        <div className="py-12 md:py-16 bg-cream">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <AnimatedSection key={service.title} delay={index * 0.1}>
                  <motion.div
                    className="bg-background rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 h-full"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <service.icon className="w-7 h-7 text-primary-foreground" />
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

        {/* Additional Services Grid */}
        <div className="section-padding">
          <div className="container-custom">
            <AnimatedSection className="text-center mb-12">
              <span className="text-primary font-semibold text-sm tracking-widest uppercase">
                Additional Support
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-4">
                More Ways We Can Help
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalServices.map((service, index) => (
                <AnimatedSection key={service.title} delay={index * 0.1}>
                  <motion.div
                    className="bg-muted/30 rounded-xl p-6 text-center hover:bg-muted/50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 md:py-20 bg-primary">
          <div className="container-custom">
            <AnimatedSection className="text-center">
              <GraduationCap className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Start Your UK Journey?
              </h2>
              <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                Join thousands of international students who have successfully settled in the UK with our support.
                Get in touch today and let us help you make your student life easier.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact">
                  <Button size="lg" variant="secondary" className="gap-2">
                    <Mail className="w-4 h-4" />
                    Contact Us
                  </Button>
                </Link>
                <a href="tel:+447867108050">
                  <Button size="lg" variant="outline" className="gap-2 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    <Phone className="w-4 h-4" />
                    Call Now
                  </Button>
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default StudentServicesPage;
