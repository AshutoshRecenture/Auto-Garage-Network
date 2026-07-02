import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLogo } from "../utils/LogoContext.jsx";
import {
  FiMenu,
  FiX,
  FiPhone,
  FiChevronDown,
  FiChevronRight,
  FiLayout,
  FiMonitor,
  FiDatabase,
  FiCalendar,
  FiSend,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaTiktok,
  FaGlobe,
} from "react-icons/fa";

// Elegant icon-only theme toggle
const ThemeToggle = ({ theme, toggleTheme }) => {
  const isLight = theme === "light";

  return (
    <button
      onClick={toggleTheme}
      className={`relative p-2 rounded-full transition-all duration-300 focus:outline-none flex items-center justify-center overflow-hidden border shadow-sm ${
        isLight
          ? "bg-white hover:bg-slate-50 border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.05)]"
          : "bg-white/5 hover:bg-white/10 border-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
      }`}
      aria-label="Toggle theme"
      title={`Switch to ${isLight ? 'dark' : 'light'} mode`}
    >
      <motion.div
        key={theme} // Key forces an instant re-render with a quick pop-in animation
        initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="flex items-center justify-center"
      >
        {isLight ? (
          <FiSun className="w-[18px] h-[18px] text-amber-500" />
        ) : (
          <FiMoon className="w-[18px] h-[18px] text-indigo-400" />
        )}
      </motion.div>
    </button>
  );
};

const Navbar = () => {
  const { logoUrl, navbarLineColor, salesPhone, supportPhone, socialLinks, disabledPages } = useLogo();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("/");

  // Theme state and storage hook
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("no-transitions");

    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
    localStorage.setItem("theme", theme);

    // Force reflow
    window.getComputedStyle(root).opacity;

    const timer = setTimeout(() => {
      root.classList.remove("no-transitions");
    }, 0);
    return () => clearTimeout(timer);
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

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.classList.remove("mobile-menu-open");
    }
    return () => document.body.classList.remove("mobile-menu-open");
  }, [mobileMenuOpen]);

  const handlePreload = (href) => {
    const pages = {
      "/about-us": () => import("../pages/AboutUs.jsx"),
      "/pricing": () => import("../pages/Pricing.jsx"),
      "/garage-management-system": () =>
        import("../pages/GarageManagementSystem.jsx"),
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

  const filteredNavLinks = (navLinks || [])
    .filter((link) => {
      let slug = "";
      if (link.href === "/") slug = "home";
      else if (link.href.startsWith("/p/")) slug = link.href.slice(3);
      else slug = link.href.replace("/", "");
      return !disabledPages || !disabledPages.includes(slug);
    })
    .map((link) => {
      if (link.dropdown) {
        return {
          ...link,
          dropdown: link.dropdown.filter((subItem) => {
            const subSlug = subItem.href.replace("/", "");
            return !disabledPages || !disabledPages.includes(subSlug);
          }),
        };
      }
      return link;
    });

  return (
    <>
      {/* Top Bar with social icons and contacts */}
      <header className={`hidden sm:block fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        theme === "light" ? "bg-white/90 border-slate-200" : "bg-[#050816]/90 border-white/5"
      }`}>
        <div className={`max-w-[1536px] mx-auto px-4 md:px-8 flex items-center justify-between h-10 sm:h-12 text-xs ${
          theme === "light" ? "text-slate-600" : "text-gray-400"
        }`}>
          {/* Social Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {socialLinks && socialLinks.length > 0 ? (
              socialLinks.map((link) => {
                const plat = link.platform.toLowerCase();
                let icon = <FaGlobe size={15} />;
                let colorClass = "text-indigo-400 hover:text-white";
                
                if (plat.includes("facebook")) {
                  icon = <FaFacebookF size={15} />;
                  colorClass = "text-[#1877F2] hover:text-[#1877F2]/80";
                } else if (plat.includes("instagram")) {
                  icon = <FaInstagram size={15} />;
                  colorClass = "text-[#E1306C] hover:text-[#E1306C]/80";
                } else if (plat.includes("twitter") || plat.includes("x.com")) {
                  icon = <FaTwitter size={15} />;
                  colorClass = "text-[#1DA1F2] hover:text-[#1DA1F2]/80";
                } else if (plat.includes("linkedin")) {
                  icon = <FaLinkedinIn size={15} />;
                  colorClass = "text-[#0A66C2] hover:text-[#0A66C2]/80";
                } else if (plat.includes("youtube")) {
                  icon = <FaYoutube size={15} />;
                  colorClass = "text-[#FF0000] hover:text-[#FF0000]/80";
                } else if (plat.includes("tiktok")) {
                  icon = <FaTiktok size={15} />;
                  colorClass = "text-indigo-500 hover:text-indigo-400";
                }

                return (
                  <a
                    key={link._id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${link.platform} page`}
                    className={`${colorClass} transition-colors duration-300`}
                  >
                    {icon}
                  </a>
                );
              })
            ) : (
              <>
                <a
                  href="https://www.facebook.com/autogaragenetworkltd"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our Facebook page"
                  className="text-[#1877F2] hover:text-[#1877F2]/80 transition-colors duration-300"
                >
                  <FaFacebookF size={15} />
                </a>

                <a
                  href="https://www.instagram.com/autogaragenetworkltd.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our Instagram profile"
                  className="text-[#E1306C] hover:text-[#E1306C]/80 transition-colors duration-300"
                >
                  <FaInstagram size={15} />
                </a>

                <a
                  href="https://x.com/autogaragent"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our Twitter profile"
                  className="text-[#1DA1F2] hover:text-[#1DA1F2]/80 transition-colors duration-300"
                >
                  <FaTwitter size={15} />
                </a>

                <a
                  href="https://www.linkedin.com/company/auto-garage-network-ltd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our LinkedIn page"
                  className="text-[#0A66C2] hover:text-[#0A66C2]/80 transition-colors duration-300"
                >
                  <FaLinkedinIn size={15} />
                </a>

                <a
                  href="https://www.youtube.com/channel/UCT8JroOu-4_KT74be6tGUoQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our YouTube channel"
                  className="text-[#FF0000] hover:text-[#FF0000]/80 transition-colors duration-300"
                >
                  <FaYoutube size={15} />
                </a>
              </>
            )}
          </div>

          {/* Contact Numbers */}
          <div className="flex items-center gap-4 sm:gap-8 text-xs sm:text-sm font-medium tracking-wide">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

            {/* Mobile Numbers */}
            <div className="flex sm:hidden flex-col items-end justify-center gap-1 text-[9px] leading-tight">
              <a
                href={`tel:${salesPhone.replace(/\s+/g, "")}`}
                className="hover:text-white transition-colors duration-300 flex items-center"
              >
                <FiPhone size={9} className="mr-1 text-indigo-400" />
                <span>Sales: {salesPhone}</span>
              </a>

              <a
                href={`tel:${supportPhone.replace(/\s+/g, "")}`}
                className="hover:text-white transition-colors duration-300 flex items-center"
              >
                <FiPhone size={9} className="mr-1 text-indigo-400" />
                <span>Services: {supportPhone}</span>
              </a>
            </div>

            {/* Desktop Numbers */}
            <a
              href={`tel:${salesPhone.replace(/\s+/g, "")}`}
              className="hidden sm:flex items-center hover:text-white transition-colors duration-300"
            >
              <FiPhone className="mr-2 text-indigo-400 text-base" />
              <span>Sales: {salesPhone}</span>
            </a>

            <a
              href={`tel:${supportPhone.replace(/\s+/g, "")}`}
              className="hidden sm:flex items-center hover:text-white transition-colors duration-300"
            >
              <FiPhone className="mr-2 text-indigo-400 text-base" />
              <span>Services: {supportPhone}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Navigation Bar */}
      <header
        className={`fixed top-0 sm:top-11 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? theme === "light"
              ? "bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm py-2.5 lg:py-3.5"
              : "bg-[#050816]/95 backdrop-blur-xl border-b shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-2.5 lg:py-3.5"
            : theme === "light"
              ? "bg-white/95 backdrop-blur-md sm:bg-transparent py-4 lg:py-5"
              : "bg-[#050816]/95 backdrop-blur-md sm:bg-transparent py-4 lg:py-5"
        }`}
        style={
          isScrolled
            ? {
                borderBottom: `1px solid ${
                  navbarLineColor === "none"
                    ? "transparent"
                    : navbarLineColor === "indigo"
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
                    : navbarLineColor === "red"
                    ? "#f43f5e"
                    : navbarLineColor || "rgba(255, 255, 255, 0.1)"
                }`,
              }
            : {}
        }
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-30">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex-shrink-0 flex items-center cursor-pointer"
            >
              <img
                src={logoUrl || "/logo-color.png"}
                alt="AG Network Logo"
                className="logo-img h-10 lg:h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
                width="120"
                height="48"
                fetchPriority="high"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center justify-center flex-grow mx-2 xl:mx-6 gap-0.5 xl:gap-1"
              onMouseLeave={() => setHoveredLink(null)}
            >
              {filteredNavLinks.map((link) => {
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
                            : theme === "light"
                              ? "text-slate-800 hover:text-black"
                              : "text-gray-300 hover:text-white"
                        }`}
                        aria-haspopup="true"
                        aria-expanded={
                          dropdownOpen && hoveredLink === link.name
                        }
                      >
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
                                    onMouseEnter={() =>
                                      handlePreload(subItem.href)
                                    }
                                    className={`flex items-start gap-3.5 p-3 rounded-lg transition-all duration-300 ${
                                      isSubActive
                                        ? theme === "light"
                                          ? "bg-indigo-50 border-l-2 border-indigo-500"
                                          : "bg-indigo-500/15 border-l-2 border-indigo-500"
                                        : theme === "light"
                                          ? "hover:bg-slate-50 border-l-2 border-transparent"
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
                                            ? "text-indigo-500"
                                            : theme === "light"
                                              ? "text-slate-800 group-hover:text-indigo-600"
                                              : "text-white group-hover:text-indigo-400"
                                        }`}
                                      >
                                        {subItem.name}
                                      </h4>
                                      <p className={`text-[10px] mt-0.5 leading-relaxed font-normal ${
                                        theme === "light" ? "text-slate-500" : "text-gray-400"
                                      }`}>
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

                linkClass += isActive
                  ? "text-[#2196f3] font-bold"
                  : theme === "light"
                    ? "text-slate-800 hover:text-black"
                    : "text-gray-300 hover:text-white";

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
                    <span>{link.name}</span>
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-[2px] left-3 right-3 h-[2px] bg-[#2196f3] rounded-full"
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
            <div
              className={`lg:hidden flex items-center transition-opacity duration-300 ${mobileMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            >
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-1.5 rounded-md border cursor-pointer transition-colors duration-300 ${
                  theme === "light"
                    ? "text-slate-800 hover:text-slate-900 bg-slate-100 border-slate-200"
                    : "text-gray-300 hover:text-white bg-white/5 border-white/5"
                }`}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
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
            <>
              {/* Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-xs lg:hidden"
              />

              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`fixed right-0 top-0 bottom-0 h-screen w-[82%] max-w-[340px] lg:hidden overflow-hidden shadow-2xl z-[70] flex flex-col transition-all duration-300 ${
                  theme === "light"
                    ? "bg-white border-l border-slate-200"
                    : "bg-[#0d1324] border-l border-white/10"
                }`}
              >
                {/* Drawer Header inside the side panel */}
                <div
                  className={`flex items-center justify-between px-5 py-4 border-b ${
                    theme === "light" ? "border-slate-100" : "border-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Link
                      to="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex-shrink-0 flex items-center"
                    >
                      <img
                        src={logoUrl || "/logo-color.png"}
                        alt="AG Network Logo"
                        className="h-8 w-auto object-contain"
                      />
                    </Link>
                    <div className="no-invert scale-90 origin-left flex items-center">
                      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                    </div>
                  </div>

                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className={`p-1.5 rounded-md border cursor-pointer transition-colors duration-300 ${
                      theme === "light"
                        ? "text-slate-800 hover:text-slate-900 bg-slate-100 border-slate-200"
                        : "text-gray-300 hover:text-white bg-white/5 border-white/5"
                    }`}
                    aria-label="Close menu"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-grow overflow-y-auto px-5 pb-8 pt-4 space-y-6">
                  {/* Services Bento Grid Section */}
                  <div className="space-y-1">
                    <div
                      onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                      className={`flex items-center justify-between py-3 px-1 transition-all duration-200 cursor-pointer select-none ${
                        theme === "light"
                          ? "text-slate-700 hover:text-slate-900"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      <span
                        className={`text-[13px] font-extrabold tracking-wide ${theme === "light" ? "text-slate-800" : "text-white"}`}
                      >
                        Our Services
                      </span>
                      <FiChevronRight
                        className={`w-4 h-4 transition-transform duration-300 ${
                          mobileDropdownOpen
                            ? "rotate-90 text-indigo-500"
                            : theme === "light"
                              ? "text-slate-500"
                              : "text-gray-400"
                        }`}
                      />
                    </div>

                    <AnimatePresence initial={false}>
                      {mobileDropdownOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3">
                            {(
                              filteredNavLinks.find((link) => link.type === "dropdown")
                                ?.dropdown || []
                            ).map((subItem) => {
                              const SubIcon = subItem.icon;
                              return (
                                <Link
                                  key={subItem.name}
                                  to={subItem.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className={`p-3.5 rounded-2xl border flex flex-col items-center text-center justify-center gap-2.5 transition-all duration-300 active:scale-95 ${
                                    theme === "light"
                                      ? "bg-slate-50 border-slate-100 shadow-xs hover:bg-slate-100"
                                      : "bg-white/[0.02] border-white/[0.05] shadow-inner hover:bg-white/[0.05]"
                                  }`}
                                >
                                  <div
                                    className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${subItem.color} flex items-center justify-center shadow-md`}
                                  >
                                    <SubIcon className="text-white w-5 h-5" />
                                  </div>
                                  <span
                                    className={`text-[11px] font-bold leading-tight ${
                                      theme === "light"
                                        ? "text-slate-800"
                                        : "text-white"
                                    }`}
                                  >
                                    {subItem.name}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Navigation List Links */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0.5">
                    {filteredNavLinks
                      .filter((link) => link.type !== "dropdown")
                      .map((link) => {
                        const isActive = activeLink === link.href;

                        let textColor = "";
                        let badge = null;

                        textColor = isActive
                          ? "text-[#2196f3] font-bold"
                          : theme === "light"
                            ? "text-slate-700 hover:text-slate-900"
                            : "text-gray-300 hover:text-white";

                        return (
                          <Link
                            key={link.name}
                            to={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center justify-between py-3 px-1 transition-all duration-200 group active:translate-x-1 ${
                              theme === "light"
                                ? "hover:text-slate-900"
                                : "hover:text-white"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-[13px] font-extrabold tracking-wide ${textColor}`}
                              >
                                {link.name}
                              </span>
                              {badge}
                            </div>

                            {/* Chevron indicator removed per request */}
                          </Link>
                        );
                      })}

                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
