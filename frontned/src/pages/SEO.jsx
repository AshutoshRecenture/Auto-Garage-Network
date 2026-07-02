import React, { useEffect, useState } from "react";
import SEOHeader from "../components/SEOHeader.jsx";
import Navbar from "../components/Navbar.jsx";
import SEOSection from "../components/SEOSection.jsx";
import Footer from "../components/Footer.jsx";
import { API_URL } from "../config";
import NotFound from "./NotFound.jsx";

const SEO = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [dbPage, setDbPage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPage = async () => {
      try {
        const res = await fetch(`${API_URL}/api/pages/slug/seo`);
        if (res.status === 403) {
          setIsDisabled(true);
        } else if (res.ok) {
          const data = await res.json();
          setDbPage(data);
        }
      } catch (err) {
        console.error("Failed to load dynamic SEO page content:", err);
      }
    };
    fetchPage();
  }, []);

  if (isDisabled) {
    return <NotFound />;
  }

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
            {dbPage && dbPage.bannerTitle ? dbPage.bannerTitle : "Search Engine Optimisation"}
          </h1>
          {dbPage && dbPage.bannerSubtitle && (
            <p className="text-gray-300 max-w-2xl mx-auto px-6 text-sm md:text-base leading-relaxed">
              {dbPage.bannerSubtitle}
            </p>
          )}
        </div>
        
        <SEOSection isPage={true} />

        {/* Dynamic HTML Content block if editable from backend */}
        {dbPage && dbPage.content && (
          <section className="py-12 px-6 md:px-12 border-t border-white/5 bg-white/[0.01]">
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

export default SEO;
