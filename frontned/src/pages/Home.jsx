import React, { useEffect, useState } from "react";
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
import { API_URL } from "../config";

const Home = () => {
  const [dbPage, setDbPage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPage = async () => {
      try {
        const res = await fetch(`${API_URL}/api/pages/slug/home`);
        if (res.ok) {
          const data = await res.json();
          setDbPage(data);
        }
      } catch (err) {
        console.error("Failed to load homepage database details:", err);
      }
    };
    fetchPage();
  }, []);

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
        <HeroSection title={dbPage?.bannerTitle} subtitle={dbPage?.bannerSubtitle} />
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

        {/* Dynamic HTML Content block if editable from backend */}
        {dbPage && dbPage.content && (
          <section className="py-16 px-6 md:px-12 border-t border-white/5 bg-[#0c1222]/20">
            <div className="max-w-7xl mx-auto prose prose-invert prose-indigo">
              <div dangerouslySetInnerHTML={{ __html: dbPage.content }} className="dynamic-html-content" />
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
