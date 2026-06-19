import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SEOHeader from "../components/SEOHeader.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import aboutImg from "../assets/about-img-add.jpg";
import videoPoster from "../assets/video-img-01.png";
const founderVideo = "/Agn_01.mp4";
import featureImg3 from "../assets/feature-img3.jpg";
import {
  FiUsers,
  FiCpu,
  FiTrendingUp,
  FiSmile,
  FiAward,
  FiShield,
  FiMonitor,
  FiCheckCircle,
  FiArrowRight,
} from "react-icons/fi";

/* ─── Stat square data from the real AGN website ─── */
const stats = [
  { value: "550K+", label: "Active Users", color: "#00b4a0" }, // teal
  { value: "200+", label: "Team Members", color: "#2196f3" }, // blue
  { value: "65+", label: "Mobile App's", color: "#243cc6ff" }, // dark navy
  { value: "6 Years", label: "In Business", color: "#f9a825" }, // amber
  { value: "425+", label: "Clients Worldwide", color: "#1d32a3ff" }, // dark navy
  { value: "500+", label: "Projects Completed", color: "#2196f3" }, // blue
];

/* ─── Core values ─── */
const values = [
  {
    title: "Customer-Centric Partnership",
    desc: "We act as a lifetime e-partner for garage owners, building bespoke digital solutions that match their unique workflow needs.",
    icon: FiSmile,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    title: "Innovation & Performance",
    desc: "Creating lightning-fast web solutions that prompt digital transformation and drive high-performance results for modern garages.",
    icon: FiCpu,
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    title: "Growth & SEO Focus",
    desc: "We don't just build websites — we design SEO strategies that position workshops at the top of local search rankings.",
    icon: FiTrendingUp,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Bespoke Quality",
    desc: "Tailor-made features, secure components, and premium designs crafted specifically for UK workshops and MOT centres.",
    icon: FiAward,
    gradient: "from-pink-500 to-red-500",
  },
];

/* ─── Services list with detailed info for SaaS showcase ─── */
const servicesList = [
  {
    title: "Website for Garages",
    desc: "Fully responsive, high-speed workshop websites built to capture local search leads.",
    icon: FiMonitor,
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "Autotech Data",
    desc: "Seamless vehicle registration lookup integration for tyre and parts matching.",
    icon: FiCpu,
    color: "from-indigo-500 to-purple-600",
  },
  {
    title: "Wholesale",
    desc: "Direct connections to leading distributors for automated stock procurement.",
    icon: FiTrendingUp,
    color: "from-purple-500 to-pink-600",
  },
  {
    title: "MOT Diary",
    desc: "Automated booking diaries with SMS and email triggers to prevent no-shows.",
    icon: FiShield,
    color: "from-pink-500 to-rose-600",
  },
  {
    title: "Search Engine Optimisation",
    desc: "Localized campaigns targeting local customers to dominate search rankings.",
    icon: FiAward,
    color: "from-rose-500 to-orange-600",
  },
];

/* ─── Animation helpers ─── */
const fadeUp = { hidden: { opacity: 0, y: 0 }, visible: { opacity: 1, y: 0 } };
const fadeLeft = {
  hidden: { opacity: 0, x: 0 },
  visible: { opacity: 1, x: 0 },
};
const fadeRight = {
  hidden: { opacity: 0, x: 0 },
  visible: { opacity: 1, x: 0 },
};

const AboutUs = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#050816] text-white">
      <SEOHeader
        title="About Us | Mr. Jatinder Singh Bassi's Vision"
        description="Learn about the story, mission, and team behind Auto Garage Network, founded by Mr. Jatinder Singh Bassi to build lifetime e-partnerships with UK garages."
        keywords="About Auto Garage Network, Jatinder Singh Bassi, Melton Mowbray automotive software, garage e-partner"
        canonicalPath="/about-us"
      />
      <Navbar />

      <main className="flex-grow pt-24">
        {/* ══════════════════════════════════════════
            HERO BANNER
        ══════════════════════════════════════════ */}
        <section className="relative py-20 md:py-28 px-6 md:px-12 overflow-hidden">
          {/* ambient glows */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[80px] pointer-events-none" />

          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-4 py-1.5 rounded-full inline-block mb-6">
                About Auto Garage Network
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 leading-tight">
                Transforming UK Garages through{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">
                  Digital Innovation
                </span>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                Auto Garage Network provides special, tailor-made solutions for
                garage owners' website needs. We aim at creating the best
                websites that prompt high-performance and digital transformation
                for independent workshops, MOT centres, and tyre specialists
                across the UK.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            OUR STORY  +  STATS GRID (square cards)
        ══════════════════════════════════════════ */}
        <section className="py-16 md:py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
            {/* ── LEFT: Square stat cards ── */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    whileHover={{
                      y: -4,
                      boxShadow: "0 12px 40px rgba(99,102,241,0.18)",
                    }}
                    className="aspect-square flex flex-col items-center justify-center bg-[#0c1222] border border-white/5 hover:border-indigo-500/30 rounded-2xl p-6 transition-all duration-300 cursor-default"
                  >
                    <span
                      className="text-4xl md:text-5xl font-black mb-3 leading-none"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </span>
                    <span className="text-gray-400 text-sm font-semibold text-center leading-tight">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ── RIGHT: Story text + image ── */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-8"
            >
              {/* Section label */}
              <div>
                <span className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-2 block">
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
                  Every Great Story Starts with a Friendly Team
                </h2>
                <p className="text-gray-400 text-base leading-relaxed mb-4">
                  At Auto Garage Network, we specialise in delivering
                  tailor-made solutions for garage owners' website needs. Our
                  mission is to create high-performing, user-friendly websites
                  that drive digital transformation for major tyre companies
                  across the UK, enabling them to run their businesses
                  seamlessly online.
                </p>
                <p className="text-gray-400 text-base leading-relaxed">
                  Established in Melton Mowbray, Leicestershire, we were founded
                  with a singular focus: to modernise workshop administrative
                  workflows and digital customer engagement. Today, we support
                  workshops across the UK, allowing managers to reclaim wasted
                  hours, reduce no-shows, and compete effectively with national
                  dealer networks.
                </p>
              </div>

              {/* about-img-add.jpg image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-[#0c1222]"
              >
                <img
                  src={aboutImg}
                  alt="Auto Garage Network team collaboration"
                  className="w-full h-auto block"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FOUNDER STORY SECTION (VIDEO + TEXT)
        ══════════════════════════════════════════ */}
        <section className="py-20 px-6 md:px-12 border-y border-white/5 bg-[#0a0f24]/30 relative overflow-hidden">
          {/* subtle background glow behind the video section */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Headline and Info */}
              <motion.div
                className="lg:col-span-6 space-y-6"
                variants={fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-4 py-1.5 rounded-full inline-block">
                  Founder's Vision
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                  Hear our story from Auto Garage Network founder{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 inline-flex items-center gap-3">
                    Mr Jatinder Singh Bassi
                  </span>
                </h2>
                <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                  Mr Jatinder Singh Bassi established Auto Garage Network with
                  the mission to equip UK workshop owners with the tools they
                  need to thrive in a digital economy. Watch the full story to
                  discover the founding principles of our lifetime partnership
                  approach.
                </p>
                <div className="pt-2">
                  <a
                    href="https://www.autogaragenetwork.com/about-us"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-white transition-colors"
                  >
                    Watch on Website <FiArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>

              {/* Right Column: Custom Video Player */}
              <motion.div
                className="lg:col-span-6"
                variants={fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative aspect-video rounded-3xl overflow-hidden bg-[#0c1222] border border-white/10 shadow-2xl group transition-all duration-500 hover:border-indigo-500/30">
                  {!isVideoPlaying ? (
                    <div
                      className="absolute inset-0 cursor-pointer"
                      onClick={() => setIsVideoPlaying(true)}
                    >
                      {/* Video Poster */}
                      <img
                        src={videoPoster}
                        alt="Founder Jatinder Singh Bassi Story"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Dark gradient overlay */}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-20 h-20 bg-white text-indigo-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300"
                        >
                          {/* Play Icon */}
                          <svg
                            className="w-8 h-8 text-[#2196f3] fill-current ml-1"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </motion.div>
                      </div>

                      {/* Glowing ripple effects around play button */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-white/40 animate-ping pointer-events-none" />
                    </div>
                  ) : (
                    <video
                      src={founderVideo}
                      poster={videoPoster}
                      controls
                      autoPlay
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            WHAT WE OFFER  +  SERVICES
        ══════════════════════════════════════════ */}
        <section className="py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            {/* left text */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  What We Offer
                </h2>
                <p className="text-gray-400 text-base leading-relaxed">
                  At Auto Garage Network, we provide innovative and functional
                  digital solutions tailored to meet the needs of modern
                  garages. Our multidisciplinary approach ensures seamless
                  integration of advanced features to help you stay ahead in the
                  competitive automotive industry.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Your Lifetime e-Partners
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  We don't believe in one-time solutions. At Auto Garage
                  Network, we aim to be your lifetime e-partners. That's why we
                  go the extra mile to deliver feature-rich, user-friendly
                  websites that empower you with control and ensure a smooth
                  experience for your customers.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  The Garage Owners' Competitive Edge
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Every Auto Garage Network website is designed to help garage
                  owners streamline operations. With our intelligent pricing
                  tools, garage owners can control service and product pricing
                  while accessing real-time reports on inventory, sales, and
                  profits — all in one place.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4">
                  We Understand Your Customers
                </h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  {[
                    "Filter-specific tyre selection.",
                    "Automated tyre bookings and online purchases.",
                    "Online MOT test bookings.",
                    "Our solutions are designed to make your customers' experience seamless.",
                    "Products & Services — Garage Website",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-indigo-400 mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* right: premium custom SaaS showcase with tilted mock browser & staggered cards */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full flex flex-col lg:flex-row lg:items-center lg:justify-end min-h-[580px] lg:min-h-[640px] mt-12 lg:mt-0"
            >
              {/* Glowing background glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-blue-500/5 rounded-3xl blur-3xl pointer-events-none" />

              {/* Tilted Mock Browser Container in the background (visible on desktop) */}
              <div className="absolute right-0 w-[85%] aspect-[1.35] rounded-3xl overflow-hidden border border-white/10 bg-slate-950/40 backdrop-blur-sm shadow-[0_30px_60px_rgba(0,0,0,0.5)] hidden lg:block transform -rotate-6 translate-x-4 scale-95 origin-right duration-500 hover:rotate-0 hover:scale-100 transition-all z-0">
                {/* Browser header */}
                <div className="h-9 bg-[#0b1021] border-b border-white/5 flex items-center px-4 gap-1.5 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  <div className="h-5 bg-white/5 rounded-md px-3 text-[10px] text-gray-500 flex items-center ml-4 w-48 truncate">
                    autogaragenetwork.com/platform
                  </div>
                </div>
                {/* Browser content */}
                <div className="relative w-full h-[calc(100%-36px)]">
                  <img
                    src={featureImg3}
                    alt="AGN Platform Showroom"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#050816]/30" />
                </div>
              </div>

              {/* Stack of overlapping glassmorphic cards: stacks below on mobile, overlaps on desktop */}
              <div className="relative lg:absolute left-0 w-full lg:w-[70%] flex flex-col gap-5 mt-6 lg:mt-0 z-20 items-center lg:items-start">
                {servicesList.map((svc, i) => {
                  const Icon = svc.icon;
                  // alternate staggered indentation on desktop
                  const staggeredClass =
                    i % 2 === 0
                      ? "lg:translate-x-[-15px]"
                      : "lg:translate-x-[20px]";

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      whileHover={{
                        y: -5,
                        x: i % 2 === 0 ? -20 : 25,
                        scale: 1.03,
                        boxShadow: "0 20px 40px rgba(99, 102, 241, 0.2)",
                        borderColor: "rgba(99, 102, 241, 0.4)",
                      }}
                      className={`w-full bg-[#0c1222]/90 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex items-start gap-4 transition-all duration-300 shadow-2xl max-w-[360px] cursor-default ${staggeredClass}`}
                    >
                      {/* Custom colored icon container */}
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${svc.color} flex items-center justify-center shrink-0 shadow-md`}
                      >
                        <Icon className="text-white w-6 h-6" />
                      </div>
                      {/* Card Info */}
                      <div className="space-y-1">
                        <h4 className="text-base font-extrabold text-white tracking-tight leading-tight">
                          {svc.title}
                        </h4>
                        <p className="text-xs text-gray-400 leading-relaxed font-medium">
                          {svc.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CORE VALUES
        ══════════════════════════════════════════ */}
        <section className="py-24 px-6 md:px-12 bg-white/[0.01] border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Our Core Values
              </motion.h2>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-gray-400 text-sm md:text-base"
              >
                We design and support our software based on principles that
                prioritize long-term partner success and technological
                excellence.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((val, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="bg-[#0c1222] border border-white/5 hover:border-white/10 rounded-2xl p-6 flex flex-col transition-all duration-300 shadow-lg"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${val.gradient} flex items-center justify-center text-white mb-6 shadow-md`}
                  >
                    <val.icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {val.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                    {val.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
