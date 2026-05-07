import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Home, Facebook, Linkedin, Instagram, ChevronRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Innovation", href: "/innovation" },
  { name: "News", href: "/news" },
  { name: "Properties", href: "/properties" },
  { name: "Student's Services", href: "/services/students" },
  { name: "Landlord's Services", href: "/services/landlords" },
];

const otherLinks = [
  { name: "Terms & Conditions", href: "/terms-and-conditions" },
  { name: "Privacy Policy", href: "/privacy-policy" },
];

const Footer = () => {
  return (
    <footer className="bg-dark">
      {/* Contact Bar */}
      <div className="container-custom py-8">
        <AnimatedSection>
          <div className="bg-primary rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: MapPin,
                label: "Address",
                value: "124 City Road, London, EC1V 2NX, United Kingdom",
              },
              { icon: Mail, label: "Email", value: "studlet@lgsltd.uk" },
              { icon: Phone, label: "Call Emergency", value: "088 0123 654 99" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <span className="text-xs text-primary-foreground/80">{item.label}</span>
                  <p className="text-primary-foreground font-medium">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-12 border-t border-muted-foreground/10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <AnimatedSection delay={0.1} className="md:col-span-1">
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
              Controlled student housing infrastructure for tenancy readiness, allocation, and occupancy continuity.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground text-sm">Follow on</span>
              {[Facebook, Linkedin, Instagram].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </AnimatedSection>

          {/* Quick Links */}
          <AnimatedSection delay={0.2}>
            <h4 className="font-serif font-bold text-background mb-4 pb-2 border-b border-muted-foreground/20">
              Quick Link
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-3 h-3 text-primary group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Other */}
          <AnimatedSection delay={0.3}>
            <h4 className="font-serif font-bold text-background mb-4 pb-2 border-b border-muted-foreground/20">
              Other
            </h4>
            <ul className="space-y-2">
              {otherLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-3 h-3 text-primary group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </div>

      {/* Copyright */}
      <div className="container-custom py-6 border-t border-muted-foreground/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 Copyright by Liable. All Rights Reserved.</p>
          <p>Crafted by 4th&Co</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
