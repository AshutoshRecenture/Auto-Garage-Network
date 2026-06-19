import React, { useState } from "react";
import SEOHeader from "../components/SEOHeader.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import PartnerLogos from "../components/PartnerLogos.jsx";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiExternalLink,
  FiMonitor,
  FiSmartphone,
  FiActivity,
  FiSearch,
  FiCalendar,
  FiCheckCircle,
  FiTrendingUp,
  FiClock,
  FiSliders,
  FiArrowRight,
  FiGlobe,
} from "react-icons/fi";

const ProjectCard = ({ project, idx }) => {
  const [isHovered, setIsHovered] = useState(false);

  const renderMockup = () => {
    // 1. APEX TYRES & AUTOCENTRE - Tyre Finder Selector Widget
    if (idx === 0) {
      return (
        <div className="absolute inset-0 flex flex-col justify-between p-4 bg-[#0a0f24]/90">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-[9px] font-black uppercase text-indigo-400 tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
              Tyre Search Live
            </span>
            <div className="flex gap-1">
              <div className="w-6 h-3 rounded-full bg-white/5 text-[7px] text-center font-bold text-gray-500">Size</div>
              <div className="w-6 h-3 rounded-full bg-indigo-500/20 text-[7px] text-center font-bold text-indigo-400">VRM</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1.5 my-auto">
            {["Width", "Profile", "Rim"].map((label, i) => (
              <div key={i} className="flex flex-col text-left">
                <span className="text-[6.5px] text-gray-500 font-extrabold uppercase mb-0.5">{label}</span>
                <div className="bg-slate-950 border border-white/10 rounded px-1.5 py-1 text-[8px] text-white/80 flex justify-between items-center">
                  <span>{i === 0 ? "205" : i === 1 ? "55" : "R16"}</span>
                  <span className="text-[6px] text-gray-600">▼</span>
                </div>
              </div>
            ))}
          </div>

          <motion.button
            animate={isHovered ? {
              scale: [1, 1.03, 1],
              boxShadow: "0 0 10px rgba(99, 102, 241, 0.4)",
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-full bg-indigo-600 text-white rounded py-1 text-[9px] font-bold flex items-center justify-center gap-1 shadow-md"
          >
            <FiSearch size={8} />
            <span>Search Tyres</span>
          </motion.button>
        </div>
      );
    }

    // 2. MELTON MOWBRAY MOT CLINIC - Calendar Scheduler Grid
    if (idx === 1) {
      return (
        <div className="absolute inset-0 flex flex-col justify-between p-4 bg-[#090b16]/90">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-[9px] font-black uppercase text-purple-400 tracking-wider flex items-center gap-1">
              <FiCalendar size={9} />
              MOT Booking Calendar
            </span>
            <span className="text-[7px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-1.5 py-0.5 rounded font-black">
              LIVE SLOTS
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 my-auto">
            {[
              { time: "09:00", status: "booked" },
              { time: "10:30", status: "available" },
              { time: "12:00", status: "booked" },
              { time: "13:30", status: "available" },
              { time: "15:00", status: "available" },
              { time: "16:30", status: "booked" },
            ].map((slot, i) => (
              <motion.div
                key={i}
                animate={isHovered && slot.status === "available" ? {
                  borderColor: ["rgba(168,85,247,0.2)", "rgba(168,85,247,0.7)", "rgba(168,85,247,0.2)"],
                } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                className={`rounded border p-1 text-center flex flex-col justify-center ${
                  slot.status === "booked"
                    ? "bg-white/[0.02] border-white/5 text-gray-600"
                    : "bg-purple-500/5 border-purple-500/20 text-purple-400 cursor-pointer hover:bg-purple-500/15"
                }`}
              >
                <span className="text-[8px] font-bold">{slot.time}</span>
                <span className="text-[5.5px] font-extrabold uppercase mt-0.5 tracking-wider">
                  {slot.status === "booked" ? "FULL" : "BOOK"}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      );
    }

    // 3. MIDLAND CAR REPAIRS - Diagnostics Report & Tracking
    if (idx === 2) {
      return (
        <div className="absolute inset-0 flex flex-col justify-between p-4 bg-[#0a0615]/95">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-[9px] font-black uppercase text-pink-400 tracking-wider flex items-center gap-1">
              <FiCheckCircle size={9} />
              Vehicle Diagnosis
            </span>
            <span className="text-[7.5px] text-gray-500 font-extrabold uppercase tracking-wide">
              Job #4829
            </span>
          </div>

          <div className="flex flex-col gap-1.5 my-auto text-left">
            {[
              { label: "Engine Diagnostic Scan", status: "Done" },
              { label: "Brake Wear System Check", status: "Done" },
              { label: "Digital Invoice Generated", status: "Pending" },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center bg-white/[0.02] border border-white/5 rounded p-1">
                <span className="text-[7.5px] text-gray-300 font-semibold">{item.label}</span>
                <div className="flex items-center gap-1">
                  <motion.div
                    animate={isHovered ? {
                      scale: [1, 1.2, 1],
                    } : {}}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                    className={`w-1.5 h-1.5 rounded-full ${item.status === "Done" ? "bg-emerald-500" : "bg-amber-500"}`}
                  />
                  <span className={`text-[6.5px] font-black uppercase ${item.status === "Done" ? "text-emerald-400" : "text-amber-400"}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6 }}
      className="bg-[#0c1222] border border-white/5 hover:border-white/10 rounded-3xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(99,102,241,0.15)] flex flex-col h-full cursor-pointer transition-all duration-500 group"
    >
      {/* Mock screenshot representation */}
      <div className={`aspect-[1.55] bg-gradient-to-tr ${project.bgClass} p-4 flex flex-col justify-between relative overflow-hidden`}>
        {/* Glow behind the frame */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
        
        <div className="flex justify-between items-center z-10">
          <span className="text-[9px] font-black uppercase tracking-wider bg-black/50 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full backdrop-blur-md">
            {project.location}
          </span>
          <div className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 text-white/70 hover:text-white transition-colors">
            <FiExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Embedded Site Preview Container */}
        <div className="relative aspect-[1.9] w-full rounded-xl border border-white/10 overflow-hidden shadow-2xl z-10 mt-3 flex-grow bg-slate-950">
          {/* Browser header */}
          <div className="h-5 bg-[#0b1021] border-b border-white/5 flex items-center px-2.5 gap-1 shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f56]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#27c93f]" />
            <div className="h-3.5 bg-white/5 rounded px-2 text-[6.5px] text-gray-500 flex items-center ml-2 w-32 truncate font-medium">
              {project.title.toLowerCase().replace(/\s+/g, "")}.co.uk
            </div>
          </div>
          {/* Render Mock Interface */}
          <div className="relative w-full h-[calc(100%-20px)]">
            {renderMockup()}
          </div>
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
        <div>
          <h3 className="text-xl font-extrabold text-white group-hover:text-indigo-400 transition-colors leading-tight">{project.title}</h3>
          <div className="flex flex-wrap gap-1.5 mt-3.5">
            {project.features.map((feat, i) => (
              <span
                key={i}
                className="text-[10px] font-bold bg-white/5 hover:bg-indigo-500/10 text-gray-400 hover:text-indigo-400 border border-white/5 hover:border-indigo-500/20 px-2.5 py-1 rounded-md transition-colors duration-300"
              >
                {feat}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-white/5 pt-4 flex items-center justify-between text-xs text-indigo-400 font-extrabold">
          <div className="flex items-center gap-1.5">
            {idx === 0 ? <FiTrendingUp className="text-emerald-400" /> : idx === 1 ? <FiCheckCircle className="text-purple-400" /> : <FiClock className="text-pink-400" />}
            <span className={idx === 0 ? "text-emerald-400" : idx === 1 ? "text-purple-400" : "text-pink-400"}>
              {project.metrics}
            </span>
          </div>
          <FiArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </div>
      </div>
    </motion.div>
  );
};

const LatestWork = () => {
  const projects = [
    {
      title: "Apex Tyres & Autocentre",
      location: "London, UK",
      features: ["Filter-Specific Tyre Booking", "Autotech VRM Integration", "SMS Alerts"],
      metrics: "25% Increase in Online bookings",
      bgClass: "from-blue-600 to-indigo-700",
    },
    {
      title: "Melton Mowbray MOT Clinic",
      location: "Leicestershire, UK",
      features: ["Live Booking Calendar", "MOT Database Sync", "Service Reminders"],
      metrics: "Zero booking conflicts over 12 months",
      bgClass: "from-indigo-600 to-purple-700",
    },
    {
      title: "Midland Car Repairs",
      location: "Birmingham, UK",
      features: ["Live Diagnostic Pricing", "Courtesy Fleet logs", "E-invoices"],
      metrics: "Reclaimed 14 management hours weekly",
      bgClass: "from-purple-600 to-pink-700",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#050816] text-white">
      <SEOHeader
        title="Our Work & Case Studies | Successful Garages"
        description="See real success stories and custom e-commerce websites and mobile apps we've launched for independent workshops, MOT centres, and tyre brands across the UK."
        keywords="garage website portfolio, case studies workshop apps, success stories"
        canonicalPath="/latest-work"
      />
      <Navbar />
      <main className="flex-grow pt-24">
        {/* Banner */}
        <section className="relative py-24 px-6 md:px-12 overflow-hidden text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="max-w-4xl mx-auto z-10 relative">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-4 py-1.5 rounded-full inline-block mb-6">
              Our Portfolio
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
              Bespoke Websites Crafted for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">
                UK Workshops & Garages
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Explore some of the dynamic, high-performance websites we've deployed. Built to scale your business, rank on Google, and drive booking conversions.
            </p>
          </div>
        </section>

        {/* Project Grid */}
        <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <ProjectCard key={idx} project={project} idx={idx} />
            ))}
          </div>
        </section>

        {/* Partners */}
        <PartnerLogos />
      </main>
      <Footer />
    </div>
  );
};

export default LatestWork;
