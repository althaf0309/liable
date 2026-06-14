import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Bed,
  Bath,
  Square,
  ChevronLeft,
  ChevronRight,
  Heart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import GlassGlobe from "@/components/GlassGlobe";
import { apiFetch } from "@/lib/api";

const DARK = "hsl(222,52%,2%)";
const DARK2 = "hsl(222,48%,4%)";
const darkField = "bg-white/[0.04] border-white/10 text-[#F5F2ED] placeholder:text-white/40 focus-visible:ring-1 focus-visible:ring-[#C5A059]/40";

// ------------------ Types ------------------
type PropertyImage = {
  id: number;
  image_url: string;
  is_cover: boolean;
  sort_order: number;
  alt_text?: string;
  caption?: string;
};

type Property = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  city: string;
  locality?: string;
  property_type: string;
  room_type: string;
  bedrooms: number;
  bathrooms: number;
  area_sqft?: number | null;
  currency: string;
  rent_monthly: string | number;
  status: string;
  available_from?: string | null;
  is_featured: boolean;
  priority_rank: number;
  images: PropertyImage[];
};

function money(n: any) {
  const v = typeof n === "string" ? Number(n) : n;
  if (!isFinite(v)) return "";
  return v.toLocaleString();
}

function propertyTypeLabel(t: string) {
  const x = String(t || "").toUpperCase();
  return x.charAt(0) + x.slice(1).toLowerCase();
}

function getImageUrls(p: Property) {
  const ordered = [...(p.images || [])].sort((a, b) => {
    if (a.is_cover !== b.is_cover) return a.is_cover ? -1 : 1;
    return (a.sort_order || 0) - (b.sort_order || 0);
  });
  const urls = ordered.map((i) => i.image_url).filter(Boolean);
  return urls.length ? urls : ["https://via.placeholder.com/800x600?text=No+Image"];
}

// ------------------ Card ------------------
const PropertyCard = ({ property }: { property: Property }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const images = useMemo(() => getImageUrls(property), [property]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const locationText = [property.locality, property.city].filter(Boolean).join(", ");

  return (
    <motion.div
      className="group rounded-2xl overflow-hidden transition-all duration-300"
      style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.08)" }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Carousel */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
          aria-label="Prev image"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
          aria-label="Next image"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex(index);
              }}
              className={`h-2 rounded-full transition-all ${
                index === currentImageIndex ? "w-4" : "w-2 bg-white/40"
              }`}
              style={index === currentImageIndex ? { background: "#E8C77E" } : undefined}
              aria-label={`Go image ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
          aria-label="Like"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isLiked ? "fill-red-500 text-red-500" : "text-white"
            }`}
          />
        </button>

        <span className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "rgba(197,160,89,0.2)", color: "#E8C77E", border: "1px solid rgba(197,160,89,0.3)" }}>
          {propertyTypeLabel(property.property_type)}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-1 text-sm mb-2" style={{ color: "rgba(245,242,237,0.5)" }}>
          <MapPin className="w-4 h-4" />
          {locationText || "—"}
        </div>

        <h3 className="font-serif text-xl font-bold mb-3" style={{ color: "#F5F2ED" }}>
          {property.title}
        </h3>

        <div className="flex items-center gap-4 text-sm mb-4" style={{ color: "rgba(245,242,237,0.5)" }}>
          <span className="flex items-center gap-1">
            <Bed className="w-4 h-4" /> {property.bedrooms} Bed
          </span>
          <span className="flex items-center gap-1">
            <Bath className="w-4 h-4" /> {property.bathrooms} Bath
          </span>
          <span className="flex items-center gap-1">
            <Square className="w-4 h-4" /> {property.area_sqft ?? 0} sqft
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold" style={{ color: "#E8C77E" }}>
            {property.currency === "GBP" ? "£" : ""}
            {money(property.rent_monthly)}
            <span className="text-sm font-normal" style={{ color: "rgba(245,242,237,0.4)" }}>/month</span>
          </span>

          <Link to={`/properties/${property.slug}`}>
            <Button size="sm" variant="outline" style={{ borderColor: "rgba(197,160,89,0.35)", color: "#E8C77E", background: "transparent" }}>
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default function PropertiesPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // UI filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [city, setCity] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [bedrooms, setBedrooms] = useState("all");

  // data states
  const [items, setItems] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Read URL params to state (from Hero)
  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
    setCity(searchParams.get("city") || "");

    const t = searchParams.get("type");
    setPropertyType(t ? t.toLowerCase() : "all");

    const min = searchParams.get("min_rent");
    const max = searchParams.get("max_rent");

    // rebuild priceRange from min/max if possible
    if (min === "1000" && max === "2000") setPriceRange("1000-2000");
    else if (min === "2000" && max === "3000") setPriceRange("2000-3000");
    else if (!min && max === "1000") setPriceRange("0-1000");
    else if (min === "3000" && !max) setPriceRange("3000+");
    else setPriceRange("all");
  }, [searchParams]);

  // ✅ Build backend api url using URL params (single source of truth)
  const apiUrl = useMemo(() => {
    const params = new URLSearchParams();

    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    if (city.trim()) params.set("city", city.trim());

    if (propertyType !== "all") params.set("type", propertyType.toUpperCase());

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

    const qs = params.toString();
    return `/api/core/properties/public/${qs ? `?${qs}` : ""}`;
  }, [searchQuery, city, propertyType, priceRange]);

  // ✅ Fetch from backend whenever apiUrl changes
  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiFetch(apiUrl);
        if (!alive) return;
        setItems(Array.isArray(data) ? data : []);
      } catch (e: any) {
        if (!alive) return;
        setError(e?.message || "Failed to load properties");
        setItems([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [apiUrl]);

  // bedrooms filter client side
  const filtered = useMemo(() => {
    const b = bedrooms === "all" ? null : Number(bedrooms);
    if (!b) return items;

    if (b >= 4) return items.filter((p) => (p.bedrooms || 0) >= 4);
    return items.filter((p) => (p.bedrooms || 0) === b);
  }, [items, bedrooms]);

  // ✅ Apply Filters -> update URL (so refresh keeps filter)
  const applyFiltersToUrl = () => {
    const params = new URLSearchParams();

    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    if (city.trim()) params.set("city", city.trim());
    if (propertyType !== "all") params.set("type", propertyType.toUpperCase());

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
    <div className="min-h-screen" style={{ background: DARK }}>
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="relative overflow-hidden" style={{ background: DARK }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 72% 50%, rgba(197,160,89,0.07) 0%, transparent 65%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(197,160,89,0.4), transparent)" }} />
          <div className="container-custom relative z-10 px-4">
            <div className="grid lg:grid-cols-2 gap-6 items-center min-h-[44vh] py-16">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase rounded-full px-4 py-1.5 mb-5" style={{ color: "#E8C77E", background: "rgba(197,160,89,0.08)", border: "1px solid rgba(197,160,89,0.18)" }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#E8C77E" }} />
                  Verified Listings
                </span>
                <h1 className="font-serif font-bold leading-tight mb-4" style={{ fontSize: "clamp(2.4rem,5vw,4rem)", color: "#F5F2ED" }}>
                  Find your{" "}
                  <span style={{ background: "linear-gradient(135deg,#C5A059,#E8C77E,#C5A059)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>next home</span>
                </h1>
                <p className="text-base leading-relaxed max-w-md" style={{ color: "rgba(245,242,237,0.55)" }}>
                  Browse verified, compliance-checked accommodation — matched and managed through Quantum Link™.
                </p>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="relative h-[280px] sm:h-[360px] order-first lg:order-last">
                <GlassGlobe />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <div style={{ background: DARK2, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="container-custom py-6">
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "rgba(245,242,237,0.4)" }} />
                <Input
                  placeholder="Search by location or property name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 h-12 ${darkField}`}
                />
              </div>

              {/* City input optional (if you want Select you can add) */}
              <div className="flex-1 max-w-xs">
                <Input
                  placeholder="City (ex: London)"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={`h-12 ${darkField}`}
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger className={`w-[140px] h-12 ${darkField}`}>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-[hsl(222,44%,6%)] border-white/10 text-[#F5F2ED]">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="pg">PG/Hostel</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className={`w-[160px] h-12 ${darkField}`}>
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent className="bg-[hsl(222,44%,6%)] border-white/10 text-[#F5F2ED]">
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="0-1000">Up to £1,000</SelectItem>
                    <SelectItem value="1000-2000">£1,000 - £2,000</SelectItem>
                    <SelectItem value="2000-3000">£2,000 - £3,000</SelectItem>
                    <SelectItem value="3000+">£3,000+</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={bedrooms} onValueChange={setBedrooms}>
                  <SelectTrigger className={`w-[140px] h-12 ${darkField}`}>
                    <SelectValue placeholder="Bedrooms" />
                  </SelectTrigger>
                  <SelectContent className="bg-[hsl(222,44%,6%)] border-white/10 text-[#F5F2ED]">
                    <SelectItem value="all">All Beds</SelectItem>
                    <SelectItem value="1">1 Bedroom</SelectItem>
                    <SelectItem value="2">2 Bedrooms</SelectItem>
                    <SelectItem value="3">3 Bedrooms</SelectItem>
                    <SelectItem value="4">4+ Bedrooms</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="h-12 px-6" onClick={applyFiltersToUrl}>
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>

                <Button
                  variant="outline"
                  className="h-12 px-6"
                  onClick={() => {
                    setSearchQuery("");
                    setCity("");
                    setPropertyType("all");
                    setPriceRange("all");
                    setBedrooms("all");
                    navigate("/properties");
                  }}
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="section-padding">
          <div className="container-custom">
            <AnimatedSection className="mb-8">
              {loading ? (
                <p style={{ color: "rgba(245,242,237,0.5)" }}>Loading properties...</p>
              ) : error ? (
                <p className="text-red-400">{error}</p>
              ) : (
                <p style={{ color: "rgba(245,242,237,0.5)" }}>
                  Showing{" "}
                  <span className="font-semibold" style={{ color: "#F5F2ED" }}>{filtered.length}</span>{" "}
                  properties
                </p>
              )}
            </AnimatedSection>

            {!loading && !error && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {filtered.map((property, index) => (
                    <AnimatedSection key={property.id} delay={index * 0.1}>
                      <PropertyCard property={property} />
                    </AnimatedSection>
                  ))}
                </div>

                {filtered.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-lg" style={{ color: "rgba(245,242,237,0.5)" }}>
                      No properties found matching your criteria.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => {
                        setSearchQuery("");
                        setCity("");
                        setPropertyType("all");
                        setPriceRange("all");
                        setBedrooms("all");
                        navigate("/properties");
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
