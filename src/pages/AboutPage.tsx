import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import aboutImage from "@/assets/about-image.jpg";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Banner */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img 
            src={aboutImage} 
            alt="About Us" 
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-background mb-4">
              About Us
            </h1>
            <div className="flex items-center gap-2 text-background/80 text-sm">
              <a href="/" className="hover:text-primary transition-colors">Home</a>
              <span>/</span>
              <span className="text-primary">About Us</span>
            </div>
          </div>
        </div>

        {/* About Company Section */}
        <div className="section-padding">
          <div className="container-custom">
            <AnimatedSection className="text-center max-w-4xl mx-auto">
              <span className="text-primary font-semibold text-sm tracking-widest uppercase">
                About Company
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 leading-tight">
                Elevating Living, Simplifying Renting
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                Liable Group Services Ltd is a UK-based company committed to elevating the living
                experience for tenants. Our services include student accommodation, Airbnb hosting,
                building management, and tailored student support—from arrival support and practical
                settlement assistance. We also provide accommodation to everyone, including anyone with
                the Right to Rent in the UK, ensuring inclusive access to quality housing solutions.
                With affordability, quality, and international reach at our core, we aim to redefine
                the standards of <span className="text-primary">modern living</span>.
              </p>
            </AnimatedSection>
          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div className="py-12 md:py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
              {/* Our Vision */}
              <AnimatedSection direction="left" delay={0.1}>
                <motion.div 
                  className="bg-primary rounded-2xl p-8 md:p-10 h-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                    Our Vision
                  </h3>
                  <p className="text-primary-foreground/90 leading-relaxed">
                    To redefine modern living by creating inclusive, high-quality, and
                    affordable accommodation experiences that empower individuals
                    and <span className="underline">communities</span> across the UK and beyond.
                  </p>
                </motion.div>
              </AnimatedSection>

              {/* Our Mission */}
              <AnimatedSection direction="right" delay={0.2}>
                <motion.div 
                  className="bg-navy rounded-2xl p-8 md:p-10 h-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-background mb-4">
                    Our Mission
                  </h3>
                  <p className="text-background/90 leading-relaxed">
                    To enhance modern living through inclusive, affordable, and quality
                    housing - supporting tenants with tailored services that make
                    settling in <span className="underline">the UK easier, safer, and smoother</span>.
                  </p>
                </motion.div>
              </AnimatedSection>
            </div>
          </div>
        </div>

        {/* Founders Note */}
        <div className="py-16 md:py-20 bg-muted/30">
          <div className="container-custom">
            <AnimatedSection className="text-center max-w-3xl mx-auto">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-8">
                Founders Note
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed italic">
                "Liable Group was born from struggle. As an international student in London, I faced cramped,
                <span className="text-primary"> overpriced housing</span> - until I found a better way. Today, we cut out the middlemen to offer
                <span className="text-primary"> students and tenants affordable, dignified homes</span>. No compromises."
              </p>
            </AnimatedSection>
          </div>
        </div>

        {/* Working at Liable */}
        <div className="relative h-80 md:h-96 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 to-foreground/70" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-background mb-4">
              WORKING AT LIABLE
            </h2>
            <p className="text-background/80 mb-6">
              PLEASE SEND YOUR CV TO
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              <a 
                href="mailto:student@lgsltd.com" 
                className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
              >
                <Mail className="w-4 h-4" />
                student@lgsltd.com
              </a>
              <a 
                href="tel:08801236S499" 
                className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
              >
                <Phone className="w-4 h-4" />
                088 0123 654 99
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
