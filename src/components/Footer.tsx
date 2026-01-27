import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Home, Facebook, Linkedin, Instagram, ChevronRight } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "#about" },
  { name: "News", href: "#news" },
  { name: "Properties", href: "#properties" },
  { name: "Student's Services", href: "#services" },
  { name: "Landlord's Services", href: "#services" },
];

const otherLinks = [
  { name: "Terms & Conditions", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

const Footer = () => {
  return (
    <footer className="bg-dark">
      {/* Contact Bar */}
      <div className="container-custom py-8">
        <div className="bg-primary rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <span className="text-xs text-primary-foreground/80">Address</span>
              <p className="text-primary-foreground font-medium">
                124 City Road, London, EC1V 2NX, United Kingdom
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <span className="text-xs text-primary-foreground/80">Email</span>
              <p className="text-primary-foreground font-medium">studlet@lgsltd.uk</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Phone className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <span className="text-xs text-primary-foreground/80">Call Emergency</span>
              <p className="text-primary-foreground font-medium">088 0123 654 99</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-12 border-t border-muted-foreground/10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Home className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl text-background">Liable</span>
                <span className="text-xs text-muted-foreground -mt-1">Group Services LTD</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm mb-6">
              Live Better, Rent Smarter – Student & Short-Term Homes Made Easy.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground text-sm">Follow on</span>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-background mb-4 pb-2 border-b border-muted-foreground/20">
              Quick Link
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2"
                  >
                    <ChevronRight className="w-3 h-3 text-primary" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Other */}
          <div>
            <h4 className="font-serif font-bold text-background mb-4 pb-2 border-b border-muted-foreground/20">
              Other
            </h4>
            <ul className="space-y-2">
              {otherLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2"
                  >
                    <ChevronRight className="w-3 h-3 text-primary" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container-custom py-6 border-t border-muted-foreground/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2025 Copyrights by Liable. All Rights Reserved.</p>
          <p>Crafted by 4th&Co</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
