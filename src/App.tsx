import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import PropertiesPage from "./pages/PropertiesPage";
import PropertyDetailsPage from "./pages/PropertyDetailsPage";
import NewsPage from "./pages/NewsPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import ContactPage from "./pages/ContactPage";
import TermsConditionsPage from "./pages/TermsConditionsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import InnovationPage from "./pages/InnovationPage";
import QuantumLinkPage from "./pages/QuantumLinkPage";

import StudentServicesPage from "./pages/StudentServicesPage";
import LandlordServicesPage from "./pages/LandlordServicesPage";

import AuthPage from "./pages/AuthPage";
import ForgotPasswordOtpPage from "./pages/ForgotPasswordOtpPage";
import ResetPasswordOtpPage from "./pages/ResetPasswordOtpPage";

import NotFound from "./pages/NotFound";

// ✅ Keep ProtectedRoute only for real dashboards (not service pages)
// import ProtectedRoute from "@/components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/quantum-link" element={<QuantumLinkPage />} />
          <Route path="/innovation" element={<InnovationPage />} />
          {/* ✅ Properties */}
          <Route path="/properties" element={<PropertiesPage />} />
          {/* ✅ FIX: was :id, must be :slug because frontend uses slug */}
          <Route path="/properties/:slug" element={<PropertyDetailsPage />} />


<Route path="/news" element={<NewsPage />} />
<Route path="/news/:slug" element={<BlogDetailsPage />} />

          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms-and-conditions" element={<TermsConditionsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

          {/* ✅ Services - PUBLIC (no redirect to login) */}
          <Route path="/services/students" element={<StudentServicesPage />} />
          <Route path="/services/landlords" element={<LandlordServicesPage />} />

          {/* Auth */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/auth/forgot" element={<ForgotPasswordOtpPage />} />
          <Route path="/auth/reset" element={<ResetPasswordOtpPage />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
