import { motion, useAnimationFrame } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Users, Globe } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useRef, useState } from "react";

const RotatingGlobe = () => {
  const [rotation, setRotation] = useState(0);
  
  useAnimationFrame((time) => {
    setRotation(time * 0.01);
  });

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Outer glow */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-primary/10 blur-3xl animate-pulse" />
      
      {/* Globe container */}
      <motion.div
        className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
        style={{ 
          transformStyle: "preserve-3d",
          rotateY: rotation,
        }}
      >
        {/* Globe sphere with gradient */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-primary/10 to-navy/50 border border-primary/20 shadow-2xl" />
        
        {/* Latitude lines */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`lat-${i}`}
            className="absolute inset-0 rounded-full border border-primary/20"
            style={{
              transform: `rotateX(${(i + 1) * 30}deg) scale(${1 - i * 0.15})`,
              transformStyle: "preserve-3d",
            }}
          />
        ))}
        
        {/* Longitude lines */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`long-${i}`}
            className="absolute inset-0 rounded-full border border-primary/20"
            style={{
              transform: `rotateY(${i * 22.5}deg)`,
              transformStyle: "preserve-3d",
            }}
          />
        ))}
        
        {/* Animated dots representing locations */}
        {[
          { top: "25%", left: "45%", delay: 0 },
          { top: "35%", left: "52%", delay: 0.5 },
          { top: "30%", left: "48%", delay: 1 },
          { top: "40%", left: "55%", delay: 1.5 },
          { top: "28%", left: "42%", delay: 2 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-primary rounded-full"
            style={{ top: pos.top, left: pos.left }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              delay: pos.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-50" />
          </motion.div>
        ))}
        
        {/* Connection lines between points */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <motion.path
            d="M 45 25 Q 50 30 52 35 Q 55 40 48 30"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="0.3"
            strokeDasharray="2 2"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </svg>
      </motion.div>
      
      {/* Orbiting elements */}
      <motion.div
        className="absolute w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-primary/60 rounded-full blur-sm" />
        </div>
      </motion.div>
      
      <motion.div
        className="absolute w-full h-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute bottom-10 right-10">
          <div className="w-3 h-3 bg-gold/60 rounded-full blur-sm" />
        </div>
      </motion.div>
    </div>
  );
};

const Booking = () => {
  return (
    <section id="booking" className="section-padding bg-navy text-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Form */}
          <AnimatedSection direction="left">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              Book Your Stay
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mt-3 mb-6">
              Ready to Find Your <span className="text-primary">Perfect Home</span> in the UK?
            </h2>
            <p className="text-background/70 mb-8">
              Let us help you find the ideal accommodation. Fill in your details and we'll get back to you within 24 hours.
            </p>

            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input 
                    placeholder="Full Name" 
                    className="pl-12 bg-background/10 border-background/20 text-background placeholder:text-background/50 h-12"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input 
                    placeholder="Preferred Location" 
                    className="pl-12 bg-background/10 border-background/20 text-background placeholder:text-background/50 h-12"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input 
                    type="date"
                    placeholder="Move-in Date" 
                    className="pl-12 bg-background/10 border-background/20 text-background placeholder:text-background/50 h-12"
                  />
                </div>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input 
                    placeholder="Your Country" 
                    className="pl-12 bg-background/10 border-background/20 text-background placeholder:text-background/50 h-12"
                  />
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="w-full h-14 text-base font-semibold mt-4">
                  Book Consultation
                </Button>
              </motion.div>
            </form>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-background/10">
              {[
                { value: "500+", label: "Students Placed" },
                { value: "35+", label: "UK Cities" },
                { value: "98%", label: "Satisfaction" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-background/60 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* Right - Globe Animation */}
          <AnimatedSection direction="right" className="hidden lg:block">
            <div className="relative h-[500px]" style={{ perspective: "1000px" }}>
              <RotatingGlobe />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Booking;
