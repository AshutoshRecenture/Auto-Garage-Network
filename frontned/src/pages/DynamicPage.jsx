import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHeader from "../components/SEOHeader.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { API_URL } from "../config";
import NotFound from "./NotFound.jsx";

const DynamicPage = () => {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPage = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`${API_URL}/api/pages/slug/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setPage(data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error loading dynamic page:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#050816] text-white">
        <Navbar />
        <div className="flex-grow flex items-center justify-center py-40">
          <div className="w-8 h-8 rounded-full border-[3px] border-indigo-500 border-t-transparent animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !page) {
    return <NotFound />;
  }

  const defaultBanner = "https://res.cloudinary.com/n4okswsd/image/upload/v1782237688/agn-hero-default.jpg";
  const bgImage = page.bannerImage || defaultBanner;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#050816] text-white">
      <SEOHeader
        title={`${page.title} | Auto Garage Network`}
        description={page.bannerSubtitle || `Read more about ${page.title} on Auto Garage Network.`}
        keywords={`${page.title.toLowerCase()}, autogaragenetwork`}
        canonicalPath={`/p/${slug}`}
      />
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={bgImage}
              alt={page.title}
              className="w-full h-full object-cover brightness-[0.3]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/40 to-transparent" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center px-6 space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-white"
            >
              {page.bannerTitle || page.title}
            </motion.h1>
            {page.bannerSubtitle && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto"
              >
                {page.bannerSubtitle}
              </motion.p>
            )}
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 px-6 md:px-12 relative overflow-hidden bg-[#050816]">
          {/* ambient glow */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none" />

          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="prose prose-invert prose-indigo max-w-none text-gray-300 text-sm md:text-base leading-relaxed space-y-6"
            >
              {/* Inject custom HTML content safely */}
              <div 
                dangerouslySetInnerHTML={{ __html: page.content }} 
                className="dynamic-html-content"
              />
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DynamicPage;
