import React from "react";
import { MotionConfig } from "framer-motion";
import SEOHeader from "../components/SEOHeader.jsx";
import Navbar from "../components/Navbar.jsx";
import HeroSection from "../components/HeroSection.jsx";
import PartnerLogos from "../components/PartnerLogos.jsx";
import StatsSection from "../components/StatsSection.jsx";
import FeaturesSection from "../components/FeaturesSection.jsx";
import DashboardSection from "../components/DashboardSection.jsx";
import WebsiteSolutions from "../components/WebsiteSolutions.jsx";
import MOTDiary from "../components/MOTDiary.jsx";
import SEOSection from "../components/SEOSection.jsx";
import MobileAppSection from "../components/MobileAppSection.jsx";
import PricingSection from "../components/PricingSection.jsx";
import TestimonialsSection from "../components/TestimonialsSection.jsx";
import FAQSection from "../components/FAQSection.jsx";
import Footer from "../components/Footer.jsx";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#050816] text-white">
      <SEOHeader
        title="Run Your Garage Smarter"
        description="Auto Garage Network is the premium garage management system & website provider for UK workshops, MOT centres & tyre specialists. Automate tasks and scale revenue."
        keywords="garage management system, workshop software, MOT diary, garage booking software, UK garage website builder"
        canonicalPath="/"
      />
      <Navbar />
        <main className="flex-grow home-main">
          <HeroSection />
          <PartnerLogos />
          <StatsSection />
          <FeaturesSection />
          <DashboardSection />
          <WebsiteSolutions />
          <MOTDiary />
          <SEOSection />
          <MobileAppSection />
          <PricingSection isHomepage={true} />
          <TestimonialsSection />
          <FAQSection />
        </main>
      <Footer />
    </div>
  );
};

export default Home;
