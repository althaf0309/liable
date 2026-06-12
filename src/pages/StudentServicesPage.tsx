import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  Plane,
  Home,
  Coins,
  Briefcase,
  GraduationCap,
  Users,
  FileText,
  CreditCard,
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
const heroImage = "https://images.unsplash.com/photo-1640035012100-faf53d817838?fm=jpg&q=80&w=1920&auto=format&fit=crop";
import { Link } from "react-router-dom";
import { apiFetch } from "@/lib/api";
import { getAuthUser } from "@/lib/auth";

const services = [
  {
    icon: Plane,
    title: "Arrival & Orientation",
    description:
      "Seamless airport pickup, welcome pack, and local SIM assistance. We guide you with travel support and help you settle in. Connect with fellow students through our community network.",
    features: [
      "Airport pickup service",
      "Welcome orientation pack",
      "Local SIM card assistance",
      "Travel support guidance",
      "Community networking",
    ],
  },
  {
    icon: Home,
    title: "Accommodation Support",
    description:
      "Verified student housing with flexible lease options. Explore virtual tours, short stays, and long-term homes. We help match you with the right accommodation easily.",
    features: [
      "Verified student housing",
      "Flexible lease options",
      "Virtual property tours",
      "Short & long-term stays",
      "Personalized matching",
    ],
  },
  {
    icon: Coins,
    title: "Student Startup Kit – Free Access",
    description:
      "Complimentary registration and student starter guide. Access tools, offers, and resources made for students. Everything you need to begin your student life smoothly.",
    features: [
      "Free registration",
      "Student starter guide",
      "Exclusive student offers",
      "Essential resources",
      "Smooth onboarding",
    ],
  },
  {
    icon: Briefcase,
    title: "Job & Career Support",
    description:
      "Get a professional, ATS-optimized CV tailored for the UK market. We offer expert resume formatting, job search tips, and guidance. From part-time roles to full-time careers.",
    features: [
      "ATS-optimized CV",
      "UK market tailored",
      "Job search guidance",
      "Part-time opportunities",
      "Career preparation",
    ],
  },
];

const additionalServices = [
  {
    icon: CreditCard,
    title: "Banking & Finance",
    description:
      "Assistance with opening UK bank accounts and understanding financial services.",
  },
  {
    icon: FileText,
    title: "Visa & Documentation",
    description:
      "Support with visa applications, extensions, and required documentation.",
  },
  {
    icon: MapPin,
    title: "City Navigation",
    description: "Guided tours and tips for navigating your new city effectively.",
  },
  {
    icon: Users,
    title: "Community Events",
    description: "Regular social events to help you connect with other students.",
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

const StudentServicesPage = () => {
  const { toast } = useToast();

  // ✅ logged in user
  const user = useMemo(() => getAuthUser(), []);
  const isLoggedIn = !!user;

  // ✅ after login, show launch button instead of form
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
    nationality: "",
    university: "",
    course: "",
    arrivalDate: "",
    accommodationType: "",
    budget: "",
    servicesNeeded: "",
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

  // ✅ submit to Django (ONLY if not logged in)
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
      const payload = {
        ...formData,
        arrivalDate: formData.arrivalDate ? formData.arrivalDate : null,
      };

      // ✅ IMPORTANT: Your backend base path is /api/..., so use /api/public/...
      // If your apiFetch already adds "/api", then keep "/public/register/student/"
      await apiFetch("/api/public/register/student/", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      toast({
        title: "Registration Submitted!",
        description: "Saved successfully. Our team will contact you within 24 hours.",
      });

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        nationality: "",
        university: "",
        course: "",
        arrivalDate: "",
        accommodationType: "",
        budget: "",
        servicesNeeded: "",
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
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={heroImage}
            alt="Student Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-background mb-4">
              Services for Students
            </h1>
            <div className="flex items-center gap-2 text-background/80 text-sm">
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-primary">Student Services</span>
            </div>
          </div>
        </div>

        {/* Intro */}
        <div className="section-padding">
          <div className="container-custom">
            <AnimatedSection className="text-center max-w-4xl mx-auto">
              <span className="text-primary font-semibold text-sm tracking-widest uppercase">
                Student Support
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 leading-tight">
                Your Journey to the <span className="text-primary">UK Starts Here</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                We help international students settle smoothly—arrival, housing, and career support.
              </p>

              {/* ✅ AFTER LOGIN: show launch button */}
              {isLoggedIn && (
                <div className="mt-8">
                  <div className="text-sm text-muted-foreground mb-3">
                    Logged in as <b>{user?.full_name || user?.email}</b>
                  </div>
                  <Button onClick={goLaunch} className="gap-2">
                    <Rocket className="w-4 h-4" />
                    Launch
                  </Button>
                </div>
              )}
            </AnimatedSection>
          </div>
        </div>

        {/* Services */}
        <div className="py-12 md:py-16 bg-cream">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <AnimatedSection key={service.title} delay={index * 0.1}>
                  <motion.div
                    className="bg-background rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 h-full"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <service.icon className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {service.description}
                        </p>
                        <ul className="space-y-2">
                          {service.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
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
          </div>
        </div>

        {/* Additional */}
        <div className="section-padding">
          <div className="container-custom">
            <AnimatedSection className="text-center mb-12">
              <span className="text-primary font-semibold text-sm tracking-widest uppercase">
                Additional Support
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-4">
                More Ways We Can Help
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalServices.map((service, index) => (
                <AnimatedSection key={service.title} delay={index * 0.1}>
                  <motion.div
                    className="bg-muted/30 rounded-xl p-6 text-center hover:bg-muted/50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
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
          <div id="register" className="section-padding bg-cream">
            <div className="container-custom">
              <AnimatedSection className="text-center mb-12">
                <span className="text-primary font-semibold text-sm tracking-widest uppercase">
                  Get Started
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-4">
                  Register as a Student
                </h2>
                <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                  Fill out the form below and our team will reach out.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <form
                  onSubmit={handleSubmit}
                  className="max-w-3xl mx-auto bg-background rounded-2xl p-8 shadow-lg"
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

                    <div className="space-y-2">
                      <Label htmlFor="nationality">Nationality *</Label>
                      <Input
                        id="nationality"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="md:col-span-2 mt-4">
                      <h3 className="font-semibold text-lg text-foreground mb-4 border-b border-border pb-2">
                        Academic Information
                      </h3>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="university">University/Institution *</Label>
                      <Input
                        id="university"
                        name="university"
                        value={formData.university}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="course">Course/Program *</Label>
                      <Input
                        id="course"
                        name="course"
                        value={formData.course}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="arrivalDate">Expected Arrival Date</Label>
                      <Input
                        id="arrivalDate"
                        name="arrivalDate"
                        type="date"
                        value={formData.arrivalDate}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="md:col-span-2 mt-4">
                      <h3 className="font-semibold text-lg text-foreground mb-4 border-b border-border pb-2">
                        Accommodation Preferences
                      </h3>
                    </div>

                    <div className="space-y-2">
                      <Label>Accommodation Type</Label>
                      <Select
                        value={formData.accommodationType}
                        onValueChange={(value) =>
                          handleSelectChange("accommodationType", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="shared">Shared Room</SelectItem>
                          <SelectItem value="private">Private Room</SelectItem>
                          <SelectItem value="studio">Studio</SelectItem>
                          <SelectItem value="1bed">1 Bedroom Flat</SelectItem>
                          <SelectItem value="any">No Preference</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Monthly Budget (£)</Label>
                      <Select
                        value={formData.budget}
                        onValueChange={(value) =>
                          handleSelectChange("budget", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under500">Under £500</SelectItem>
                          <SelectItem value="500-750">£500 - £750</SelectItem>
                          <SelectItem value="750-1000">£750 - £1000</SelectItem>
                          <SelectItem value="1000-1500">£1000 - £1500</SelectItem>
                          <SelectItem value="over1500">Over £1500</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label>Services Needed</Label>
                      <Select
                        value={formData.servicesNeeded}
                        onValueChange={(value) =>
                          handleSelectChange("servicesNeeded", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select primary service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="airport">
                            Airport Pickup & Orientation
                          </SelectItem>
                          <SelectItem value="accommodation">
                            Accommodation Only
                          </SelectItem>
                          <SelectItem value="full">Full Support Package</SelectItem>
                          <SelectItem value="career">Career & CV Support</SelectItem>
                          <SelectItem value="banking">
                            Banking & Finance Assistance
                          </SelectItem>
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
              <GraduationCap className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Start Your UK Journey?
              </h2>
              <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                Register today and we’ll help you settle quickly and safely.
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

export default StudentServicesPage;
