import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Building2, Mail, Lock, Eye, EyeOff, ArrowLeft, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-slide-3.jpg";

type UserRole = "student" | "landlord" | null;
type AuthMode = "login" | "signup";

const AuthPage = () => {
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (authMode === "signup" && formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: authMode === "login" ? "Login Successful!" : "Account Created!",
      description: authMode === "login" 
        ? `Welcome back! You're logged in as a ${selectedRole}.`
        : `Your ${selectedRole} account has been created. Please check your email to verify.`,
    });

    setIsSubmitting(false);
  };

  const resetForm = () => {
    setFormData({ email: "", password: "", confirmPassword: "", fullName: "" });
  };

  const roleCards = [
    {
      role: "student" as UserRole,
      icon: GraduationCap,
      title: "Student",
      description: "Access accommodation, orientation services, and student support",
      color: "bg-primary",
    },
    {
      role: "landlord" as UserRole,
      icon: Building2,
      title: "Landlord",
      description: "Manage your properties, tenants, and rental income",
      color: "bg-navy",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Banner */}
        <div className="relative h-48 md:h-64 overflow-hidden">
          <img 
            src={heroImage} 
            alt="Login" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-background mb-4">
              {selectedRole ? (authMode === "login" ? "Welcome Back" : "Create Account") : "Login / Sign Up"}
            </h1>
            <div className="flex items-center gap-2 text-background/80 text-sm">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-primary">
                {selectedRole ? `${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} ${authMode === "login" ? "Login" : "Sign Up"}` : "Authentication"}
              </span>
            </div>
          </div>
        </div>

        <div className="section-padding">
          <div className="container-custom">
            <div className="max-w-xl mx-auto">
              <AnimatePresence mode="wait">
                {!selectedRole ? (
                  // Role Selection
                  <motion.div
                    key="role-selection"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center mb-8">
                      <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">
                        Choose Your Account Type
                      </h2>
                      <p className="text-muted-foreground">
                        Select whether you're a student looking for accommodation or a landlord managing properties.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {roleCards.map((card) => (
                        <motion.button
                          key={card.role}
                          onClick={() => setSelectedRole(card.role)}
                          className={`${card.color} rounded-2xl p-8 text-left transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                          whileHover={{ y: -5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <card.icon className="w-12 h-12 text-background mb-4" />
                          <h3 className="font-serif text-2xl font-bold text-background mb-2">
                            {card.title}
                          </h3>
                          <p className="text-background/80 text-sm">
                            {card.description}
                          </p>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  // Login/Signup Form
                  <motion.div
                    key="auth-form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      onClick={() => {
                        setSelectedRole(null);
                        resetForm();
                      }}
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to role selection
                    </button>

                    <div className="bg-background rounded-2xl shadow-lg border border-border overflow-hidden">
                      {/* Role Badge */}
                      <div className={`${selectedRole === "student" ? "bg-primary" : "bg-navy"} px-6 py-4 flex items-center gap-3`}>
                        {selectedRole === "student" ? (
                          <GraduationCap className="w-6 h-6 text-background" />
                        ) : (
                          <Building2 className="w-6 h-6 text-background" />
                        )}
                        <span className="text-background font-semibold capitalize">
                          {selectedRole} Account
                        </span>
                      </div>

                      {/* Auth Tabs */}
                      <div className="flex border-b border-border">
                        <button
                          onClick={() => {
                            setAuthMode("login");
                            resetForm();
                          }}
                          className={`flex-1 py-4 text-center font-medium transition-colors ${
                            authMode === "login"
                              ? "text-primary border-b-2 border-primary"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          Login
                        </button>
                        <button
                          onClick={() => {
                            setAuthMode("signup");
                            resetForm();
                          }}
                          className={`flex-1 py-4 text-center font-medium transition-colors ${
                            authMode === "signup"
                              ? "text-primary border-b-2 border-primary"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          Sign Up
                        </button>
                      </div>

                      {/* Form */}
                      <form onSubmit={handleSubmit} className="p-6 space-y-5">
                        {authMode === "signup" && (
                          <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                              <Input
                                id="fullName"
                                name="fullName"
                                type="text"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                placeholder="Enter your full name"
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="your@email.com"
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              id="password"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              value={formData.password}
                              onChange={handleInputChange}
                              placeholder="••••••••"
                              className="pl-10 pr-10"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>

                        {authMode === "signup" && (
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                              <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showPassword ? "text" : "password"}
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="••••••••"
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>
                        )}

                        {authMode === "login" && (
                          <div className="flex justify-end">
                            <Link
                              to="/forgot-password"
                              className="text-sm text-primary hover:underline"
                            >
                              Forgot password?
                            </Link>
                          </div>
                        )}

                        <Button
                          type="submit"
                          className="w-full"
                          size="lg"
                          disabled={isSubmitting}
                        >
                          {isSubmitting
                            ? "Please wait..."
                            : authMode === "login"
                            ? "Login"
                            : "Create Account"}
                        </Button>

                        <p className="text-center text-sm text-muted-foreground">
                          {authMode === "login" ? (
                            <>
                              Don't have an account?{" "}
                              <button
                                type="button"
                                onClick={() => {
                                  setAuthMode("signup");
                                  resetForm();
                                }}
                                className="text-primary hover:underline font-medium"
                              >
                                Sign up
                              </button>
                            </>
                          ) : (
                            <>
                              Already have an account?{" "}
                              <button
                                type="button"
                                onClick={() => {
                                  setAuthMode("login");
                                  resetForm();
                                }}
                                className="text-primary hover:underline font-medium"
                              >
                                Login
                              </button>
                            </>
                          )}
                        </p>
                      </form>
                    </div>

                    {/* Register Link */}
                    <div className="mt-6 text-center">
                      <p className="text-muted-foreground">
                        Need to register for our services?{" "}
                        <Link
                          to={selectedRole === "student" ? "/services/students#register" : "/services/landlords#register"}
                          className="text-primary hover:underline font-medium"
                        >
                          Fill out our {selectedRole} registration form
                        </Link>
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthPage;
