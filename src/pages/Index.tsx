
import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import FeatureSection from "@/components/FeatureSection";
import CtaSection from "@/components/CtaSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginPopup from "@/components/auth/LoginPopup";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleClosePopup = () => {
    setShowLoginPopup(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-cinema-black">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedProducts />
        <FeatureSection />
        <CtaSection />
      </main>
      <Footer />
      
      <LoginPopup isOpen={showLoginPopup} onClose={handleClosePopup} />
    </div>
  );
};

export default Index;
