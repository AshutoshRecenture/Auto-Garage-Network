import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMapPin,
  FiStar,
  FiBarChart2,
  FiSearch,
  FiGlobe,
  FiTrendingUp,
  FiCheckCircle,
  FiPlus,
} from "react-icons/fi";

const SEOSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Simulated reviews count for Tab 1
  const [reviewsCount, setReviewsCount] = useState(12);
  const [showNewReviewAlert, setShowNewReviewAlert] = useState(false);

  // Auto-play interval
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 3);
    }, 6500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Review animation trigger when Tab 1 is active
  useEffect(() => {
    if (activeTab === 1) {
      setReviewsCount(12);
      setShowNewReviewAlert(false);
      const timerCount = setTimeout(() => {
        setReviewsCount(13);
        setShowNewReviewAlert(true);
      }, 2500);
      return () => {
        clearTimeout(timerCount);
      };
    } else {
      setReviewsCount(12);
      setShowNewReviewAlert(false);
    }
  }, [activeTab]);

  const features = [
    {
      title: "Google Business Profile",
      desc: "Sync your reviews and business information directly with Google Maps to show up on local searches.",
      icon: <FiMapPin />,
    },
    {
      title: "Automated Review Collection",
      desc: "Automatically send feedback requests via SMS after a job is completed to build trust online.",
      icon: <FiStar />,
    },
    {
      title: "Optimized Landing Pages",
      desc: "High-converting organic search pages tailored specifically for services like MOT Testing or Diagnostics.",
      icon: <FiGlobe />,
    },
  ];

  const renderGoogleProfile = () => (
    <div className="space-y-4 text-left select-none">
      <div className="flex justify-between items-center border-b border-white/5 pb-3">
        <div className="flex items-center space-x-2 text-blue-400 font-bold text-xs md:text-sm">
          <FiBarChart2 className="w-5 h-5" />
          <span>Local SEO Performance</span>
        </div>
        <div className="text-[9px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20 font-bold shrink-0">
          Last 30 Days
        </div>
      </div>

      {/* Chart Mockup */}
      <div className="bg-[#050816] rounded-xl border border-white/5 p-3.5 mb-1 shrink-0">
        <div className="text-[9px] text-gray-500 uppercase font-black mb-3.5 flex justify-between">
          <span>Search Visibility</span>
          <span className="text-cyan-400 font-black flex items-center gap-1">
            <FiTrendingUp /> +34%
          </span>
        </div>
        <div className="h-24 flex items-end justify-between space-x-2">
          {[30, 45, 40, 60, 55, 80, 75, 100].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
              className={`w-full rounded-t-sm ${i === 7 ? "bg-gradient-to-t from-blue-600 to-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.2)]" : "bg-white/10"}`}
            />
          ))}
        </div>
      </div>

      {/* Google Maps Ranking Mockup */}
      <div className="space-y-2">
        <div className="text-[8px] text-gray-500 uppercase font-black px-1">
          Local Keyword Rankings
        </div>
        {[
          { kw: "MOT near me", pos: 1, change: "+2", color: "text-cyan-400" },
          {
            kw: "Garage services London",
            pos: 2,
            change: "+1",
            color: "text-cyan-400",
          },
          { kw: "Car repair", pos: 4, change: "-1", color: "text-red-400" },
        ].map((row, i) => (
          <div
            key={i}
            className="flex justify-between items-center bg-[#111827] rounded-lg p-2.5 border border-white/5"
          >
            <div className="flex items-center space-x-2.5">
              <FiSearch className="text-gray-500 w-3.5 h-3.5" />
              <span className="text-xs text-gray-300 font-semibold">
                {row.kw}
              </span>
            </div>
            <div className="flex items-center space-x-3 text-[10px] font-extrabold leading-none">
              <div className="text-white">Pos. {row.pos}</div>
              <div className={`w-5 text-right ${row.color}`}>{row.change}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReviewCollection = () => (
    <div className="space-y-4 text-left select-none">
      <div className="flex justify-between items-center border-b border-white/5 pb-3">
        <div className="flex items-center space-x-2 text-blue-400 font-bold text-xs md:text-sm">
          <FiStar className="w-5 h-5 fill-current" />
          <span>Google Reviews Stream</span>
        </div>
        <div className="text-[9px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20 font-bold shrink-0">
          Live Sync
        </div>
      </div>

      {/* Review Feed list */}
      <div className="space-y-2.5 py-0.5 min-h-[220px] flex flex-col justify-center">
        {[
          {
            name: "Sarah J.",
            text: "Excellent service, MOT done in 45 minutes! Highly recommend.",
            rating: 5,
            time: "Just now",
          },
          {
            name: "Emma W.",
            text: "Brilliant diagnostics. Very clear explanation of the issues.",
            rating: 5,
            time: "1 hour ago",
          },
          {
            name: "Alex B.",
            text: "Reliable pricing and quick scheduling. Best garage suite in town.",
            rating: 5,
            time: "1 day ago",
          },
        ].map((rev, i) => {
          const isNew = i === 0 && showNewReviewAlert;
          return (
            <motion.div
              key={i}
              initial={
                isNew ? { opacity: 0, y: 10, scale: 0.95 } : { opacity: 1 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`p-2.5 rounded-xl border text-[7.5px] font-semibold text-gray-300 leading-normal transition-all ${
                isNew
                  ? "bg-blue-600/10 border-blue-500/40 shadow-[0_0_10px_rgba(59,130,246,0.15)]"
                  : "bg-[#111827] border-white/5"
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-white font-black text-[8px]">
                  {rev.name}
                </span>
                <span className="text-gray-500 font-medium text-[7px]">
                  {rev.time}
                </span>
              </div>
              <div className="flex text-yellow-400 mb-1 leading-none">
                {[...Array(rev.rating)].map((_, starIdx) => (
                  <FiStar key={starIdx} className="w-2.5 h-2.5 fill-current" />
                ))}
              </div>
              <p className="text-gray-400">{rev.text}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const renderLandingPages = () => (
    <div className="space-y-4 text-left select-none">
      <div className="flex justify-between items-center border-b border-white/5 pb-3">
        <div className="flex items-center space-x-2 text-blue-400 font-bold text-xs md:text-sm">
          <FiGlobe className="w-5 h-5" />
          <span>Organic Traffic Rankings</span>
        </div>
        <div className="text-[9px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20 font-bold shrink-0">
          Live Search Index
        </div>
      </div>

      {/* Organic Traffic Stats summary */}
      <div className="bg-[#050816] rounded-xl border border-white/5 p-3.5 mb-1 shrink-0 flex items-center justify-between">
        <div>
          <span className="text-[7px] text-gray-500 font-black block uppercase">
            SEO SEARCH GROWTH
          </span>
          <span className="text-lg font-black text-white leading-tight mt-0.5">
            +48.2%
          </span>
          <span className="text-[7px] text-cyan-400 font-bold block">
            Organic traffic increase vs last month
          </span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 shadow-sm shrink-0">
          <FiTrendingUp className="w-6 h-6" />
        </div>
      </div>

      {/* Pages rankings */}
      <div className="space-y-2">
        <div className="text-[8px] text-gray-500 uppercase font-black px-1">
          Organic Services URLs
        </div>
        {[
          {
            page: "/services/mot-testing",
            pos: "Pos. 1",
            note: "Top Organic Rank",
            change: "Stable",
          },
          {
            page: "/services/car-servicing",
            pos: "Pos. 1",
            note: "Top Organic Rank",
            change: "Stable",
          },
          {
            page: "/services/wheel-alignment",
            pos: "Pos. 2",
            note: "Page Rank Clomb",
            change: "+1",
          },
        ].map((row, i) => (
          <div
            key={i}
            className="flex justify-between items-center bg-[#111827] rounded-lg p-2.5 border border-white/5 text-[10px] font-extrabold leading-none"
          >
            <div>
              <span className="text-gray-300 font-semibold block">
                {row.page}
              </span>
              <span className="text-[6.5px] text-gray-500 font-medium block mt-1">
                {row.note}
              </span>
            </div>
            <div className="flex items-center space-x-3 text-right">
              <div className="text-white">{row.pos}</div>
              <div
                className={
                  row.change.startsWith("+") ? "text-cyan-400" : "text-gray-500"
                }
              >
                {row.change}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="seo" className="py-24 px-6 md:px-12 bg-[#050816] relative overflow-hidden">
      {/* Background radial glow recolored from emerald to blue */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column: Interactive Feature Cards */}
          <div className="order-2 md:order-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Dominate{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Local Search Results
                </span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Our built-in SEO tools ensure your garage ranks at the top when
                local customers search for MOTs, servicing, and repairs in your
                area.
              </p>
            </motion.div>

            <div className="hidden md:block space-y-4">
              {features.map((item, idx) => {
                const isActive = idx === activeTab;
                return (
                  <motion.div
                    key={idx}
                    onClick={() => {
                      setActiveTab(idx);
                      setIsAutoPlaying(false);
                    }}
                    whileHover={{ scale: 1.02 }}
                    className={`flex gap-4 p-5 rounded-2xl border cursor-pointer transition-all duration-300 relative overflow-hidden ${
                      isActive
                        ? "bg-[#111827]/80 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                        : "bg-[#111827]/20 border-white/5 hover:bg-[#111827]/40 hover:border-white/10"
                    }`}
                  >
                    {isActive && isAutoPlaying && (
                      <motion.div
                        key={idx}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 6.5, ease: "linear" }}
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 origin-left"
                      />
                    )}

                    <div
                      className={`w-12 h-12 flex-shrink-0 rounded-xl border flex items-center justify-center transition-all ${
                        isActive
                          ? "bg-blue-500/20 border-blue-500/40 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.2)]"
                          : "bg-[#111827] border-white/10 text-gray-500"
                      }`}
                    >
                      {React.cloneElement(item.icon, { className: "w-6 h-6" })}
                    </div>
                    <div>
                      <h3
                        className={`text-xl font-bold transition-all mb-1.5 ${isActive ? "text-blue-400" : "text-white"}`}
                      >
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Visual Mockup Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 md:order-2 relative w-full flex justify-center items-center"
          >
            <div className="absolute inset-0 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none"></div>

            {/* SEO Dashboard Mockup Box recolored from green to blue */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative rounded-2xl border border-white/10 bg-[#0c1222] p-4 shadow-[0_0_40px_rgba(59,130,246,0.12)] z-10 w-full max-w-[500px]"
            >
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    {activeTab === 0 && renderGoogleProfile()}
                    {activeTab === 1 && renderReviewCollection()}
                    {activeTab === 2 && renderLandingPages()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Floating Review Badge recolored borders/buttons */}
            <motion.div
              key={reviewsCount}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 150, damping: 10 }}
              className="absolute -top-6 -right-6 md:-right-8 bg-[#111827] border border-white/10 p-3.5 rounded-xl shadow-2xl glass-panel z-20 flex items-center space-x-3 select-none"
            >
              <div className="flex -space-x-1.5 shrink-0">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border border-[#111827] bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-[9px] font-black text-white shadow-sm shrink-0"
                  >
                    U{i}
                  </div>
                ))}
              </div>
              <div className="text-left pl-1 leading-none">
                <div className="flex text-yellow-400 mb-1 leading-none shrink-0">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="w-2.5 h-2.5 fill-current" />
                  ))}
                </div>
                <div className="text-[9.5px] font-black text-white shrink-0 flex items-center space-x-1.5">
                  <span>{reviewsCount} New Google Reviews</span>
                  {showNewReviewAlert && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/35 px-1 rounded text-[7px] font-black"
                    >
                      +1 New
                    </motion.span>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SEOSection;
