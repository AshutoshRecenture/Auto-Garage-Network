import React, { useState, useEffect, useRef } from "react";
import { useLogo } from "../utils/LogoContext.jsx";
import { FiMoon, FiSun, FiBell, FiMail, FiMessageSquare, FiX, FiCheck } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ role, notifications = [], setNotifications }) => {
  const { logoUrl, navbarLineColor } = useLogo();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem("agn_admin_theme");
    if (savedTheme === "light") {
      setIsDarkMode(false);
      document.documentElement.classList.add("light-mode");
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.remove("light-mode");
    }
  }, []);

  // Click outside to close notification dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.add("light-mode");
      localStorage.setItem("agn_admin_theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.remove("light-mode");
      localStorage.setItem("agn_admin_theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0c1222]/85 backdrop-blur-md border-b border-white/10 select-none font-sans no-invert transition-all duration-300">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <img src={logoUrl} alt="Auto Garage Network Logo" className="h-9 w-auto object-contain" />
          <span className="text-[10px] tracking-widest font-black uppercase text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Admin Suite
          </span>
        </div>

        {/* Info & Actions */}
        <div className="flex items-center gap-6">
          <span className="text-gray-400 text-xs font-semibold hidden sm:inline-block">
            Port: 5174 (Standalone)
          </span>

          {/* Notification Bell & Dropdown (Super Admin Only) */}
          {role === "super_admin" && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-all cursor-pointer flex items-center justify-center"
                title="Notifications"
              >
                <FiBell size={18} />
                {notifications.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-[#0c1222]">
                    {notifications.length}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-80 sm:w-96 bg-[#0c1222]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
                  >
                    {/* Header */}
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        <h4 className="text-xs font-black text-white tracking-wider uppercase">
                          Notifications ({notifications.length})
                        </h4>
                      </div>
                      {notifications.length > 0 && (
                        <button
                          onClick={() => {
                            setNotifications([]);
                            setIsOpen(false);
                          }}
                          className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 px-2.5 py-1 rounded-lg border border-indigo-500/20 transition-all cursor-pointer"
                        >
                          Clear All
                        </button>
                      )}
                    </div>

                    {/* Notification List */}
                    <div className="max-h-[320px] overflow-y-auto divide-y divide-white/5 pr-1">
                      {notifications.length > 0 ? (
                        notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className="p-3.5 flex items-start justify-between gap-3 hover:bg-white/[0.02] transition-all"
                          >
                            <div className="flex gap-3">
                              <span className="mt-0.5 text-indigo-400 shrink-0 p-1.5 bg-indigo-500/5 border border-indigo-500/10 rounded-lg">
                                {notif.type === "contact" ? (
                                  <FiMail size={14} />
                                ) : (
                                  <FiMessageSquare size={14} />
                                )}
                              </span>
                              <div>
                                <p className="text-xs font-semibold text-slate-200 leading-normal">
                                  <span className="font-bold text-white">{notif.title}</span>: {notif.message}
                                </p>
                                <span className="text-[9px] text-gray-500 font-medium mt-1 inline-block">
                                  {new Date(notif.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() =>
                                setNotifications(
                                  notifications.filter((n) => n.id !== notif.id)
                                )
                              }
                              className="text-gray-500 hover:text-red-400 p-1 hover:bg-white/5 rounded-lg transition-all cursor-pointer shrink-0"
                              title="Dismiss notification"
                            >
                              <FiX size={12} />
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 flex flex-col items-center justify-center text-center">
                          <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                            <FiCheck size={20} />
                          </div>
                          <p className="text-xs font-bold text-slate-300">All caught up!</p>
                          <p className="text-[10px] text-gray-500 mt-1 font-medium">No new notifications from leads.</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-all cursor-pointer flex items-center justify-center"
            title="Toggle Light/Dark Mode"
          >
            {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
        </div>
      </div>
      {/* Bottom accent border matching main page lining settings */}
      {navbarLineColor !== "none" && (
        <div
          className="h-[2px] w-full transition-all duration-300"
          style={{
            backgroundColor:
              navbarLineColor === "indigo"
                ? "#6366f1"
                : navbarLineColor === "blue"
                ? "#3b82f6"
                : navbarLineColor === "violet"
                ? "#8b5cf6"
                : navbarLineColor === "emerald"
                ? "#10b981"
                : navbarLineColor === "cyan"
                ? "#06b6d4"
                : navbarLineColor === "pink"
                ? "#ec4899"
                : navbarLineColor,
          }}
        />
      )}
    </header>
  );
};

export default Navbar;
