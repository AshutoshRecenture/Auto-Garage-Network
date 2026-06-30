import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useAnimation,
} from "framer-motion";
import {
  FiPlay,
  FiTrendingUp,
  FiCheckCircle,
  FiStar,
  FiAlertTriangle,
  FiTruck,
  FiClipboard,
  FiUser,
  FiActivity,
} from "react-icons/fi";

// MovingCarsAnimation removed

// Simple number counter using framer-motion
const NumberCounter = ({ target, format }) => {
  const controls = useAnimation();
  const value = useMotionValue(0);
  useEffect(() => {
    controls.start({
      count: Number(target),
      transition: { duration: 1.2, ease: "easeOut" },
    });
  }, [target]);
  return (
    <motion.span
      style={{ opacity: 1, display: "inline-block" }}
      animate={controls}
      onUpdate={(latest) => {
        value.set(latest.count);
      }}
    >
      {format ? format(value.get()) : Math.round(value.get())}
    </motion.span>
  );
};

const HeroSection = () => {
  const containerVariant = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        when: "beforeChildren",
      },
    },
  };

  // Live state values for Hero Dashboard Mockup
  const [scheduledJobs, setScheduledJobs] = useState(37);
  const [todayRevenue, setTodayRevenue] = useState(1240.5);
  const [dayOccupancy, setDayOccupancy] = useState(85);
  const [performanceVal, setPerformanceVal] = useState(18.4);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Active Queue State
  const [queue, setQueue] = useState([
    {
      reg: "LG24 KXD",
      car: "BMW 3-Series",
      service: "Brake Repair",
      status: "In Progress",
      statusColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    },
    {
      reg: "VO68 FJK",
      car: "Tesla Model Y",
      service: "MOT Inspection",
      status: "Queued",
      statusColor: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    },
    {
      reg: "HJ19 LCP",
      car: "Ford Transit",
      service: "Diagnostics",
      status: "Completed",
      statusColor: "text-green-400 bg-green-400/10 border-green-400/20",
    },
  ]);

  // Chart points Y offsets wiggling
  const [cyanPoints, setCyanPoints] = useState([40, 20, 15, 5]);
  const [indigoPoints, setIndigoPoints] = useState([48, 35, 28, 18]);

  // Booking Flow simulation states
  const [selectedSlotIdx, setSelectedSlotIdx] = useState(0);
  const [selectedDateIdx, setSelectedDateIdx] = useState(14); // August 21
  const [bookingBtnState, setBookingBtnState] = useState("normal"); // "normal", "loading", "success"
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobileCheck = window.innerWidth < 768;
    setIsMobile(mobileCheck);
    if (mobileCheck) return;

    // 1. General metrics fluctuation
    const metricsInterval = setInterval(() => {
      // Day occupancy wiggles between 75 and 95
      setDayOccupancy((prev) => {
        const delta = Math.random() > 0.5 ? 5 : -5;
        const next = prev + delta;
        return Math.min(Math.max(next, 70), 100);
      });
      // Performance value wiggles slightly
      setPerformanceVal((prev) => {
        const delta = parseFloat((Math.random() * 0.4 - 0.2).toFixed(1));
        const next = prev + delta;
        return parseFloat(Math.min(Math.max(next, 16.5), 20.5).toFixed(1));
      });
      // SVG Graph wiggling
      setCyanPoints([
        Math.min(Math.max(40 + Math.floor(Math.random() * 8 - 4), 30), 50),
        Math.min(Math.max(20 + Math.floor(Math.random() * 6 - 3), 10), 30),
        Math.min(Math.max(15 + Math.floor(Math.random() * 6 - 3), 5), 25),
        Math.min(Math.max(5 + Math.floor(Math.random() * 4 - 2), 2), 12),
      ]);
      setIndigoPoints([
        Math.min(Math.max(48 + Math.floor(Math.random() * 8 - 4), 38), 58),
        Math.min(Math.max(35 + Math.floor(Math.random() * 6 - 3), 25), 45),
        Math.min(Math.max(28 + Math.floor(Math.random() * 6 - 3), 18), 38),
        Math.min(Math.max(18 + Math.floor(Math.random() * 4 - 2), 10), 25),
      ]);
    }, 4000);

    // 2. Queue automation loop (every 6 seconds progress the jobs)
    const queueInterval = setInterval(() => {
      setQueue((prevQueue) => {
        const nextQueue = [...prevQueue];

        // Find if there is a completed job to remove
        const completedIdx = nextQueue.findIndex(
          (j) => j.status === "Completed",
        );
        if (completedIdx !== -1) {
          // Replace completed job with a new queued job
          const carBrands = [
            "Audi A4",
            "Mercedes A-Class",
            "Nissan Qashqai",
            "VW Golf",
            "Vauxhall Corsa",
            "Kia Sportage",
            "Range Rover",
          ];
          const services = [
            "Oil Service",
            "Tyre Fitting",
            "Suspension",
            "Aircon Regas",
            "Brake Pad Check",
            "Wheel Alignment",
          ];
          const prefixes = ["AB", "KV", "SD", "PX", "TR", "WN", "LD"];
          const suffixes = ["XYZ", "OPQ", "LKM", "WVF", "GHD", "FKD", "JFK"];
          const years = ["20", "21", "22", "23", "24", "68", "72"];

          const randomReg = `${prefixes[Math.floor(Math.random() * prefixes.length)]}${years[Math.floor(Math.random() * years.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
          const randomCar =
            carBrands[Math.floor(Math.random() * carBrands.length)];
          const randomService =
            services[Math.floor(Math.random() * services.length)];

          nextQueue[completedIdx] = {
            reg: randomReg,
            car: randomCar,
            service: randomService,
            status: "Queued",
            statusColor: "text-blue-400 bg-blue-400/10 border-blue-400/20",
          };
          return nextQueue;
        }

        // Find if there is an in progress job to complete
        const inProgressIdx = nextQueue.findIndex(
          (j) => j.status === "In Progress",
        );
        if (inProgressIdx !== -1) {
          nextQueue[inProgressIdx] = {
            ...nextQueue[inProgressIdx],
            status: "Completed",
            statusColor: "text-green-400 bg-green-400/10 border-green-400/20",
          };
          // Also add a little to revenue when a job is completed!
          setTodayRevenue(
            (prev) => prev + parseFloat((Math.random() * 85 + 40).toFixed(2)),
          );
          return nextQueue;
        }

        // Find if there is a queued job to start
        const queuedIdx = nextQueue.findIndex((j) => j.status === "Queued");
        if (queuedIdx !== -1) {
          nextQueue[queuedIdx] = {
            ...nextQueue[queuedIdx],
            status: "In Progress",
            statusColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
          };
          return nextQueue;
        }

        return nextQueue;
      });
    }, 5500);

    // 3. Auto-booking flow scheduler (simulate user booking a slot)
    const bookingFlowTimeout = setInterval(() => {
      // Step 1: Select a random slot
      const nextSlot = Math.floor(Math.random() * 4);
      const nextDate = Math.floor(Math.random() * 21);
      setSelectedSlotIdx(nextSlot);
      setSelectedDateIdx(nextDate);

      // Step 2: Animate click confirm after 2 seconds
      const clickTimer = setTimeout(() => {
        setBookingBtnState("loading");

        // Step 3: Success state after 1 second
        const successTimer = setTimeout(() => {
          setBookingBtnState("success");
          setScheduledJobs((prev) => prev + 1);
          setTodayRevenue((prev) => prev + 45.0); // MOT booking cost added

          // Add MOT job to queue
          setQueue((prev) => {
            const next = [...prev];
            // Replace the completed one first, or if none, replace index 2
            const compIdx = next.findIndex((j) => j.status === "Completed");
            const replaceIdx = compIdx !== -1 ? compIdx : 2;
            next[replaceIdx] = {
              reg: `AGN ${Math.floor(Math.random() * 90 + 10)} MOT`,
              car: "Ford Fiesta",
              service: "MOT Test Only",
              status: "Queued",
              statusColor: "text-blue-400 bg-blue-400/10 border-blue-400/20",
            };
            return next;
          });

          // Step 4: Reset back to normal after 2.5 seconds
          const resetTimer = setTimeout(() => {
            setBookingBtnState("normal");
          }, 2500);

          return () => clearTimeout(resetTimer);
        }, 1000);

        return () => clearTimeout(successTimer);
      }, 2000);

      return () => clearTimeout(clickTimer);
    }, 12000);

    return () => {
      clearInterval(metricsInterval);
      clearInterval(queueInterval);
      clearInterval(bookingFlowTimeout);
    };
  }, []);

  return (
    <section className="relative pt-20 pb-6 md:pt-36 lg:pt-38 md:pb-8 px-6 md:px-12 max-w-7xl mx-auto overflow-visible min-h-0 md:min-h-[68vh] flex items-center">
      <style>{`.three-d{perspective:1200px;transform-style:preserve-3d;transition:transform .4s ease;}
.three-d:hover{transform:rotateX(2deg) rotateY(-2deg) scale(1.01);}`}</style>

      {/* Animated Background Gradients */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full hidden md:block blur-[] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full hidden md:block blur-[] pointer-events-none"
      />

      <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
        {/* Left Column: Content */}
        <motion.div
          className="lg:col-span-6 space-y-5 md:space-y-8 text-left z-10"
          variants={containerVariant}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]"
          >
            Run Your Garage <br className="hidden md:block" />
            Smarter with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
              AGN
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed"
          >
            The premium software choice for modern Workshops, MOT Centres & Tyre
            Specialists. Automate tasks, stream operations, and scale your
            revenue.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <Link to="/garage-management-system">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all cursor-pointer"
              >
                Book Free Demo
              </motion.button>
            </Link>
            <motion.button
              onClick={() => setShowVideoModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-[#111827]/80 backdrop-blur-md hover:bg-[#1f2937] text-white border border-white/10 font-semibold px-8 py-4 rounded-xl transition-all cursor-pointer"
            >
              <FiPlay className="text-indigo-400" />
              <span>Watch Live Demo</span>
            </motion.button>
          </motion.div>




          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center space-x-4 pt-6 border-t border-white/10"
          >
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className="fill-current" />
              ))}
            </div>
            <span className="text-sm text-gray-400">
              Trusted by{" "}
              <span className="text-white font-semibold">2,500+</span> Garages
            </span>
          </motion.div>
        </motion.div>

        {/* Right Column: Visual Mockup */}
        <div className="lg:col-span-6 relative mt-8 lg:mt-0 flex justify-center items-center three-d w-full overflow-visible py-4 lg:py-8">
          <div className="scale-[0.8] xs:scale-[0.88] sm:scale-95 md:scale-100 origin-center relative w-full max-w-[550px] flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.8 }}
              className="relative w-full z-20"
            >
              {/* Desktop Dashboard Mockup (Center-Back) */}
              <div className="relative w-full border border-white/10 rounded-2xl bg-[#0c1222]/90 backdrop-blur-md shadow-2xl z-20 overflow-hidden shadow-indigo-500/10">
                {/* Browser Header Bar */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#050816]/70">
                  <div className="flex space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
                  </div>
                  <div className="text-[9px] text-gray-500 bg-[#111827] px-3 py-0.5 rounded-md border border-white/5 font-mono">
                    autogarage.network/portal
                  </div>
                  <div className="w-12 h-2" />
                </div>

                {/* Dashboard Content */}
                <div className="flex h-[280px] md:h-[320px] text-gray-300 font-sans select-none">
                  {/* Left Sidebar */}
                  <div className="w-[24%] border-r border-white/5 bg-[#060a17]/80 p-2.5 flex flex-col justify-between">
                    <div className="space-y-3">
                      {/* Logo */}
                      <div className="flex items-center space-x-1.5 px-1 py-0.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="text-[8px] font-black tracking-widest text-cyan-400 uppercase">
                          AGN-OS
                        </span>
                      </div>
                      {/* Navigation Items */}
                      <div className="space-y-1.5">
                        {[
                          { name: "Dashboard", active: true },
                          { name: "Bookings", active: false },
                          { name: "Maintenance", active: false },
                          { name: "Fleet", active: false },
                          { name: "Inventory", active: false },
                        ].map((item, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center space-x-2 px-2 py-1.5 rounded-md text-[8px] font-bold ${
                              item.active
                                ? "bg-white/5 text-white border-l border-cyan-400"
                                : "text-gray-500 hover:text-gray-400"
                            }`}
                          >
                            <span
                              className={`w-1 h-1 rounded-full ${item.active ? "bg-cyan-400" : "bg-gray-700"}`}
                            />
                            <span>{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Profile */}
                    <div className="flex items-center space-x-2 bg-[#0b0f1d]/60 border border-white/5 rounded-lg p-1.5">
                      <div className="w-4 h-4 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[6px] font-bold text-white">
                        AR
                      </div>
                      <div className="leading-none hidden md:block">
                        <span className="text-[6.5px] text-white font-bold block">
                          Alex R.
                        </span>
                        <span className="text-[5px] text-gray-500 block">
                          Admin
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Main View */}
                  <div className="flex-1 bg-[#030611] p-3 flex flex-col justify-between overflow-hidden">
                    {/* Header Stat row */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-slate-900/80 border border-white/5 rounded-lg p-2 flex flex-col justify-center">
                        <span className="text-[6.5px] text-gray-500 font-bold uppercase tracking-wider">
                          Scheduled Jobs
                        </span>
                        <span className="text-[10px] md:text-[11px] font-black text-white mt-0.5">
                          {scheduledJobs}{" "}
                          <span className="text-[6.5px] text-gray-400 font-normal">
                            this month
                          </span>
                        </span>
                      </div>
                      <div className="bg-slate-900/80 border border-white/5 rounded-lg p-2 flex flex-col justify-center">
                        <span className="text-[6.5px] text-gray-500 font-bold uppercase tracking-wider">
                          Today's Revenue
                        </span>
                        <span className="text-[10px] md:text-[11px] font-black text-green-400 mt-0.5">
                          £
                          {todayRevenue.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                      <div className="bg-slate-900/80 border border-white/5 rounded-lg p-2 flex flex-col justify-center">
                        <span className="text-[6.5px] text-gray-500 font-bold uppercase tracking-wider">
                          Day Occupancy
                        </span>
                        <span className="text-[10px] md:text-[11px] font-black text-cyan-400 mt-0.5">
                          {dayOccupancy}%
                        </span>
                      </div>
                    </div>

                    {/* Center content: List table & Mini Scheduler Calendar */}
                    <div className="flex-grow grid grid-cols-12 gap-2 mt-2">
                      {/* Table list */}
                      <div className="col-span-8 bg-[#060a17]/60 border border-white/5 rounded-lg p-2 flex flex-col">
                        <div className="flex justify-between items-center pb-1.5 border-b border-white/5">
                          <span className="text-[7px] text-gray-400 font-bold">
                            Active Customer Queue
                          </span>
                          <span className="text-[6px] text-indigo-400 font-semibold cursor-pointer hover:underline">
                            View All
                          </span>
                        </div>
                        <div className="space-y-1.5 mt-1.5">
                          {queue.map((row, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between text-[7px] bg-[#0b1021]/60 p-1.5 rounded border border-white/5"
                            >
                              <div className="flex items-center space-x-1.5">
                                <span className="px-1 py-0.5 bg-yellow-400/10 text-yellow-500 rounded text-[6px] font-bold border border-yellow-500/20">
                                  {row.reg}
                                </span>
                                <span className="text-white font-semibold truncate max-w-[50px]">
                                  {row.car}
                                </span>
                              </div>
                              <span className="text-gray-400 truncate max-w-[45px]">
                                {row.service}
                              </span>
                              <span
                                className={`px-1 rounded-full text-[5.5px] font-bold border ${row.statusColor}`}
                              >
                                {row.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Mini Calendar scheduler */}
                      <div className="col-span-4 bg-[#060a17]/60 border border-white/5 rounded-lg p-2 flex flex-col justify-between">
                        <span className="text-[7px] text-gray-400 font-bold pb-1 border-b border-white/5">
                          Calendar
                        </span>
                        {/* Calendar grid representation */}
                        <div className="grid grid-cols-7 gap-0.5 mt-1 text-center text-[5.5px]">
                          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                            <span
                              key={i}
                              className="text-gray-600 font-black text-[5px]"
                            >
                              {d}
                            </span>
                          ))}
                          {[...Array(21)].map((_, i) => {
                            const isSelected = i === selectedDateIdx;
                            const isToday = i === 12; // highlight day 13
                            return (
                              <span
                                key={i}
                                className={`w-3 h-3 flex items-center justify-center rounded-full mx-auto transition-all duration-300 ${
                                  isSelected
                                      ? "bg-indigo-600 text-white font-bold shadow-sm"
                                    : isToday
                                      ? "bg-cyan-500 text-white font-bold"
                                      : "text-gray-400"
                                }`}
                              >
                                {i + 1}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[6.5px] text-gray-500 font-bold">
                        AGN SYSTEM VERSION 4.2.1
                      </span>
                      <div className="flex space-x-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[6.5px] text-green-400 font-bold">
                          Database Connected
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Mobile Booking Panel (Front-Left) */}
              <motion.div
                initial={{ y: 0 }}
                animate={isMobile ? { y: 0 } : { y: [-5, 5, -5] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -left-4 xs:-left-8 sm:-left-12 lg:-left-16 bottom-2 sm:bottom-4 md:bottom-6 z-30 w-[140px] xs:w-[160px] sm:w-[175px] md:w-[185px] rounded-[28px] border border-white/10 bg-[#070c18] p-3 shadow-2xl drop-shadow-[0_0_20px_rgba(79,70,229,0.2)]"
                style={{ willChange: "transform" }}
              >
                {/* Status Bar */}
                <div className="flex justify-between items-center text-gray-400 text-[6.5px] px-2 pb-2 select-none">
                  <span>10:42</span>
                  <div className="flex space-x-1">
                    <span>5G</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Header */}
                <div className="flex items-center space-x-1 bg-white/5 rounded-xl px-2 py-1 border border-white/5 mb-3 select-none">
                  <div className="w-3.5 h-3.5 rounded-full bg-indigo-500 flex items-center justify-center text-[7px] text-white">
                    S
                  </div>
                  <span className="text-[8px] text-white font-black">
                    AGN Booking
                  </span>
                </div>

                {/* Title */}
                <div className="text-center mb-2 select-none">
                  <span className="text-[8px] text-gray-400 block font-semibold">
                    Select Date & Time
                  </span>
                </div>

                {/* Calendar mini grid */}
                <div className="bg-[#0b1021] border border-white/5 rounded-xl p-2 mb-2 select-none">
                  <div className="flex justify-between items-center text-[7px] text-white font-bold mb-1 pb-1 border-b border-white/5">
                    <span>August 2026</span>
                  </div>
                  <div className="grid grid-cols-7 gap-0.5 text-[6px] text-center text-gray-400">
                    {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                      <span
                        key={i}
                        className="text-gray-600 font-black text-[5.5px]"
                      >
                        {d}
                      </span>
                    ))}
                    {[...Array(21)].map((_, i) => {
                      const isSelected = i === selectedDateIdx;
                      return (
                        <span
                          key={i}
                          className={`w-3.5 h-3.5 flex items-center justify-center rounded-full mx-auto transition-all duration-300 ${
                            isSelected
                              ? "bg-indigo-600 text-white font-bold"
                              : ""
                          }`}
                        >
                          {i + 7}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Time slots */}
                <div className="grid grid-cols-2 gap-1 mb-3 select-none">
                  {["10:00 AM", "11:30 AM", "02:15 PM", "03:45 PM"].map(
                    (t, i) => (
                      <div
                        key={i}
                        className={`text-[6.5px] font-bold text-center py-1.5 rounded-md border transition-all duration-300 ${
                          i === selectedSlotIdx
                            ? "bg-indigo-600/25 border-indigo-500 text-white"
                            : "bg-white/5 border-white/5 text-gray-400"
                        }`}
                      >
                        {t}
                      </div>
                    ),
                  )}
                </div>

                {/* Button */}
                <button
                  className={`w-full font-bold py-1.5 rounded-xl text-[8px] transition-colors shadow-lg cursor-pointer ${
                    bookingBtnState === "success"
                      ? "bg-green-600 hover:bg-green-500 text-white shadow-green-600/30"
                      : bookingBtnState === "loading"
                        ? "bg-indigo-800 text-indigo-300 shadow-indigo-600/10"
                        : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30"
                  }`}
                >
                  {bookingBtnState === "success"
                    ? "BOOKING CONFIRMED ✓"
                    : bookingBtnState === "loading"
                      ? "PROCESSING..."
                      : "CONFIRM BOOKING"}
                </button>
              </motion.div>

              {/* Floating Analytics Card (Front-Right) */}
              <motion.div
                initial={{ y: 0 }}
                animate={isMobile ? { y: 0 } : { y: [5, -5, 5] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-2 xs:-right-4 sm:-right-8 lg:-right-10 top-[-10px] sm:top-[-20px] md:top-[-30px] z-30 w-[140px] xs:w-[160px] sm:w-[175px] md:w-[195px] rounded-xl border border-white/10 bg-[#070c18] p-3 shadow-2xl drop-shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                style={{ willChange: "transform" }}
              >
                {/* Card Header */}
                <div className="flex justify-between items-center border-b border-white/5 pb-2 select-none">
                  <div>
                    <span className="text-[6px] text-gray-500 block font-bold uppercase tracking-wider">
                      System Analytics
                    </span>
                    <span className="text-[9px] text-white font-black">
                      Performance
                    </span>
                  </div>
                  <span className="text-[7px] text-green-400 font-bold bg-green-500/10 border border-green-500/20 px-1 py-0.5 rounded">
                    +{performanceVal}%
                  </span>
                </div>

                {/* Graph legend */}
                <div className="flex space-x-2 my-2 text-[6px] text-gray-400 select-none">
                  <div className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Gross Revenue</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    <span>Net Income</span>
                  </div>
                </div>

                {/* SVG Graph illustration */}
                <div className="h-16 flex items-end select-none">
                  <svg
                    viewBox="0 0 160 60"
                    className="w-full h-full overflow-visible"
                  >
                    {/* Grid lines */}
                    <line
                      x1="0"
                      y1="15"
                      x2="160"
                      y2="15"
                      stroke="rgba(255,255,255,0.03)"
                      strokeWidth="0.5"
                    />
                    <line
                      x1="0"
                      y1="30"
                      x2="160"
                      y2="30"
                      stroke="rgba(255,255,255,0.03)"
                      strokeWidth="0.5"
                    />
                    <line
                      x1="0"
                      y1="45"
                      x2="160"
                      y2="45"
                      stroke="rgba(255,255,255,0.03)"
                      strokeWidth="0.5"
                    />

                    {/* Path 1: Gross Revenue (Cyan) */}
                    <motion.path
                      d={`M 0 50 Q 30 ${cyanPoints[0]} 60 ${cyanPoints[1]} T 120 ${cyanPoints[2]} T 160 ${cyanPoints[3]}`}
                      fill="none"
                      stroke="#22d3ee"
                      strokeWidth="1.5"
                      animate={{
                        d: `M 0 50 Q 30 ${cyanPoints[0]} 60 ${cyanPoints[1]} T 120 ${cyanPoints[2]} T 160 ${cyanPoints[3]}`,
                      }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                    {/* Path 2: Net Income (Indigo) */}
                    <motion.path
                      d={`M 0 55 Q 30 ${indigoPoints[0]} 60 ${indigoPoints[1]} T 120 ${indigoPoints[2]} T 160 ${indigoPoints[3]}`}
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="1.5"
                      animate={{
                        d: `M 0 55 Q 30 ${indigoPoints[0]} 60 ${indigoPoints[1]} T 120 ${indigoPoints[2]} T 160 ${indigoPoints[3]}`,
                      }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />

                    {/* Points */}
                    <motion.circle
                      cx="60"
                      cy={cyanPoints[1]}
                      r="2"
                      fill="#22d3ee"
                      animate={{ cy: cyanPoints[1] }}
                      transition={{ duration: 1.5 }}
                    />
                    <motion.circle
                      cx="120"
                      cy={indigoPoints[2]}
                      r="2"
                      fill="#6366f1"
                      animate={{ cy: indigoPoints[2] }}
                      transition={{ duration: 1.5 }}
                    />
                  </svg>
                </div>

                {/* Months X-Axis */}
                <div className="flex justify-between text-[6px] text-gray-500 mt-2 font-bold px-1 select-none">
                  <span>Dec</span>
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Video Modal Popup */}
      {showVideoModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={() => setShowVideoModal(false)}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-4xl bg-[#0c1222] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar / Close button */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#070c18]">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Auto Garage Network - Live Demo</h3>
              <button 
                onClick={() => setShowVideoModal(false)}
                className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Video container */}
            <div className="aspect-video w-full bg-black">
              <video 
                src="https://res.cloudinary.com/n4okswsd/video/upload/v1782238075/agn_short_intro_1.mp4"
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
