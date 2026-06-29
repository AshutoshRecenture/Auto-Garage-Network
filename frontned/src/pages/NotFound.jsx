import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHome, FiAlertCircle } from "react-icons/fi";
import SEOHeader from "../components/SEOHeader.jsx";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center font-sans bg-[#050816] text-white px-6 relative overflow-hidden">
      <SEOHeader title="Page Not Found | 404" />
      
      {/* Glow backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#6366f1]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="text-center relative z-10 max-w-lg space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative inline-block"
        >
          <h1 className="text-8xl md:text-9xl font-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent select-none tracking-tight">
            404
          </h1>
          <div className="absolute -bottom-2 right-4 flex items-center gap-1.5 bg-red-500/10 border border-red-500/30 text-red-400 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider">
            <FiAlertCircle size={10} />
            <span>Error</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-3"
        >
          <h2 className="text-2xl md:text-3xl font-black text-white">Oops! Page Not Found</h2>
          <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="pt-4"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-6 py-3 rounded-full transition-all shadow-lg shadow-indigo-500/20 cursor-pointer"
          >
            <FiHome size={14} />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
