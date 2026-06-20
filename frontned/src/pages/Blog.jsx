import React from "react";
import SEOHeader from "../components/SEOHeader.jsx";
import Navbar from "../components/Navbar.jsx";
import BlogSection from "../components/BlogSection.jsx";
import Footer from "../components/Footer.jsx";

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#050816] text-white">
      <SEOHeader
        title="Blog & Automotive Industry Insights"
        description="Read the latest news, expert guides, workshop management tips, and digital trends from Auto Garage Network to grow your garage business."
        keywords="garage business blog, workshop management tips, automotive news UK, digital marketing"
        canonicalPath="/blog"
      />
      <Navbar />
      <main className="flex-grow pt-22 sm:pt-24 lg:pt-32">
        {/* Breadcrumb / Page Header Banner */}
        <div className="relative w-full py-20 bg-[#050816] flex flex-col items-center justify-center text-center overflow-hidden border-b border-white/5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none"></div>

          <h1 className="relative text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
            Latest News & Insights
          </h1>
          <p className="relative text-gray-400 text-sm md:text-base max-w-2xl px-6 leading-relaxed">
            Follow our blogs, technical guides, tips on workshop management, and customer outreach advice.
          </p>
        </div>
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
