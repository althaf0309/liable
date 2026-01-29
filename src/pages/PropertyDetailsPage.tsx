import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Bed, Bath, Square, ChevronLeft, ChevronRight, Heart, 
  Share2, Phone, Mail, Calendar, Check, Home, Wifi, Car, 
  Utensils, Dumbbell, Shield, Wind
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";

const properties = [
  {
    id: 1,
    title: "Modern Studio Apartment",
    location: "Shoreditch, London",
    address: "123 Brick Lane, Shoreditch, London E1 6SB",
    price: 1200,
    beds: 1,
    baths: 1,
    sqft: 450,
    type: "Studio",
    images: [property1, property2, property3, property4, property5],
    description: "A beautifully designed modern studio apartment in the heart of Shoreditch. This property features high ceilings, large windows with plenty of natural light, and contemporary finishes throughout. Perfect for students or young professionals looking for a stylish living space in one of London's most vibrant neighborhoods.",
    features: [
      "Open-plan living area",
      "Fully fitted kitchen",
      "Built-in wardrobes",
      "Wooden flooring",
      "Double glazed windows",
      "Video entry system",
    ],
    amenities: ["wifi", "heating", "security", "laundry"],
    available: "Available Now",
  },
  {
    id: 2,
    title: "Spacious 2-Bed Flat",
    location: "Camden, London",
    address: "45 Camden High Street, London NW1 7JE",
    price: 1800,
    beds: 2,
    baths: 1,
    sqft: 750,
    type: "Apartment",
    images: [property2, property3, property4, property5, property1],
    description: "A spacious two-bedroom flat located in the iconic Camden area. This property offers generous living space with a separate kitchen, two well-proportioned bedrooms, and a modern bathroom. Ideal for sharers or small families wanting to be close to Camden's famous markets and nightlife.",
    features: [
      "Separate living room",
      "Modern fitted kitchen",
      "Two double bedrooms",
      "Family bathroom",
      "Storage cupboard",
      "Balcony access",
    ],
    amenities: ["wifi", "heating", "parking", "gym"],
    available: "Available from Feb 1st",
  },
  {
    id: 3,
    title: "Luxury Penthouse Suite",
    location: "Canary Wharf, London",
    address: "1 Canada Square, Canary Wharf, London E14 5AB",
    price: 3500,
    beds: 3,
    baths: 2,
    sqft: 1200,
    type: "Penthouse",
    images: [property3, property4, property5, property1, property2],
    description: "An exceptional penthouse suite offering panoramic views of the London skyline. This luxury property features premium finishes, a state-of-the-art kitchen, three spacious bedrooms, and two designer bathrooms. The building offers 24-hour concierge, gym, and rooftop terrace access.",
    features: [
      "Panoramic city views",
      "Designer kitchen",
      "Master ensuite",
      "Walk-in wardrobe",
      "Private terrace",
      "Underfloor heating",
    ],
    amenities: ["wifi", "heating", "parking", "gym", "security", "concierge"],
    available: "Available Now",
  },
  {
    id: 4,
    title: "Cozy Student Room",
    location: "Kings Cross, London",
    address: "78 Euston Road, Kings Cross, London N1 9AG",
    price: 800,
    beds: 1,
    baths: 1,
    sqft: 300,
    type: "Room",
    images: [property4, property5, property1, property2, property3],
    description: "A cozy and affordable student room perfectly located near Kings Cross station. This room comes fully furnished with a comfortable bed, study desk, and storage. Shared kitchen and bathroom facilities are kept to high standards. Bills included in the rent.",
    features: [
      "Fully furnished",
      "Study desk included",
      "Shared kitchen",
      "Shared bathroom",
      "Bills included",
      "Near transport links",
    ],
    amenities: ["wifi", "heating", "laundry"],
    available: "Available Now",
  },
  {
    id: 5,
    title: "Family Home with Garden",
    location: "Greenwich, London",
    address: "22 Royal Hill, Greenwich, London SE10 8RT",
    price: 2500,
    beds: 4,
    baths: 2,
    sqft: 1800,
    type: "House",
    images: [property5, property1, property2, property3, property4],
    description: "A charming family home with a beautiful private garden in the historic Greenwich area. This property offers four generous bedrooms, two bathrooms, a large kitchen-diner, and a separate living room. The south-facing garden is perfect for outdoor entertaining.",
    features: [
      "Private garden",
      "Kitchen-diner",
      "Four bedrooms",
      "Two bathrooms",
      "Off-street parking",
      "Period features",
    ],
    amenities: ["wifi", "heating", "parking", "garden"],
    available: "Available from March 1st",
  },
  {
    id: 6,
    title: "Central London Loft",
    location: "Soho, London",
    address: "15 Dean Street, Soho, London W1D 3RY",
    price: 2200,
    beds: 2,
    baths: 2,
    sqft: 900,
    type: "Loft",
    images: [property1, property3, property5, property2, property4],
    description: "A stunning loft-style apartment in the heart of Soho. This unique property features exposed brick walls, high ceilings with original beams, and an open-plan living space. Two mezzanine bedrooms and two modern bathrooms complete this exceptional home.",
    features: [
      "Exposed brick walls",
      "Original beams",
      "Mezzanine bedrooms",
      "Open-plan living",
      "Designer bathrooms",
      "Juliet balcony",
    ],
    amenities: ["wifi", "heating", "security"],
    available: "Available Now",
  },
];

const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi className="w-5 h-5" />,
  heating: <Wind className="w-5 h-5" />,
  parking: <Car className="w-5 h-5" />,
  gym: <Dumbbell className="w-5 h-5" />,
  security: <Shield className="w-5 h-5" />,
  kitchen: <Utensils className="w-5 h-5" />,
  laundry: <Home className="w-5 h-5" />,
  garden: <Home className="w-5 h-5" />,
  concierge: <Phone className="w-5 h-5" />,
};

const amenityLabels: Record<string, string> = {
  wifi: "High-Speed WiFi",
  heating: "Central Heating",
  parking: "Parking Available",
  gym: "Gym Access",
  security: "24/7 Security",
  kitchen: "Fitted Kitchen",
  laundry: "Laundry Facilities",
  garden: "Private Garden",
  concierge: "Concierge Service",
};

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const property = properties.find((p) => p.id === parseInt(id || "1"));

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 section-padding">
          <div className="container-custom text-center">
            <h1 className="font-serif text-4xl font-bold mb-4">Property Not Found</h1>
            <p className="text-muted-foreground mb-8">The property you're looking for doesn't exist.</p>
            <Link to="/properties">
              <Button>Back to Properties</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="bg-muted/30 py-4">
          <div className="container-custom">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <Link to="/properties" className="hover:text-primary transition-colors">Properties</Link>
              <span>/</span>
              <span className="text-foreground">{property.title}</span>
            </div>
          </div>
        </div>

        <div className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Image Gallery */}
                <AnimatedSection>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden group">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImageIndex}
                        src={property.images[currentImageIndex]}
                        alt={property.title}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </AnimatePresence>

                    {/* Navigation */}
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium">
                      {currentImageIndex + 1} / {property.images.length}
                    </div>

                    {/* Actions */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={() => setIsLiked(!isLiked)}
                        className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
                      >
                        <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                      </button>
                      <button className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Thumbnails */}
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {property.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                          index === currentImageIndex ? "border-primary" : "border-transparent"
                        }`}
                      >
                        <img src={image} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </AnimatedSection>

                {/* Property Info */}
                <AnimatedSection delay={0.1}>
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full mb-3">
                        {property.type}
                      </span>
                      <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                        {property.title}
                      </h1>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-5 h-5" />
                        {property.address}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl md:text-4xl font-bold text-primary">
                        £{property.price.toLocaleString()}
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
                        <p className="font-semibold">{property.beds}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bath className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Bathrooms</p>
                        <p className="font-semibold">{property.baths}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Square className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Area</p>
                        <p className="font-semibold">{property.sqft} sqft</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Availability</p>
                        <p className="font-semibold text-green-600">{property.available}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>

                {/* Description */}
                <AnimatedSection delay={0.2}>
                  <h2 className="font-serif text-2xl font-bold mb-4">Description</h2>
                  <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                </AnimatedSection>

                {/* Features */}
                <AnimatedSection delay={0.3}>
                  <h2 className="font-serif text-2xl font-bold mb-4">Features</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>

                {/* Amenities */}
                <AnimatedSection delay={0.4}>
                  <h2 className="font-serif text-2xl font-bold mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {property.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-3 p-4 rounded-xl bg-muted/50"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          {amenityIcons[amenity]}
                        </div>
                        <span className="font-medium">{amenityLabels[amenity]}</span>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <AnimatedSection delay={0.2}>
                  <div className="sticky top-24 bg-card rounded-2xl p-6 shadow-lg border border-border">
                    <h3 className="font-serif text-xl font-bold mb-6">Schedule a Viewing</h3>
                    <form className="space-y-4">
                      <div>
                        <Input placeholder="Your Name" className="h-12" />
                      </div>
                      <div>
                        <Input type="email" placeholder="Email Address" className="h-12" />
                      </div>
                      <div>
                        <Input type="tel" placeholder="Phone Number" className="h-12" />
                      </div>
                      <div>
                        <Textarea placeholder="Your Message" rows={4} />
                      </div>
                      <Button className="w-full h-12">
                        <Calendar className="w-4 h-4 mr-2" />
                        Request Viewing
                      </Button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-border">
                      <p className="text-sm text-muted-foreground mb-4">Or contact us directly:</p>
                      <div className="space-y-3">
                        <a
                          href="tel:08801236S499"
                          className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                        >
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Phone className="w-5 h-5 text-primary" />
                          </div>
                          088 0123 654 99
                        </a>
                        <a
                          href="mailto:student@lgsltd.com"
                          className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                        >
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Mail className="w-5 h-5 text-primary" />
                          </div>
                          student@lgsltd.com
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
};

export default PropertyDetailsPage;
