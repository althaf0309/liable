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
            className="bg-background/95 backdrop-blur-sm rounded-xl p-6 shadow-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
              {/* Keyword */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Keyword</label>
                <Input
                  placeholder="Looking For?"
                  className="border-b border-border bg-transparent rounded-none px-0 h-10 text-foreground font-medium focus-visible:ring-0 focus-visible:border-primary"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Category</label>
                <button className="flex items-center justify-between w-full text-foreground font-medium h-10 border-b border-border hover:border-primary transition-colors">
                  <span>Select Category</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Location</label>
                <button className="flex items-center justify-between w-full text-foreground font-medium h-10 border-b border-border hover:border-primary transition-colors">
                  <span>Location</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Button variant="outline" size="default" className="gap-2 h-10">
                  <Filter className="w-4 h-4" />
                  More
                </Button>
                <Button className="gap-2 flex-1 h-10">
                  <Search className="w-4 h-4" />
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
