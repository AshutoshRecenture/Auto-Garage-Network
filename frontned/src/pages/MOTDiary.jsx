import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHeader from "../components/SEOHeader.jsx";
import Navbar from "../components/Navbar.jsx";
import MOTDiarySection from "../components/MOTDiary.jsx";
import Footer from "../components/Footer.jsx";
import aboutImg from "../assets/about-img-add.jpg";
import motDiaryImg from "../assets/images/mot-diary.png";

const MOTDiaryPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const specs = [
    {
      num: "1",
      title: "Smart Job Cards",
      desc: "Other than the not to miss feature, the software comes with a smart job card that is auto-generated once the client books an MOT. The card details for you every vehicle specification, type of work needed on the vehicle, and other such essential information.",
    },
    {
      num: "2",
      title: "Digital Booking & Reminders",
      desc: "Since the MOT Diary is digital, your clients can relish online booking of MOT with you, and the software with its built-in intelligence will send out automatic reminders, through email, SMS, and other messaging services, to everyone on your client contact list.",
    },
    {
      num: "3",
      title: "Auto-Generated Campaigns",
      desc: "The SMS campaign is also auto-generated to every client so that he/she keeps abreast of your latest products, schemes, seasonal offers, and other imperative updates regarding your business.",
    },
    {
      num: "4",
      title: "Ramp & Operation Configuration",
      desc: "The software allows easy ramp configuration as per specific vehicle need, to not only improve assigning vehicles to ramps but also helps streamline all garage operations.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#050816] text-white">
      <SEOHeader
        title="Smart MOT Diary & Ramp Scheduler"
        description="Keep your ramps fully loaded with our cloud-based MOT Diary. Features automatic DVLA MOT expiry sync, drag-and-drop ramp scheduling, and SMS reminders."
        keywords="MOT diary, ramp scheduler, garage calendar, MOT reminders SMS, booking diary"
        canonicalPath="/mot-diary"
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
              MOT Diary
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
              "Avail Your Free Version Of MOT Diary Today"
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Benefit from our state-of-the-art MOT Diary system as you guide customers for their tests and grow your independent garage to be a brand.
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
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-[#ffffff] font-extrabold rounded-full shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer text-sm"
              >
                Get a Free Quote
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            WHAT NOT TO MISS & LAPTOP MOCKUP
        ══════════════════════════════════════════ */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Detailed Info */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Database Sync</span>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                Yes, cloud-based MOT management is now a reality! We, at MOT Diary, have made it possible. By virtue of our tie-up with DVLA, your garage can make the most of first-hand access to the extensive MOT database.
              </p>
              
              <div className="border-t border-white/10 pt-6 space-y-4">
                <h3 className="text-2xl font-black text-white">What Not To Miss?</h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  We link closely with DVLA to make sure we keep all car data and your MOT diary up to date. This prime feature of MOT Diary lets you in on the detailed MOT specifics (MOT expiry date, VIN, engine number, MOT history, tyre data, and more) like no other app or any other tool ever will!
                </p>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed font-semibold">
                  Of course, MOT Diary is the best MOT management and reminder in the UK that'll not only guarantee you taking the test on time, but also prompts you to make an advance booking. And must we add, this is not all! We're certain you are enticed to know more about its rich features.
                </p>
              </div>
            </div>

            {/* Right: Mockup Image inside styled frame */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 relative flex justify-center"
            >
              <div className="absolute inset-0 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none" />
              <div className="relative border border-white/10 rounded-2xl overflow-hidden shadow-2xl bg-[#0c1222]/80 p-2 max-w-lg w-full transition-transform duration-500 hover:scale-[1.02]">
                <img
                  src={motDiaryImg}
                  alt="MOT Diary laptop and mobile view dashboard mockup"
                  className="w-full h-auto rounded-xl object-cover block"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            IT'S FEATURE-LOADED CARDS
        ══════════════════════════════════════════ */}
        <section className="py-20 px-6 bg-[#0a0f24]/30 border-y border-white/5 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10 space-y-12">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-4 py-1.5 rounded-full inline-block">Features Grid</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">It's Feature-loaded!</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {specs.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  className="bg-[#0c1222]/60 border border-white/5 p-6 rounded-2xl flex flex-col transition-all duration-300 shadow-lg"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-[#ffffff] font-black text-sm mb-6 shadow-md shadow-blue-500/20">
                    {item.num}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed flex-grow font-medium">{item.desc}</p>
                </motion.div>
              ))}
            </div>
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
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Try the Live MOT Diary Grid</h2>
            <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto mt-3 px-6">
              Click on the tabs below to test automated SMS notifications, DVLA API queries, drag-and-drop slots, and ramp load occupancies.
            </p>
          </div>
          <MOTDiarySection />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MOTDiaryPage;
