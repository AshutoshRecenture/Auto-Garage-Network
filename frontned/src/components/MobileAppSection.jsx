import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSmartphone,
  FiMessageCircle,
  FiCamera,
  FiClock,
  FiCheck,
  FiSend,
  FiPlus,
  FiAlertTriangle,
} from "react-icons/fi";
import { FaApple, FaGooglePlay } from "react-icons/fa";

const MobileAppSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Live timer for Job Updates (Tab 0)
  const [elapsedSeconds, setElapsedSeconds] = useState(5045); // 01:24:05 is 5045 seconds

  useEffect(() => {
    if (activeFeature !== 0) return;
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [activeFeature]);

  const formatElapsed = (totalSecs) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Auto-play interval
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 6500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const features = [
    {
      title: "Job Updates",
      icon: <FiClock />,
      desc: "Clock in/out of jobs in real-time straight from the workshop ramp.",
    },
    {
      title: "Photo Uploads",
      icon: <FiCamera />,
      desc: "Attach damage photos directly to job cards for visual diagnostics.",
    },
    {
      title: "Customer Chat",
      icon: <FiMessageCircle />,
      desc: "Instant SMS & Email chat to send updates and gain quick repair approvals.",
    },
    {
      title: "Digital VHCs",
      icon: <FiSmartphone />,
      desc: "Perform digital vehicle health check checklists and share reports instantly.",
    },
  ];

  const renderJobUpdatesScreen = () => (
    <div className="flex-grow flex flex-col bg-[#111827] rounded-t-3xl pt-5 px-5 border-t border-white/5 relative h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-bold text-xs">Current Active Job</h3>
        <span className="bg-blue-500/10 text-cyan-400 text-[8px] font-black px-2 py-0.5 rounded border border-blue-500/20">
          IN PROGRESS
        </span>
      </div>

      <div className="bg-[#050816] rounded-2xl p-4 border border-white/5 mb-3 text-left">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-sm font-black text-white">AB12 CDE</div>
            <div className="text-[10px] text-gray-500 font-bold mt-0.5">
              Ford Fiesta • Silver
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
            <FiClock className="w-4 h-4" />
          </div>
        </div>

        <div className="space-y-2.5 text-[11px] font-semibold">
          <div className="flex justify-between">
            <span className="text-gray-500">Service Type</span>
            <span className="text-white">Full Service</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Time Elapsed</span>
            <span className="text-cyan-400 font-black tracking-wider">
              {formatElapsed(elapsedSeconds)}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/5">
          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5">
            <div className="w-[65%] h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
          </div>
          <div className="text-[8.5px] text-gray-500 text-center mt-2 font-bold">
            65% Completed
          </div>
        </div>
      </div>

      <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] rounded-xl shadow-md shadow-blue-500/15 cursor-pointer">
        Complete Active Job
      </button>
    </div>
  );

  const renderPhotoUploadsScreen = () => (
    <div className="flex-grow flex flex-col bg-[#111827] rounded-t-3xl pt-5 px-5 border-t border-white/5 relative h-full text-left">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="text-white font-bold text-xs">Job Photo Uploads</h3>
          <span className="text-[8px] text-gray-500 font-bold">
            AB12 CDE • Ford Fiesta
          </span>
        </div>
        <span className="bg-blue-500/10 text-cyan-400 text-[8px] font-black px-2 py-0.5 rounded border border-blue-500/20">
          2 UPLOADED
        </span>
      </div>

      {/* Grid of photos */}
      <div className="grid grid-cols-2 gap-2.5 mb-3">
        {[
          { name: "Bumper Scrape", desc: "Front nearside" },
          { name: "Worn Brake Pad", desc: "Front offside" },
        ].map((img, i) => (
          <div
            key={i}
            className="bg-[#050816] border border-white/5 rounded-xl p-2 flex flex-col justify-between aspect-[4/3] relative overflow-hidden group"
          >
            {/* Visual camera placeholder */}
            <div className="absolute inset-0 bg-blue-500/5 flex items-center justify-center text-blue-500/10">
              <FiCamera className="w-12 h-12" />
            </div>

            <div className="flex justify-between items-start z-10">
              <span className="text-[7.5px] font-black text-white truncate max-w-[75%]">
                {img.name}
              </span>
              <div className="w-3.5 h-3.5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-[7px] shrink-0 border border-green-500/30">
                <FiCheck className="w-2 h-2" />
              </div>
            </div>
            <span className="text-[6.5px] text-gray-500 font-bold z-10 mt-auto">
              {img.desc}
            </span>
          </div>
        ))}
        {/* Add photo dotted slot */}
        <div className="border border-dashed border-white/10 hover:border-blue-500/40 rounded-xl bg-white/5 flex flex-col items-center justify-center p-2 cursor-pointer transition-colors aspect-[4/3] select-none text-center">
          <FiPlus className="w-5 h-5 text-gray-500 mb-1" />
          <span className="text-[7.5px] font-black text-gray-400">
            Add Diagnostics Image
          </span>
        </div>
      </div>

      <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-black text-[9px] rounded-xl shadow-md cursor-pointer shrink-0">
        Send Uploads to Customer
      </button>
    </div>
  );

  const renderCustomerChatScreen = () => (
    <div className="flex-grow flex flex-col bg-[#111827] rounded-t-3xl pt-4 px-4 border-t border-white/5 relative h-full select-none justify-between">
      <div className="flex justify-between items-center border-b border-white/5 pb-2 shrink-0">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-black flex items-center justify-center text-[9px] border border-blue-500/30">
            SJ
          </div>
          <span className="text-white font-bold text-[10.5px]">
            Sarah Jenkins
          </span>
        </div>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto space-y-2 py-3 text-left max-h-[170px] select-none">
        {[
          { sender: "customer", text: "Hi, how is the MOT looking?" },
          {
            sender: "mechanic",
            text: "Finished checks. Advisories loaded. Front brake pads need replacing.",
          },
          { sender: "customer", text: "Please replace them. How much?" },
          {
            sender: "mechanic",
            text: "Front pads are £60.00 fitted. Added to invoice.",
          },
        ].map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.sender === "customer" ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`p-2 rounded-xl text-[7.5px] font-semibold leading-relaxed max-w-[80%] relative ${
                msg.sender === "customer"
                  ? "bg-[#050816] text-gray-300 rounded-tl-none border border-white/5"
                  : "bg-blue-600 text-white rounded-tr-none shadow-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Message input */}
      <div className="flex items-center space-x-1.5 border-t border-white/5 pt-2 mb-2 shrink-0">
        <div className="flex-grow bg-[#050816] border border-white/5 rounded-xl px-2.5 py-1.5 text-[8.5px] text-gray-500 text-left font-bold select-none">
          Type message...
        </div>
        <button className="w-7 h-7 bg-blue-600 text-white rounded-xl flex items-center justify-center shrink-0 cursor-pointer">
          <FiSend className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );

  const renderDigitalVHCScreen = () => (
    <div className="flex-grow flex flex-col bg-[#111827] rounded-t-3xl pt-5 px-5 border-t border-white/5 relative h-full text-left justify-between">
      <div className="flex justify-between items-center border-b border-white/5 pb-2.5 shrink-0">
        <div>
          <h3 className="text-white font-bold text-xs">Digital VHC Report</h3>
          <span className="text-[7.5px] text-gray-500 font-bold">
            AB12 CDE • Ford Fiesta
          </span>
        </div>
        <span className="bg-amber-500/10 text-amber-400 text-[7.5px] font-black px-2 py-0.5 rounded border border-amber-500/20 shrink-0">
          ATTENTION
        </span>
      </div>

      {/* VHC checklist items */}
      <div className="space-y-1.5 py-3 flex-grow justify-center flex flex-col">
        {[
          {
            name: "Engine & Oil Level",
            status: "HEALTHY",
            color: "text-green-400 bg-green-500/10 border-green-500/20",
            dot: "🟢",
          },
          {
            name: "Tyres & Tracking",
            status: "ADVISORY",
            color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
            dot: "🟡",
          },
          {
            name: "Brakes & Discs",
            status: "CRITICAL",
            color: "text-red-400 bg-red-500/10 border-red-500/20",
            dot: "🔴",
          },
          {
            name: "Lights & Electrical",
            status: "HEALTHY",
            color: "text-green-400 bg-green-500/10 border-green-500/20",
            dot: "🟢",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-center bg-[#050816] border border-white/5 rounded-xl p-2 text-[8px] font-bold"
          >
            <div className="flex items-center space-x-1.5">
              <span>{item.dot}</span>
              <span className="text-gray-300 font-semibold">{item.name}</span>
            </div>
            <span
              className={`text-[7px] font-black px-1.5 py-0.5 rounded border shrink-0 ${item.color}`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>

      <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-black text-[9px] rounded-xl shadow-md cursor-pointer mb-2 shrink-0 flex items-center justify-center space-x-1">
        <span>Send VHC to Customer</span>
      </button>
    </div>
  );

  return (
    <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#050816] to-[#0c1222] overflow-hidden relative">
      {/* Background radial glow recolored from orange to blue */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column: Interactive Feature List */}
          <div className="order-2 md:order-1 space-y-8 text-left z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
                Manage Your Garage From{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Anywhere
                </span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                The AGN Mobile App gives mechanics and owners the power to
                update jobs, check schedules, and communicate with customers
                straight from the workshop floor.
              </p>
            </motion.div>

            <div className="hidden md:grid grid-cols-2 gap-4">
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
                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                      isActive
                        ? "bg-[#111827]/80 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
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
                      className={`mb-3 transition-colors ${isActive ? "text-cyan-400" : "text-gray-500"}`}
                    >
                      {React.cloneElement(item.icon, { className: "w-6 h-6" })}
                    </div>
                    <div>
                      <h4
                        className={`font-bold text-sm mb-1.5 transition-all ${isActive ? "text-blue-400" : "text-white"}`}
                      >
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-gray-400 leading-normal">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Store Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="hidden md:flex gap-4 pt-4"
            >
              <button className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3.5 rounded-xl text-white transition-colors group cursor-pointer">
                <FaApple className="w-6 h-6 group-hover:text-white text-gray-400 transition-colors" />
                <div className="text-left">
                  <div className="text-[10px] text-gray-400 uppercase tracking-wide font-bold">
                    Download on the
                  </div>
                  <div className="font-extrabold leading-none mt-0.5 text-xs">
                    App Store
                  </div>
                </div>
              </button>
              <button className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3.5 rounded-xl text-white transition-colors group cursor-pointer">
                <FaGooglePlay className="w-5 h-5 group-hover:text-cyan-400 text-gray-400 transition-colors" />
                <div className="text-left">
                  <div className="text-[10px] text-gray-400 uppercase tracking-wide font-bold">
                    GET IT ON
                  </div>
                  <div className="font-extrabold leading-none mt-0.5 text-xs">
                    Google Play
                  </div>
                </div>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Detailed Mobile Phone Mockup */}
          <div className="order-1 md:order-2 relative flex justify-center perspective-1000">
            <div className="absolute inset-0 bg-blue-600/10 blur-[120px] rounded-full w-3/4 mx-auto pointer-events-none"></div>

            <motion.div
              initial={{ opacity: 0, y: 50, rotateY: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: -10 }}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 1.5 }}
              whileHover={{ rotateY: 0, scale: 1.04 }}
              className="phone-mockup relative w-72 h-[550px] border-[10px] border-[#0c1222] rounded-[2.8rem] bg-[#050816] shadow-[0_20px_50px_rgba(0,0,0,0.7)] z-10 flex flex-col overflow-hidden border-white/10"
            >
              {/* Phone Speaker Notch */}
              <div className="absolute top-0 inset-x-0 h-6 bg-[#0c1222] rounded-b-2xl w-1/2 mx-auto z-40 flex justify-center items-center">
                <div className="w-10 h-1 bg-[#1f2937] rounded-full"></div>
              </div>

              {/* Phone System Status Bar */}
              <div className="h-8 w-full flex justify-between items-end px-6 text-white pb-1 z-30 select-none shrink-0 font-bold text-[9px] text-white/50">
                <span>9:41</span>
                <div className="flex space-x-1 items-center">
                  <FiSmartphone className="w-2.5 h-2.5 rotate-90" />
                  <span className="text-[8px]">LTE</span>
                  <div className="w-3.5 h-2 rounded bg-white/50 border border-white/10 relative">
                    <div className="absolute top-0.5 left-0.5 bottom-0.5 right-0.5 bg-white rounded-sm"></div>
                  </div>
                </div>
              </div>

              {/* Mobile App UI content wrapper */}
              <div className="flex-1 overflow-hidden flex flex-col bg-[#050816]">
                <div className="bg-gradient-to-b from-blue-600/10 to-transparent p-5 pb-2 select-none shrink-0">
                  <div className="flex justify-between items-center mb-5 text-left">
                    <div>
                      <div className="text-[8.5px] text-cyan-400 font-black tracking-widest uppercase mb-0.5">
                        Mechanic View
                      </div>
                      <div className="text-base font-extrabold text-white">
                        John Smith
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 p-0.5">
                      <div className="w-full h-full bg-[#111827] rounded-full flex items-center justify-center text-white font-extrabold text-xs">
                        JS
                      </div>
                    </div>
                  </div>

                  {/* App Quick Navigation Buttons */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {[
                      { icon: <FiCamera />, label: "Upload", tabIdx: 1 },
                      { icon: <FiClock />, label: "Clock In", tabIdx: 0 },
                      {
                        icon: <FiMessageCircle />,
                        label: "Message",
                        tabIdx: 2,
                      },
                    ].map((btn, i) => {
                      const isTabActive = activeFeature === btn.tabIdx;
                      return (
                        <div
                          key={i}
                          onClick={() => {
                            setActiveFeature(btn.tabIdx);
                            setIsAutoPlaying(false);
                          }}
                          className={`flex flex-col items-center justify-center bg-[#111827] border rounded-xl p-2.5 aspect-square text-white transition-all cursor-pointer ${
                            isTabActive
                              ? "bg-blue-500/20 border-blue-500/50 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.15)]"
                              : "border-white/5 hover:bg-blue-500/5 hover:border-blue-500/20"
                          }`}
                        >
                          {React.cloneElement(btn.icon, {
                            className: "w-4.5 h-4.5 mb-1.5",
                          })}
                          <span className="text-[8.5px] font-black">
                            {btn.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Animated Screen transition */}
                <div className="flex-1 flex flex-col overflow-hidden relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFeature}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="flex-grow flex flex-col h-full"
                    >
                      {activeFeature === 0 && renderJobUpdatesScreen()}
                      {activeFeature === 1 && renderPhotoUploadsScreen()}
                      {activeFeature === 2 && renderCustomerChatScreen()}
                      {activeFeature === 3 && renderDigitalVHCScreen()}
                    </motion.div>
                  </AnimatePresence>

                  {/* Home Indicator line */}
                  <div className="absolute bottom-2 inset-x-0 flex justify-center z-40 pointer-events-none select-none">
                    <div className="w-1/3 h-1 bg-white/20 rounded-full"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppSection;
