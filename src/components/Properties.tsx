import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const locations = [
  {
    name: "London",
    subtitle: "Luxury Properties With Conveniences.",
    image: property1,
  },
  {
    name: "Manchester",
    subtitle: "Modern Living Spaces.",
    image: property2,
  },
  {
    name: "Birmingham",
    subtitle: "Affordable Quality Homes.",
    image: property3,
  },
];

const Properties = () => {
  return (
    <section id="properties" className="section-padding bg-background">
      <div className="container-custom">
        {/* Banner */}
        <div className="bg-cream rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden">
          {/* Decorative lines */}
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
            <span className="text-primary font-medium text-sm tracking-wider">Properties</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mt-3 mb-6">
              Welcome to Our <span className="text-primary">Inclusive Residences</span>—Where Quality Living Meets Affordability
            </h2>
            <Button variant="outline" className="gap-2">
              <Home className="w-4 h-4" />
              View Properties
            </Button>
          </div>
        </div>

        {/* Top Locations */}
        <div className="bg-cream rounded-3xl py-16 px-8">
          <div className="text-center mb-12">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              Our Property List
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3">
              Our Top Location For You Property
            </h2>
          </div>

          {/* Locations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {locations.map((location, index) => (
              <div
                key={location.name}
                className={`relative overflow-hidden group cursor-pointer ${
                  index === 1 ? "md:scale-105 z-10" : ""
                }`}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={location.image}
                    alt={location.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-background">
                    <h3 className="font-serif text-2xl font-bold">{location.name}</h3>
                    <p className="text-sm text-background/80">{location.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Properties;
