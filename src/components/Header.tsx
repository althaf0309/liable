import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo.png";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about", isRoute: true },
  { name: "Properties", href: "/properties", isRoute: true },
  { name: "Services", href: "#services", hasDropdown: true },
  { name: "News", href: "/news", isRoute: true },
  { name: "Contact", href: "#contact" },
];

const serviceOptions = [
  { name: "Students", href: "#services-students" },
  { name: "Landlords", href: "#services-landlords" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Liable Group Services" className="h-12 md:h-16 lg:h-20 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              link.hasDropdown ? (
                <DropdownMenu key={link.name} open={isServicesOpen} onOpenChange={setIsServicesOpen}>
                  <DropdownMenuTrigger asChild>
                    <button className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1 outline-none">
                      {link.name}
                      <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="bg-background border border-border shadow-lg z-50">
                    {serviceOptions.map((option) => (
                      <DropdownMenuItem key={option.name} asChild>
                        <a
                          href={option.href}
                          className="cursor-pointer text-sm font-medium text-foreground hover:text-primary hover:bg-accent px-4 py-2"
                        >
                          {option.name}
                        </a>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : link.isRoute ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              )
            ))}
          </nav>

          {/* Search Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full border border-border">
              <Search className="w-5 h-5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                link.hasDropdown ? (
                  <div key={link.name} className="flex flex-col">
                    <span className="text-sm font-medium text-foreground px-4 py-2">{link.name}</span>
                    <div className="flex flex-col pl-6">
                      {serviceOptions.map((option) => (
                        <a
                          key={option.name}
                          href={option.href}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors px-4 py-2"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {option.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : link.isRoute ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors px-4 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors px-4 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                )
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
