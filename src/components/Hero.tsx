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
import { useNavigate } from "react-router-dom";

const slides = [
  {
    image: heroSlide1,
    title: "Controlled Student Housing Infrastructure",
    subtitle: "Liable structures international student housing through tenancy readiness, controlled matching, and operational support.",
  },
  {
    image: heroSlide2,
    title: "Allocation, Not Open Marketplace Bidding",
    subtitle: "Students are matched through suitability, affordability, availability, and occupancy rules instead of landlord profile browsing.",
  },
  {
    image: heroSlide3,
    title: "Occupancy Continuity for Student Housing",
    subtitle: "Liable supports intake-cycle placements, tenancy monitoring, complaints workflow, and future void-risk alerts.",
  },
];

// NOTE: In backend you have PropertyType choices like:
// APARTMENT, VILLA, STUDIO, PG, TOWNHOUSE, OTHER
const categories = [
  { value: "apartment", label: "Apartment" },
  { value: "studio", label: "Studio" },
  { value: "villa", label: "Villa" },
  { value: "townhouse", label: "Townhouse" },
  { value: "pg", label: "PG/Hostel" },
  { value: "other", label: "Other" },
];

const locations = [
  { value: "London", label: "London" },
  { value: "Manchester", label: "Manchester" },
  { value: "Birmingham", label: "Birmingham" },
  { value: "Leeds", label: "Leeds" },
  { value: "Liverpool", label: "Liverpool" },
  { value: "Edinburgh", label: "Edinburgh" },
  { value: "Glasgow", label: "Glasgow" },
  { value: "Bristol", label: "Bristol" },
];

const priceRanges = [
  { value: "all", label: "All Prices" },
  { value: "0-1000", label: "Up to £1,000" },
  { value: "1000-2000", label: "£1,000 - £2,000" },
  { value: "2000-3000", label: "£2,000 - £3,000" },
  { value: "3000+", label: "£3,000+" },
];

const Hero = () => {
  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  const [currentSlide, setCurrentSlide] = useState(0);

  // ✅ Search form state
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState(""); // maps to backend type
  const [location, setLocation] = useState(""); // maps to backend city
  const [priceRange, setPriceRange] = useState("all"); // maps to min_rent/max_rent

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

  // ✅ Build query params & go to properties page
  const onSearch = () => {
    const params = new URLSearchParams();

    if (keyword.trim()) params.set("q", keyword.trim());

    // backend: city__icontains -> we send full city
    if (location.trim()) params.set("city", location.trim());

    // backend expects type like APARTMENT
    if (category.trim()) params.set("type", category.trim().toUpperCase());

    // price range to backend min/max
    if (priceRange === "0-1000") {
      params.set("max_rent", "1000");
    } else if (priceRange === "1000-2000") {
      params.set("min_rent", "1000");
      params.set("max_rent", "2000");
    } else if (priceRange === "2000-3000") {
      params.set("min_rent", "2000");
      params.set("max_rent", "3000");
    } else if (priceRange === "3000+") {
      params.set("min_rent", "3000");
    }

    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section ref={containerRef} className="relative h-[100svh] flex items-center pt-20 overflow-hidden">
      {/* Background Carousel with Parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
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
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/50 to-foreground/30 md:from-foreground/60 md:via-foreground/30 md:to-transparent" />
      </motion.div>

      {/* Nav arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/20 backdrop-blur-sm hidden sm:flex items-center justify-center text-background hover:bg-background/40 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/20 backdrop-blur-sm hidden sm:flex items-center justify-center text-background hover:bg-background/40 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-primary w-6 md:w-8" : "bg-background/50 hover:bg-background/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 py-12 md:py-20 px-4">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-background italic leading-tight mb-3 md:mb-4">
                {slides[currentSlide].title}
              </h1>
              <p className="text-background/90 text-base md:text-lg lg:text-xl mb-6 md:mb-8">
                {slides[currentSlide].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* ✅ Search Box (connected) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="bg-background rounded-lg shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              {/* Keyword */}
              <div className="flex-1 p-4 md:p-5 border-b md:border-b-0 md:border-r border-border">
                <label className="text-[10px] md:text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5 md:mb-2">
                  Keyword
                </label>
                <Input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Looking For?"
                  className="border-0 bg-transparent p-0 h-7 md:h-8 text-foreground text-sm font-medium focus-visible:ring-0 placeholder:text-muted-foreground/70"
                />
              </div>

              {/* Category (Property Type) */}
              <div className="flex-1 p-4 md:p-5 border-b md:border-b-0 md:border-r border-border">
                <label className="text-[10px] md:text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5 md:mb-2">
                  Type
                </label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="border-0 bg-transparent p-0 h-7 md:h-8 text-foreground text-sm font-medium focus:ring-0 [&>svg]:text-muted-foreground">
                    <SelectValue placeholder="Select Type" />
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

              {/* Location (City) */}
              <div className="flex-1 p-4 md:p-5 border-b md:border-b-0 md:border-r border-border">
                <label className="text-[10px] md:text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5 md:mb-2">
                  City
                </label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="border-0 bg-transparent p-0 h-7 md:h-8 text-foreground text-sm font-medium focus:ring-0 [&>svg]:text-muted-foreground">
                    <SelectValue placeholder="Select City" />
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

              {/* Price */}
              <div className="flex-1 p-4 md:p-5 border-b md:border-b-0 md:border-r border-border">
                <label className="text-[10px] md:text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5 md:mb-2">
                  Price
                </label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="border-0 bg-transparent p-0 h-7 md:h-8 text-foreground text-sm font-medium focus:ring-0 [&>svg]:text-muted-foreground">
                    <SelectValue placeholder="Select Price" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border z-50">
                    {priceRanges.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 md:gap-3 p-4 md:p-5">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 md:gap-2 h-8 md:h-9 px-3 md:px-4 text-xs font-medium"
                  onClick={() => {
                    // optional: open advanced filter modal later
                  }}
                  type="button"
                >
                  <Filter className="w-3 h-3 md:w-3.5 md:h-3.5" />
                  More
                </Button>

                <Button
                  className="gap-1.5 md:gap-2 h-8 md:h-9 px-4 md:px-6 text-xs font-medium flex-1 md:flex-none"
                  onClick={onSearch}
                  type="button"
                >
                  <Search className="w-3 h-3 md:w-3.5 md:h-3.5" />
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
