import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import InnovationPreview from "@/components/InnovationPreview";
import About from "@/components/About";
import Properties from "@/components/Properties";
import Booking from "@/components/Booking";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <InnovationPreview />
        <About />
        <Properties />
        {/* <Booking /> */}
        <Blog />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
