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
      <main className="flex-grow pt-24">
        {/* Header decoration */}
        <div className="relative pt-12 pb-2 text-center overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
          <h1 className="text-4xl md:text-5xl font-black mb-4 px-4 leading-tight">
            Latest News & Insights
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto px-4">
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
