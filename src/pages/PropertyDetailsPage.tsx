// src/pages/PropertyDetailsPage.tsx
import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Phone,
  Mail,
  Calendar,
  Check,
  Wifi,
  Car,
  Dumbbell,
  Shield,
  Wind,
  Home,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { apiFetch } from "@/lib/api";
import { submitContact } from "@/lib/contact";

// ---------------- Types ----------------
type PropertyImage = {
  id: number;
  image_url: string;
  is_cover: boolean;
  sort_order: number;
};

type Property = {
  id: string;
  slug: string;
  title: string;
  description?: string;

  city: string;
  locality?: string;
  address_line1?: string;
  address_line2?: string;
  postal_code?: string;
  country?: string;
  state?: string;

  property_type: string;
  room_type: string;

  bedrooms: number;
  bathrooms: number;
  area_sqft?: number | null;

  currency: string;
  rent_monthly: string | number;

  available_from?: string | null;

  has_wifi: boolean;
  has_ac: boolean;
  has_parking: boolean;
  has_gym: boolean;
  has_security: boolean;
  has_power_backup: boolean;
  has_lift: boolean;
  has_pool: boolean;
  has_cctv: boolean;
  has_washing_machine: boolean;

  smoking_allowed: boolean;
  pets_allowed: boolean;
  alcohol_allowed: boolean;
  guests_allowed: boolean;

  images: PropertyImage[];
};

function getImageUrls(p: Property) {
  const ordered = [...(p.images || [])].sort((a, b) => {
    if (a.is_cover !== b.is_cover) return a.is_cover ? -1 : 1;
    return (a.sort_order || 0) - (b.sort_order || 0);
  });

  const urls = ordered.map((i) => i.image_url).filter(Boolean);
  return urls.length ? urls : ["https://via.placeholder.com/1200x800?text=No+Image"];
}

function money(n: any) {
  const v = typeof n === "string" ? Number(n) : n;
  if (!isFinite(v)) return "";
  return v.toLocaleString();
}

function fullAddress(p: Property) {
  return [
    p.address_line1,
    p.address_line2,
    p.locality,
    p.city,
    p.state,
    p.postal_code,
    p.country,
  ]
    .filter(Boolean)
    .join(", ");
}

const amenityMap = (p: Property) => {
  const a: { key: string; label: string; icon: any }[] = [];
  if (p.has_wifi) a.push({ key: "wifi", label: "High-Speed WiFi", icon: Wifi });
  if (p.has_ac) a.push({ key: "ac", label: "Air Conditioning", icon: Wind });
  if (p.has_parking) a.push({ key: "parking", label: "Parking Available", icon: Car });
  if (p.has_gym) a.push({ key: "gym", label: "Gym Access", icon: Dumbbell });
  if (p.has_security || p.has_cctv) a.push({ key: "security", label: "Security / CCTV", icon: Shield });
  if (p.has_power_backup) a.push({ key: "backup", label: "Power Backup", icon: Home });
  return a;
};

export default function PropertyDetailsPage() {
  // ✅ Route should be: "/properties/:slug"
  const { slug } = useParams();

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // ------------------ Viewing Form (ContactMessage) ------------------
  const [viewForm, setViewForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [sendingView, setSendingView] = useState(false);
  const [viewErr, setViewErr] = useState<string | null>(null);
  const [viewOk, setViewOk] = useState<string | null>(null);

  const onViewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setViewForm((p) => ({ ...p, [name]: value }));
  };

  const handleViewingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setViewErr(null);
    setViewOk(null);

    if (!property) return;

    if (!viewForm.name.trim() || !viewForm.email.trim()) {
      setViewErr("Name and Email are required.");
      return;
    }

    setSendingView(true);
    try {
      const subject = `Property Viewing: ${property.title} (${property.city})`;

      const message = `
Property: ${property.title}
City: ${property.city}
Locality: ${property.locality || "-"}
Slug: ${property.slug}
Rent: ${property.currency} ${property.rent_monthly}

Client Message:
${(viewForm.message || "-").trim()}
      `.trim();

      await submitContact({
        name: viewForm.name,
        email: viewForm.email,
        phone: viewForm.phone,
        subject,
        contact_type: "tenant", // ✅ change to "student" if you want
        message,
      });

      setViewOk("Viewing request sent successfully!");
      setViewForm({ name: "", email: "", phone: "", message: "" });
    } catch (e: any) {
      setViewErr(e?.message || "Unable to send viewing request.");
    } finally {
      setSendingView(false);
    }
  };

  // ------------------ Fetch Property ------------------
  useEffect(() => {
    if (!slug) return;

    let alive = true;
    (async () => {
      setLoading(true);
      setErr(null);

      try {
        // ✅ backend: /api/core/properties/public/<slug>/
        const data = await apiFetch(`/api/core/properties/public/${slug}/`);
        if (!alive) return;

        setProperty(data);
        setCurrentImageIndex(0);
      } catch (e: any) {
        if (!alive) return;
        setErr(e?.message || "Failed to load property");
        setProperty(null);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [slug]);

  const images = useMemo(() => (property ? getImageUrls(property) : []), [property]);

  const nextImage = () => {
    if (!images.length) return;
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (!images.length) return;
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 section-padding">
          <div className="container-custom">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (err || !property) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 section-padding">
          <div className="container-custom text-center">
            <h1 className="font-serif text-4xl font-bold mb-4">Property Not Found</h1>
            <p className="text-muted-foreground mb-8">{err || "The property doesn't exist."}</p>
            <Link to="/properties">
              <Button>Back to Properties</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const address = fullAddress(property);
  const amenities = amenityMap(property);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="bg-muted/30 py-4">
          <div className="container-custom">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link to="/properties" className="hover:text-primary transition-colors">
                Properties
              </Link>
              <span>/</span>
              <span className="text-foreground">{property.title}</span>
            </div>
          </div>
        </div>

        <div className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main */}
              <div className="lg:col-span-2 space-y-8">
                {/* Gallery */}
                <AnimatedSection>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden group">
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
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Previous image"
                      type="button"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Next image"
                      type="button"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium">
                      {currentImageIndex + 1} / {images.length}
                    </div>

                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={() => setIsLiked(!isLiked)}
                        className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
                        type="button"
                        aria-label="Like"
                      >
                        <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                      </button>

                      <button
                        className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
                        type="button"
                        aria-label="Share"
                        onClick={() => {
                          const url = window.location.href;
                          if (navigator.share) navigator.share({ title: property.title, url }).catch(() => {});
                          else navigator.clipboard?.writeText(url).catch(() => {});
                        }}
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Thumbs */}
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                          index === currentImageIndex ? "border-primary" : "border-transparent"
                        }`}
                        type="button"
                        aria-label={`View image ${index + 1}`}
                      >
                        <img src={image} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </AnimatedSection>

                {/* Info */}
                <AnimatedSection delay={0.1}>
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full mb-3">
                        {property.property_type}
                      </span>
                      <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                        {property.title}
                      </h1>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-5 h-5" />
                        {address || property.city}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl md:text-4xl font-bold text-primary">
                        {property.currency === "GBP" ? "£" : ""}
                        {money(property.rent_monthly)}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-6 py-6 border-y border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bed className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Bedrooms</p>
                        <p className="font-semibold">{property.bedrooms}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bath className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Bathrooms</p>
                        <p className="font-semibold">{property.bathrooms}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Square className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Area</p>
                        <p className="font-semibold">{property.area_sqft ?? 0} sqft</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Available From</p>
                        <p className="font-semibold text-green-600">
                          {property.available_from || "Available Now"}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                  <h2 className="font-serif text-2xl font-bold mb-4">Description</h2>
                  <p className="text-muted-foreground leading-relaxed">{property.description || "—"}</p>
                </AnimatedSection>

                <AnimatedSection delay={0.3}>
                  <h2 className="font-serif text-2xl font-bold mb-4">Rules</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { ok: property.guests_allowed, label: "Guests Allowed" },
                      { ok: property.pets_allowed, label: "Pets Allowed" },
                      { ok: property.smoking_allowed, label: "Smoking Allowed" },
                      { ok: property.alcohol_allowed, label: "Alcohol Allowed" },
                    ].map((x) => (
                      <div key={x.label} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <span>
                          {x.label}: <b>{x.ok ? "Yes" : "No"}</b>
                        </span>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.4}>
                  <h2 className="font-serif text-2xl font-bold mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {amenities.length ? (
                      amenities.map((a) => {
                        const Icon = a.icon;
                        return (
                          <div key={a.key} className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="font-medium">{a.label}</span>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-muted-foreground">No amenities listed.</p>
                    )}
                  </div>
                </AnimatedSection>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <AnimatedSection delay={0.2}>
                  <div className="sticky top-24 bg-card rounded-2xl p-6 shadow-lg border border-border">
                    <h3 className="font-serif text-xl font-bold mb-6">Schedule a Viewing</h3>

                    {/* ✅ WORKING FORM -> saves to ContactMessage via /api/core/contact/public/ */}
                    <form className="space-y-4" onSubmit={handleViewingSubmit}>
                      {viewErr && <p className="text-sm text-red-600">{viewErr}</p>}
                      {viewOk && <p className="text-sm text-green-600">{viewOk}</p>}

                      <Input
                        name="name"
                        placeholder="Your Name"
                        className="h-12"
                        value={viewForm.name}
                        onChange={onViewChange}
                        maxLength={100}
                        required
                      />
                      <Input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        className="h-12"
                        value={viewForm.email}
                        onChange={onViewChange}
                        maxLength={255}
                        required
                      />
                      <Input
                        name="phone"
                        type="tel"
                        placeholder="Phone Number"
                        className="h-12"
                        value={viewForm.phone}
                        onChange={onViewChange}
                        maxLength={20}
                      />
                      <Textarea
                        name="message"
                        placeholder="Your Message"
                        rows={4}
                        value={viewForm.message}
                        onChange={onViewChange}
                        maxLength={1000}
                      />

                      <Button className="w-full h-12" disabled={sendingView}>
                        <Calendar className="w-4 h-4 mr-2" />
                        {sendingView ? "Sending..." : "Request Viewing"}
                      </Button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-border">
                      <p className="text-sm text-muted-foreground mb-4">Or contact us directly:</p>
                      <div className="space-y-3">
                        <a
                          href="tel:+447867108050"
                          className="flex items-center gap-3 hover:text-primary transition-colors"
                        >
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Phone className="w-5 h-5 text-primary" />
                          </div>
                          +44 7867 108050
                        </a>
                        <a
                          href="mailto:info@lgsltd.com"
                          className="flex items-center gap-3 hover:text-primary transition-colors"
                        >
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Mail className="w-5 h-5 text-primary" />
                          </div>
                          info@lgsltd.com
                        </a>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
