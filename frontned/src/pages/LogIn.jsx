import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiArrowLeft } from "react-icons/fi";
import SEOHeader from "../components/SEOHeader.jsx";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Demo credentials accepted. Entering sandbox dashboard...");
      window.location.href = "/garage-management-system";
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-sans bg-[#050816] text-white px-6 relative overflow-hidden">
      <SEOHeader
        title="Log In to Your Portal Account"
        description="Log in securely to your Auto Garage Network portal to manage bookings, view dashboard reports, and track your workshop schedule."
        keywords="garage portal login, GMS sign in, workshop dashboard login"
        canonicalPath="/login"
      />
      {/* Subtle glowing elements */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-[#0c1222]/85 border border-white/5 p-8 md:p-10 rounded-3xl shadow-2xl relative z-10"
      >
        <Link to="/" className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-white mb-8 transition-colors">
          <FiArrowLeft /> Back to Website
        </Link>

        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center text-lg font-black text-white shadow-lg shadow-indigo-500/35 mx-auto mb-4">
            A
          </div>
          <h1 className="text-2xl font-black">Portal Sign In</h1>
          <p className="text-gray-400 text-xs mt-1">Access your Garage Management System Dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-500">Email Address</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <FiMail />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@workshop.com"
                className="w-full bg-[#070b18] border border-white/10 focus:border-indigo-500 rounded-xl pl-11 pr-4 py-3 text-sm outline-none text-white transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-[10px] uppercase font-bold text-gray-500">Password</label>
              <a href="#" className="text-[10px] text-indigo-400 hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <FiLock />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#070b18] border border-white/10 focus:border-indigo-500 rounded-xl pl-11 pr-4 py-3 text-sm outline-none text-white transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-6"
          >
            <span>{loading ? "Authenticating..." : "Sign In"}</span>
          </button>
        </form>

        <div className="text-center mt-6 border-t border-white/5 pt-6 text-xs text-gray-500">
          Not a client yet? <Link to="/contact-us" className="text-indigo-400 font-bold hover:underline">Request a demo</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LogIn;
