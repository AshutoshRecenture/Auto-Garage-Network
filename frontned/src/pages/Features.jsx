import React from "react";
import SEOHeader from "../components/SEOHeader.jsx";
import Navbar from "../components/Navbar.jsx";
import FeaturesSection from "../components/FeaturesSection.jsx";
import Footer from "../components/Footer.jsx";

const Features = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#050816] text-white">
      <SEOHeader
        title="All Features | Complete Automotive Suite"
        description="Discover all the features of Auto Garage Network, including TecRMI schedules, GSF parts order, partslink24 integration, and QuickBooks accounting sync."
        keywords="TecRMI integration, GSF parts link, partslink24, accounting sync, garage software features"
        canonicalPath="/features"
      />
      <Navbar />
      <main className="flex-grow pt-24">
        {/* Header decoration */}
        <div className="relative pt-12 pb-2 text-center overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
          <h1 className="text-4xl md:text-5xl font-black mb-4 px-4 leading-tight">
            Features & Automations
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto px-4">
            A comprehensive overview of our automated system, providing tyre registration lookup, wholesaler stock, SMS reminders, and diagnostic audits.
          </p>
        </div>
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Features;
