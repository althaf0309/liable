import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import heroSlide1 from "@/assets/hero-image.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";
import { useRef, useState, useEffect, useCallback } from "react";

const slides = [
  {
    image: heroSlide1,
    title: "Get Settled in the UK with Liable",
    subtitle: "Your trusted partner for student accommodation and services",
  },
  {
    image: heroSlide2,
    title: "Find Your Perfect Student Home",
    subtitle: "Premium accommodations across major UK cities",
  },
  {
    image: heroSlide3,
    title: "Expert Guidance for International Students",
    subtitle: "From arrival to settling in, we're here to help",
  },
];

const categories = [
  { value: "accommodation", label: "Accommodation" },
  { value: "orientation", label: "Orientation Services" },
  { value: "banking", label: "Banking & Finance" },
  { value: "employment", label: "Employment Support" },
  { value: "legal", label: "Legal Services" },
];

const locations = [
  { value: "london", label: "London" },
  { value: "manchester", label: "Manchester" },
  { value: "birmingham", label: "Birmingham" },
  { value: "leeds", label: "Leeds" },
  { value: "liverpool", label: "Liverpool" },
  { value: "edinburgh", label: "Edinburgh" },
  { value: "glasgow", label: "Glasgow" },
  { value: "bristol", label: "Bristol" },
];

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Carousel with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="w-full h-[120%] object-cover absolute inset-0"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
      </motion.div>

      {/* Carousel Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-background hover:bg-background/40 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-background hover:bg-background/40 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-primary w-8" 
                : "bg-background/50 hover:bg-background/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 py-20">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-background italic leading-tight mb-4">
                {slides[currentSlide].title}
              </h1>
              <p className="text-background/90 text-lg md:text-xl mb-8">
                {slides[currentSlide].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="bg-background rounded-lg shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              {/* Keyword */}
              <div className="flex-1 p-5 border-b md:border-b-0 md:border-r border-border">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Keyword</label>
                <Input
                  placeholder="Looking For?"
                  className="border-0 bg-transparent p-0 h-8 text-foreground text-sm font-medium focus-visible:ring-0 placeholder:text-muted-foreground/70"
                />
              </div>

              {/* Category */}
              <div className="flex-1 p-5 border-b md:border-b-0 md:border-r border-border">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="border-0 bg-transparent p-0 h-8 text-foreground text-sm font-medium focus:ring-0 [&>svg]:text-muted-foreground">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border z-50">
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="flex-1 p-5 border-b md:border-b-0 md:border-r border-border">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Location</label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="border-0 bg-transparent p-0 h-8 text-foreground text-sm font-medium focus:ring-0 [&>svg]:text-muted-foreground">
                    <SelectValue placeholder="Select Location" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border z-50">
                    {locations.map((loc) => (
                      <SelectItem key={loc.value} value={loc.value}>
                        {loc.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 p-5">
                <Button variant="outline" size="sm" className="gap-2 h-9 px-4 text-xs font-medium">
                  <Filter className="w-3.5 h-3.5" />
                  More
                </Button>
                <Button className="gap-2 h-9 px-6 text-xs font-medium">
                  <Search className="w-3.5 h-3.5" />
                  Search
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
