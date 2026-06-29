import React from "react";
import { useLogo } from "../utils/LogoContext.jsx";

const Navbar = () => {
  const { logoUrl, navbarLineColor } = useLogo();

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

        {/* Info */}
        <div className="flex items-center gap-6">
          <span className="text-gray-400 text-xs font-semibold">
            Port: 5174 (Standalone)
          </span>
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
