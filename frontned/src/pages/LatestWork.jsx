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
    // 1. CarFix Garage
    if (idx === 0) {
      return (
        <div className="absolute inset-0 flex flex-col justify-between p-3 bg-[#0c1222] text-white">
          <div className="flex items-center justify-between border-b border-white/5 pb-1">
            <span className="text-[9.5px] font-black tracking-wide text-blue-500">
              CarFix <span className="text-yellow-400">Garage</span>
            </span>
            <span className="text-[6px] text-gray-400 font-bold">020 8200 8100</span>
          </div>
          <div className="flex flex-col items-center justify-center my-auto text-center space-y-1">
            <h4 className="text-[7.5px] font-bold text-white leading-tight">
              MOT, Repair, Servicing & Free Quotes
            </h4>
            <div className="flex w-full max-w-[150px] rounded overflow-hidden border border-yellow-500/30">
              <div className="bg-yellow-400 text-black font-black text-[6.5px] px-1.5 py-0.5 flex items-center justify-center">
                ENTER REG
              </div>
              <div className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-[6.5px] py-0.5 flex-grow text-center flex items-center justify-center cursor-pointer">
                QUOTE & BOOK
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-1 text-center">
            {["Tyre Fitting", "Body Repairs", "Car Services", "Book MOT"].map((txt, i) => (
              <span key={i} className="bg-white/5 text-[5.5px] py-0.5 rounded text-gray-300 font-semibold border border-white/5 truncate">
                {txt}
              </span>
            ))}
          </div>
        </div>
      );
    }

    // 2. Kilnhurst Tyres
    if (idx === 1) {
      return (
        <div className="absolute inset-0 flex flex-col justify-between p-3 bg-[#0f1519] text-white">
          <div className="flex items-center justify-between border-b border-white/5 pb-1">
            <span className="text-[9px] font-black uppercase text-emerald-400 tracking-wider">
              KILNHURST <span className="text-white text-[7px]">TYRES</span>
            </span>
            <span className="text-[6px] text-emerald-400 font-bold bg-emerald-500/10 px-1 py-0.2 rounded">EMERGENCY CALL OUT</span>
          </div>
          <div className="my-auto flex flex-col space-y-1">
            <div className="flex justify-between items-center bg-[#172025] rounded p-1.5 border border-white/5">
              <span className="text-[7px] font-extrabold text-emerald-400">TYRE FINDER</span>
              <div className="flex gap-1">
                {["205", "55", "R16"].map((val, i) => (
                  <div key={i} className="bg-slate-900 border border-white/10 rounded px-1 py-0.5 text-[6.5px] text-white flex items-center font-bold">
                    {val}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {["Tyre Fitting", "Mobile Fitting", "Wheel Align"].map((btn, i) => (
              <span key={i} className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[5.5px] py-0.5 rounded text-center font-bold">
                {btn}
              </span>
            ))}
          </div>
        </div>
      );
    }

    // 3. MS Auto Centre Ltd
    if (idx === 2) {
      return (
        <div className="absolute inset-0 flex flex-col justify-between p-3 bg-[#0a0606] text-white">
          <div className="flex items-center justify-between border-b border-white/5 pb-1">
            <span className="text-[9px] font-extrabold text-red-500 flex items-center gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block animate-pulse" />
              MS AUTO CENTRE
            </span>
            <span className="text-[6px] text-gray-500 font-bold">Birmingham</span>
          </div>
          <div className="my-auto text-center space-y-1.5">
            <span className="text-[7.5px] text-gray-300 font-semibold block">MOT & Repair Services</span>
            <div className="flex max-w-[140px] mx-auto rounded overflow-hidden border border-red-600/30">
              <div className="bg-yellow-400 text-black font-black text-[6.5px] w-1/2 px-1 py-0.5 text-center">
                ENTER REG
              </div>
              <div className="bg-red-600 text-white font-black text-[6.5px] flex-grow py-0.5 flex items-center justify-center">
                BOOK ONLINE
              </div>
            </div>
          </div>
          <div className="flex justify-around text-[6px] text-gray-400 border-t border-white/5 pt-1">
            <span>• Tyre Fitting</span>
            <span>• Wheel Balancing</span>
            <span>• MOT Prep</span>
          </div>
        </div>
      );
    }

    // 4. Kingz Automotive
    if (idx === 3) {
      return (
        <div className="absolute inset-0 flex flex-col justify-between p-3 bg-[#0a0a0a] text-white">
          <div className="flex flex-col items-center pt-1 border-b border-white/5 pb-1">
            <span className="text-[9.5px] font-black uppercase text-amber-500 tracking-widest">
              KINGZ CUSTOMZ
            </span>
            <span className="text-[5.5px] font-black text-amber-400/70 tracking-widest uppercase">
              Where Royalty Belongs
            </span>
          </div>
          <div className="my-auto flex gap-1 justify-center">
            <div className="border border-amber-500/25 bg-amber-500/5 rounded p-1 text-center w-16">
              <span className="text-[6px] text-amber-400 block font-black">AUTO CENTRE</span>
              <span className="text-[4px] text-gray-500 uppercase block mt-0.5">Click Here</span>
            </div>
            <div className="border border-amber-500/25 bg-amber-500/5 rounded p-1 text-center w-16">
              <span className="text-[6px] text-amber-400 block font-black">CUSTOMISATION</span>
              <span className="text-[4px] text-gray-500 uppercase block mt-0.5">Click Here</span>
            </div>
          </div>
          <div className="text-center text-[5.5px] font-extrabold text-gray-500 uppercase tracking-wider">
            Beyond Factory Limits
          </div>
        </div>
      );
    }

    // 5. Solent MOT Centre
    if (idx === 4) {
      return (
        <div className="absolute inset-0 flex flex-col justify-between p-3 bg-[#050e1c] text-white">
          <div className="flex items-center justify-between border-b border-white/5 pb-1">
            <span className="text-[9px] font-black tracking-wide text-cyan-400">
              SOLENT MOT CENTRE
            </span>
            <span className="text-[5.5px] text-cyan-400 font-bold bg-cyan-400/10 px-1 py-0.2 rounded">Class 4 & 7</span>
          </div>
          <div className="my-auto text-center space-y-1.5">
            <span className="text-[7.5px] font-semibold text-gray-300">Book MOT & Servicing Online</span>
            <div className="bg-[#0b1b33] border border-cyan-400/20 rounded p-1 flex justify-between items-center max-w-[130px] mx-auto">
              <span className="text-[6px] text-gray-400 font-bold">Select Appointment Slot</span>
              <span className="text-[5.5px] bg-cyan-500 text-white font-extrabold px-1 py-0.2 rounded cursor-pointer">GO</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1 text-center text-[5.5px] text-gray-400 font-bold">
            <span className="bg-[#0c1c30] py-0.5 rounded">MOT Prep</span>
            <span className="bg-[#0c1c30] py-0.5 rounded">Brakes</span>
            <span className="bg-[#0c1c30] py-0.5 rounded">Tyres</span>
          </div>
        </div>
      );
    }

    // 6. Smart MOT
    if (idx === 5) {
      return (
        <div className="absolute inset-0 flex flex-col justify-between p-3 bg-[#08100c] text-white">
          <div className="flex items-center justify-between border-b border-[#1b3528] pb-1">
            <span className="text-[9px] font-black text-green-400 tracking-wide">
              SMART <span className="text-white">MOT</span>
            </span>
            <span className="text-[5.5px] text-green-400 bg-green-500/10 border border-green-500/20 px-1 py-0.2 rounded font-bold">ONLINE DIARY</span>
          </div>
          <div className="my-auto text-center space-y-1">
            <span className="text-[7px] text-gray-400 block font-bold">Search Service by Reg No</span>
            <div className="flex max-w-[130px] mx-auto rounded overflow-hidden border border-green-500/30">
              <div className="bg-yellow-400 text-black text-[6.5px] font-black px-1.5 py-0.5">
                ENTER REG
              </div>
              <div className="bg-green-600 text-white text-[6.5px] font-bold flex-grow py-0.5 flex items-center justify-center">
                Search
              </div>
            </div>
          </div>
          <div className="flex justify-around text-[6px] text-gray-500 border-t border-green-500/10 pt-1">
            <span>• Smart Pricing</span>
            <span>• Diagnostics</span>
          </div>
        </div>
      );
    }

    // 7. Roberts Tyres
    if (idx === 6) {
      return (
        <div className="absolute inset-0 flex flex-col justify-between p-3 bg-[#0f1c12] text-white">
          <div className="flex items-center justify-between border-b border-[#25462c] pb-1">
            <span className="text-[9px] font-black text-emerald-400 tracking-widest flex items-center gap-0.5">
              ROBERTS TYRES
            </span>
            <span className="text-[5.5px] text-emerald-300 font-bold bg-emerald-500/10 px-1 py-0.2 rounded">Mobile Fitting</span>
          </div>
          <div className="my-auto text-center space-y-1">
            <span className="text-[6.5px] font-black text-white bg-emerald-500/20 border border-emerald-500/30 py-0.5 px-1 rounded inline-block uppercase tracking-wider text-center">
              BUY 2+ NEXEN TYRES GET £5 OFF
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1 text-center">
            <span className="bg-[#1b3420] text-emerald-300 text-[6px] font-bold py-0.5 rounded border border-emerald-500/10">
              TYRE FITTING
            </span>
            <span className="bg-[#1b3420] text-emerald-300 text-[6px] font-bold py-0.5 rounded border border-emerald-500/10">
              CAR SERVICES
            </span>
          </div>
        </div>
      );
    }

    // 8. Treadmark Wheels and Tyres
    if (idx === 7) {
      return (
        <div className="absolute inset-0 flex flex-col justify-between p-3 bg-[#061021] text-white">
          <div className="flex items-center justify-between border-b border-[#1b365e] pb-1">
            <span className="text-[9px] font-black tracking-wide text-blue-400">
              TreadMark <span className="text-white text-[7px]">Wheels</span>
            </span>
            <span className="text-[5.5px] text-emerald-400 bg-emerald-500/10 px-1 py-0.2 rounded font-extrabold">25,000+ FITTED</span>
          </div>
          <div className="my-auto text-center space-y-1">
            <span className="text-[7px] font-bold text-gray-300">Premium Tyres & Alloys</span>
            <div className="bg-[#0d2244] border border-[#1b365e] rounded p-1 flex justify-between items-center max-w-[140px] mx-auto">
              <span className="text-[5.5px] text-gray-400">Find tyres by size or reg</span>
              <span className="text-[5.5px] bg-blue-600 text-white font-extrabold px-1 rounded">FIND</span>
            </div>
          </div>
          <div className="flex justify-around text-[5.5px] text-gray-400 border-t border-[#1b365e] pt-1">
            <span>• Alloy Refurb</span>
            <span>• Laser Alignment</span>
          </div>
        </div>
      );
    }
  };

  const getMetricElement = () => {
    if (idx % 3 === 0) {
      return (
        <>
          <FiTrendingUp className="text-emerald-400 w-3.5 h-3.5" />
          <span className="text-emerald-400">{project.metrics}</span>
        </>
      );
    } else if (idx % 3 === 1) {
      return (
        <>
          <FiCheckCircle className="text-purple-400 w-3.5 h-3.5" />
          <span className="text-purple-400">{project.metrics}</span>
        </>
      );
    } else {
      return (
        <>
          <FiGlobe className="text-cyan-400 w-3.5 h-3.5" />
          <span className="text-cyan-400">{project.metrics}</span>
        </>
      );
    }
  };

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6 }}
      className="bg-[#0c1222] border border-white/5 hover:border-white/10 rounded-3xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(99,102,241,0.15)] flex flex-col h-full cursor-pointer transition-all duration-500 group no-underline text-inherit"
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
            <div className="h-3.5 bg-white/5 rounded px-2 text-[6.5px] text-gray-500 flex items-center ml-2 w-44 truncate font-medium">
              {project.displayUrl}
            </div>
          </div>
          {/* Render Mock Interface */}
          <div className="relative w-full h-[calc(100%-20px)]">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              renderMockup()
            )}
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

        <div className="border-t border-white/5 pt-4 flex items-center justify-between text-xs font-extrabold">
          <div className="flex items-center gap-1.5">
            {getMetricElement()}
          </div>
          <FiArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-indigo-400" />
        </div>
      </div>
    </motion.a>
  );
};

const LatestWork = () => {
  const projects = [
    {
      title: "CarFix Garage",
      url: "https://www.carfixgarage.co.uk/",
      displayUrl: "www.carfixgarage.co.uk",
      location: "London, UK",
      features: ["Tyre Fitting", "MOT & Services", "Instant Reg Quote"],
      metrics: "35% Growth in Bookings",
      bgClass: "from-blue-600 to-indigo-800",
      image: "/carfix.png",
    },
    {
      title: "Kilnhurst Tyres",
      url: "https://www.kilnhursttyres.co.uk/",
      displayUrl: "www.kilnhursttyres.co.uk",
      location: "Rotherham, UK",
      features: ["Wheel Alignment", "Mobile Tyre Fitting", "Live Slot Scheduler"],
      metrics: "Ranked #1 Locally for Tyres",
      bgClass: "from-slate-800 to-emerald-950",
      image: "/kilnhurst.png",
    },
    {
      title: "MS Auto Centre Ltd",
      url: "https://www.msautocentreltd.co.uk/",
      displayUrl: "www.msautocentreltd.co.uk",
      location: "Birmingham, UK",
      features: ["MOT & Servicing", "Brakes & Exhausts", "E-Commerce System"],
      metrics: "2.5x Increase in Web Traffic",
      bgClass: "from-red-600 to-neutral-900",
      image: "/msauto.png",
    },
    {
      title: "Kingz Automotive",
      url: "https://www.kingzautomotive.com/",
      displayUrl: "www.kingzautomotive.com",
      location: "London, UK",
      features: ["Custom Wrapping", "Alloy Wheels", "Luxury Tuning Portal"],
      metrics: "180+ High-End Builds Streamlined",
      bgClass: "from-amber-600 via-amber-800 to-stone-950",
      image: "/kingz.png",
    },
    {
      title: "Solent MOT Centre",
      url: "https://www.solentmotcentre.co.uk/",
      displayUrl: "www.solentmotcentre.co.uk",
      location: "Southampton, UK",
      features: ["Class 4 & 7 MOTs", "Vehicle Diagnostics", "Integrated Diary"],
      metrics: "Over 5,000 Bookings Processed",
      bgClass: "from-cyan-600 to-blue-800",
      image: "/solent.png",
    },
    {
      title: "Smart MOT",
      url: "https://www.smartmot.com/",
      displayUrl: "www.smartmot.com",
      location: "Birmingham, UK",
      features: ["Online Slot Booking", "Tyre Finder Widget", "Fleet Logs"],
      metrics: "Zero Double-Bookings",
      bgClass: "from-green-600 to-teal-800",
      image: "/smartmot.png",
    },
    {
      title: "Roberts Tyres",
      url: "https://www.robertstyres.co.uk/",
      displayUrl: "www.robertstyres.co.uk",
      location: "Sleaford, UK",
      features: ["Mobile Fitting", "Nexen Tyres Discount", "Instant VRM Search"],
      metrics: "40% E-Commerce Sales Uplift",
      bgClass: "from-green-500 to-zinc-900",
      image: "/roberts.png",
    },
    {
      title: "Treadmark Wheels and Tyres",
      url: "https://www.treadmarkwheelsandtyres.co.uk/",
      displayUrl: "www.treadmarkwheelsandtyres.co.uk",
      location: "Spalding, UK",
      features: ["Alloy Refurbishment", "Tyre Finder Widget", "Brakes Fitting"],
      metrics: "300+ Google Reviews (4.9 Star)",
      bgClass: "from-blue-700 to-slate-900",
      image: "/treadmark.png",
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
        <section className="relative pt-16 pb-6 px-6 md:px-12 overflow-hidden text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="max-w-4xl mx-auto z-10 relative">
            
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
              Bespoke Websites Crafted for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">
                UK Workshops & Garages
              </span>
            </h1>
            
          </div>
        </section>

        {/* Project Grid */}
        <section className="pt-4 pb-16 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
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
