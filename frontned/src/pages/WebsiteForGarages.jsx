import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheckCircle, FiMail, FiArrowRight, FiInfo } from "react-icons/fi";
import SEOHeader from "../components/SEOHeader.jsx";
import Navbar from "../components/Navbar.jsx";
import WebsiteSolutions from "../components/WebsiteSolutions.jsx";
import Footer from "../components/Footer.jsx";
import aboutImg from "../assets/about-img-add.jpg";
import websiteForGaragesImg from "../assets/images/website-for-garages.png";

const WebsiteForGarages = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const offers = [
    {
      title: "Customer-Oriented Design",
      desc: "Intuitive, responsive user interfaces that make it easy for customers to access your services with just a few clicks.",
    },
    {
      title: "Increased Traffic & Sales",
      desc: "Unique designs, social media integration, and multi-browser compatibility to drive customer engagement and conversions.",
    },
    {
      title: "Flexible & Customised Solutions",
      desc: "Tailored to your garage's unique needs, offering services like MOT booking, car servicing, diagnostics, and tyre purchases.",
    },
    {
      title: "Enhanced User Experience",
      desc: "A smooth and satisfying browsing experience that keeps customers coming back.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#050816] text-white">
      <SEOHeader
        title="E-Commerce Websites for UK Garages"
        description="Get a custom-branded, SEO-optimized e-commerce website with vehicle registration search lookup, MOT booking gateway, and wholesale tyre distributor stock integration."
        keywords="garage website builder, UK tyre website, MOT booking website, e-commerce for workshops"
        canonicalPath="/website-for-garages"
      />
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* ══════════════════════════════════════════
            HERO BANNER
        ══════════════════════════════════════════ */}
        <section 
          className="relative py-24 md:py-32 overflow-hidden bg-cover bg-center garage-hero-banner" 
          style={{ backgroundImage: `url(${aboutImg})` }}
        >
          {/* Blue/Navy tint brand overlay */}
          <div className="absolute inset-0 bg-[#060b26]/85 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#243cc6ff]/35 via-transparent to-[#050816]" />
          
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-black tracking-widest text-white uppercase"
            >
              Garage Website
            </motion.h1>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SUB-HERO SECTION
        ══════════════════════════════════════════ */}
        <section className="py-16 md:py-20 px-6 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight"
            >
              Get Your Free Garage Website Today
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Take advantage of our state-of-the-art website design technology to establish your brand online and kick-start your digital journey.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="pt-4"
            >
              <Link
                to="/contact-us"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-[#ffffff] font-extrabold rounded-full shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                Get a Free Quote <FiArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            INTRODUCTION & WHY GO ONLINE
        ══════════════════════════════════════════ */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Card 1: We at AGN */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#0c1222]/60 border border-white/5 p-8 rounded-3xl shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Who We Are</span>
                <h3 className="text-2xl font-black text-white">We at Auto Garage Network</h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  At Auto Garage Network, we specialise in developing personalised e-commerce websites tailored to meet the unique needs of garages. With years of experience and a deep understanding of the automotive market, our team creates solutions that help your business thrive online.
                </p>
              </div>
            </motion.div>

            {/* Card 2: Why Go Online */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#0c1222]/60 border border-white/5 p-8 rounded-3xl shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">The Digital Edge</span>
                <h3 className="text-2xl font-black text-white">Why Go Online?</h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  Managing the diverse aspects of a garage—servicing, diagnostics, tyre sales, alignment services, and more—can quickly become complex. That's why we're here to simplify it all.
                </p>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  Our digital transformation solutions equip you with a complete, centralised database system to synchronise all your operations. From inventory management and service records to product pricing and revenue tracking, everything is owner-controlled, ensuring data security and seamless operations.
                </p>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed font-semibold">
                  With our help, your garage can become more efficient, secure, and hassle-free, giving you the freedom to focus on growing your business.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            WHY CHOOSE US & MOCKUP
        ══════════════════════════════════════════ */}
        <section className="py-20 px-6 bg-[#0a0f24]/30 border-y border-white/5 relative overflow-hidden">
          <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
            {/* Left: Text & Features */}
            <div className="lg:col-span-7 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h2 className="text-3xl md:text-4xl font-extrabold text-white">Why Choose Us?</h2>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  At Auto Garage Network, your website isn't just another URL—it's a powerful marketing tool that shapes your brand reputation. Our dedicated team of developers, analysts, designers, and writers uses cutting-edge methods to deliver a garage website that exceeds your expectations with a quick turnaround.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-white border-b border-white/10 pb-2">What We Offer</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {offers.map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <FiCheckCircle className="text-blue-500 w-5 h-5 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <h4 className="font-extrabold text-white text-sm tracking-tight">{item.title}</h4>
                        <p className="text-gray-400 text-xs leading-relaxed font-medium">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: Mockup Image inside styled frame */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 relative flex justify-center"
            >
              <div className="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
              <div className="relative border border-white/10 rounded-2xl overflow-hidden shadow-2xl bg-[#0c1222]/80 p-2 max-w-md w-full transition-transform duration-500 hover:scale-[1.02]">
                <img
                  src={websiteForGaragesImg}
                  alt="Garage website frontend preview mockup"
                  className="w-full h-auto rounded-xl object-cover block"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            OUR COMMITMENT
        ══════════════════════════════════════════ */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#0c1222] via-[#0c1222]/90 to-indigo-950/20 border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden dark-card-preserve"
            >
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="relative z-10 max-w-4xl space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Our Commitment</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                  We are dedicated to delivering websites that are impactful, customised, and user-focused.
                </h2>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  Our designs help you expand your business, establish a strong brand reputation, and build lasting customer loyalty. Experience innovative web design by experts at affordable prices — pay only for what you need.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <a
                    href="mailto:info@autogaragenetwork.com"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-[#ffffff] font-bold rounded-xl shadow-md transition-all duration-300 shrink-0"
                  >
                    <FiMail className="w-5 h-5" /> info@autogaragenetwork.com
                  </a>
                  <span className="text-gray-500 text-xs md:text-sm font-semibold flex items-center gap-1.5">
                    <FiInfo className="w-4 h-4 shrink-0 text-indigo-400" /> Share your ideas, and we'll get back to you with a quote you can't refuse.
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            LIVE INTERACTIVE PREVIEW
        ══════════════════════════════════════════ */}
        <div className="border-t border-white/5">
          <div className="text-center pt-20">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-4 py-1.5 rounded-full inline-block mb-2">
              Live Interactive Demo
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Explore Website Templates</h2>
            <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto mt-3 px-6">
              Test out the responsive design, check booking flow templates, and experience what we build for garages.
            </p>
          </div>
          <WebsiteSolutions />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WebsiteForGarages;
