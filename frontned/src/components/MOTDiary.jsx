import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCalendar,
  FiClock,
  FiCheck,
  FiMail,
  FiMessageSquare,
  FiRefreshCw,
  FiAlertTriangle,
  FiSearch,
  FiCheckCircle,
} from "react-icons/fi";

const MOTDiary = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // States for Feature 0 (SMS simulation)
  const [smsSent, setSmsSent] = useState(false);
  const [smsConfirmed, setSmsConfirmed] = useState(false);

  // States for Feature 1 (DVSA API lookup)
  const [dvsaStep, setDvsaStep] = useState(0); // 0: scanning, 1: results

  // Auto-play interval
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 6500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Sync sub-animations to feature changes
  useEffect(() => {
    if (activeFeature === 0) {
      setSmsSent(false);
      setSmsConfirmed(false);
      const t1 = setTimeout(() => setSmsSent(true), 1200);
      const t2 = setTimeout(() => setSmsConfirmed(true), 3200);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    } else if (activeFeature === 1) {
      setDvsaStep(0);
      const timer = setTimeout(() => setDvsaStep(1), 2400);
      return () => clearTimeout(timer);
    }
  }, [activeFeature]);

  const features = [
    {
      icon: <FiMessageSquare className="w-5 h-5" />,
      title: "Automated SMS & Email Reminders",
      desc: "Reduce no-shows by automatically notifying customers before their MOT is due.",
    },
    {
      icon: <FiRefreshCw className="w-5 h-5" />,
      title: "DVSA Integration for MOT History",
      desc: "Instantly retrieve full DVSA records and advisory safety issues on any registration plate.",
    },
    {
      icon: <FiCalendar className="w-5 h-5" />,
      title: "Drag-and-Drop Scheduling",
      desc: "Reallocate days, reschedule slots, and optimize your diary grid in real-time.",
    },
    {
      icon: <FiClock className="w-5 h-5" />,
      title: "Live Day Availability",
      desc: "Monitor diagnostic checks and ramp load percentages with real-time feedback indicators.",
    },
  ];

  const renderDVSALookup = () => (
    <div className="space-y-4 select-none min-h-[190px]">
      {/* API Lookup Header */}
      <div className="flex justify-between items-center border-b border-white/5 pb-3 shrink-0">
        <div className="flex items-center space-x-2">
          <FiRefreshCw className="w-4 h-4 text-blue-400 animate-spin" />
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            DVSA Live API Gateway
          </h4>
        </div>
        <span className="text-[7.5px] bg-blue-500/10 border border-blue-500/30 text-blue-400 px-1.5 py-0.5 rounded font-black shrink-0">
          CONNECTED
        </span>
      </div>

      {dvsaStep === 0 ? (
        /* Scanning Screen */
        <div className="py-6 flex flex-col items-center justify-center space-y-4 relative overflow-hidden h-[135px]">
          <span className="text-[7.5px] text-gray-500 font-extrabold uppercase tracking-widest">
            Scanning Registration Plate
          </span>

          {/* Licence Plate */}
          <div className="bg-amber-400 border-2 border-slate-950 rounded-md px-6 py-2 shadow-lg relative overflow-hidden h-11 w-[200px] flex items-center justify-center shrink-0">
            <div className="absolute left-0 top-0 bottom-0 w-4.5 bg-blue-600 flex flex-col items-center justify-center text-white text-[5px] leading-none shrink-0 font-bold">
              <span>GB</span>
            </div>
            <span className="text-slate-900 font-black tracking-widest text-sm uppercase pl-3 select-none">
              AB12 CDE
            </span>

            {/* Animated scan bar */}
            <motion.div
              animate={{
                top: ["0%", "100%", "0%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_8px_#22d3ee] pointer-events-none"
            />
          </div>

          <div className="text-[7.5px] text-gray-400 font-bold flex items-center space-x-1.5">
            <FiSearch className="animate-pulse" />
            <span>Querying DVSA vehicle registry databases...</span>
          </div>
        </div>
      ) : (
        /* Results Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-2.5 py-0.5 h-[135px] overflow-y-auto text-left"
        >
          {/* Vehicle Card */}
          <div className="bg-[#111827] border border-white/5 p-2 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[6.5px] text-gray-500 font-extrabold block uppercase">
                VEHICLE DETAILS
              </span>
              <span className="text-[10px] font-black text-white block leading-tight">
                FORD FOCUS 1.6L ECOBOOST
              </span>
              <span className="text-[7.5px] text-purple-400 font-bold">
                Blue • Hatchback • 2018
              </span>
            </div>
            <div className="bg-amber-400 border border-slate-950 rounded text-slate-950 font-black text-[9px] px-2 py-0.5 select-none shrink-0">
              AB12 CDE
            </div>
          </div>

          {/* MOT Expiry and Status */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#111827] border border-white/5 p-1.5 rounded-lg text-center flex flex-col justify-center">
              <span className="text-[6px] text-gray-500 font-extrabold block uppercase">
                MOT STATUS
              </span>
              <span className="text-[8.5px] text-green-400 font-black uppercase flex items-center justify-center mt-0.5">
                ✓ PASSED
              </span>
            </div>
            <div className="bg-[#111827] border border-white/5 p-1.5 rounded-lg text-center flex flex-col justify-center">
              <span className="text-[6px] text-gray-500 font-extrabold block uppercase">
                MOT EXPIRY
              </span>
              <span className="text-[8.5px] text-white font-black block mt-0.5">
                24 Oct 2027
              </span>
            </div>
          </div>

          {/* Advisories list */}
          <div className="bg-[#111827] border border-white/5 p-2 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-[7px] text-gray-400 font-bold border-b border-white/5 pb-1">
              <span>⚠️ ACTIVE DVSA ADVISORIES</span>
              <span className="text-amber-400 font-black text-[6.5px]">
                2 WARNINGS
              </span>
            </div>
            <div className="space-y-0.5 text-[7px] font-semibold text-gray-400 leading-tight">
              <div className="flex items-start space-x-1 text-amber-300">
                <FiAlertTriangle className="shrink-0 w-2.5 h-2.5 mt-0.5" />
                <span>Nearside front tyre close to legal limit (2.1mm)</span>
              </div>
              <div className="flex items-start space-x-1 text-amber-300">
                <FiAlertTriangle className="shrink-0 w-2.5 h-2.5 mt-0.5" />
                <span>Offside rear brake pads wearing thin (3.0mm)</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );

  const renderDiaryGrid = () => {
    const rows = [
      {
        time: "09:00",
        bookings: [
          {
            day: 1,
            type: "Service",
            color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
          },
          { day: 2, empty: true },
          {
            day: 3,
            type: "Tyres",
            color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
          },
          {
            day: 4,
            type: "MOT",
            color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
          },
        ],
      },
      {
        time: "10:00",
        bookings: [
          {
            day: 1,
            type: "Service",
            color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
          },
          {
            day: 2,
            type: "Diagnostics",
            color: "bg-red-500/20 text-red-400 border-red-500/30",
            isDragSource: true,
          },
          { day: 3, empty: true },
          { day: 4, empty: true },
        ],
      },
      {
        time: "11:00",
        bookings: [
          { day: 1, empty: true },
          {
            day: 2,
            type: "Diagnostics",
            color: "bg-red-500/20 text-red-400 border-red-500/30",
          },
          {
            day: 3,
            type: "Brakes",
            color: "bg-orange-500/20 text-orange-400 border-orange-500/30",
            isDragTarget: true,
          },
          {
            day: 4,
            type: "MOT",
            color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
          },
        ],
      },
    ];

    return (
      <div className="space-y-2 select-none relative min-h-[190px]">
        {/* Time header */}
        <div className="grid grid-cols-5 gap-2 mb-3 text-center text-[8.5px] text-gray-400 font-bold uppercase tracking-wider border-b border-white/5 pb-2 shrink-0">
          <div>Time</div>
          <div>Day 1</div>
          <div>Day 2</div>
          <div>Day 3</div>
          <div>Day 4 (MOT)</div>
        </div>

        {rows.map((row, idx) => (
          <div key={idx} className="grid grid-cols-5 gap-2 items-stretch h-12">
            <div className="flex items-center justify-center text-[9px] text-gray-500 font-extrabold border-r border-white/5 pr-1.5 shrink-0">
              {row.time}
            </div>

            {row.bookings.map((b, i) => {
              if (activeFeature === 3) {
                if (b.empty) {
                  return (
                    <div
                      key={i}
                      className="rounded-md border border-emerald-500/30 border-dashed bg-emerald-500/5 flex items-center justify-center text-[7px] font-black text-emerald-400 animate-pulse relative h-full"
                    >
                      <span>🟢 Free</span>
                    </div>
                  );
                } else {
                  const progressWidth =
                    b.type === "MOT"
                      ? "95%"
                      : b.type === "Service"
                        ? "80%"
                        : "35%";
                  return (
                    <div
                      key={i}
                      className={`rounded-md border p-1 flex flex-col justify-center text-[7.5px] leading-tight ${b.color} relative overflow-hidden h-full`}
                    >
                      <span className="font-extrabold text-[8px]">
                        {b.type}
                      </span>
                      <span className="text-[6px] opacity-70">AB12 CDE</span>
                      <div className="w-full bg-white/5 h-0.5 rounded-full overflow-hidden mt-1.5 border border-white/5">
                        <div
                          className="h-full bg-current opacity-75"
                          style={{ width: progressWidth }}
                        />
                      </div>
                    </div>
                  );
                }
              }

              if (activeFeature === 2) {
                if (b.isDragSource) {
                  return (
                    <div key={i} className="relative h-full">
                      <motion.div
                        animate={{
                          x: [0, 0, "105%", "105%", 0],
                          y: [0, 0, "116%", "116%", 0],
                          borderColor: [
                            "rgba(239, 68, 68, 0.3)",
                            "rgba(59, 130, 246, 0.8)",
                            "rgba(96, 165, 250, 0.8)",
                            "rgba(96, 165, 250, 0.8)",
                            "rgba(239, 68, 68, 0.3)",
                          ],
                          boxShadow: [
                            "0 1px 2px rgba(0,0,0,0.1)",
                            "0 6px 15px rgba(59,130,246,0.3)",
                            "0 6px 15px rgba(59,130,246,0.35)",
                            "0 6px 15px rgba(59,130,246,0.35)",
                            "0 1px 2px rgba(0,0,0,0.1)",
                          ],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          times: [0, 0.2, 0.55, 0.85, 1],
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 bg-[#050816] rounded-md border text-[7.5px] p-1 flex flex-col justify-center z-20 cursor-grab"
                      >
                        <span className="font-extrabold text-[8px] text-red-400">
                          Diagnostics
                        </span>
                        <span className="text-[6.5px] opacity-75 text-red-300">
                          AB12 CDE
                        </span>
                      </motion.div>
                    </div>
                  );
                }

                if (b.isDragTarget) {
                  return (
                    <div key={i} className="relative h-full">
                      <div className="absolute inset-0 border border-dashed border-blue-500/40 bg-blue-500/5 rounded-md flex items-center justify-center">
                        <span className="text-[6.5px] font-black text-blue-400/50 uppercase select-none">
                          Target
                        </span>
                      </div>

                      <motion.div
                        animate={{
                          opacity: [0, 0, 1, 1, 0],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          times: [0, 0.55, 0.6, 0.85, 1],
                        }}
                        className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white font-extrabold text-[6.5px] px-2 py-0.5 rounded shadow-lg whitespace-nowrap z-30"
                      >
                        Rescheduled!
                      </motion.div>
                    </div>
                  );
                }
              }

              if (activeFeature === 0) {
                if (b.type === "MOT" && row.time === "09:00") {
                  return (
                    <div
                      key={i}
                      className={`rounded-md border p-1 flex flex-col justify-center text-[7.5px] leading-tight transition-all duration-300 ${
                        smsConfirmed
                          ? "bg-green-500/10 border-green-500/40 text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.15)]"
                          : b.color
                      } h-full`}
                    >
                      <span className="font-extrabold text-[8px]">
                        {b.type}
                      </span>
                      <span className="text-[6px] opacity-70">AB12 CDE</span>
                      <span
                        className={`text-[5.5px] font-black tracking-wide uppercase mt-0.5 transition-colors ${
                          smsConfirmed
                            ? "text-green-400"
                            : "text-blue-400 animate-pulse"
                        }`}
                      >
                        {smsConfirmed ? "✓ Confirmed" : "⏰ SMS Pending"}
                      </span>
                    </div>
                  );
                }
              }

              return (
                <div
                  key={i}
                  className={`rounded-md border p-1 flex flex-col justify-center text-[7.5px] leading-tight ${
                    b.type
                      ? b.color
                      : "border-dashed border-white/5 bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
                  } h-full`}
                >
                  {b.type ? (
                    <>
                      <span className="font-extrabold text-[8px]">
                        {b.type}
                      </span>
                      <span className="text-[6px] opacity-70">AB12 CDE</span>
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}

        {/* Floating SMS message overlay for Feature 0 */}
        {activeFeature === 0 && smsSent && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute bottom-4 left-4 right-4 bg-slate-900 border border-white/15 p-2.5 rounded-xl shadow-2xl z-30 max-w-[280px] mx-auto text-left"
          >
            <div className="flex justify-between items-center border-b border-white/5 pb-1.5 mb-1.5 text-[7.5px] font-black text-gray-500 uppercase tracking-wider">
              <span>💬 SMS Notification Gateway</span>
              <span className="text-green-500">Live</span>
            </div>
            <div className="space-y-1.5">
              <div className="text-[7.5px] font-bold text-gray-400">
                To: +44 7700 900077
              </div>
              <div className="bg-slate-800 p-2 rounded-lg text-[8px] font-semibold text-white leading-relaxed relative">
                "Hi Alex, reminder that your Ford Focus MOT is booked for Tue
                Oct 24th at 09:00 AM. Please reply YES to confirm."
                <div className="absolute -left-1 top-2.5 w-2 h-2 bg-slate-800 rotate-45 rounded-sm"></div>
              </div>
              {smsConfirmed && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex justify-end"
                >
                  <div className="bg-blue-600 p-2 rounded-lg text-[8px] font-black text-white relative">
                    "YES"
                    <div className="absolute -right-1 top-2.5 w-2 h-2 bg-blue-600 rotate-45 rounded-sm"></div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  const getFloatingNotification = () => {
    switch (activeFeature) {
      case 0:
        return {
          icon: <FiMessageSquare className="w-4 h-4" />,
          title: "Automated SMS Sent",
          desc: smsConfirmed
            ? "MOT Confirmed: AB12 CDE"
            : "MOT Reminder: AB12 CDE",
          color: smsConfirmed
            ? "bg-green-500/20 text-green-400"
            : "bg-blue-500/20 text-blue-400",
        };
      case 1:
        return {
          icon: <FiRefreshCw className="w-4 h-4 animate-spin" />,
          title: "DVSA Gateway Syncing",
          desc:
            dvsaStep === 1
              ? "Scan complete - PASS: AB12 CDE"
              : "Importing safety advisories...",
          color: "bg-cyan-500/20 text-cyan-400",
        };
      case 2:
        return {
          icon: <FiCalendar className="w-4 h-4" />,
          title: "Drag & Drop Rescheduler",
          desc: "Diagnostics shifted to Day 3",
          color: "bg-blue-500/20 text-blue-400",
        };
      case 3:
      default:
        return {
          icon: <FiClock className="w-4 h-4" />,
          title: "Day Occupancy Meter",
          desc: "Active Load: 3/4 Ramps (75%)",
          color: "bg-blue-500/20 text-blue-400",
        };
    }
  };

  const currentNotification = getFloatingNotification();

  return (
    <section className="py-24 px-6 md:px-12 bg-[#0c1222] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column: Visual Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative w-full flex justify-center items-center"
          >
            <div className="absolute inset-0 bg-blue-600/15 blur-[120px] rounded-full pointer-events-none"></div>

            {/* MOT Diary Dashboard Mockup Box */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative rounded-2xl border border-white/10 bg-[#050816] p-4 shadow-[0_0_40px_rgba(30,115,190,0.12)] z-10 w-full max-w-[500px]"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4 shrink-0">
                <div className="flex items-center space-x-3 select-none">
                  <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                    <FiCalendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xs md:text-sm">
                      MOT Diary Dashboard
                    </h3>
                    <p className="text-[9px] text-gray-500 font-semibold mt-0.5">
                      Tue, Oct 24th, 2026
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="px-3 py-1 bg-blue-600 text-white text-[9px] font-black rounded-lg cursor-pointer shadow-sm shadow-blue-500/20 hover:bg-blue-500 transition-colors">
                    + New Booking
                  </div>
                </div>
              </div>

              {/* Dynamic Viewport */}
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    {activeFeature === 1
                      ? renderDVSALookup()
                      : renderDiaryGrid()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Dynamic Floating Notification Box */}
            <AnimatePresence mode="wait">
              <motion.div
                key={
                  activeFeature +
                  "-" +
                  (smsConfirmed ? "confirmed" : "pending") +
                  "-" +
                  dvsaStep
                }
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="absolute -bottom-6 -right-6 md:-right-8 bg-[#111827] border border-white/10 p-3 rounded-xl shadow-2xl glass-panel z-20 flex items-center space-x-3 select-none shrink-0"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${currentNotification.color}`}
                >
                  {currentNotification.icon}
                </div>
                <div className="text-left leading-none">
                  <div className="text-[8px] text-gray-500 font-black uppercase tracking-wider">
                    {currentNotification.title}
                  </div>
                  <div className="text-[10.5px] font-bold text-white mt-1">
                    {currentNotification.desc}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right Column: Descriptions & Clickable Feature Tabs */}
          <div className="space-y-8 text-left z-10 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Smart{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                  MOT Diary
                </span>{" "}
                Management
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Simplify your MOT scheduling with our intelligent diary system.
                Reduce no-shows, fill gaps, and keep your ramps fully booked.
              </p>
            </motion.div>

            {/* Mobile Feature Description Card */}
            <div className="block md:hidden bg-[#111827]/60 border border-white/5 p-5 rounded-2xl space-y-3.5 shadow-xl select-none">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30 shadow-md">
                  {features[activeFeature].icon}
                </div>
                <h3 className="text-base font-bold text-blue-400 leading-tight">
                  {features[activeFeature].title}
                </h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed min-h-[40px]">
                {features[activeFeature].desc}
              </p>
              {/* Dot selectors */}
              <div className="flex items-center space-x-2.5 pt-2 justify-center">
                {features.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveFeature(idx);
                      setIsAutoPlaying(false);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === activeFeature ? "bg-blue-500 w-5" : "bg-gray-600 w-2 hover:bg-gray-500"
                    }`}
                    aria-label={`Go to feature ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="hidden md:block space-y-4">
              {features.map((item, idx) => {
                const isActive = idx === activeFeature;
                return (
                  <motion.div
                    key={idx}
                    onClick={() => {
                      setActiveFeature(idx);
                      setIsAutoPlaying(false);
                    }}
                    whileHover={{ scale: 1.02 }}
                    className={`flex gap-4 p-4 rounded-2xl border cursor-pointer transition-all duration-300 relative overflow-hidden ${
                      isActive
                        ? "bg-[#111827]/80 border-blue-500/50 shadow-[0_0_20px_rgba(30,115,190,0.1)]"
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
                      className={`flex-shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center transition-all ${
                        isActive
                          ? "bg-blue-500/20 border-blue-500/40 text-blue-400 shadow-[0_0_10px_rgba(30,115,190,0.2)]"
                          : "bg-[#111827] border-white/10 text-gray-500"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h3
                        className={`text-xl font-bold transition-all mb-1 ${isActive ? "text-blue-400" : "text-white"}`}
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

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full md:w-auto text-center px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-[0_0_20px_rgba(30,115,190,0.3)] transition-all cursor-pointer block md:inline-block"
            >
              Explore MOT Features
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MOTDiary;
