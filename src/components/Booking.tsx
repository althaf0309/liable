import { motion, useAnimationFrame } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Users, Globe } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useState } from "react";

const RotatingGlobe = () => {
  const [rotation, setRotation] = useState(0);
  
  useAnimationFrame((time) => {
    setRotation(time * 0.008);
  });

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Outer subtle glow */}
      <div className="absolute w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full bg-primary/5 blur-3xl" />
      
      {/* Globe container */}
      <motion.div
        className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px]"
        style={{ 
          transformStyle: "preserve-3d",
          rotateY: rotation,
          rotateX: -15,
        }}
      >
        {/* Main globe circle */}
        <div className="absolute inset-0 rounded-full border border-primary/30" />
        
        {/* Horizontal latitude lines */}
        {[0.2, 0.35, 0.5, 0.65, 0.8].map((scale, i) => (
          <div
            key={`h-${i}`}
            className="absolute rounded-full border border-primary/20"
            style={{
              width: `${scale * 100}%`,
              height: `${scale * 100}%`,
              top: `${(1 - scale) * 50}%`,
              left: `${(1 - scale) * 50}%`,
            }}
          />
        ))}
        
        {/* Vertical longitude curves */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute inset-0"
            style={{
              transform: `rotateY(${i * 30}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            <div 
              className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              style={{
                background: `linear-gradient(to bottom, transparent, hsl(var(--primary) / 0.3) 20%, hsl(var(--primary) / 0.3) 80%, transparent)`,
              }}
            />
          </motion.div>
        ))}
        
        {/* Curved horizontal lines for 3D effect */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <ellipse 
            cx="50" cy="50" rx="48" ry="20" 
            fill="none" 
            stroke="hsl(var(--primary))" 
            strokeWidth="0.3" 
            opacity="0.3"
          />
          <ellipse 
            cx="50" cy="35" rx="40" ry="15" 
            fill="none" 
            stroke="hsl(var(--primary))" 
            strokeWidth="0.3" 
            opacity="0.2"
          />
          <ellipse 
            cx="50" cy="65" rx="40" ry="15" 
            fill="none" 
            stroke="hsl(var(--primary))" 
            strokeWidth="0.3" 
            opacity="0.2"
          />
        </svg>
        
        {/* Location dots - UK area */}
        {[
          { top: "28%", left: "48%", size: "w-2.5 h-2.5", delay: 0 },
          { top: "32%", left: "52%", size: "w-2 h-2", delay: 0.3 },
          { top: "35%", left: "49%", size: "w-2.5 h-2.5", delay: 0.6 },
          { top: "30%", left: "45%", size: "w-2 h-2", delay: 0.9 },
          { top: "38%", left: "51%", size: "w-2 h-2", delay: 1.2 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className={`absolute ${pos.size} bg-primary rounded-full shadow-lg shadow-primary/50`}
            style={{ top: pos.top, left: pos.left }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2.5,
              delay: pos.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Connection lines between dots */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <motion.line
            x1="48" y1="28" x2="52" y2="32"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            opacity="0.5"
          />
          <motion.line
            x1="52" y1="32" x2="49" y2="35"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            opacity="0.5"
          />
          <motion.line
            x1="49" y1="35" x2="51" y2="38"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            opacity="0.5"
          />
        </svg>
      </motion.div>
      
      {/* Orbiting particle */}
      <motion.div
        className="absolute w-full h-full pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-4 left-1/2 -translate-x-1/2">
          <div className="w-2 h-2 bg-primary/40 rounded-full" />
        </div>
      </motion.div>
      
      <motion.div
        className="absolute w-full h-full pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute bottom-16 right-8">
          <div className="w-1.5 h-1.5 bg-primary/30 rounded-full" />
        </div>
      </motion.div>
    </div>
  );
};

const Booking = () => {
  return (
    <section id="booking" className="py-20 md:py-28 bg-navy text-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "50px 50px",
        }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Form */}
          <AnimatedSection direction="left">
            <span className="text-primary font-semibold text-sm tracking-widest uppercase">
              Book Your Stay
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6 leading-tight">
              Ready to Find Your <br />
              <span className="text-primary">Perfect Home</span> in <br />
              the UK?
            </h2>
            <p className="text-background/60 text-lg mb-10 max-w-md">
              Let us help you find the ideal accommodation. Fill in your details and we'll get back to you within 24 hours.
            </p>

            <form className="space-y-5 max-w-lg">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
                  <Input 
                    placeholder="Full Name" 
                    className="pl-12 bg-background border-0 text-foreground placeholder:text-foreground/50 h-14 rounded-lg"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
                  <Input 
                    placeholder="Preferred Location" 
                    className="pl-12 bg-background border-0 text-foreground placeholder:text-foreground/50 h-14 rounded-lg"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
                  <Input 
                    type="text"
                    placeholder="dd-mm-yyyy" 
                    className="pl-12 bg-background border-0 text-foreground placeholder:text-foreground/50 h-14 rounded-lg"
                  />
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
                </div>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
                  <Input 
                    placeholder="Your Country" 
                    className="pl-12 bg-background border-0 text-foreground placeholder:text-foreground/50 h-14 rounded-lg"
                  />
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="w-full h-14 text-base font-semibold rounded-lg mt-2">
                  Book Consultation
                </Button>
              </motion.div>
            </form>
          </AnimatedSection>

          {/* Right - Globe Animation */}
          <AnimatedSection direction="right" className="hidden lg:block">
            <div className="relative h-[500px]" style={{ perspective: "1200px" }}>
              <RotatingGlobe />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Booking;
