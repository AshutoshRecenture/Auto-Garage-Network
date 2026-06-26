import React from "react";
import SEOHeader from "../components/SEOHeader.jsx";
import Navbar from "../components/Navbar.jsx";
import SEOSection from "../components/SEOSection.jsx";
import Footer from "../components/Footer.jsx";

const SEO = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#050816] text-white">
      <SEOHeader
        title="Local SEO & Marketing Services for Garages"
        description="Rank your independent workshop on Google. Drive local traffic, increase tyre sales, and get more MOT bookings with our tailored garage marketing SEO."
        keywords="local SEO garages, workshop Google ranking, tyre sales SEO, MOT search marketing"
        canonicalPath="/seo"
      />
      <Navbar />
      <main className="flex-grow pt-24">
        {/* Header decoration */}
        <div className="relative pt-12 pb-2 text-center overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />
          <h1 className="text-4xl md:text-5xl font-black mb-4 px-4 leading-tight">
            Search Engine Optimisation
          </h1>
        </div>
        <SEOSection isPage={true} />
      </main>
      <Footer />
    </div>
  );
};

export default SEO;
