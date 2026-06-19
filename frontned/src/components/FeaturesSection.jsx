import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiTool,
  FiBell,
  FiTruck,
  FiCalendar,
  FiUsers,
  FiMonitor,
  FiDatabase,
  FiLayers,
  FiLink,
  FiSearch,
  FiMap,
  FiShoppingCart,
  FiUserCheck,
  FiFileText,
  FiPieChart,
  FiTrendingUp,
  FiActivity,
  FiChevronDown,
} from "react-icons/fi";

// Interactive 3D tilt and flip card component
const FeatureCard = ({ feature }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to center of the card
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Calculate rotation angles (maximum of 12 degrees)
    const rY = (mouseX / (width / 2)) * 12;
    const rX = -(mouseY / (height / 2)) * 12;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    // Reset tilt on mouse leave
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className="w-full h-[220px] cursor-pointer"
      style={{ perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{
          rotateX: rotateX,
          rotateY: rotateY + (isFlipped ? 180 : 0),
          scale: rotateX !== 0 ? 1.03 : 1,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        style={{ transformStyle: "preserve-3d", width: "100%", height: "100%" }}
        className="relative"
      >
        {/* Card Front Side */}
        <div
          className="absolute inset-0 bg-[#0d1226]/50 border border-white/5 hover:border-indigo-500/30 p-6 rounded-[24px] flex flex-col items-center justify-center shadow-2xl backdrop-blur-md transition-colors duration-300"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {/* Glowing 3D-like Neon Icon Container */}
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(99,102,241,0.15)] group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
            {React.cloneElement(feature.icon, {
              className: "w-6 h-6 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]",
            })}
          </div>
          <h3 className="text-base font-black text-white mb-2 text-center tracking-wide leading-none">
            {feature.title}
          </h3>
          <p className="text-[11px] text-gray-400 leading-relaxed text-center font-medium">
            {feature.desc}
          </p>
        </div>

        {/* Card Back Side (Detailed 3D Glassmorphism) */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-indigo-950/90 to-purple-950/90 border border-indigo-500/30 p-6 rounded-[24px] flex flex-col items-center justify-center shadow-2xl backdrop-blur-md"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-500/25 text-indigo-300 flex items-center justify-center mb-3 shadow-[0_0_12px_rgba(99,102,241,0.3)] animate-pulse">
            <FiActivity className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-white mb-1 text-center tracking-wide leading-none">
            {feature.title}
          </h3>
          <p className="text-[10px] text-indigo-300 font-bold mb-3">
            Enterprise Module Ready
          </p>
          <span className="text-[8px] bg-indigo-600/30 text-indigo-200 px-2.5 py-1 rounded-full border border-indigo-500/40 font-black uppercase tracking-widest leading-none">
            Active System
          </span>
        </div>
      </motion.div>
    </div>
  );
};

const FeaturesSection = () => {
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
    e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
  };

  const features = [
    {
      icon: <FiTool />,
      title: "TecRMI Inside",
      desc: "Direct access to technical data, repair times, and service schedules.",
    },
    {
      icon: <FiBell />,
      title: "Automated Reminders",
      desc: "SMS and email reminders for MOTs, services, and bookings.",
    },
    {
      icon: <FiTruck />,
      title: "Courtesy Vehicles",
      desc: "Manage your courtesy car fleet and loan agreements effortlessly.",
    },
    {
      icon: <FiCalendar />,
      title: "Calendar",
      desc: "Drag-and-drop workshop diary with live day availability.",
    },
    {
      icon: <FiUsers />,
      title: "Customer Management",
      desc: "Comprehensive CRM for customer histories and communication.",
    },
    {
      icon: <FiMonitor />,
      title: "Customer Portal",
      desc: "Allow customers to view invoices, history, and book online.",
    },
    {
      icon: <FiDatabase />,
      title: "Autodata Integration",
      desc: "Seamlessly pull Autodata service schedules and repair times.",
    },
    {
      icon: <FiLayers />,
      title: "GSF Integration",
      desc: "Direct parts ordering from GSF Car Parts within the app.",
    },
    {
      icon: <FiLink />,
      title: "Partslink24",
      desc: "Connect to genuine parts catalogs across all major manufacturers.",
    },
    {
      icon: <FiSearch />,
      title: "MOT Expiry Lookup",
      desc: "Automatic DVSA checks for MOT and Tax status via VRM.",
    },
    {
      icon: <FiMap />,
      title: "Multi-Site Management",
      desc: "Control multiple garage branches from a single dashboard.",
    },
    {
      icon: <FiShoppingCart />,
      title: "Parts Sales",
      desc: "Over-the-counter POS and inventory management.",
    },
    {
      icon: <FiUserCheck />,
      title: "Personnel Management",
      desc: "Track mechanic efficiency, clocking in/out, and holidays.",
    },
    {
      icon: <FiFileText />,
      title: "Purchase Orders",
      desc: "Streamline your parts purchasing and returns process.",
    },
    {
      icon: <FiPieChart />,
      title: "QuickBooks Integration",
      desc: "Two-way sync for invoices, payments, and customers.",
    },
    {
      icon: <FiTrendingUp />,
      title: "Sage Integration",
      desc: "Push your financial data directly into Sage Accounting.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="features"
      className="feature-section py-24 px-6 md:px-12 bg-[#050816] relative"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-7xl mx-auto relative">
        <div className="feature-bg"></div>
        <div className="spotlight absolute inset-0 pointer-events-none"></div>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Everything you need to{" "}
            <span className="text-blue-500">Run Your Garage</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            A complete suite of tools designed specifically for the automotive
            industry. No more jumping between different software.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={
                idx >= 4 && !showAllFeatures ? "hidden sm:block" : "block"
              }
            >
              <FeatureCard feature={feature} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile See More / See Less Button */}
        <div className="flex justify-center mt-12 sm:hidden">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAllFeatures(!showAllFeatures)}
            className="bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-indigo-600/10 px-8 py-3 rounded-2xl text-xs font-bold tracking-widest uppercase transition-all duration-300 text-indigo-300 hover:text-white flex items-center gap-2 shadow-[0_0_15px_rgba(79,70,229,0.1)] cursor-pointer"
          >
            <span>{showAllFeatures ? "See Less" : "See More"}</span>
            <FiChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                showAllFeatures ? "rotate-180" : ""
              }`}
            />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
