import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { API_URL } from "../config";
import NotFound from "./NotFound.jsx";
import SEOHeader from "../components/SEOHeader.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ReCaptcha from "../components/ReCaptcha.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { FiPhone, FiMail, FiMapPin, FiSend } from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaGlobe,
} from "react-icons/fa";
import { useLogo } from "../utils/LogoContext.jsx";

const ContactUs = () => {
  const { salesPhone, supportPhone, email, address, socialLinks } = useLogo();
  const location = useLocation();
  const [isDisabled, setIsDisabled] = useState(false);
  const [pageData, setPageData] = useState(null);

  const activeSalesPhone = pageData && pageData.salesPhone ? pageData.salesPhone : salesPhone;
  const activeSupportPhone = pageData && pageData.supportPhone ? pageData.supportPhone : supportPhone;
  const activeEmail = pageData && pageData.email ? pageData.email : email;
  const activeAddress = pageData && pageData.address ? pageData.address : address;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "Garage Management System",
    message: "",
  });

  useEffect(() => {
    if (location.state?.interest) {
      setFormData((prev) => ({
        ...prev,
        interest: location.state.interest,
      }));
    }
  }, [location.state]);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/pages/slug/contact-us`);
        if (res.status === 403) {
          setIsDisabled(true);
        } else if (res.ok) {
          const data = await res.json();
          setPageData(data);
        }
      } catch (err) {
        console.error("Error loading contact page settings:", err);
      }
    };
    fetchPageData();
  }, []);

  const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [captchaToken, setCaptchaToken] = useState(null);

  if (isDisabled) {
    return <NotFound />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaToken) {
      alert("Please verify that you are not a robot.");
      return;
    }
    if (formData.phone.length < 10) {
      alert("Please enter a valid phone number (at least 10 digits).");
      return;
    }
    setSubmitted(true);

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
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
          captchaToken: captchaToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong while submitting request.",
        );
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
        email: formData.email,
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
      window.dispatchEvent(new Event("reset-captcha"));
      setCaptchaToken(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#050816] text-white">
      <SEOHeader
        title={pageData?.bannerTitle || "Contact Our Sales & Support Teams"}
        description={pageData?.bannerSubtitle || "Have questions? Contact Auto Garage Network. Reach our sales at 07947 906789 or customer support at 01702 655556. Located in Nether Broughton."}
        keywords="contact garage network, support phone number, Melton Mowbray software office"
        canonicalPath="/contact-us"
      />
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        {/* Banner */}
        <section className="relative py-16 px-6 md:px-12 text-center overflow-hidden min-h-[250px] flex flex-col justify-center items-center">
          {pageData?.bannerImage ? (
            <div className="absolute inset-0 z-0">
              <img
                src={pageData.bannerImage}
                alt="Contact Us Banner"
                className="w-full h-full object-cover brightness-[0.3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/40 to-transparent" />
            </div>
          ) : (
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#4f46e5]/10 blur-[130px] pointer-events-none" />
          )}
          <div className="relative z-10 space-y-4">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              {pageData?.bannerTitle || "Contact Our Team"}
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto px-4">
              {pageData?.bannerSubtitle || "Book your free system demonstration or get in touch for custom design quotes."}
            </p>
          </div>
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
                  href={`tel:${activeSalesPhone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-4 text-gray-300 hover:text-indigo-400 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                    <FiPhone />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 font-bold block uppercase leading-none mb-1">
                      Sales Hotline
                    </span>
                    <span className="text-sm font-bold">{activeSalesPhone}</span>
                  </div>
                </a>

                <a
                  href={`tel:${activeSupportPhone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-4 text-gray-300 hover:text-indigo-400 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                    <FiPhone />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 font-bold block uppercase leading-none mb-1">
                      Customer Support
                    </span>
                    <span className="text-sm font-bold">{activeSupportPhone}</span>
                  </div>
                </a>

                <a
                  href={`mailto:${activeEmail}`}
                  className="flex items-center gap-4 text-gray-300 hover:text-indigo-400 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                    <FiMail />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 font-bold block uppercase leading-none mb-1">
                      Email Inquiry
                    </span>
                    <span className="text-sm font-bold break-all">{activeEmail}</span>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-gray-300">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <FiMapPin />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 font-bold block uppercase leading-none mb-1">
                      Office Location
                    </span>
                    <span className="text-sm font-bold whitespace-pre-line">
                      {activeAddress}
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
                {socialLinks && socialLinks.length > 0 ? (
                  socialLinks.map((link) => {
                    const plat = link.platform.toLowerCase();
                    let icon = <FaGlobe size={14} />;
                    let hoverBg = "hover:bg-indigo-600";

                    if (plat.includes("facebook")) {
                      icon = <FaFacebookF size={14} />;
                      hoverBg = "hover:bg-[#1877F2]";
                    } else if (plat.includes("instagram")) {
                      icon = <FaInstagram size={14} />;
                      hoverBg = "hover:bg-[#E1306C]";
                    } else if (
                      plat.includes("twitter") ||
                      plat.includes("x.com")
                    ) {
                      icon = <FaTwitter size={14} />;
                      hoverBg = "hover:bg-[#1DA1F2]";
                    } else if (plat.includes("linkedin")) {
                      icon = <FaLinkedinIn size={14} />;
                      hoverBg = "hover:bg-[#0A66C2]";
                    } else if (plat.includes("youtube")) {
                      icon = <FaYoutube size={14} />;
                      hoverBg = "hover:bg-[#FF0000]";
                    } else if (plat.includes("tiktok")) {
                      icon = <FaTiktok size={14} />;
                      hoverBg = "hover:bg-black";
                    }

                    return (
                      <a
                        key={link._id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-8 h-8 rounded-lg bg-white/5 ${hoverBg} flex items-center justify-center text-gray-300 hover:text-white transition-all`}
                        aria-label={`Visit our ${link.platform} page`}
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
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#1877F2] flex items-center justify-center text-gray-300 hover:text-white transition-all"
                      aria-label="Visit our Facebook page"
                    >
                      <FaFacebookF size={14} />
                    </a>
                    <a
                      href="https://www.instagram.com/autogaragenetworkltd.uk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#E1306C] flex items-center justify-center text-gray-300 hover:text-white transition-all"
                      aria-label="Visit our Instagram profile"
                    >
                      <FaInstagram size={14} />
                    </a>
                    <a
                      href="https://x.com/autogaragent"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#1DA1F2] flex items-center justify-center text-gray-300 hover:text-white transition-all"
                      aria-label="Visit our Twitter profile"
                    >
                      <FaTwitter size={14} />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/auto-garage-network-ltd/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#0A66C2] flex items-center justify-center text-gray-300 hover:text-white transition-all"
                      aria-label="Visit our LinkedIn page"
                    >
                      <FaLinkedinIn size={14} />
                    </a>
                    <a
                      href="https://www.youtube.com/channel/UCT8JroOu-4_KT74be6tGUoQ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#FF0000] flex items-center justify-center text-gray-300 hover:text-white transition-all"
                      aria-label="Visit our YouTube channel"
                    >
                      <FaYoutube size={14} />
                    </a>
                  </>
                )}
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
                    <label
                      htmlFor="company-name"
                      className="text-[10px] uppercase font-bold text-slate-400"
                    >
                      Company/Garage Name *
                    </label>
                    <input
                      id="company-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value.replace(/[0-9]/g, ""),
                        })
                      }
                      placeholder="e.g. Apex Tyres"
                      className="w-full bg-[#070b18] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="phone-number"
                      className="text-[10px] uppercase font-bold text-slate-400"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="phone-number"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value.replace(/\D/g, "").slice(0, 11),
                        })
                      }
                      placeholder="e.g. 07947906789"
                      className="w-full bg-[#070b18] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 text-white"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label
                      htmlFor="email-address"
                      className="text-[10px] uppercase font-bold text-slate-400"
                    >
                      Email Address *
                    </label>
                    <input
                      id="email-address"
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
                    <label
                      htmlFor="interested-in"
                      className="text-[10px] uppercase font-bold text-slate-400"
                    >
                      Interested In?
                    </label>
                    <select
                      id="interested-in"
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
                  <label
                    htmlFor="message-profile"
                    className="text-[10px] uppercase font-bold text-slate-400"
                  >
                    Message / Garage Profile
                  </label>
                  <textarea
                    id="message-profile"
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

                <ReCaptcha
                  onVerify={(token) => setCaptchaToken(token)}
                  onExpired={() => setCaptchaToken(null)}
                />

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
                  <svg
                    className="w-8 h-8 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-black text-white mb-2">
                  Request Submitted!
                </h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  Thank you! Your sandbox demo request has been successfully
                  recorded in our database.
                </p>

                {/* Submitted Info Panel */}
                <div className="bg-[#050816]/50 border border-white/5 rounded-2xl p-5 text-left text-xs text-gray-400 space-y-2.5 mb-6 text-slate-300">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-500 block mb-0.5">
                      Garage/Company
                    </span>
                    <span className="font-semibold text-white text-sm">
                      {submittedData.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-500 block mb-0.5">
                        Phone Number
                      </span>
                      <span className="font-semibold text-white">
                        {submittedData.phone}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-500 block mb-0.5">
                        Interest
                      </span>
                      <span className="font-semibold text-white truncate block">
                        {submittedData.interest}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 mb-6 leading-normal">
                  Our support team will review your workshop requirements and
                  get back to you shortly.
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
