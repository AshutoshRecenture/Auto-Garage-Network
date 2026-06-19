import React, { useState } from "react";
import SEOHeader from "../components/SEOHeader.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { FiPhone, FiMail, FiMapPin, FiSend } from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "Garage Management System",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.phone.length < 10) {
      alert("Please enter a valid phone number (at least 10 digits).");
      return;
    }
    setSubmitted(true);

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          interest: formData.interest,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong while submitting request.");
      }

      // Capture and save data to localStorage as fallback
      try {
        const existingLeads = localStorage.getItem("agn_leads");
        const leads = existingLeads ? JSON.parse(existingLeads) : [];
        const newLead = {
          id: data.data?._id || Date.now(),
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          interest: formData.interest,
          message: formData.message,
          timestamp: new Date().toISOString(),
        };
        leads.push(newLead);
        localStorage.setItem("agn_leads", JSON.stringify(leads));
      } catch (error) {
        console.error("Failed to save lead to localStorage:", error);
      }

      setSubmittedData({
        name: formData.name,
        interest: formData.interest,
        phone: formData.phone,
        email: formData.email
      });
      setShowPopup(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        interest: "Garage Management System",
        message: "",
      });
    } catch (error) {
      console.error("Form submission failed:", error);
      alert(`Submission failed: ${error.message}`);
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#050816] text-white">
      <SEOHeader
        title="Contact Our Sales & Support Teams"
        description="Have questions? Contact Auto Garage Network. Reach our sales at 07947 906789 or customer support at 01702 655556. Located in Nether Broughton."
        keywords="contact garage network, support phone number, Melton Mowbray software office"
        canonicalPath="/contact-us"
      />
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        {/* Banner */}
        <section className="relative py-16 px-6 md:px-12 text-center overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[130px] pointer-events-none" />
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Contact Our Team
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto px-4">
            Book your free system demonstration or get in touch for custom
            design quotes.
          </p>
        </section>

        {/* Contact Form and Details Grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 mt-4">
          {/* Details Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#0c1222] border border-white/5 p-8 rounded-3xl space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/5 rounded-full blur-[60px] pointer-events-none" />

              <h2 className="text-2xl font-bold">Head Office </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Have questions about our setup process? Our specialists are
                available during UK business hours to provide technical advice.
              </p>

              <div className="space-y-4 pt-4">
                <a
                  href="tel:07947906789"
                  className="flex items-center gap-4 text-gray-300 hover:text-indigo-400 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                    <FiPhone />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 font-bold block uppercase leading-none mb-1">
                      Sales Hotline
                    </span>
                    <span className="text-sm font-bold">07947 906789</span>
                  </div>
                </a>

                <a
                  href="tel:0172655556"
                  className="flex items-center gap-4 text-gray-300 hover:text-indigo-400 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                    <FiPhone />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 font-bold block uppercase leading-none mb-1">
                      Customer Support
                    </span>
                    <span className="text-sm font-bold">01726 55556</span>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-gray-300">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <FiMail />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 font-bold block uppercase leading-none mb-1">
                      Email Inquiry
                    </span>
                    <span className="text-sm font-bold">
                      info@autogaragenetwork.com
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-gray-300">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <FiMapPin />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 font-bold block uppercase leading-none mb-1">
                      Office Location
                    </span>
                    <span className="text-sm font-bold">
                      The Chestnuts, 46 Middle Lane, Nether Broughton, LE14 3HD
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social card */}
            <div className="bg-[#0c1222] border border-white/5 p-6 rounded-3xl flex justify-between items-center shadow-xl">
              <span className="text-sm font-bold text-gray-400">
                Follow Our Socials
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/autogaragenetworkltd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#1877F2] flex items-center justify-center text-gray-300 hover:text-white transition-all"
                >
                  <FaFacebookF size={14} />
                </a>
                <a
                  href="https://www.instagram.com/autogaragenetworkltd.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#E1306C] flex items-center justify-center text-gray-300 hover:text-white transition-all"
                >
                  <FaInstagram size={14} />
                </a>
                <a
                  href="https://x.com/autogaragent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#1DA1F2] flex items-center justify-center text-gray-300 hover:text-white transition-all"
                >
                  <FaTwitter size={14} />
                </a>
                <a
                  href="https://www.linkedin.com/company/auto-garage-network-ltd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#0A66C2] flex items-center justify-center text-gray-300 hover:text-white transition-all"
                >
                  <FaLinkedinIn size={14} />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCT8JroOu-4_KT74be6tGUoQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#FF0000] flex items-center justify-center text-gray-300 hover:text-white transition-all"
                >
                  <FaYoutube size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-[#0c1222] border border-white/5 p-8 rounded-3xl shadow-xl">
              <h2 className="text-2xl font-bold mb-2">Book Free Trial</h2>
              <p className="text-gray-400 text-sm mb-6">
                Leave your details and our team will prepare a sandbox instance
                tailored to your workshop requirements.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-500">
                      Company/Garage Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value.replace(/[0-9]/g, "") })
                      }
                      placeholder="e.g. Apex Tyres"
                      className="w-full bg-[#070b18] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-500">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "").slice(0, 11) })
                      }
                      placeholder="e.g. 07947906789"
                      className="w-full bg-[#070b18] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 text-white"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-500">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="name@company.com"
                      className="w-full bg-[#070b18] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-500">
                      Interested In?
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) =>
                        setFormData({ ...formData, interest: e.target.value })
                      }
                      className="w-full bg-[#070b18] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 text-white"
                    >
                      <option>Garage Management System</option>
                      <option>Website for Garages</option>
                      <option>Autotech Data Integration</option>
                      <option>MOT Diary Calendar</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-500">
                    Message / Garage Profile
                  </label>
                  <textarea
                    rows="4"
                    maxLength={500}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell us about your workshop size, staff, or specific requirements..."
                    className="w-full bg-[#070b18] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 text-white resize-none"
                  />
                  <div className="text-right text-[10px] text-gray-500 mt-1">
                    {formData.message.length}/500 characters
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitted}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <FiSend />
                  <span>
                    {submitted
                      ? "Sending Demo Request..."
                      : "Request Demonstration"}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Success Popup Modal */}
        <AnimatePresence>
          {showPopup && submittedData && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowPopup(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-[#0c1222] border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative max-w-md w-full text-center z-10 overflow-hidden"
              >
                {/* Decorative background glow */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-[50px] pointer-events-none" />
                
                {/* Success Checkmark Circle */}
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6 text-emerald-400">
                  <svg className="w-8 h-8 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-black text-white mb-2">Request Submitted!</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  Thank you! Your sandbox demo request has been successfully recorded in our database.
                </p>

                {/* Submitted Info Panel */}
                <div className="bg-[#050816]/50 border border-white/5 rounded-2xl p-5 text-left text-xs text-gray-400 space-y-2.5 mb-6 text-slate-300">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-500 block mb-0.5">Garage/Company</span>
                    <span className="font-semibold text-white text-sm">{submittedData.name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-500 block mb-0.5">Phone Number</span>
                      <span className="font-semibold text-white">{submittedData.phone}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-500 block mb-0.5">Interest</span>
                      <span className="font-semibold text-white truncate block">{submittedData.interest}</span>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 mb-6 leading-normal">
                  Our support team will review your workshop requirements and get back to you shortly.
                </p>

                {/* Button */}
                <button
                  onClick={() => setShowPopup(false)}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg cursor-pointer"
                >
                  Close & Continue
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
