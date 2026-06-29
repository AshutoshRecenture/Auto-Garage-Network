import React from "react";

const Footer = () => {
  return (
    <footer className="footer-no-invert bg-[#000000] border-t border-white/5 py-8 text-center text-xs text-gray-500 font-sans mt-auto">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 Auto Garage Network Ltd. All rights reserved.</p>
        <div className="flex gap-4">
          <span className="text-gray-600 font-bold uppercase tracking-wider text-[10px]">
            System Administration Panel
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
