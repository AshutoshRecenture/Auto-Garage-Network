import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiPhone,
  FiChevronDown,
  FiLayout,
  FiMonitor,
  FiDatabase,
  FiCalendar,
  FiSend,
} from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

// Spring-animated theme toggle switch component matching the premium design
const ThemeToggle = ({ theme, toggleTheme }) => {
  const isLight = theme === "light";

  return (
    <div className="flex items-center gap-2.5 select-none font-sans no-invert">
      {/* Light label */}
      <span
        onClick={() => theme !== "light" && toggleTheme()}
        className={`text-xs font-bold cursor-pointer transition-colors duration-300 ${
          isLight
            ? "text-[#0f172a] font-extrabold"
            : "text-gray-400 hover:text-white"
        }`}
      >
        Light
      </span>

      {/* Pill Switch */}
      <button
        onClick={toggleTheme}
        className={`relative w-14 h-7 rounded-full p-1 transition-colors duration-500 focus:outline-none flex items-center cursor-pointer border ${
          isLight
            ? "bg-[#5D8EFA] border-[#5D8EFA]/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"
            : "bg-[#1E293B] border-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"
        }`}
        aria-label="Toggle theme"
      >
        {/* Decorative elements inside track */}
        {/* Light mode: 2 white dots on the right */}
        <div
          className={`absolute right-2.5 flex items-center gap-1 transition-opacity duration-300 pointer-events-none ${
            isLight ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white/90" />
          <div className="w-0.5 h-0.5 rounded-full bg-white/70" />
        </div>

        {/* Dark mode: 2 small stars/dots on the left */}
        <div
          className={`absolute left-2.5 flex items-center gap-1 transition-opacity duration-300 pointer-events-none ${
            !isLight ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-0.5 h-0.5 rounded-full bg-yellow-200/80" />
          <div className="w-1 h-1 bg-yellow-100/90 rounded-full" />
        </div>

        {/* Sliding Knob */}
        <motion.div
          className="w-5 h-5 rounded-full bg-white shadow-md z-10"
          layout
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
          initial={{
            x: isLight ? 0 : 28,
          }}
          animate={{
            x: isLight ? 0 : 28, // 56px (w-14) - 20px (w-5) - 8px (padding) = 28px
          }}
        />
      </button>

      {/* Dark label */}
      <span
        onClick={() => theme !== "dark" && toggleTheme()}
        className={`text-xs font-bold cursor-pointer transition-colors duration-300 ${
          !isLight
            ? "text-white font-extrabold"
            : "text-slate-400 hover:text-slate-600"
        }`}
      >
        Dark
      </span>
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("/");

  // Theme state and storage hook
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const handlePreload = (href) => {
    const pages = {
      "/about-us": () => import("../pages/AboutUs.jsx"),
      "/pricing": () => import("../pages/Pricing.jsx"),
      "/garage-management-system": () => import("../pages/GarageManagementSystem.jsx"),
      "/website-for-garages": () => import("../pages/WebsiteForGarages.jsx"),
      "/autotech-data": () => import("../pages/AutotechData.jsx"),
      "/mot-diary": () => import("../pages/MOTDiary.jsx"),
      "/seo": () => import("../pages/SEO.jsx"),
      "/features": () => import("../pages/Features.jsx"),
      "/latest-work": () => import("../pages/LatestWork.jsx"),
      "/blog": () => import("../pages/Blog.jsx"),
      "/contact-us": () => import("../pages/ContactUs.jsx"),
    };
    const load = pages[href];
    if (load) load().catch(() => {});
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Pricing", href: "/pricing", type: "pricing" },
    {
      name: "Products & Services",
      href: "#",
      type: "dropdown",
      dropdown: [
        {
          name: "Garage Management System",
          href: "/garage-management-system",
          desc: "All-in-one digital workspace for independent garages.",
          icon: FiLayout,
          color: "from-blue-500 to-indigo-600",
        },
        {
          name: "Website for Garages",
          href: "/website-for-garages",
          desc: "Premium, SEO-optimized e-commerce sites.",
          icon: FiMonitor,
          color: "from-indigo-500 to-purple-600",
        },
        {
          name: "Autotech Data",
          href: "/autotech-data",
          desc: "Live vehicle registration & parts lookup.",
          icon: FiDatabase,
          color: "from-purple-500 to-pink-600",
        },
        {
          name: "MOT Diary",
          href: "/mot-diary",
          desc: "Smart booking scheduler with SMS reminders.",
          icon: FiCalendar,
          color: "from-pink-500 to-rose-600",
        },
      ],
    },
    { name: "SEO", href: "/seo", type: "seo" },
    { name: "Features", href: "/features" },
    { name: "Latest Work", href: "/latest-work", type: "latest-work" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  return (
    <>
      {/* Top Bar with social icons and contacts */}
      <header className="hidden sm:block fixed top-0 left-0 right-0 z-50 bg-[#050816]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-[1536px] mx-auto px-4 md:px-8 flex items-center justify-between h-10 sm:h-12 text-gray-400 text-xs">
          {/* Social Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <a
              href="https://www.facebook.com/autogaragenetworkltd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1877F2] hover:text-[#1877F2]/80 transition-colors duration-300"
            >
              <FaFacebookF size={15} />
            </a>

            <a
              href="https://www.instagram.com/autogaragenetworkltd.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E1306C] hover:text-[#E1306C]/80 transition-colors duration-300"
            >
              <FaInstagram size={15} />
            </a>

            <a
              href="https://x.com/autogaragent"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1DA1F2] hover:text-[#1DA1F2]/80 transition-colors duration-300"
            >
              <FaTwitter size={15} />
            </a>

            <a
              href="https://www.linkedin.com/company/auto-garage-network-ltd/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0A66C2] hover:text-[#0A66C2]/80 transition-colors duration-300"
            >
              <FaLinkedinIn size={15} />
            </a>

            <a
              href="https://www.youtube.com/channel/UCT8JroOu-4_KT74be6tGUoQ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF0000] hover:text-[#FF0000]/80 transition-colors duration-300"
            >
              <FaYoutube size={15} />
            </a>
          </div>

          {/* Contact Numbers */}
          <div className="flex items-center gap-4 sm:gap-8 text-xs sm:text-sm font-medium tracking-wide">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

            {/* Mobile Numbers */}
            <div className="flex sm:hidden flex-col items-end justify-center gap-1 text-[9px] leading-tight">
              <a
                href="tel:07947906789"
                className="hover:text-white transition-colors duration-300 flex items-center"
              >
                <FiPhone size={9} className="mr-1 text-indigo-400" />
                <span>Sales: 07947906789</span>
              </a>

              <a
                href="tel:0172655556"
                className="hover:text-white transition-colors duration-300 flex items-center"
              >
                <FiPhone size={9} className="mr-1 text-indigo-400" />
                <span>Services: 0172655556</span>
              </a>
            </div>

            {/* Desktop Numbers */}
            <a
              href="tel:07947906789"
              className="hidden sm:flex items-center hover:text-white transition-colors duration-300"
            >
              <FiPhone className="mr-2 text-indigo-400 text-base" />
              <span>Sales: 07947906789</span>
            </a>

            <a
              href="tel:0172655556"
              className="hidden sm:flex items-center hover:text-white transition-colors duration-300"
            >
              <FiPhone className="mr-2 text-indigo-400 text-base" />
              <span>Services: 0172655556</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Navigation Bar */}
      <header
        className={`fixed top-0 sm:top-11 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-[#050816]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-2.5 lg:py-3.5"
            : "bg-[#050816]/95 backdrop-blur-md sm:bg-transparent py-4 lg:py-5"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex-shrink-0 flex items-center cursor-pointer"
            >
              <img
                src="/logo-color.png"
                alt="AG Network Logo"
                className="logo-img h-10 lg:h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center justify-center flex-grow mx-2 xl:mx-6 gap-0.5 xl:gap-1"
              onMouseLeave={() => setHoveredLink(null)}
            >
              {navLinks.map((link) => {
                const isActive =
                  activeLink === link.href ||
                  (link.dropdown &&
                    link.dropdown.some((d) => activeLink === d.href));

                if (link.type === "dropdown") {
                  return (
                    <div
                      key={link.name}
                      className="relative py-2 px-1"
                      onMouseEnter={() => {
                        setDropdownOpen(true);
                        setHoveredLink(link.name);
                      }}
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      <button
                        className={`flex items-center gap-1.5 text-xs xl:text-[13px] 2xl:text-[14.5px] font-semibold transition-all duration-300 whitespace-nowrap py-2 px-1.5 lg:px-2 xl:px-2.5 2xl:px-3.5 rounded-full relative cursor-pointer ${
                          isActive
                            ? "text-[#2196f3] font-bold"
                            : "text-gray-300 hover:text-white"
                        }`}
                      >
                        {hoveredLink === link.name && (
                          <motion.span
                            layoutId="navHoverPill"
                            className="absolute inset-0 bg-white/5 rounded-full -z-10"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 30,
                            }}
                          />
                        )}
                        <span>{link.name}</span>
                        <FiChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-300 ${
                            dropdownOpen ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {dropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="nav-dropdown absolute left-1/2 -translate-x-1/2 top-full mt-2 w-80 bg-[#0d1324]/98 backdrop-blur-xl rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.08)] p-2.5 z-[100]"
                          >
                            <div className="grid gap-1">
                              {link.dropdown.map((subItem) => {
                                const isSubActive = activeLink === subItem.href;
                                const SubIcon = subItem.icon;
                                return (
                                  <Link
                                    key={subItem.name}
                                    to={subItem.href}
                                    onMouseEnter={() => handlePreload(subItem.href)}
                                    className={`flex items-start gap-3.5 p-3 rounded-lg transition-all duration-300 ${
                                      isSubActive
                                        ? "bg-indigo-500/15 border-l-2 border-indigo-500"
                                        : "hover:bg-white/5 border-l-2 border-transparent"
                                    }`}
                                  >
                                    <div
                                      className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${subItem.color} flex items-center justify-center shrink-0 shadow-md`}
                                    >
                                      <SubIcon className="text-white w-4 h-4" />
                                    </div>
                                    <div className="text-left">
                                      <h4
                                        className={`text-xs font-bold ${
                                          isSubActive
                                            ? "text-indigo-400"
                                            : "text-white group-hover:text-indigo-400"
                                        }`}
                                      >
                                        {subItem.name}
                                      </h4>
                                      <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed font-normal">
                                        {subItem.desc}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                let linkClass =
                  "relative text-xs xl:text-[13px] 2xl:text-[14.5px] font-semibold transition-all duration-300 whitespace-nowrap py-2 px-1.5 lg:px-2 xl:px-2.5 2xl:px-3.5 rounded-full flex items-center ";

                if (link.type === "pricing") {
                  linkClass +=
                    "text-emerald-400 border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/40";
                } else if (link.type === "seo" || link.type === "latest-work") {
                  linkClass +=
                    "text-rose-400 border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 hover:border-rose-500/40";
                } else {
                  linkClass += isActive
                    ? "text-indigo-400 font-bold"
                    : "text-gray-300 hover:text-white";
                }

                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={linkClass}
                    onMouseEnter={() => {
                      setHoveredLink(link.name);
                      handlePreload(link.href);
                    }}
                  >
                    {hoveredLink === link.name && !link.type && (
                      <motion.span
                        layoutId="navHoverPill"
                        className="absolute inset-0 bg-white/5 rounded-full -z-10"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    <span>{link.name}</span>
                    {isActive && !link.type && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-[2px] left-3 right-3 h-[2px] bg-indigo-500 shadow-[0_0_8px_#6366f1] rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile / Tablet Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-1.5 rounded-md border cursor-pointer transition-colors duration-300 ${
                  theme === "light"
                    ? "text-slate-800 hover:text-slate-900 bg-slate-100 border-slate-200"
                    : "text-gray-300 hover:text-white bg-white/5 border-white/5"
                }`}
              >
                {mobileMenuOpen ? (
                  <FiX className="w-6 h-6" />
                ) : (
                  <FiMenu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`lg:hidden border-b overflow-hidden shadow-2xl transition-colors duration-300 ${
                theme === "light"
                  ? "bg-slate-50 border-slate-200"
                  : "bg-[#070b16]/98 backdrop-blur-xl border-white/10"
              }`}
            >
              <div className="px-6 py-6 space-y-4">
                {/* Theme Toggle inside drawer to save space in the main mobile header */}
                <div className={`flex justify-between items-center pb-4 border-b no-invert ${
                  theme === "light" ? "border-slate-200" : "border-white/10"
                }`}>
                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    theme === "light" ? "text-slate-500" : "text-gray-400"
                  }`}>Switch Theme</span>
                  <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                </div>
                {navLinks.map((link) => {
                  const isActive =
                    activeLink === link.href ||
                    (link.dropdown &&
                      link.dropdown.some((d) => activeLink === d.href));

                  if (link.type === "dropdown") {
                    return (
                      <div key={link.name} className="block">
                        <button
                          onClick={() =>
                            setMobileDropdownOpen(!mobileDropdownOpen)
                          }
                          className={`w-full flex items-center justify-between text-base font-semibold py-2 cursor-pointer ${
                            theme === "light" ? "text-blue-600" : "text-[#2196f3]"
                          }`}
                        >
                          <span>{link.name}</span>
                          <FiChevronDown
                            className={`w-5 h-5 transition-transform duration-300 ${
                              mobileDropdownOpen ? "rotate-180" : "rotate-0"
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className={`pl-4 space-y-2 overflow-hidden mt-1 border-l ${
                                theme === "light" ? "border-slate-200" : "border-white/10"
                              }`}
                            >
                              {link.dropdown.map((subItem) => {
                                const isSubActive = activeLink === subItem.href;
                                return (
                                  <Link
                                    key={subItem.name}
                                    to={subItem.href}
                                    onMouseEnter={() => handlePreload(subItem.href)}
                                    className={`block text-sm py-2 transition-colors duration-200 ${
                                      isSubActive
                                        ? (theme === "light" ? "text-blue-600 font-bold" : "text-[#2196f3] font-bold")
                                        : (theme === "light" ? "text-slate-600 hover:text-slate-900" : "text-gray-400 hover:text-white")
                                    }`}
                                    onClick={() => {
                                      setMobileMenuOpen(false);
                                      setMobileDropdownOpen(false);
                                    }}
                                  >
                                    {subItem.name}
                                  </Link>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  let linkClass =
                    "block text-base font-semibold py-2 pl-3 rounded-lg transition-all ";
                  if (link.type === "pricing") {
                    linkClass +=
                      theme === "light"
                        ? "text-emerald-600 border-l-4 border-emerald-500 bg-emerald-50 mt-1 pr-3"
                        : "text-emerald-400 border-l-4 border-[#10b981] bg-emerald-500/5 mt-1 pr-3";
                  } else if (
                    link.type === "seo" ||
                    link.type === "latest-work"
                  ) {
                    linkClass +=
                      theme === "light"
                        ? "text-rose-600 border-l-4 border-rose-500 bg-rose-50 mt-1 pr-3"
                        : "text-rose-400 border-l-4 border-[#f43f5e] bg-rose-500/5 mt-1 pr-3";
                  } else {
                    linkClass += isActive
                      ? (theme === "light"
                          ? "text-indigo-600 border-l-4 border-indigo-500 bg-indigo-50 font-bold"
                          : "text-indigo-400 border-l-4 border-indigo-500 bg-indigo-500/5 font-bold")
                      : (theme === "light"
                          ? "text-slate-700 border-l-4 border-transparent hover:text-slate-950 hover:bg-slate-100"
                          : "text-gray-300 border-l-4 border-transparent hover:text-white hover:bg-white/5");
                  }

                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={linkClass}
                      onMouseEnter={() => handlePreload(link.href)}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  );
                })}

                {/* Mobile Drawer Contacts & Socials */}
                <div className={`pt-6 border-t space-y-5 ${
                  theme === "light" ? "border-slate-200" : "border-white/10"
                }`}>
                  <div className="space-y-3">
                    <p className={`text-[10px] uppercase tracking-wider font-extrabold ${
                      theme === "light" ? "text-slate-400" : "text-gray-500"
                    }`}>
                      Contact Info
                    </p>
                    <div className="grid grid-cols-1 gap-2.5">
                      <a
                        href="tel:07947906789"
                        className={`flex items-center text-sm transition-colors duration-300 ${
                          theme === "light" ? "text-slate-700 hover:text-slate-950" : "text-gray-300 hover:text-white"
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center mr-2.5 shrink-0 border ${
                          theme === "light"
                            ? "bg-slate-100 border-slate-200 text-indigo-600"
                            : "bg-white/5 border-white/5 text-indigo-400"
                        }`}>
                          <FiPhone className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-semibold text-xs tracking-wide">
                          Sales: 07947906789
                        </span>
                      </a>
                      <a
                        href="tel:0172655556"
                        className={`flex items-center text-sm transition-colors duration-300 ${
                          theme === "light" ? "text-slate-700 hover:text-slate-950" : "text-gray-300 hover:text-white"
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center mr-2.5 shrink-0 border ${
                          theme === "light"
                            ? "bg-slate-100 border-slate-200 text-indigo-600"
                            : "bg-white/5 border-white/5 text-indigo-400"
                        }`}>
                          <FiPhone className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-semibold text-xs tracking-wide">
                          Services: 0172655556
                        </span>
                      </a>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className={`text-[10px] uppercase tracking-wider font-extrabold ${
                      theme === "light" ? "text-slate-400" : "text-gray-500"
                    }`}>
                      Follow Us
                    </p>
                    <div className="flex items-center space-x-3.5">
                      <a
                        href="https://www.facebook.com/autogaragenetworkltd"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-9 h-9 rounded-lg flex items-center justify-center text-[#1877F2] transition-all duration-300 border shadow-md hover:scale-105 ${
                          theme === "light" ? "bg-slate-100 border-slate-200 hover:bg-[#1877F2]/10" : "bg-white/5 border-white/5 hover:bg-[#1877F2]/10"
                        }`}
                      >
                        <FaFacebookF size={14} />
                      </a>
                      <a
                        href="https://www.instagram.com/autogaragenetworkltd.uk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-9 h-9 rounded-lg flex items-center justify-center text-[#E1306C] transition-all duration-300 border shadow-md hover:scale-105 ${
                          theme === "light" ? "bg-slate-100 border-slate-200 hover:bg-[#E1306C]/10" : "bg-white/5 border-white/5 hover:bg-[#E1306C]/10"
                        }`}
                      >
                        <FaInstagram size={14} />
                      </a>
                      <a
                        href="https://x.com/autogaragent"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-9 h-9 rounded-lg flex items-center justify-center text-[#1877F2] transition-all duration-300 border shadow-md hover:scale-105 ${
                          theme === "light" ? "bg-slate-100 border-slate-200 hover:bg-[#1DA1F2]/10" : "bg-white/5 border-white/5 hover:bg-[#1DA1F2]/10"
                        }`}
                      >
                        <FaTwitter size={14} />
                      </a>
                      <a
                        href="https://www.linkedin.com/company/auto-garage-network-ltd/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-9 h-9 rounded-lg flex items-center justify-center text-[#0A66C2] transition-all duration-300 border shadow-md hover:scale-105 ${
                          theme === "light" ? "bg-slate-100 border-slate-200 hover:bg-[#0A66C2]/10" : "bg-white/5 border-white/5 hover:bg-[#0A66C2]/10"
                        }`}
                      >
                        <FaLinkedinIn size={14} />
                      </a>
                      <a
                        href="https://www.youtube.com/channel/UCT8JroOu-4_KT74be6tGUoQ"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-9 h-9 rounded-lg flex items-center justify-center text-[#FF0000] transition-all duration-300 border shadow-md hover:scale-105 ${
                          theme === "light" ? "bg-slate-100 border-slate-200 hover:bg-[#FF0000]/10" : "bg-white/5 border-white/5 hover:bg-[#FF0000]/10"
                        }`}
                      >
                        <FaYoutube size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
