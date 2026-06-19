import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import SEOHeader from "../components/SEOHeader.jsx";

const Sitemap = () => {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  const [infoExpanded, setInfoExpanded] = useState(true);
  const [blogsExpanded, setBlogsExpanded] = useState(false);

  const infoLinks = [
    { label: "03-01-2025-old-Pricing-page", path: "#" },
    { label: "Administrator Mobile App", path: "#" },
    { label: "Automated Reminders", path: "#" },
    { label: "Automobile", path: "#" },
    { label: "Automotive", path: "#" },
    { label: "BookKeeping", path: "#" },
    { label: "Calendar", path: "#" },
    { label: "Car Traders", path: "#" },
    { label: "Chat Support", path: "#" },
    { label: "Complaints", path: "#" },
    { label: "Courtesy Vehicles", path: "#" },
    { label: "Customer Booking Mobile App Android/IOS", path: "#" },
    { label: "Customer Management", path: "#" },
    { label: "Customer Portal", path: "#" },
    { label: "Features", path: "/features" },
    { label: "Garage Website", path: "/website-for-garages" },
    { label: "Garages", path: "#" },
    { label: "GSF Integration", path: "#" },
    { label: "Inspection Form Management", path: "#" },
    { label: "Latest Work", path: "/latest-work" },
    { label: "MOT Centres", path: "#" },
    { label: "MOT Diary", path: "/mot-diary" },
    { label: "MOT Expiry Lookup", path: "#" },
    { label: "Multi-Site Garage Management System", path: "#" },
    { label: "old-Pricing-page", path: "#" },
    { label: "Parts Sales", path: "#" },
    { label: "Partslink24 Integration", path: "#" },
    { label: "Personnel Management", path: "#" },
    { label: "Pricing Online Payment", path: "#" },
    { label: "Pricing-page-old-10-03-2025", path: "#" },
    { label: "Purchase Orders", path: "#" },
    { label: "Quickbooks Integration", path: "#" },
    { label: "Reporting", path: "#" },
    { label: "Request Form", path: "/contact-us" },
    { label: "Sage Integration", path: "#" },
    { label: "Scheduled Jobs", path: "#" },
    { label: "Search Engine Optimisation", path: "/seo" },
    { label: "SMS / Email Communication", path: "#" },
    { label: "Stock Control", path: "#" },
    { label: "Technician Mobile App Andriod/IOS", path: "#" },
    { label: "Tyres Suppliers Stock and API integrations", path: "#" },
    { label: "Vehicle Sales", path: "#" },
    { label: "Web Bookings", path: "#" },
    { label: "Website For Car Dealer", path: "#" },
    { label: "Workshop Bookings", path: "#" },
    { label: "Workshop Estimates", path: "#" },
    { label: "Xero Integration", path: "#" },
    { label: "About Us", path: "/about-us" },
    { label: "Delivery Information", path: "#" },
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Cookie Policy", path: "/cookie-policy" },
    { label: "Terms & Conditions", path: "/terms-of-service" }
  ];

  const blogLinks = [
    { label: "Garage Management Software Meaning and Importance", path: "/blog" },
    { label: "Everything You Must Know About One of the Best Garage Software in the UK", path: "/blog" },
    { label: "Which is the Best Workshop Management Software in the UK?", path: "/blog" },
    { label: "One in every five pre-owned cars in the UK are selling at prices more than new models", path: "/blog" },
    { label: "Increase in Michelin Tyre Price will Help it to Surpass Pre-pandemic Profits", path: "/blog" },
    { label: "Goodyear Aims to Manufacture Tyres with 100% Sustainable Material by 2030", path: "/blog" },
    { label: "Car Owners Advised to Make Pre-MOT Checks as Tests Set to Rise in March", path: "/blog" },
    { label: "Advantages of Workshop Management Software", path: "/blog" },
    { label: "The Uses and Benefits Of Garage Software", path: "/blog" },
    { label: "What Constitutes Garage Software's Main Features?", path: "/blog" },
    { label: "Workshop Management Software Benefits", path: "/blog" },
    { label: "Let's Have a Deep Yet Brief Insight Into Garage Software!", path: "/blog" },
    { label: "Top Six Reasons for Using Software in Automobile Repair Shop", path: "/blog" },
    { label: "Streamlining Automotive Business Operations with Technology", path: "/blog" },
    { label: "How a Garage Software Can Save Your Hassle", path: "/blog" },
    { label: "Purpose of Automotive Software for Garages", path: "/blog" },
    { label: "Applications and Advantages of Garage Software", path: "/blog" },
    { label: "How Do You Create a Workshop Management Software?", path: "/blog" },
    { label: "What Justifies The Use Of Garage Software?", path: "/blog" },
    { label: "Why Create A Garage Software You Should Know", path: "/blog" },
    { label: "Driving Success: The Benefits of Implementing Garage Software", path: "/blog" },
    { label: "Protecting Client Data in Workshop Management Systems", path: "/blog" },
    { label: "Using Garage Software to Automate Tasks", path: "/blog" },
    { label: "All About the Tools and Features of Garage Management Systems", path: "/blog" },
    { label: "Is Garage Software the right fit for your vehicle?", path: "/blog" },
    { label: "Want to Know About Our Experience with Garage Management Software?", path: "/blog" },
    { label: "Why Is Workshop Management Software Efficient?", path: "/blog" },
    { label: "Does Garage Software Improve Customer Relationship & Competitive Benefits?", path: "/blog" },
    { label: "Automate All The Work Of Your Garage With Workshop Software", path: "/blog" },
    { label: "Bond International Enters Into Tyre Software with Tyresoft Ltd. Acquisition", path: "/blog" },
    { label: "What Role Does Workshop Management System Play in Managing Workshop Workflow?", path: "/blog" }
  ];

  const renderLinkElement = (link, idx) => {
    const isAnchor = link.path.startsWith("#");
    const linkClasses = "hover:text-indigo-400 dark:hover:text-indigo-300 transition-colors leading-relaxed text-gray-300 dark:text-gray-300";

    return (
      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold py-1">
        {/* Bullets styled exactly as solid dark grey dots */}
        <span className="w-2 h-2 rounded-full bg-[#1e73be] shrink-0 mt-1.5" />
        {isAnchor ? (
          <a href={link.path} className={linkClasses}>
            {link.label}
          </a>
        ) : (
          <Link to={link.path} className={linkClasses}>
            {link.label}
          </Link>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#050816] text-white">
      <SEOHeader
        title="Sitemap | Complete Directory"
        description="Quickly find and navigate to any page, product, or information document on the Auto Garage Network portal with our complete HTML directory."
        keywords="sitemap, page directory, website navigation"
        canonicalPath="/sitemap"
      />
      <Navbar />
      <main className="flex-grow pt-20">
        
        {/* Sitemap Hero Header Section */}
        <section className="relative py-20 px-6 md:px-12 overflow-hidden text-center bg-gradient-to-r from-blue-900/40 to-indigo-950/40 border-b border-white/5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#1e73be] bg-indigo-500/10 px-4 py-1.5 rounded-full inline-block mb-4">
              Navigation Index
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 uppercase">
              Sitemap
            </h1>
            <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto px-4 leading-relaxed font-medium">
              Easily navigate across all of our pages, industry segments, features, and resources.
            </p>
          </motion.div>
        </section>

        {/* Sitemap Content Accordions */}
        <section className="py-16 pb-28 px-6 md:px-12 max-w-6xl mx-auto space-y-8">
          
          {/* Accordion 1: Information */}
          <div className="bg-[#0c1222] border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-all">
            <div
              id="accordion-toggle-info"
              role="button"
              tabIndex={0}
              onClick={() => setInfoExpanded(!infoExpanded)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setInfoExpanded(!infoExpanded);
                }
              }}
              className="w-full flex items-center justify-between p-6 md:p-7 text-left hover:bg-white/5 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-none"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg md:text-xl font-bold tracking-tight text-white select-none">
                  Information
                </span>
              </div>
              <div className="text-white bg-white/10 p-2 rounded-xl">
                {infoExpanded ? <FiChevronUp className="w-5 h-5" /> : <FiChevronDown className="w-5 h-5" />}
              </div>
            </div>

            <AnimatePresence initial={false}>
              {infoExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-6 md:p-8 pt-0 border-t border-white/5 bg-[#0a0f24]/20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
                      {infoLinks.map((link, idx) => renderLinkElement(link, idx))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Accordion 2: Blogs */}
          <div className="bg-[#0c1222] border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-all">
            <div
              id="accordion-toggle-blogs"
              role="button"
              tabIndex={0}
              onClick={() => setBlogsExpanded(!blogsExpanded)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setBlogsExpanded(!blogsExpanded);
                }
              }}
              className="w-full flex items-center justify-between p-6 md:p-7 text-left hover:bg-white/5 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-none"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg md:text-xl font-bold tracking-tight text-white select-none">
                  Blogs
                </span>
              </div>
              <div className="text-white bg-white/10 p-2 rounded-xl">
                {blogsExpanded ? <FiChevronUp className="w-5 h-5" /> : <FiChevronDown className="w-5 h-5" />}
              </div>
            </div>

            <AnimatePresence initial={false}>
              {blogsExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-6 md:p-8 pt-0 border-t border-white/5 bg-[#0a0f24]/20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
                      {blogLinks.map((link, idx) => renderLinkElement(link, idx))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Sitemap;
