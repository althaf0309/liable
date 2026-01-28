import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "./AnimatedSection";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import { useRef, useState } from "react";

const locations = [
  {
    name: "London",
    properties: 12,
    subtitle: "Luxury Properties With Conveniences.",
    image: property1,
  },
  {
    name: "Manchester",
    properties: 8,
    subtitle: "Modern Living Spaces.",
    image: property2,
  },
  {
    name: "Birmingham",
    properties: 6,
    subtitle: "Affordable Quality Homes.",
    image: property3,
  },
  {
    name: "Leeds",
    properties: 5,
    subtitle: "Student-Friendly Accommodations.",
    image: property4,
  },
  {
    name: "Liverpool",
    properties: 4,
    subtitle: "Vibrant City Living.",
    image: property5,
  },
];

interface PropertyCardProps {
  location: typeof locations[0];
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const PropertyCard = ({ location, index, isHovered, onHover, onLeave }: PropertyCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), springConfig);
  const scale = useSpring(1, springConfig);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };
  
  const handleMouseEnter = () => {
    scale.set(1.02);
    onHover();
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
    onLeave();
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        flex: isHovered ? 2 : 1,
      }}
      className="relative overflow-hidden cursor-pointer h-[450px] transition-[flex] duration-500 ease-out"
    >
      <motion.img
        src={location.image}
        alt={location.name}
        className="w-full h-full object-cover absolute inset-0"
        style={{
          scale: isHovered ? 1.1 : 1,
          transition: "scale 0.5s ease-out",
        }}
      />
      <div className={`absolute inset-0 transition-opacity duration-300 ${
        isHovered 
          ? "bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" 
          : "bg-gradient-to-t from-foreground/70 to-transparent"
      }`} />
      
      {/* Content */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-6 text-background"
        style={{
          transform: "translateZ(40px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isHovered ? 1 : 0.8, 
            y: isHovered ? 0 : 10 
          }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-primary text-sm font-medium flex items-center gap-2 mb-2">
            <span className="w-4 h-px bg-primary" />
            {location.properties} Properties
          </span>
          <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2">{location.name}</h3>
          <motion.p 
            className="text-sm text-background/80 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: isHovered ? "auto" : 0, 
              opacity: isHovered ? 1 : 0 
            }}
            transition={{ duration: 0.3 }}
          >
            {location.subtitle}
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Properties = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="properties" className="section-padding bg-background">
      <div className="container-custom">
        {/* Banner */}
        <AnimatedSection className="bg-cream rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden">
          {/* Decorative lines */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 1200 400">
              {[...Array(20)].map((_, i) => (
                <line
                  key={i}
                  x1={60 * i}
                  y1="0"
                  x2={60 * i + 200}
                  y2="400"
                  stroke="hsl(var(--primary))"
                  strokeWidth="1"
                />
              ))}
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl">
            <span className="text-primary font-medium text-sm tracking-wider">Properties</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mt-3 mb-6">
              Welcome to Our <span className="text-primary">Inclusive Residences</span>—Where Quality Living Meets Affordability
            </h2>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button variant="outline" className="gap-2">
                <Home className="w-4 h-4" />
                View Properties
              </Button>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Top Locations */}
        <AnimatedSection delay={0.2} className="bg-cream rounded-3xl py-16 px-8">
          <div className="text-center mb-12">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              Our Property List
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3">
              Our Top Location For You Property
            </h2>
          </div>

          {/* Locations Grid with Hover Effect */}
          <div 
            className="flex gap-1 overflow-hidden rounded-xl"
            style={{ perspective: "1000px" }}
          >
            {locations.map((location, index) => (
              <PropertyCard
                key={location.name}
                location={location}
                index={index}
                isHovered={hoveredIndex === index}
                onHover={() => setHoveredIndex(index)}
                onLeave={() => setHoveredIndex(null)}
              />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Properties;
