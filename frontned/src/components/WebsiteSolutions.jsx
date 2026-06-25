import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheck,
  FiArrowRight,
  FiAward,
  FiCalendar,
  FiSmartphone,
  FiWifi,
  FiBattery,
} from "react-icons/fi";

const WebsiteSolutions = () => {
  const [activePage, setActivePage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Booking flow states for Page 1
  const [bookingStep, setBookingStep] = useState(0);
  const [bookingService, setBookingService] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingReg, setBookingReg] = useState("");

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setBookingStep((prev) => {
        if (prev === 0) {
          setBookingService("MOT & Interim Service");
          return 1;
        } else if (prev === 1) {
          setBookingTime("Tue Jun 16 - 11:30 AM");
          setBookingReg("GB22 XYZ");
          return 2;
        } else {
          setBookingService("");
          setBookingTime("");
          setBookingReg("");
          return 0;
        }
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const features = [
    {
      title: "Custom Branded Design",
      desc: "Stand out from the competition with a premium, tailored design that builds trust with your customers.",
      icon: <FiAward className="w-5 h-5" />,
    },
    {
      title: "Online Booking Integration",
      desc: "Allow customers to book MOTs, services, and repairs directly from your website 24/7.",
      icon: <FiCalendar className="w-5 h-5" />,
    },
    {
      title: "Mobile Responsive",
      desc: "Flawless experience across all devices, ensuring you never miss a mobile customer.",
      icon: <FiSmartphone className="w-5 h-5" />,
    },
  ];

  const renderDesktopPage = () => (
    <div className="flex-grow flex flex-col bg-slate-50 text-slate-800 font-sans select-none h-full">
      {/* Website Nav */}
      <div className="h-10 border-b border-slate-200/80 flex items-center justify-between px-4 bg-white shrink-0">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[11px] font-black shadow-md shadow-blue-500/30">
            A
          </div>
          <span className="text-slate-900 font-extrabold text-xs tracking-tight">
            Auto Garage
          </span>
        </div>
        <div className="flex space-x-3 text-[7.5px] font-bold text-slate-500">
          <span className="hover:text-blue-600 transition-colors">
            Services
          </span>
          <span className="hover:text-blue-600 transition-colors">MOTs</span>
          <span className="hover:text-blue-600 transition-colors">Reviews</span>
          <span className="hover:text-blue-600 transition-colors">Contact</span>
        </div>
        <button className="h-6 px-3 bg-blue-600 text-white rounded text-[8px] font-extrabold shadow-sm shadow-blue-500/20 hover:bg-blue-500 transition-colors">
          Book MOT
        </button>
      </div>

      {/* Hero section */}
      <div className="flex-grow p-4 md:p-6 flex flex-col justify-between overflow-y-auto">
        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="space-y-2.5">
            <div className="inline-flex items-center space-x-1 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded text-[6.5px] font-extrabold text-blue-600">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
              <span>10% OFF ONLINE BOOKINGS</span>
            </div>
            <h3 className="text-xs md:text-sm font-black text-slate-900 leading-tight">
              Premium Vehicle Care, <br />
              <span className="text-blue-600">Built Around You.</span>
            </h3>
            <p className="text-[7.5px] md:text-[8px] text-slate-500 font-medium leading-relaxed">
              Dealer-level diagnostics, certified technicians, and full warranty
              protection.
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setActivePage(1);
                  setBookingStep(0);
                  setIsAutoPlaying(false);
                }}
                className="h-6 px-3 bg-blue-600 text-white rounded text-[7.5px] font-extrabold shadow-sm hover:bg-blue-500 transition-colors cursor-pointer"
              >
                Book Online
              </button>
              <button className="h-6 px-2.5 border border-slate-300 text-slate-600 rounded text-[7.5px] font-extrabold bg-white hover:bg-slate-50 transition-colors cursor-pointer">
                View Price List
              </button>
            </div>
          </div>

          {/* Right car visual */}
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex justify-center items-center relative h-full min-h-[90px]"
          >
            <div className="absolute inset-0 bg-blue-500/5 blur-xl rounded-full"></div>
            <svg
              viewBox="0 0 120 60"
              className="w-full h-auto text-blue-600 max-h-[80px]"
              fill="currentColor"
            >
              <defs>
                <linearGradient id="car-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient
                  id="glow-grad"
                  x1="0%"
                  y1="100%"
                  x2="0%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <ellipse cx="60" cy="50" rx="45" ry="6" fill="url(#glow-grad)" />
              <path
                d="M10 40 L18 26 C22 24, 30 20, 42 20 C54 20, 64 16, 74 20 L96 26 L112 36 Q116 38, 116 42 L116 46 L98 46 Q98 40, 92 40 Q86 40, 86 46 L34 46 Q34 40, 28 40 Q22 40, 22 46 L10 46 Z"
                fill="url(#car-grad)"
                opacity="0.9"
              />
              <path
                d="M30 23 L44 23 L44 32 L27 32 Z"
                fill="#ffffff"
                opacity="0.8"
              />
              <path
                d="M48 23 L68 23 L72 32 L48 32 Z"
                fill="#ffffff"
                opacity="0.8"
              />
              <path
                d="M72 23 L86 28 L82 32 L72 32 Z"
                fill="#ffffff"
                opacity="0.8"
              />
              <circle cx="28" cy="46" r="8" fill="#1e293b" />
              <circle cx="28" cy="46" r="4" fill="#94a3b8" />
              <circle cx="92" cy="46" r="8" fill="#1e293b" />
              <circle cx="92" cy="46" r="4" fill="#94a3b8" />
              <path d="M110 38 L114 39 L114 41 Z" fill="#fef08a" />
              <path d="M110 11 L114 12" fill="#fff" />
            </svg>
          </motion.div>
        </div>

        {/* Services grid */}
        <div className="mt-4 border-t border-slate-100 pt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[7.5px] font-black text-slate-800 tracking-wider uppercase">
              Services
            </span>
            <span className="text-[6.5px] font-bold text-blue-600 flex items-center hover:underline cursor-pointer">
              All Services <FiArrowRight className="ml-0.5" />
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {[
              {
                title: "MOT Testing",
                price: "£45.00",
                desc: "DVSA certified days",
                icon: "🚗",
              },
              {
                title: "Car Servicing",
                price: "£89.00",
                desc: "Interim & major checks",
                icon: "🔧",
              },
              {
                title: "Tyres & Tracking",
                price: "£55.00",
                desc: "Fitted while you wait",
                icon: "⚙️",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-white p-2 rounded-lg border border-slate-200/60 shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:border-blue-300 hover:shadow-[0_4px_12px_rgba(59,130,246,0.08)] transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs mb-1 block">{s.icon}</span>
                  <div className="text-[7.5px] font-extrabold text-slate-900 leading-tight">
                    {s.title}
                  </div>
                  <div className="text-[6px] text-slate-400 font-medium leading-normal mt-0.5">
                    {s.desc}
                  </div>
                </div>
                <div className="text-[7.5px] font-black text-blue-600 mt-1.5">
                  {s.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderBookingPage = () => {
    const services = [
      {
        id: "mot",
        name: "MOT Test Only",
        price: "£45.00",
        time: "45 mins",
        icon: "🚗",
      },
      {
        id: "service",
        name: "MOT & Interim Service",
        price: "£139.00",
        time: "2 hours",
        icon: "🔧",
      },
      {
        id: "full",
        name: "Full Service Only",
        price: "£110.00",
        time: "1.5 hours",
        icon: "⚙️",
      },
    ];

    const slots = [
      "Mon Jun 15 - 09:00 AM",
      "Tue Jun 16 - 11:30 AM",
      "Wed Jun 17 - 02:00 PM",
      "Thu Jun 18 - 04:30 PM",
    ];

    return (
      <div className="flex-grow flex flex-col bg-slate-50 text-slate-800 font-sans select-none h-full overflow-hidden">
        {/* Nav header */}
        <div className="h-10 border-b border-slate-200/80 flex items-center justify-between px-4 bg-white shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[11px] font-black shadow-md shadow-blue-500/30">
              A
            </div>
            <span className="text-slate-900 font-extrabold text-xs tracking-tight">
              Auto Garage
            </span>
          </div>
          <div className="flex items-center space-x-2 text-[6.5px] font-extrabold text-slate-400">
            <span
              className={
                bookingStep === 0
                  ? "text-blue-600 font-black"
                  : bookingStep > 0
                    ? "text-green-600"
                    : ""
              }
            >
              1. Service
            </span>
            <span>&gt;</span>
            <span
              className={
                bookingStep === 1
                  ? "text-blue-600 font-black"
                  : bookingStep > 1
                    ? "text-green-600"
                    : ""
              }
            >
              2. Schedule
            </span>
            <span>&gt;</span>
            <span
              className={bookingStep === 2 ? "text-green-600 font-black" : ""}
            >
              3. Success
            </span>
          </div>
        </div>

        <div className="flex-grow p-4 md:p-5 flex flex-col justify-between overflow-y-auto">
          {bookingStep === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3 flex-grow flex flex-col justify-between"
            >
              <div>
                <h2 className="text-[8px] font-black uppercase tracking-wider text-slate-400 mb-1">
                  Step 1
                </h2>
                <h3 className="text-xs md:text-sm font-black text-slate-900 leading-tight">
                  Select Your Service Option
                </h3>
                <p className="text-[7px] md:text-[8px] text-slate-500 font-medium">
                  Click on a service below to configure your booking.
                </p>
              </div>

              <div className="grid gap-2 my-2 flex-grow justify-center flex flex-col">
                {services.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      setBookingService(s.name);
                      setBookingStep(1);
                      setIsAutoPlaying(false);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:shadow-md cursor-pointer transition-all duration-200 group w-full"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-base">{s.icon}</span>
                      <div className="leading-tight">
                        <div className="text-[8px] font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                          {s.name}
                        </div>
                        <div className="text-[6.5px] text-slate-400 font-semibold">
                          {s.time} duration
                        </div>
                      </div>
                    </div>
                    <div className="text-[8.5px] font-black text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
                      {s.price}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center text-[7.5px] text-slate-400 font-bold border-t border-slate-100 pt-2">
                🔒 Secure, SSL Encrypted Booking Engine
              </div>
            </motion.div>
          )}

          {bookingStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-2.5 flex-grow flex flex-col justify-between"
            >
              <div>
                <h2 className="text-[8px] font-black uppercase tracking-wider text-slate-400 mb-1">
                  Step 2
                </h2>
                <h3 className="text-xs md:text-sm font-black text-slate-900 leading-tight">
                  Choose Slot & Enter Registration
                </h3>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label htmlFor="booking-reg" className="text-[7.5px] font-extrabold text-slate-500 block">
                    VEHICLE REGISTRATION:
                  </label>
                  <div className="flex justify-center">
                    <div className="bg-amber-400 border-[2px] border-slate-950 rounded-md px-3 py-1 flex items-center shadow-sm relative overflow-hidden h-9 w-[180px]">
                      <div className="absolute left-0 top-0 bottom-0 w-3 bg-blue-600 flex flex-col items-center justify-center text-white text-[4px] leading-none shrink-0 font-bold">
                        <span>GB</span>
                      </div>
                      <input
                        id="booking-reg"
                        type="text"
                        value={bookingReg}
                        onChange={(e) => {
                          setBookingReg(e.target.value.toUpperCase());
                          setIsAutoPlaying(false);
                        }}
                        placeholder="GB22 XYZ"
                        className="bg-transparent border-none text-center font-black tracking-widest text-slate-900 focus:outline-none w-full text-xs uppercase pl-3"
                        maxLength="8"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[7.5px] font-extrabold text-slate-500 block">
                    SELECT AN APPOINTMENT TIME:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {slots.map((s, i) => {
                      const isSelected = bookingTime === s;
                      return (
                        <div
                          key={i}
                          onClick={() => {
                            setBookingTime(s);
                            setIsAutoPlaying(false);
                          }}
                          className={`p-1.5 rounded-lg border text-center text-[7px] font-extrabold cursor-pointer transition-all ${
                            isSelected
                              ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                              : "bg-white text-slate-600 border-slate-200 hover:border-blue-400"
                          }`}
                        >
                          {s.replace(" - ", "\n")}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    setBookingStep(0);
                    setIsAutoPlaying(false);
                  }}
                  className="h-6 px-2 text-slate-500 font-bold text-[7.5px] hover:text-slate-700 cursor-pointer"
                >
                  ← Back
                </button>
                <button
                  disabled={!bookingTime}
                  onClick={() => {
                    setBookingStep(2);
                    setIsAutoPlaying(false);
                  }}
                  className={`h-7 px-4 rounded-lg text-[8px] font-extrabold shadow-sm transition-all ${
                    bookingTime
                      ? "bg-blue-600 text-white hover:bg-blue-500 cursor-pointer"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  Confirm Booking →
                </button>
              </div>
            </motion.div>
          )}

          {bookingStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4 flex-grow flex flex-col justify-between items-center"
            >
              <div className="my-auto space-y-3 flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  className="w-10 h-10 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-green-500 text-lg shadow-sm"
                >
                  <FiCheck className="w-5 h-5 stroke-[3]" />
                </motion.div>

                <div className="space-y-1">
                  <h3 className="text-xs font-black text-slate-900 leading-none">
                    Booking Confirmed!
                  </h3>
                  <p className="text-[7.5px] text-slate-500 font-bold max-w-[200px]">
                    Confirmation summary sent to your phone number via SMS.
                  </p>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.01)] text-[7.5px] text-slate-600 w-full max-w-[220px] text-left space-y-1 font-semibold leading-relaxed">
                  <div>
                    <span className="text-slate-400 block font-medium text-[6.5px]">
                      SERVICE TYPE:
                    </span>
                    <span className="text-slate-900 font-black">
                      {bookingService}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100 mt-1">
                    <div>
                      <span className="text-slate-400 block font-medium text-[6.5px]">
                        DATE & TIME:
                      </span>
                      <span className="text-slate-900 font-black text-[7px]">
                        {bookingTime.split(" - ")[0]}
                      </span>
                      <span className="text-blue-600 font-black block text-[7px]">
                        {bookingTime.split(" - ")[1]}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium text-[6.5px]">
                        LICENCE REG:
                      </span>
                      <span className="text-slate-900 font-black bg-amber-300 border border-slate-400 px-1 rounded block w-max mt-0.5">
                        {bookingReg || "GB22 XYZ"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setBookingStep(0);
                  setBookingService("");
                  setBookingTime("");
                  setBookingReg("");
                  setIsAutoPlaying(false);
                }}
                className="h-6 px-4 bg-slate-950 text-white rounded text-[7.5px] font-extrabold hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
              >
                Book Another Car
              </button>
            </motion.div>
          )}
        </div>
      </div>
    );
  };

  const renderMobilePage = () => (
    <div className="flex-grow flex flex-col bg-slate-50 text-slate-800 font-sans select-none h-full overflow-hidden">
      {/* Mobile Site Nav */}
      <div className="h-9 border-b border-slate-200/80 flex items-center justify-between px-3 bg-white shrink-0">
        <div className="flex items-center space-x-1.5">
          <div className="w-5 h-5 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[9px] font-black shadow-sm">
            A
          </div>
          <span className="text-slate-900 font-black text-[10px] tracking-tight">
            Auto
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setActivePage(1);
              setBookingStep(0);
              setIsAutoPlaying(false);
            }}
            className="h-5 px-2 bg-blue-600 text-white rounded text-[6.5px] font-extrabold cursor-pointer"
          >
            Book Now
          </button>
          <div className="w-4 h-4 flex flex-col justify-center space-y-0.5 items-end cursor-pointer">
            <span className="w-3.5 h-0.5 bg-slate-700 rounded-full"></span>
            <span className="w-2.5 h-0.5 bg-slate-700 rounded-full"></span>
            <span className="w-3.5 h-0.5 bg-slate-700 rounded-full"></span>
          </div>
        </div>
      </div>

      {/* Mobile Content */}
      <div className="flex-grow p-3 flex flex-col justify-between overflow-y-auto space-y-3">
        <div className="inline-flex items-center space-x-1 bg-green-50 border border-green-100 px-1.5 py-0.5 rounded text-[6px] font-extrabold text-green-600 w-max">
          <span>⚡</span>
          <span>100% MOBILE OPTIMIZED</span>
        </div>

        {/* Hero Stacked */}
        <div className="space-y-1 text-center">
          <h3 className="text-[10px] font-black text-slate-900 leading-tight">
            Premium Car Care, <br />
            Right in Your Pocket.
          </h3>
          <p className="text-[6px] text-slate-400 font-medium leading-normal max-w-[180px] mx-auto">
            Book MOTs, track diagnostic logs, and receive text status updates on
            your mobile.
          </p>
        </div>

        {/* Floating device info */}
        <div className="bg-white p-2 rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.01)] text-[7px] text-slate-600 space-y-1.5 font-semibold">
          <div className="flex justify-between items-center text-[6px] text-slate-400 font-medium">
            <span>ACTIVE STATUS:</span>
            <span className="text-green-500 font-black flex items-center gap-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
              </span>
              <span>Live Diagnostic Sync</span>
            </span>
          </div>
          <div className="flex items-center space-x-2 bg-slate-50 p-1 rounded-lg border border-slate-100">
            <span className="text-sm">🔧</span>
            <div>
              <div className="text-[7px] font-black text-slate-900 leading-none">
                Audi A3 MOT Scan
              </div>
              <span className="text-[5.5px] text-slate-400 font-medium">
                Complete: Brake replacement required
              </span>
            </div>
          </div>
        </div>

        {/* Service list */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <div className="flex justify-between text-[6.5px] font-extrabold text-slate-500 px-1">
            <span>MOT & REPAIR CATEGORIES</span>
            <span>£ FROM</span>
          </div>
          <div className="space-y-1">
            {[
              { name: "MOT Testing Class 4", price: "£45" },
              { name: "Interim Servicing Checks", price: "£89" },
              { name: "Brake Fluid & Replacement", price: "£60" },
            ].map((s, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-white border border-slate-200/50 p-1.5 rounded-lg text-[6.5px] font-extrabold text-slate-900"
              >
                <span>{s.name}</span>
                <span className="text-blue-600 font-black">{s.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center pt-2 border-t border-slate-100 text-[6.5px] font-bold text-slate-400">
          📞 Tap to Call: 020 8123 4567
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="products"
      className="py-16 px-6 md:px-12 bg-[#050816] relative overflow-hidden"
    >
      <div id="latest-work" className="absolute top-0 left-0" />
      <div className="max-w-7xl mx-auto">
        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            High-Performance <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
              Website Solutions
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            Turn your garage's website into a lead-generation machine.
            Beautifully designed, lightning-fast, and optimized for
            conversions.
          </p>
        </motion.div>

        {/* 3-Column Grid representing all three features and mockups */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Card 1: Custom Branded Design */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.015, borderColor: "rgba(59, 130, 246, 0.4)", boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-[#111827]/40 border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-8 shadow-xl relative transition-all group duration-300"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50/5 border border-white/10 text-blue-400 flex items-center justify-center">
                <FiAward className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  Custom Branded Design
                </h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed mt-2">
                  Stand out from the competition with a premium, tailored design that builds trust with your customers.
                </p>
              </div>
            </div>

            {/* Desktop Mockup Preview */}
            <div className="relative pt-4">
              <div className="relative border-[4px] border-slate-700 bg-slate-900 shadow-2xl overflow-hidden flex flex-col w-full h-[250px] rounded-xl shadow-indigo-500/10">
                <div className="bg-[#1e293b] px-3 py-2 flex items-center space-x-1.5 border-b border-white/5 select-none shrink-0">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  </div>
                  <div className="mx-auto w-1/2 h-3.5 bg-slate-900 rounded text-[7px] font-black text-gray-400 flex items-center justify-center border border-white/5">
                    your-garage.co.uk
                  </div>
                </div>
                <div className="flex-grow bg-white relative overflow-hidden flex flex-col">
                  {renderDesktopPage()}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Online Booking Integration */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.015, borderColor: "rgba(59, 130, 246, 0.4)", boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
            className="bg-[#111827]/40 border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-8 shadow-xl relative transition-all group duration-300"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50/5 border border-white/10 text-blue-400 flex items-center justify-center">
                <FiCalendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  Online Booking Integration
                </h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed mt-2">
                  Allow customers to book MOTs, services, and repairs directly from your website 24/7.
                </p>
              </div>
            </div>

            {/* Desktop Mockup Preview (Booking) */}
            <div className="relative pt-4">
              <div className="relative border-[4px] border-slate-700 bg-slate-900 shadow-2xl overflow-hidden flex flex-col w-full h-[250px] rounded-xl shadow-indigo-500/10">
                <div className="bg-[#1e293b] px-3 py-2 flex items-center space-x-1.5 border-b border-white/5 select-none shrink-0">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  </div>
                  <div className="mx-auto w-1/2 h-3.5 bg-slate-900 rounded text-[7px] font-black text-gray-400 flex items-center justify-center border border-white/5">
                    your-garage.co.uk/book
                  </div>
                </div>
                <div className="flex-grow bg-white relative overflow-hidden flex flex-col">
                  {renderBookingPage()}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Mobile Responsive */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.015, borderColor: "rgba(59, 130, 246, 0.4)", boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
            className="bg-[#111827]/40 border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-8 shadow-xl relative transition-all group duration-300"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50/5 border border-white/10 text-blue-400 flex items-center justify-center">
                <FiSmartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  Mobile Responsive
                </h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed mt-2">
                  Flawless experience across all devices, ensuring you never miss a mobile customer.
                </p>
              </div>
            </div>

            {/* Mobile Mockup Preview */}
            <div className="relative pt-4 flex justify-center w-full">
              <div className="relative border-[4px] border-slate-700 bg-slate-900 shadow-2xl overflow-hidden flex flex-col w-[150px] h-[250px] rounded-[20px] shadow-indigo-500/10">
                <div className="bg-[#1e293b] px-2 py-1 flex items-center justify-between text-white/80 text-[7px] font-bold border-b border-white/5 select-none shrink-0 relative">
                  <span className="font-extrabold">09:41</span>
                  <div className="w-8 h-2 bg-slate-900 rounded-full absolute left-1/2 -translate-x-1/2 top-0.5 flex items-center justify-center border border-white/5">
                    <div className="w-3.5 h-[1px] bg-white/30 rounded-full"></div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FiWifi className="w-2 h-2 text-white/80" />
                    <FiBattery className="w-2.5 h-2 text-white/80" />
                  </div>
                </div>
                <div className="flex-grow bg-white relative overflow-hidden flex flex-col">
                  {renderMobilePage()}
                  {/* Real-time scanner overlay */}
                  <motion.div
                    animate={{ y: [0, 210, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-0 right-0 h-1.5 bg-blue-500/40 shadow-[0_0_8px_#3b82f6] pointer-events-none z-30"
                    style={{ top: 0 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default WebsiteSolutions;
