import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Bed, Bath, Square, ChevronLeft, ChevronRight, Heart } from "lucide-react";
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
import aboutImage from "@/assets/about-image.jpg";
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
    price: 1200,
    beds: 1,
    baths: 1,
    sqft: 450,
    type: "Studio",
    images: [property1, property2, property3],
  },
  {
    id: 2,
    title: "Spacious 2-Bed Flat",
    location: "Camden, London",
    price: 1800,
    beds: 2,
    baths: 1,
    sqft: 750,
    type: "Apartment",
    images: [property2, property3, property4],
  },
  {
    id: 3,
    title: "Luxury Penthouse Suite",
    location: "Canary Wharf, London",
    price: 3500,
    beds: 3,
    baths: 2,
    sqft: 1200,
    type: "Penthouse",
    images: [property3, property4, property5],
  },
  {
    id: 4,
    title: "Cozy Student Room",
    location: "Kings Cross, London",
    price: 800,
    beds: 1,
    baths: 1,
    sqft: 300,
    type: "Room",
    images: [property4, property5, property1],
  },
  {
    id: 5,
    title: "Family Home with Garden",
    location: "Greenwich, London",
    price: 2500,
    beds: 4,
    baths: 2,
    sqft: 1800,
    type: "House",
    images: [property5, property1, property2],
  },
  {
    id: 6,
    title: "Central London Loft",
    location: "Soho, London",
    price: 2200,
    beds: 2,
    baths: 2,
    sqft: 900,
    type: "Loft",
    images: [property1, property3, property5],
  },
];

const PropertyCard = ({ property }: { property: typeof properties[0] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <motion.div
      className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Carousel */}
      <div className="relative aspect-[4/3] overflow-hidden group">
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

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Image Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {property.images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex ? "bg-primary w-4" : "bg-background/60"
              }`}
            />
          ))}
        </div>

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isLiked ? "fill-red-500 text-red-500" : "text-foreground"
            }`}
          />
        </button>

        {/* Property Type Badge */}
        <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
          {property.type}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
          <MapPin className="w-4 h-4" />
          {property.location}
        </div>
        <h3 className="font-serif text-xl font-bold text-foreground mb-3">
          {property.title}
        </h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <Bed className="w-4 h-4" /> {property.beds} Bed
          </span>
          <span className="flex items-center gap-1">
            <Bath className="w-4 h-4" /> {property.baths} Bath
          </span>
          <span className="flex items-center gap-1">
            <Square className="w-4 h-4" /> {property.sqft} sqft
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            £{property.price.toLocaleString()}
            <span className="text-sm font-normal text-muted-foreground">/month</span>
          </span>
          <Link to={`/properties/${property.id}`}>
            <Button size="sm" variant="outline">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const PropertiesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [bedrooms, setBedrooms] = useState("all");

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = propertyType === "all" || property.type.toLowerCase() === propertyType;
    const matchesBedrooms = bedrooms === "all" || property.beds === parseInt(bedrooms);
    
    let matchesPrice = true;
    if (priceRange === "0-1000") matchesPrice = property.price <= 1000;
    else if (priceRange === "1000-2000") matchesPrice = property.price > 1000 && property.price <= 2000;
    else if (priceRange === "2000-3000") matchesPrice = property.price > 2000 && property.price <= 3000;
    else if (priceRange === "3000+") matchesPrice = property.price > 3000;

    return matchesSearch && matchesType && matchesBedrooms && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Banner */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={aboutImage}
            alt="Properties"
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-background mb-4">
              Properties
            </h1>
            <div className="flex items-center gap-2 text-background/80 text-sm">
              <a href="/" className="hover:text-primary transition-colors">
                Home
              </a>
              <span>/</span>
              <span className="text-primary">Properties</span>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-card border-b border-border">
          <div className="container-custom py-6">
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
              {/* Search Input */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by location or property name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3">
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger className="w-[140px] h-12">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="room">Room</SelectItem>
                    <SelectItem value="penthouse">Penthouse</SelectItem>
                    <SelectItem value="loft">Loft</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="w-[160px] h-12">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="0-1000">Up to £1,000</SelectItem>
                    <SelectItem value="1000-2000">£1,000 - £2,000</SelectItem>
                    <SelectItem value="2000-3000">£2,000 - £3,000</SelectItem>
                    <SelectItem value="3000+">£3,000+</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={bedrooms} onValueChange={setBedrooms}>
                  <SelectTrigger className="w-[140px] h-12">
                    <SelectValue placeholder="Bedrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Beds</SelectItem>
                    <SelectItem value="1">1 Bedroom</SelectItem>
                    <SelectItem value="2">2 Bedrooms</SelectItem>
                    <SelectItem value="3">3 Bedrooms</SelectItem>
                    <SelectItem value="4">4+ Bedrooms</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="h-12 px-6">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="section-padding">
          <div className="container-custom">
            <AnimatedSection className="mb-8">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredProperties.length}</span> properties
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredProperties.map((property, index) => (
                <AnimatedSection key={property.id} delay={index * 0.1}>
                  <PropertyCard property={property} />
                </AnimatedSection>
              ))}
            </div>

            {filteredProperties.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  No properties found matching your criteria.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setPropertyType("all");
                    setPriceRange("all");
                    setBedrooms("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PropertiesPage;
