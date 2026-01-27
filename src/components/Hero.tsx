import { motion } from "framer-motion";
import { Search, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Happy students in UK"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/40 to-transparent" />
      </div>

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
            className="bg-background/95 backdrop-blur-sm rounded-xl p-4 shadow-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Keyword */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Keyword</label>
                <Input
                  placeholder="Looking For?"
                  className="border-0 bg-transparent p-0 h-auto text-foreground font-medium focus-visible:ring-0"
                />
              </div>

              {/* Category */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Category</label>
                <button className="flex items-center justify-between w-full text-foreground font-medium">
                  <span>Select Category</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Location */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Location</label>
                <button className="flex items-center justify-between w-full text-foreground font-medium">
                  <span>Location</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-end gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="w-4 h-4" />
                  More
                </Button>
                <Button className="gap-2 flex-1">
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
