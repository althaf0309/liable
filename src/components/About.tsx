import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "./AnimatedSection";
import aboutImage from "@/assets/about-image.jpg";

const About = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <AnimatedSection direction="left" className="relative">
            <div className="relative">
              {/* House shape background */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute -top-8 -left-8 w-full h-full"
              >
                <svg viewBox="0 0 400 500" className="w-full h-full">
                  <path
                    d="M200 20 L380 140 L380 480 L20 480 L20 140 Z"
                    fill="none"
                    stroke="hsl(var(--border))"
                    strokeWidth="2"
                    strokeDasharray="8 8"
                  />
                </svg>
              </motion.div>
              <motion.img
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                src={aboutImage}
                alt="Happy students in London"
                className="relative z-10 rounded-2xl shadow-xl w-full max-w-md mx-auto"
              />
            </div>
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection direction="right" delay={0.2}>
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              About Company
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
              Welcome to Liable Group Services Ltd
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Liable Group Services Ltd is a UK-based company committed to elevating the living
              experience for tenants. Our services include student accommodation, Airbnb hosting,
              building management, and tailored student support—from arrival support and practical
              settlement assistance. We also provide accommodation to everyone, including anyone with
              the Right to Rent in the UK, ensuring inclusive access to quality housing solutions.
              With affordability, quality, and international reach at our core, we aim to redefine
              the standards of modern living.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button className="gap-2">
                <Home className="w-4 h-4" />
                Explore More
              </Button>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default About;
