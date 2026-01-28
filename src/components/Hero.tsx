import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-image.jpg";
import { useRef } from "react";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <img
          src={heroImage}
          alt="Happy students in UK"
          className="w-full h-[120%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/40 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="container-custom relative z-10 py-20">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-background italic leading-tight mb-8"
          >
            Get Settled in the UK with Liable
          </motion.h1>

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
                <button className="flex items-center justify-between w-full text-foreground text-sm font-medium h-8">
                  <span>Select Category</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Location */}
              <div className="flex-1 p-5 border-b md:border-b-0 md:border-r border-border">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Location</label>
                <button className="flex items-center justify-between w-full text-foreground text-sm font-medium h-8">
                  <span>Location</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
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
