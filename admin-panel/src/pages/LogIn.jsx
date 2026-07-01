import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiArrowLeft } from "react-icons/fi";
import SEOHeader from "../components/SEOHeader.jsx";
import ReCaptcha from "../components/ReCaptcha.jsx";
import { API_URL } from "../config";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!captchaToken) {
      setErrorMsg("Please verify that you are not a robot.");
      return;
    }
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, captchaToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to log in");
      }

      if (data.role !== "admin" && data.role !== "super_admin") {
        throw new Error("Access Denied: You do not have administrator privileges.");
      }

      // Store credentials in localStorage
      localStorage.setItem("agn_token", data.token);
      localStorage.setItem("agn_user_role", data.role);
      localStorage.setItem("agn_user_name", data.name);
      localStorage.setItem("agn_user_email", data.email);
      localStorage.setItem("agn_user_permissions", JSON.stringify(data.permissions || {}));
      localStorage.setItem("agn_admin_authenticated", "true");

      alert(`Welcome back, ${data.name}!`);
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Invalid credentials.");
    } finally {
      setLoading(false);
      window.dispatchEvent(new Event("reset-captcha"));
      setCaptchaToken(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-sans bg-[#050816] text-white px-6 relative overflow-hidden">
      <SEOHeader title="Log In to Admin Suite" />

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
        <a
          href="http://localhost:5173"
          className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <FiArrowLeft /> Back to Website
        </a>

        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center text-lg font-black text-white shadow-lg shadow-indigo-500/35 mx-auto mb-4">
            A
          </div>
          <h1 className="text-2xl font-black">Admin Sign In</h1>
          <p className="text-gray-400 text-xs mt-1">
            Access the Standalone Admin Control Suite
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-xl text-center mb-4">
              {errorMsg}
            </div>
          )}
          <div className="space-y-1">
            <label
              htmlFor="login-email"
              className="text-[10px] uppercase font-bold text-slate-400"
            >
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <FiMail />
              </span>
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@autogaragenetwork.com"
                className="w-full bg-[#070b18] border border-white/10 focus:border-indigo-500 rounded-xl pl-11 pr-4 py-3 text-sm outline-none text-white transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label
                htmlFor="login-password"
                className="text-[10px] uppercase font-bold text-slate-400"
              >
                Password
              </label>
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <FiLock />
              </span>
              <input
                id="login-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#070b18] border border-white/10 focus:border-indigo-500 rounded-xl pl-11 pr-4 py-3 text-sm outline-none text-white transition-colors"
              />
            </div>
          </div>

          <ReCaptcha 
            onVerify={(token) => setCaptchaToken(token)} 
            onExpired={() => setCaptchaToken(null)} 
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-6"
          >
            <span>{loading ? "Authenticating..." : "Sign In"}</span>
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LogIn;
