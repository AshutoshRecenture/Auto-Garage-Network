import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheckCircle, FiArrowRight } from "react-icons/fi";
import SEOHeader from "../components/SEOHeader.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

// Import downloaded mockup assets
import dashboardImg from "../assets/images/dashboard-img-one.webp";
import autodataDiagrame from "../assets/images/autodata_diagrame.webp";
import chassisImg from "../assets/images/auto_network_img01.webp";
import chassisImgSlide from "../assets/images/auto_network_img_slide.webp";

const AutotechData = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const autodataFeatures = [
    {
      title: "We partner with Autodata",
      desc: "The most trusted and easy-to-use source of comprehensive technical information for vehicle maintenance, diagnostic and repair procedures.",
    },
    {
      title: "Unlimited trial users",
      desc: "The number of users for the trial period is unlimited, and no credit card is needed. This makes Mr. Bassi's platform more than 50% more cost-effective than our competitors.",
    },
    {
      title: "Direct UK database access",
      desc: "Garages have direct access to one of the UK's most comprehensive Vehicle Technical Data systems at the click of a button.",
    },
    {
      title: "99% Vehicle coverage",
      desc: "We have developed a user-friendly platform with up-to-date data covering over 99% of the vehicles on the road, including over 3000 models, 130 marques, 90,000 images, and 58,000 illustrated procedures.",
    },
  ];

  const specItems = [
    "Factory correct OE information on 30000 models from tie-ups with 130 manufacturers",
    "Consolidated data encompasses 98.6% on-road vehicle models",
    "Approximately 90000 ballpark illustrations and wiring diagrams furnished",
    "Scientifically illustrated 58000 procedures",
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#050816] text-white">
      <SEOHeader
        title="Autotech Data Integration | OE Repair Manuals"
        description="Access official UK factory-correct OE vehicle information, diagnostic wiring diagrams, maintenance manuals, recall data, and specifications."
        keywords="Autotech data, Autodata integration, Solera vehicle data, garage repair manuals, wiring diagrams"
        canonicalPath="/autotech-data"
      />
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* ══════════════════════════════════════════
            HERO SECTION
        ══════════════════════════════════════════ */}
        <section className="relative pt-6 pb-20 lg:pt-8 lg:pb-28 px-6 md:px-12 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Column: Heading & Info */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-4 py-1.5 rounded-full inline-block">
                Autotech Data Integration
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                An Online OE Information Tool Offering Exclusive, Precise Technical Information to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                  Equip Your Garage with Technical Prowess
                </span>
              </h1>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl">
                Whether it is vehicle maintenance, diagnostics or repair, our omnipresent tool brings it all to your fingertips! Our manuals are the bible for garages and auto-centres serving modern vehicles in the UK.
              </p>
              <div className="pt-2">
                <Link
                  to="/contact-us"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-[#ffffff] font-extrabold rounded-full shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer text-sm"
                >
                  Free Trial For Garage Only <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: Dashboard Mockup */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="absolute inset-0 bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none" />
              <div className="relative border border-white/10 rounded-2xl overflow-hidden shadow-2xl bg-[#0c1222]/80 p-2 w-full transition-transform duration-500 hover:scale-[1.02]">
                <img
                  src={dashboardImg}
                  alt="Autotech Data dashboard mockup"
                  className="w-full h-auto rounded-xl object-cover block"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
              </AnimatePresence>
            </div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════
            SOLERA AUTODATA PARTNERSHIP
        ══════════════════════════════════════════ */}
        <section className="py-20 px-6 bg-[#0a0f24]/30 border-y border-white/5 relative overflow-hidden">
          <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
            {/* Left: Branding & Bullets */}
            <div className="lg:col-span-7 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-black text-indigo-400">SOLERA</span>
                  <span className="text-xl text-gray-500 font-light">|</span>
                  <span className="text-2xl font-black text-gray-300">Autodata</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider">Vehicle Repair Integration</h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="grid sm:grid-cols-2 gap-6"
              >
                {autodataFeatures.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <FiCheckCircle className="text-indigo-400 w-5 h-5 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-white text-sm tracking-tight">{item.title}</h4>
                      <p className="text-gray-400 text-xs leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Technical Diagram Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative border border-white/10 rounded-2xl overflow-hidden shadow-2xl bg-[#0c1222]/80 p-2 max-w-lg w-full transition-transform duration-500 hover:scale-[1.02]">
                {/* Mock Browser Header */}
                <div className="bg-[#111827] px-4 py-2 flex items-center space-x-1.5 border-b border-white/5 select-none shrink-0 rounded-t-xl">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  <div className="mx-auto w-1/2 h-4 bg-[#0c1222] rounded text-[8px] font-bold text-gray-500 flex items-center justify-center border border-white/5">
                    autodata-group.com
                  </div>
                </div>
                <img
                  src={autodataDiagrame}
                  alt="Solera Autodata engine diagram specs"
                  className="w-full h-auto object-cover rounded-b-xl block bg-white"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            TRANSITION VISION BANNER (PRESERVED DARK)
        ══════════════════════════════════════════ */}
        <section className="py-20 px-6 bg-[#0c1222] border-b border-white/5 relative overflow-hidden dark-card-preserve">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10 space-y-10">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Corporate Vision</span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
                Welcome To Autotechdata for Vehicle Technical Data
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 text-gray-400 text-sm md:text-base leading-relaxed">
              <div className="space-y-4">
                <p>
                  At Autotechdata, we bring a world-class, state-of-the-art OE Information Tool that enables you to manage your garage in a more efficient way while staying on the go.
                </p>
                <p>
                  With our iconic OE information tool, you can manage every aspect of your business. This OE information equips your garage with technical prowess by providing distinct, accurate technical specifications.
                </p>
              </div>
              <div className="space-y-4">
                <p>
                  Our ubiquitous tool puts everything at your fingertips, whether it's car maintenance, diagnostics, or repair! Our manuals are the bible for garages and auto-centres in the UK that service current automobiles.
                </p>
                <p>
                  You can count on accuracy that will far exceed your expectations. Autotechdata's precise wiring diagrams, benchmark diagnostics, and repair information will appeal to qualified, experienced technicians and mechanics, as well as any other car specialist.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            UNRIVALLED DATA SECTION
        ══════════════════════════════════════════ */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Component Diagram Mockup */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 relative flex justify-center"
            >
              <div className="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
              <div className="relative border border-white/10 rounded-2xl overflow-hidden shadow-2xl bg-[#0c1222]/80 p-2 max-w-lg w-full transition-transform duration-500 hover:scale-[1.02]">
                <img
                  src={chassisImg}
                  alt="Vehicle chassis specification diagram"
                  className="w-full h-auto rounded-xl object-cover block bg-white"
                />
              </div>
            </motion.div>

            {/* Right: Spec details */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">Unrivalled Data</h2>
              <div className="space-y-4">
                {specItems.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <span className="w-5 h-5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      ✓
                    </span>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed font-medium">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-gray-500 text-xs italic pt-4">
                *This offer is valid for companies in automotive and automobile industry only.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FACTORY CORRECT INFORMATION
        ══════════════════════════════════════════ */}
        <section className="py-20 px-6 bg-[#0a0f24]/30 border-t border-white/5 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
            {/* Left: Info & Button */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                Factory Correct Information
              </h2>
              <p className="text-gray-400 text-base leading-relaxed">
                It is easy for factory correct OE information to meet the eyes, as you can witness in the slide show above. If the evident precision in the stated technical information, illustrations, and drawings successfully stirs your interest, click the button below and allow us to elaborate further on this amazing tool and its features!
              </p>
              <div className="pt-4">
                <Link
                  to="/contact-us"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-[#ffffff] font-extrabold rounded-full shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer text-sm"
                >
                  Click Here <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right: Mockup Drawing */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 relative flex justify-center"
            >
              <div className="absolute inset-0 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />
              <div className="relative border border-white/10 rounded-2xl overflow-hidden shadow-2xl bg-[#0c1222]/80 p-2 max-w-lg w-full transition-transform duration-500 hover:scale-[1.02]">
                <img
                  src={chassisImgSlide}
                  alt="Factory technical specs layout"
                  className="w-full h-auto rounded-xl object-cover block bg-white"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            LOOKUP PRICING PACKAGES
        ══════════════════════════════════════════ */}
        <section className="py-20 px-6 border-t border-white/5 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10 space-y-12">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-4 py-1.5 rounded-full inline-block">
                On-Demand Top-ups
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white">
                Autodata Lookup Packages
              </h2>
              <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                Choose a flexible, one-off lookup bundle to fit your workshop's volume. Pay only for the data lookups you need, with no long-term commitments.
              </p>
            </div>

            {/* Grid of Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 items-stretch">
              {[
                { count: 50, price: 15 },
                { count: 100, price: 30 },
                { count: 150, price: 43 },
                { count: 200, price: 55 },
                { count: 300, price: 70 }
              ].map((tier, idx) => (
                <div
                  key={idx}
                  className="bg-[#0c1222]/80 border border-white/5 hover:border-blue-500/30 rounded-2xl p-6 flex flex-col justify-between text-center transition-all duration-300 shadow-xl"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] text-gray-500 font-bold block uppercase tracking-wider">Top-up Plan</span>
                    <h4 className="text-base font-black text-white uppercase tracking-wider">{tier.count} Lookups</h4>
                    <div className="text-3xl font-black text-blue-400 pt-2">£{tier.price}</div>
                    <span className="text-[10px] text-gray-500 block">One-off Payment</span>
                  </div>
                  
                  <Link
                    to="/contact-us"
                    state={{ interest: "Autotech Data Integration" }}
                    className="w-full mt-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-[#ffffff] font-bold rounded-xl transition-all text-xs cursor-pointer inline-block text-center shadow-md hover:shadow-lg"
                  >
                    Select Package
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AutotechData;
