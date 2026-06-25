import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, ChevronDown, User, LogOut } from "lucide-react";

import logo from "@/assets/logo.png";
import { clearAuthUser, getAuthUser } from "@/lib/auth";
import { apiPost } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


type Role = "ADMIN" | "STAFF" | "LANDLORD" | "STUDENT" | "GUEST";


function normalizeRole(role?: string): Role {
  const r = String(role || "").toUpperCase();
  if (r === "ADMIN" || r === "SUPERADMIN" || r === "SUPER_ADMIN") return "ADMIN";
  if (r === "STAFF") return "STAFF";
  if (r === "LANDLORD") return "LANDLORD";
  if (r === "STUDENT") return "STUDENT";
  return "GUEST";
}


const navLinks = [
  { name: "Home", href: "/", isRoute: true },
  { name: "About Us", href: "/about", isRoute: true },
  { name: "Services", href: "#services", hasDropdown: true },
  { name: "News", href: "/news", isRoute: true },
  { name: "Contact", href: "/contact", isRoute: true },
];

const allServiceOptions = [
  { name: "Students", href: "/services/students", isRoute: true },
  { name: "Landlords", href: "/services/landlords", isRoute: true },
];


const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [user, setUser] = useState(getAuthUser());

  useEffect(() => {
    const onStorage = () => setUser(getAuthUser());
    window.addEventListener("storage", onStorage);
    setUser(getAuthUser());
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const role: Role = useMemo(() => normalizeRole(user?.role), [user]);

  const serviceOptions = useMemo(() => {
    if (!user) return allServiceOptions;
    if (role === "STUDENT") return allServiceOptions.filter((x) => x.name === "Students");
    if (role === "LANDLORD") return allServiceOptions.filter((x) => x.name === "Landlords");
    return allServiceOptions;
  }, [user, role]);

  const logout = async () => {
    try {
      await apiPost("/api/accounts/auth/logout/", {});
    } catch {
      // Clear local state even if the session is already gone.
    } finally {
      clearAuthUser();
      setUser(null);
      navigate("/auth");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[rgba(197,160,89,0.16)]">
      <div className="container-custom">
        <div className="flex items-center justify-between h-24">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Liable"
              className="h-16 md:h-20 lg:h-24 w-auto drop-shadow-lg"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <DropdownMenu
                  key={link.name}
                  open={isServicesOpen}
                  onOpenChange={setIsServicesOpen}
                >
                  <DropdownMenuTrigger asChild>
                    <button className="text-sm font-medium text-[#F5F2ED] hover:text-[#E8C77E] transition-colors flex items-center gap-1 outline-none">
                      {link.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isServicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="bg-[#0A0A0A] border border-[rgba(197,160,89,0.18)] shadow-2xl z-50"
                  >
                    <DropdownMenuItem asChild>
                      <Link
                        to="/services"
                        className="cursor-pointer text-sm font-medium text-[#F5F2ED] hover:text-[#E8C77E] hover:bg-[rgba(197,160,89,0.1)] px-4 py-2"
                      >
                        All Services
                      </Link>
                    </DropdownMenuItem>
                    {serviceOptions.map((option) => (
                      <DropdownMenuItem key={option.name} asChild>
                        <Link
                          to={option.href}
                          className="cursor-pointer text-sm font-medium text-[#F5F2ED] hover:text-[#E8C77E] hover:bg-[rgba(197,160,89,0.1)] px-4 py-2"
                        >
                          {option.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm font-medium text-[#F5F2ED] hover:text-[#E8C77E] transition-colors"
                >
                  {link.name}
                </Link>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full border border-[rgba(197,160,89,0.25)]"
            >
              <Search className="w-5 h-5" />
            </Button>

            {!user ? (
              <Link to="/auth">
                <Button variant="default" size="sm" className="gap-2">
                  <User className="w-4 h-4" />
                  Login
                </Button>
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium text-[#F5F2ED]">
                  {user.full_name || user.email}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => void logout()}
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-[rgba(197,160,89,0.16)]">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.name} className="flex flex-col">
                    <span className="text-sm font-medium text-[#F5F2ED] px-4 py-2">
                      {link.name}
                    </span>
                    <div className="flex flex-col pl-6">
                      <Link
                        to="/services"
                        className="text-sm text-muted-foreground hover:text-[#E8C77E] transition-colors px-4 py-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        All Services
                      </Link>
                      {serviceOptions.map((option) => (
                        <Link
                          key={option.name}
                          to={option.href}
                          className="text-sm text-muted-foreground hover:text-[#E8C77E] transition-colors px-4 py-2"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {option.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-sm font-medium text-[#F5F2ED] hover:text-[#E8C77E] transition-colors px-4 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              )}

              <div className="px-4 pt-4 border-t border-[rgba(197,160,89,0.16)] mt-2">
                {!user ? (
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="default" size="sm" className="w-full gap-2">
                      <User className="w-4 h-4" />
                      Login
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2"
                    onClick={() => {
                      setIsMenuOpen(false);
                      void logout();
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout ({user.full_name || user.email})
                  </Button>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};


export default Header;
