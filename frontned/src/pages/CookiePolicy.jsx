import React, { useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { motion } from "framer-motion";
import SEOHeader from "../components/SEOHeader.jsx";
import privacyBg from "../assets/images/accidental-car-repair-hero-banner-img-1-768x512.webp";

const CookiePolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#050816] text-white">
      <SEOHeader
        title="Cookie Policy | Browser Settings"
        description="Learn how we use cookies on the Auto Garage Network site to personalize your experience, analyze web traffic, and improve portal features."
        keywords="cookie policy, tracking cookies"
        canonicalPath="/cookie-policy"
      />
      <Navbar />
      <main className="flex-grow pt-24 relative overflow-hidden">
        {/* Project Background Image with subtle overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08] dark:opacity-[0.15] mix-blend-overlay">
          <img
            src={privacyBg}
            alt="Garage backdrop"
            className="w-full h-full object-cover select-none"
          />
        </div>

        {/* Hero Header Section */}
        <section className="relative py-20 px-6 md:px-12 overflow-hidden text-center z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-4 py-1.5 rounded-full inline-block mb-4">
              Legal & Compliance
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Cookie{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">
                Policy
              </span>
            </h1>
            <p className="text-gray-300 text-base md:text-lg max-w-xl mx-auto px-4 leading-relaxed">
              Understand how cookies and tracking technologies are utilized to optimize your experience on our platforms.
            </p>
          </motion.div>
        </section>

        {/* Content Section */}
        <section className="py-12 pb-24 px-6 md:px-12 z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-7xl mx-auto bg-[#0c1222]/90 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl space-y-8 text-gray-300 leading-relaxed backdrop-blur-sm"
          >
            <div>
              <p className="text-gray-400 text-sm mb-6">
                Last updated: June 15, 2026
              </p>
              <p className="text-sm md:text-base leading-relaxed">
                This Cookie Policy explains how <strong>Auto Garage Network Ltd</strong> uses cookies and similar technologies (such as web beacons, tracking pixels, and tags) to recognize you when you visit our website at autogaragenetwork.com and associated garage portals.
              </p>
            </div>

            <hr className="border-white/10" />

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">1. What Are Cookies?</h2>
              <p className="text-sm md:text-base leading-relaxed mb-4">
                Cookies are small data files that are stored on your computer or mobile device when you visit a website. They are widely used by website owners to make websites work, or work more efficiently, as well as to provide reporting information.
              </p>
              <p className="text-sm md:text-base leading-relaxed">
                Cookies set by the website owner (in this case, Auto Garage Network Ltd) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., interactive chat, advertising, and analytics).
              </p>
            </div>

            <hr className="border-white/10" />

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">2. Why Do We Use Cookies?</h2>
              <p className="text-sm md:text-base leading-relaxed">
                We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our websites to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies enable us to track and target the interests of our users to enhance their platform experience.
              </p>
            </div>

            <hr className="border-white/10" />

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">3. The Types of Cookies We Use</h2>
              <p className="text-sm md:text-base leading-relaxed mb-4">
                The specific types of first and third-party cookies served through our websites and the purposes they perform are outlined below:
              </p>
              <ul className="space-y-4">
                <li className="bg-[#050816]/30 p-5 rounded-2xl border border-white/5">
                  <strong className="text-white text-base block mb-2">Strictly Necessary Cookies:</strong>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    These cookies are essential to provide you with services available through our website and platform, such as accessing secure areas, database querying, and booking diary states.
                  </p>
                </li>
                <li className="bg-[#050816]/30 p-5 rounded-2xl border border-white/5">
                  <strong className="text-white text-base block mb-2">Performance and Analytics Cookies:</strong>
                  <p className="text-gray-300 text-sm leading-relaxed mb-2">
                    These cookies collect information that is used in aggregate form to help us understand how our website is being used, the efficacy of our marketing campaigns, or to help us customize our platforms.
                  </p>
                  <p className="text-indigo-300 text-sm leading-relaxed font-semibold">
                    * Analytics systems: We utilize Google Analytics (via G-3VXE9GRF5S and AW-16474078641 tracking tags), Microsoft Clarity (wd3xkp0w0f), and Insightful-cloud-7 tracking scripts to record user behavior patterns safely.
                  </p>
                </li>
                <li className="bg-[#050816]/30 p-5 rounded-2xl border border-white/5">
                  <strong className="text-white text-base block mb-2">Functional Cookies:</strong>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    These are used to recognize you when you return to our website. This enables us to personalize our content for you, greet you by name, and remember your preferences (for example, your choice of language, region, or active Dark/Light theme).
                  </p>
                </li>
              </ul>
            </div>

            <hr className="border-white/10" />

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">4. Managing and Controlling Cookies</h2>
              <p className="text-sm md:text-base leading-relaxed mb-4">
                You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality and secure areas of our platforms may be restricted.
              </p>
              <p className="text-sm md:text-base leading-relaxed mb-4">
                Most browsers allow you to manage cookies through their settings:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-gray-300 leading-relaxed">
                <li>Google Chrome</li>
                <li>Apple Safari</li>
                <li>Mozilla Firefox</li>
                <li>Microsoft Edge</li>
              </ul>
            </div>

            <hr className="border-white/10" />

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">5. Updates to This Cookie Policy</h2>
              <p className="text-sm md:text-base leading-relaxed">
                We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
              </p>
            </div>

            <hr className="border-white/10" />

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">6. Questions?</h2>
              <p className="text-sm md:text-base leading-relaxed">
                If you have any questions about our use of cookies or other tracking technologies, please email us at <a href="mailto:info@autogaragenetwork.com" className="text-indigo-400 hover:text-indigo-300 font-semibold">info@autogaragenetwork.com</a>.
              </p>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
