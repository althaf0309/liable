import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { HowItWorks, PlatformStats, QuantumCTA } from "@/components/PlatformSections";
import BuildingFuture from "@/components/BuildingFuture";
import QuantumNetwork from "@/components/QuantumNetwork";
import Mission from "@/components/Mission";
import GlobalNetwork from "@/components/GlobalNetwork";
import IsometricCity from "@/components/IsometricCity";
import PortalEcosystem from "@/components/PortalEcosystem";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen" style={{ background: "hsl(222,52%,2%)" }}>
      <Header />
      <main>
        {/* 1. Hero — Quantum Link™ network-globe */}
        <Hero />
        {/* 2. Building the Future — about + 4 pillars */}
        <BuildingFuture />
        {/* 3. Quantum Network — interactive node graph */}
        <QuantumNetwork />
        {/* 4. Mission — glass card + floating orb */}
        <Mission />
        {/* 5. Global Network — world map + floating service nodes */}
        <GlobalNetwork />
        {/* 6. Our Vision — isometric 3D city + Quantum Link™ sphere */}
        <IsometricCity />
        {/* 7. Portal Ecosystem — Student / Landlord / Agent / Support */}
        <PortalEcosystem />
        {/* 8. How It Works — managed flow */}
        <HowItWorks />
        {/* 9. LGS Platform Statistics */}
        <PlatformStats />
        {/* 10. Call to Action */}
        <QuantumCTA />
        {/* 11. Contact */}
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
