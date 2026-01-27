import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "./AnimatedSection";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const locations = [
  {
    name: "London",
    subtitle: "Luxury Properties With Conveniences.",
    image: property1,
  },
  {
    name: "Manchester",
    subtitle: "Modern Living Spaces.",
    image: property2,
  },
  {
    name: "Birmingham",
    subtitle: "Affordable Quality Homes.",
    image: property3,
  },
];

const Properties = () => {
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

          {/* Locations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {locations.map((location, index) => (
              <motion.div
                key={location.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className={`relative overflow-hidden group cursor-pointer ${
                  index === 1 ? "md:scale-105 z-10" : ""
                }`}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    src={location.image}
                    alt={location.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="absolute bottom-0 left-0 right-0 p-6 text-background"
                  >
                    <h3 className="font-serif text-2xl font-bold">{location.name}</h3>
                    <p className="text-sm text-background/80">{location.subtitle}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Properties;
