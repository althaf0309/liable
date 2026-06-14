import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  Home,
  Briefcase,
  Coins,
  FileText,
  Users,
  MapPin,
  Phone,
  CheckCircle,
  Send,
  Rocket,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

import { Link } from "react-router-dom";
import { apiFetch } from "@/lib/api";
import { getAuthUser } from "@/lib/auth";

const services = [
  {
    icon: Home,
    title: "Property Listing & Management",
    description:
      "List your property with verified tenant support. We help you manage viewings, tenant enquiries, and property onboarding.",
    features: [
      "Verified tenant enquiries",
      "Property listing support",
      "Viewings coordination",
      "Onboarding assistance",
      "Ongoing landlord support",
    ],
  },
  {
    icon: Coins,
    title: "Rental & Pricing Guidance",
    description:
      "We help you set a competitive rent based on market demand and property value. Get clarity on deposits, bills, and contract structure.",
    features: [
      "Market rent guidance",
      "Deposit & bills clarity",
      "Contract structuring",
      "Demand-based pricing",
      "Landlord-friendly terms",
    ],
  },
  {
    icon: Briefcase,
    title: "Tenant Screening Support",
    description:
      "We assist with pre-screening, documentation, and matching suitable students. Reduce risk and improve occupancy rate.",
    features: [
      "Student verification support",
      "Document collection help",
      "Better tenant matching",
      "Lower vacancy risk",
      "Higher occupancy rate",
    ],
  },
];

const additionalServices = [
  {
    icon: FileText,
    title: "Documentation Support",
    description:
      "Help with tenancy contracts, required landlord docs, and compliance guidance.",
  },
  {
    icon: Users,
    title: "Community Network",
    description:
      "Connect with verified students and community support for better tenancy outcomes.",
  },
  {
    icon: MapPin,
    title: "Local Market Insights",
    description:
      "Insights on demand areas, property types, and tenant preferences in your city.",
  },
];

function normalizeRole(role?: string) {
  const r = String(role || "").toUpperCase();
  if (r === "ADMIN" || r === "SUPERADMIN" || r === "SUPER_ADMIN") return "ADMIN";
  if (r === "STAFF") return "STAFF";
  if (r === "LANDLORD") return "LANDLORD";
  return "STUDENT";
}

const DASHBOARD_BASE_URL = (
  import.meta.env.VITE_DASHBOARD_BASE_URL ||
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? window.location.origin
    : "https://app.lgsltd.uk")
).replace(/\/+$/, "");

const LandlordServicesPage = () => {
  const { toast } = useToast();

  const user = useMemo(() => getAuthUser(), []);
  const isLoggedIn = !!user;

  const goLaunch = () => {
    const role = normalizeRole(user?.role);

    if (role === "ADMIN" || role === "STAFF") {
      window.location.assign(`${DASHBOARD_BASE_URL}/admin`);
      return;
    }

    if (role === "LANDLORD") {
      window.location.assign(`${DASHBOARD_BASE_URL}/landlord`);
      return;
    }

    window.location.assign(`${DASHBOARD_BASE_URL}/student`);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    propertyAddress: "",
    propertyType: "",
    numberOfProperties: "",
    bedrooms: "",
    currentStatus: "",
    expectedRent: "",
    servicesRequired: "",
    additionalInfo: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoggedIn) {
      toast({
        title: "Already logged in",
        description: "Registration form is not needed after login.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // ✅ backend expects camelCase keys as per serializer
      await apiFetch("/api/public/register/landlord/", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      toast({
        title: "Registration Submitted!",
        description:
          "Saved successfully. Our team will contact you within 24 hours.",
      });

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        propertyAddress: "",
        propertyType: "",
        numberOfProperties: "",
        bedrooms: "",
        currentStatus: "",
        expectedRent: "",
        servicesRequired: "",
        additionalInfo: "",
      });
    } catch (err: any) {
      toast({
        title: "Submit failed",
        description: err?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "hsl(222,52%,2%)" }}>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <div
          className="relative overflow-hidden flex items-center"
          style={{ minHeight: 340, background: "hsl(222,48%,4%)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 70% at 50% 100%, rgba(74,158,255,0.07) 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(74,158,255,0.4), transparent)" }}
          />
          <div className="container-custom relative z-10 px-4 py-24 text-center w-full">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
              <span
                className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase rounded-full px-4 py-1.5 mb-6"
                style={{ color: "#4a9eff", background: "rgba(74,158,255,0.08)", border: "1px solid rgba(74,158,255,0.18)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#4a9eff" }} />
                Landlord Support
              </span>
              <h1
                className="font-serif font-bold mb-4"
                style={{ fontSize: "clamp(2rem,5vw,3.8rem)", color: "#fff" }}
              >
                Services for{" "}
                <span style={{ background: "linear-gradient(135deg,#4a9eff,#7bc8ff,#4a9eff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Landlords
                </span>
              </h1>
              <div className="flex items-center justify-center gap-2 text-sm mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <span style={{ color: "#4a9eff" }}>Landlord Services</span>
              </div>
              {isLoggedIn && (
                <div className="mt-4">
                  <div className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.55)" }}>
                    Logged in as <b style={{ color: "#fff" }}>{user?.full_name || user?.email}</b>
                  </div>
                  <Button variant="secondary" className="gap-2" onClick={goLaunch}>
                    <Rocket className="w-4 h-4" />
                    Launch
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Services */}
        <div className="section-padding" style={{ background: "hsl(222,48%,4%)" }}>
          <div className="container-custom">
            <AnimatedSection className="text-center mb-12">
              <span className="font-semibold text-sm tracking-widest uppercase" style={{ color: "#4a9eff" }}>
                Landlord Support
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mt-4" style={{ color: "#fff" }}>
                We Help You Rent Faster, Safer, Smarter
              </h2>
              <p className="mt-4 max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.52)" }}>
                Verified student enquiries, better matching, and ongoing support.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {services.map((service, index) => (
                <AnimatedSection key={service.title} delay={index * 0.1}>
                  <motion.div
                    className="group relative rounded-2xl p-8 h-full"
                    style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.07)" }}
                    whileHover={{ y: -5, transition: { duration: 0.22 } }}
                  >
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ border: "1px solid rgba(74,158,255,0.22)" }} />
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(74,158,255,0.1)", border: "1px solid rgba(74,158,255,0.2)" }}>
                        <service.icon className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif text-xl font-bold mb-3" style={{ color: "#fff" }}>
                          {service.title}
                        </h3>
                        <p className="mb-4 leading-relaxed text-sm" style={{ color: "rgba(255,255,255,0.52)" }}>
                          {service.description}
                        </p>
                        <ul className="space-y-2">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.48)" }}>
                              <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#4a9eff" }} />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>

            {/* Additional services */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {additionalServices.map((service, index) => (
                <AnimatedSection key={service.title} delay={index * 0.1}>
                  <motion.div
                    className="group relative rounded-xl p-6 text-center"
                    style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.07)" }}
                    whileHover={{ y: -5, transition: { duration: 0.22 } }}
                  >
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ border: "1px solid rgba(74,158,255,0.2)" }} />
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(74,158,255,0.1)", border: "1px solid rgba(74,158,255,0.18)" }}>
                      <service.icon className="w-5 h-5" style={{ color: "#4a9eff" }} />
                    </div>
                    <h3 className="font-semibold mb-2" style={{ color: "#fff" }}>
                      {service.title}
                    </h3>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.48)" }}>
                      {service.description}
                    </p>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>

        {/* ✅ Register Form (ONLY IF NOT LOGGED IN) */}
        {!isLoggedIn && (
          <div id="register" className="section-padding" style={{ background: "hsl(222,52%,2%)" }}>
            <div className="container-custom">
              <AnimatedSection className="text-center mb-12">
                <span className="font-semibold text-sm tracking-widest uppercase" style={{ color: "#4a9eff" }}>
                  Get Started
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold mt-4" style={{ color: "#fff" }}>
                  Register as a Landlord
                </h2>
                <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                  Fill out the form below and our team will reach out.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <form
                  onSubmit={handleSubmit}
                  className="max-w-3xl mx-auto rounded-2xl p-8"
                  style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <h3 className="font-semibold text-lg text-foreground mb-4 border-b border-border pb-2">
                        Personal Information
                      </h3>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="md:col-span-2 mt-4">
                      <h3 className="font-semibold text-lg text-foreground mb-4 border-b border-border pb-2">
                        Property Details
                      </h3>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="propertyAddress">Property Address *</Label>
                      <Input
                        id="propertyAddress"
                        name="propertyAddress"
                        value={formData.propertyAddress}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Property Type</Label>
                      <Select
                        value={formData.propertyType}
                        onValueChange={(value) =>
                          handleSelectChange("propertyType", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="flat">Flat</SelectItem>
                          <SelectItem value="studio">Studio</SelectItem>
                          <SelectItem value="hmo">HMO</SelectItem>
                          <SelectItem value="any">No Preference</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Number of Properties</Label>
                      <Select
                        value={formData.numberOfProperties}
                        onValueChange={(value) =>
                          handleSelectChange("numberOfProperties", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select count" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2-5">2-5</SelectItem>
                          <SelectItem value="6-10">6-10</SelectItem>
                          <SelectItem value="10+">10+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Bedrooms</Label>
                      <Select
                        value={formData.bedrooms}
                        onValueChange={(value) =>
                          handleSelectChange("bedrooms", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select bedrooms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5+">5+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Current Status</Label>
                      <Select
                        value={formData.currentStatus}
                        onValueChange={(value) =>
                          handleSelectChange("currentStatus", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="occupied">Occupied</SelectItem>
                          <SelectItem value="renovating">Renovating</SelectItem>
                          <SelectItem value="planning">Planning to Rent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="expectedRent">Expected Rent (£/month)</Label>
                      <Input
                        id="expectedRent"
                        name="expectedRent"
                        value={formData.expectedRent}
                        onChange={handleInputChange}
                        placeholder="e.g. 900"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label>Services Required</Label>
                      <Select
                        value={formData.servicesRequired}
                        onValueChange={(value) =>
                          handleSelectChange("servicesRequired", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select primary service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="listing">Listing Only</SelectItem>
                          <SelectItem value="full">Full Management Support</SelectItem>
                          <SelectItem value="screening">Tenant Screening</SelectItem>
                          <SelectItem value="pricing">Pricing Guidance</SelectItem>
                          <SelectItem value="docs">Documentation Help</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="additionalInfo">Additional Information</Label>
                      <Textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleInputChange}
                        rows={4}
                      />
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <Button
                      type="submit"
                      size="lg"
                      className="gap-2"
                      disabled={isSubmitting}
                    >
                      <Send className="w-4 h-4" />
                      {isSubmitting ? "Submitting..." : "Submit Registration"}
                    </Button>
                  </div>
                </form>
              </AnimatedSection>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="py-16 md:py-20 bg-primary">
          <div className="container-custom">
            <AnimatedSection className="text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Want to list your property with us?
              </h2>
              <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                Register today and we’ll connect you with verified student enquiries.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {!isLoggedIn ? (
                  <a href="#register">
                    <Button size="lg" variant="secondary" className="gap-2">
                      Register Now
                    </Button>
                  </a>
                ) : (
                  <Button size="lg" variant="secondary" className="gap-2" onClick={goLaunch}>
                    <Rocket className="w-4 h-4" />
                    Launch
                  </Button>
                )}

                <a href="tel:+447867108050">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  >
                    <Phone className="w-4 h-4" /> Call Now
                  </Button>
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default LandlordServicesPage;
