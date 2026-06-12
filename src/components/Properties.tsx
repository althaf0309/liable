import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "./AnimatedSection";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { fetchPublicProperties, Property } from "@/lib/properties";

// fallback images — London/UK properties via Unsplash
const property1 = "https://images.unsplash.com/photo-1510265119258-db115b0e8172?fm=jpg&q=80&w=800&auto=format&fit=crop";
const property2 = "https://images.unsplash.com/photo-1512359953714-f0c9a632ab85?fm=jpg&q=80&w=800&auto=format&fit=crop";
const property3 = "https://images.unsplash.com/photo-1550647512-8b8a24d4f646?fm=jpg&q=80&w=800&auto=format&fit=crop";
const property4 = "https://images.unsplash.com/photo-1609679604891-f69f884eddae?fm=jpg&q=80&w=800&auto=format&fit=crop";
const property5 = "https://images.unsplash.com/photo-1480449649358-ee14c6ee0b17?fm=jpg&q=80&w=800&auto=format&fit=crop";

const fallbackImages = [property1, property2, property3, property4, property5];

type LocationCard = {
  name: string; // city
  properties: number;
  subtitle: string;
  image: string;

  // ✅ optional: first property_type found in that city (so you can pass type filter too)
  type?: string;
};

function getCoverImage(p: Property) {
  const images = [...(p.images || [])].sort((a, b) => {
    if (a.is_cover !== b.is_cover) return a.is_cover ? -1 : 1;
    return (a.sort_order || 0) - (b.sort_order || 0);
  });
  return images[0]?.image_url || "";
}

function subtitleForCity(city: string) {
  const c = city.toLowerCase();
  if (c.includes("london")) return "Luxury Properties With Conveniences.";
  if (c.includes("manchester")) return "Modern Living Spaces.";
  if (c.includes("birmingham")) return "Affordable Quality Homes.";
  if (c.includes("leeds")) return "Student-Friendly Accommodations.";
  if (c.includes("liverpool")) return "Vibrant City Living.";
  return "Find your perfect home.";
}

interface PropertyCardProps {
  location: LocationCard;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const LocationCardUI = ({
  location,
  index,
  isHovered,
  onHover,
  onLeave,
}: PropertyCardProps) => {
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

  // ✅ build URL for properties page filter
  const toUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set("city", location.name);

    // ✅ optional: also filter by type if you want
    // if (location.type) params.set("type", String(location.type).toUpperCase());

    return `/properties?${params.toString()}`;
  }, [location.name, location.type]);

  return (
    <Link to={toUrl} className="md:flex-1">
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
        className="relative overflow-hidden cursor-pointer h-[200px] md:h-[450px] transition-[flex] duration-500 ease-out"
        role="link"
        aria-label={`View properties in ${location.name}`}
        title={`View properties in ${location.name}`}
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

        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            isHovered
              ? "bg-gradient-to-t from-black/85 via-black/45 to-transparent"
              : "bg-gradient-to-t from-black/70 to-transparent"
          }`}
        />

        <motion.div
          className="absolute bottom-0 left-0 right-0 p-6 text-white"
          style={{ transform: "translateZ(40px)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0.8,
              y: isHovered ? 0 : 10,
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-primary text-sm font-medium flex items-center gap-2 mb-2">
              <span className="w-4 h-px bg-primary" />
              {location.properties} Properties
            </span>

            <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2">
              {location.name}
            </h3>

            <motion.p
              className="text-sm text-white/75 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: isHovered ? "auto" : 0,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {location.subtitle}
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default function Properties() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [items, setItems] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ fetch from backend
  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const data = await fetchPublicProperties();
        if (!alive) return;
        setItems(Array.isArray(data) ? data : []);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // ✅ build "top locations" from backend
  const locations: LocationCard[] = useMemo(() => {
    if (!items.length) {
      return [
        { name: "London", properties: 0, subtitle: subtitleForCity("London"), image: fallbackImages[0] },
        { name: "Manchester", properties: 0, subtitle: subtitleForCity("Manchester"), image: fallbackImages[1] },
        { name: "Birmingham", properties: 0, subtitle: subtitleForCity("Birmingham"), image: fallbackImages[2] },
        { name: "Leeds", properties: 0, subtitle: subtitleForCity("Leeds"), image: fallbackImages[3] },
        { name: "Liverpool", properties: 0, subtitle: subtitleForCity("Liverpool"), image: fallbackImages[4] },
      ];
    }

    // count + cover + type by city
    const map = new Map<string, { count: number; cover?: string; type?: string }>();

    for (const p of items) {
      const city = (p.city || "").trim() || "Unknown";
      const prev = map.get(city) || { count: 0, cover: "", type: "" };

      // first cover/type per city
      const cover = prev.cover || getCoverImage(p);
      const type = prev.type || (p.property_type ? String(p.property_type).toUpperCase() : "");

      map.set(city, { count: prev.count + 1, cover, type });
    }

    return [...map.entries()]
      .map(([city, v], idx) => ({
        name: city,
        properties: v.count,
        subtitle: subtitleForCity(city),
        image: v.cover || fallbackImages[idx % fallbackImages.length],
        type: v.type || undefined,
      }))
      .sort((a, b) => b.properties - a.properties)
      .slice(0, 5);
  }, [items]);

  return (
    <section id="properties" className="section-padding bg-background">
      <div className="container-custom px-4 md:px-8">
        {/* Banner */}
        <AnimatedSection className="bg-cream border border-border rounded-2xl md:rounded-3xl p-6 md:p-12 mb-8 md:mb-16 relative overflow-hidden">
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
            <span className="text-primary font-medium text-xs md:text-sm tracking-wider">
              Properties
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mt-2 md:mt-3 mb-4 md:mb-6">
              Welcome to Our <span className="text-primary">Inclusive Residences</span>—Where Quality Living Meets
              Affordability
            </h2>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link to="/properties">
                <Button variant="outline" className="gap-2 text-sm">
                  <Home className="w-4 h-4" />
                  View Properties
                </Button>
              </Link>
            </motion.div>

            {loading && <p className="mt-4 text-sm text-muted-foreground">Loading from server…</p>}
          </div>
        </AnimatedSection>

        {/* Top Locations */}
        <AnimatedSection delay={0.2} className="bg-cream border border-border rounded-2xl md:rounded-3xl py-8 md:py-16 px-4 md:px-8">
          <div className="text-center mb-8 md:mb-12">
            <span className="text-primary font-medium text-xs md:text-sm tracking-wider uppercase">
              Our Property List
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2 md:mt-3">
              Our Top Location For You Property
            </h2>
          </div>

          <div
            className="flex flex-col md:flex-row gap-2 md:gap-1 overflow-hidden rounded-xl"
            style={{ perspective: "1000px" }}
          >
            {locations.map((location, index) => (
              <LocationCardUI
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
}
