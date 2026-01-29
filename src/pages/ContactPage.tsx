import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    
    setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Map Section */}
        <div className="relative h-[300px] md:h-[400px] w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.4315228726957!2d-0.09397708422954!3d51.52674997963757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761ca671c13c0f%3A0x5f48a76e77e41b95!2s124%20City%20Rd%2C%20London%20EC1V%202NX%2C%20UK!5e0!3m2!1sen!2s!4v1706540000000!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
          />
        </div>

        {/* Contact Info Cards */}
        <div className="container-custom -mt-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Address Card */}
            <AnimatedSection delay={0.1}>
              <div className="bg-card rounded-xl p-6 shadow-lg text-center border border-border">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-bold mb-2">Our Address</h3>
                <p className="text-muted-foreground text-sm">
                  124 City Road, London, EC1V 2NX,<br />
                  United Kingdom
                </p>
              </div>
            </AnimatedSection>

            {/* Email Card */}
            <AnimatedSection delay={0.2}>
              <div className="bg-card rounded-xl p-6 shadow-lg text-center border border-border">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-bold mb-2">student@lgsltd.uk</h3>
                <p className="text-muted-foreground text-sm">
                  Email us anytime for any kind of<br />
                  query.
                </p>
              </div>
            </AnimatedSection>

            {/* Phone Card */}
            <AnimatedSection delay={0.3}>
              <div className="bg-card rounded-xl p-6 shadow-lg text-center border border-border">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-bold mb-2">088 0123 654 99</h3>
                <p className="text-muted-foreground text-sm">
                  24/7/365 priority Live Chat and<br />
                  ticketing support.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="section-padding">
          <div className="container-custom">
            <AnimatedSection className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <span className="text-primary font-semibold text-sm tracking-widest uppercase">
                  Book Appointment
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3">
                  Send Message Anytime
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="h-14 bg-muted/50 border-border"
                    maxLength={100}
                    required
                  />
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="h-14 bg-muted/50 border-border"
                    maxLength={20}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="h-14 bg-muted/50 border-border"
                    maxLength={255}
                    required
                  />
                  <Input
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="h-14 bg-muted/50 border-border"
                    maxLength={200}
                  />
                </div>
                <Textarea
                  name="message"
                  placeholder="Write a Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="min-h-[150px] bg-muted/50 border-border resize-none"
                  maxLength={1000}
                  required
                />
                <div className="text-center">
                  <Button
                    type="submit"
                    size="lg"
                    className="h-14 px-10 rounded-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send a Message"}
                  </Button>
                </div>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
