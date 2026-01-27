import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section id="contact" className="bg-dark py-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Form */}
          <div>
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              Book Appointment
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-background mt-3 mb-8">
              Send Message Anytime
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Full Name*"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="bg-transparent border-muted-foreground/30 text-background placeholder:text-muted-foreground focus:border-primary"
                />
                <Input
                  type="email"
                  placeholder="Email Address*"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="bg-transparent border-muted-foreground/30 text-background placeholder:text-muted-foreground focus:border-primary"
                />
              </div>

              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger className="bg-transparent border-muted-foreground/30 text-background">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="landlord">Landlord</SelectItem>
                  <SelectItem value="tenant">Tenant</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              <Textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={5}
                className="bg-transparent border-muted-foreground/30 text-background placeholder:text-muted-foreground focus:border-primary resize-none"
              />

              <Button type="submit" className="rounded-full px-8">
                Submit Message
              </Button>
            </form>
          </div>

          {/* Decorative World Map */}
          <div className="hidden lg:block relative">
            <div className="w-full aspect-square opacity-30">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                {/* Dotted world map pattern */}
                {[...Array(40)].map((_, row) =>
                  [...Array(40)].map((_, col) => {
                    const x = col * 10;
                    const y = row * 10;
                    const opacity = Math.random() > 0.6 ? 1 : 0;
                    return (
                      opacity > 0 && (
                        <circle
                          key={`${row}-${col}`}
                          cx={x}
                          cy={y}
                          r="1.5"
                          fill="hsl(var(--muted-foreground))"
                        />
                      )
                    );
                  })
                )}
              </svg>
            </div>
            {/* UK Marker */}
            <div className="absolute top-1/4 right-1/3 w-4 h-4 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
