import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SEOHeader from "../components/SEOHeader.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { API_URL } from "../config";
import NotFound from "./NotFound.jsx";
import {
  FiCheck,
  FiX,
  FiAlertCircle,
  FiPercent,
  FiLayers,
  FiSmile,
  FiAlertTriangle,
  FiCreditCard,
  FiBell,
  FiSlash,
  FiShield,
  FiEdit,
  FiMail,
  FiRefreshCw,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useLogo } from "../utils/LogoContext.jsx";

const Pricing = () => {
  const {
    priceEliteWorkshop,
    setupEliteWorkshop,
    priceEliteProMax,
    setupEliteProMax,
    priceEliteProMaxPlus,
    setupEliteProMaxPlus,
  } = useLogo();
  const [isDisabled, setIsDisabled] = useState(false);
  const [dbPage, setDbPage] = useState(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPage = async () => {
      try {
        const res = await fetch(`${API_URL}/api/pages/slug/pricing`);
        if (res.status === 403) {
          setIsDisabled(true);
        } else if (res.ok) {
          const data = await res.json();
          setDbPage(data);
        }
      } catch (err) {
        console.error("Failed to load dynamic pricing page content:", err);
      }
    };
    fetchPage();
  }, []);

  const [activeTab, setActiveTab] = useState("gms"); // 'gms', 'websites', 'autodata'
  const [flippedCards, setFlippedCards] = useState({});

  if (isDisabled) {
    return <NotFound />;
  }

  const toggleFlip = (index) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const fupItems = [
    {
      title: "1. Allocation of SMS & VRMs",
      desc: "Your subscribed package includes a specific allocation of SMS messages and VRM lookups per billing cycle (e.g., monthly). This allocation is designed to meet the needs of typical usage for your package tier. Unused allocations do not roll over to the next billing cycle.",
      icon: FiLayers,
      color: "#3b82f6", // blue
    },
    {
      title: "2. Fair Usage",
      desc: "Customers are expected to use SMS messages and VRM lookups in a manner consistent with the intended purpose of their subscribed package. Usage should align with standard business or personal needs, as applicable to your subscription type.",
      icon: FiSmile,
      color: "#10b981", // emerald/green
    },
    {
      title: "3. Excessive Usage",
      desc: "Usage beyond your allocated amount will be considered excessive. Excessive usage may impact the performance and availability of services for other customers. We reserve the right to monitor usage patterns and identify any activity that exceeds fair usage limits.",
      icon: FiAlertTriangle,
      color: "#f97316", // orange
    },
    {
      title: "4. Charges for Excessive Usage",
      desc: "If your usage exceeds the allocated amount, additional charges will apply. Excess usage charges will be calculated based on the standard rates for SMS (10p) messages and VRM (10p) lookups, as outlined in your subscription agreement or pricing plan. You will be notified of any excess usage charges incurred.",
      icon: FiCreditCard,
      color: "#ef4444", // red
    },
    {
      title: "5. Monitoring & Notifications",
      desc: "We will monitor your usage to ensure compliance with this Fair Usage Policy. If your usage approaches or exceeds the allocated amount, we may notify you via email or SMS to inform you of potential additional charges. It is your responsibility to monitor your usage.",
      icon: FiBell,
      color: "#f59e0b", // amber
    },
    {
      title: "6. Prohibited Use",
      desc: "The use of SMS messages and VRM lookups for unlawful, fraudulent, or abusive purposes is strictly prohibited. Reselling, redistributing, or otherwise commercialising the services outside the scope of your subscription is not permitted.",
      icon: FiSlash,
      color: "#8b5cf6", // violet
    },
    {
      title: "7. Policy Enforcement",
      desc: "We reserve the right to take action if this Fair Usage Policy is violated, including: applying additional charges for excessive usage, suspending or restricting access to services, and terminating your subscription in cases of severe or repeated violations.",
      icon: FiShield,
      color: "#06b6d4", // cyan
    },
    {
      title: "8. Changes to This Policy",
      desc: "We may update this Fair Usage Policy from time to time. Any changes will be communicated to you via email or through your account portal. Continued use of the services after changes to this policy constitutes acceptance of the updated terms.",
      icon: FiEdit,
      color: "#ec4899", // pink
    },
    {
      title: "9. Contact Us",
      desc: (
        <>
          If you have any questions or need assistance managing your usage,
          contact customer support at{" "}
          <strong className="text-white font-bold">01702 655556</strong> /{" "}
          <strong className="text-white font-bold">+91 9667108961</strong> or
          email{" "}
          <strong className="text-white font-bold">
            support@autogaragenetwork.com
          </strong>
          .
        </>
      ),
      icon: FiMail,
      color: "#6366f1", // indigo
    },
  ];

  const gmsPlans = [
    {
      name: "Elite Workshop",
      price: priceEliteWorkshop || "135",
      desc: "Ideal for small to medium independent garages seeking core automation.",
      setup: `£${setupEliteWorkshop || "500"}`,
      users: "Up to 3 Users",
      vrmLimit: "300/mo (Fair Use)",
      postcodeLimit: "200/mo (Fair Use)",
      smsLimit: "400 FOC/mo",
      features: [
        "Store Customer & Vehicle Data",
        "Create Estimates & Invoicing",
        "Jobsheets & Workshop Diary",
        "MOT Diary Integration",
        "Tyre Suppliers: 1 Supplier",
        "Catalogue Integration & Ordering",
        "Automated Reminders",
        "Accounting Sync: Optional Extra (£)",
      ],
      cta: "Book Free Trial",
      popular: false,
    },
    {
      name: "Elite ProMax",
      price: priceEliteProMax || "235",
      desc: "Full catalogue integration and diagnostics data for scaling operations.",
      setup: `£${setupEliteProMax || "1000"}`,
      users: "Unlimited* Users",
      vrmLimit: "Unlimited* (Fair Use)",
      postcodeLimit: "300/mo (Fair Use)",
      smsLimit: "400 FOC/mo",
      features: [
        "Store Customer & Vehicle Data",
        "Create Estimates & Invoicing",
        "Jobsheets & Workshop Diary",
        "MOT Diary Integration",
        "Tyre Suppliers: Unlimited*",
        "Catalogue Integration & Ordering",
        "Manufacturers Service/Repair Times",
        "Accounting Integration (Xero/QB/Sage)",
        "Stock System & Service Visuals",
      ],
      cta: "Book Free Trial",
      popular: true,
    },
    {
      name: "Elite ProMax Plus",
      price: priceEliteProMaxPlus || "375",
      desc: "All-inclusive flagship plan for multi-site garages and top-tier workshops.",
      setup: `£${setupEliteProMaxPlus || "500"}`,
      users: "Unlimited* Users",
      vrmLimit: "Unlimited* (Fair Use)",
      postcodeLimit: "Unlimited* (Fair Use)",
      smsLimit: "Unlimited*",
      features: [
        "Everything in Elite ProMax",
        "Full Technical Data (Autodata)",
        "Courtesy Cars Management",
        "Electronic Vehicle Inspections",
        "Dedicated Customer App",
        "Dedicated Technician App",
        "Technician Efficiency Tracking",
        "Advanced Analytics & Multi-Site",
      ],
      cta: "Book Free Trial",
      popular: false,
    },
  ];

  const websitePlans = [
    {
      name: "Iframe Widget",
      price: "500",
      target: "Existing Website Owners",
      desc: "Integrate our booking, VRM, and tyre sales widget into your existing website.",
      contract: "No setup waive",
      pages: "Widget Only",
    },
    {
      name: "Standard Website",
      price: "1000",
      setup: "£1,000",
      target: "Garages wanting Tyre sales only",
      desc: "Perfect starting website focusing entirely on tyre search & online bookings.",
      contract: "Setup waived on 36-mo contract",
      pages: "Up to 10 Unique Pages",
    },
    {
      name: "Premium Website",
      price: "2000",
      setup: "£2,000",
      target: "Pushing Tyres & Services",
      desc: "Ideal for independent garages advertising tyres alongside local repair services.",
      contract: "Setup waived on 36-mo contract",
      pages: "Up to 20 Unique Pages",
    },
    {
      name: "Professional Website",
      price: "3000",
      setup: "£3,000",
      target: "Pushing Tyres, Services & MOTs",
      desc: "Our most popular complete website setup for general MOT & repair workshops.",
      contract: "Setup waived on 36-mo contract",
      pages: "Up to 30 Unique Pages",
      popular: true,
    },
    {
      name: "Bespoke / Full Package",
      price: "6000",
      setup: "£6,000",
      target: "Multi-site & Custom Franchises",
      desc: "Fully tailor-made custom brand development with deep local marketing.",
      contract: "Setup waived on 36-mo contract",
      pages: "Up to 100 Unique Pages",
    },
  ];

  const websiteFeatures = [
    {
      name: "Website Setup",
      iframe: "On Request",
      standard: true,
      premium: true,
      professional: true,
      bespoke: true,
    },
    {
      name: "VRM Lookup integration",
      iframe: "On Request",
      standard: true,
      premium: true,
      professional: true,
      bespoke: true,
    },
    {
      name: "Tyre Selling Feature",
      iframe: "On Request",
      standard: true,
      premium: true,
      professional: true,
      bespoke: true,
    },
    {
      name: "Services Booking (All Services)",
      iframe: "On Request",
      standard: false,
      premium: true,
      professional: true,
      bespoke: true,
    },
    {
      name: "Notification App",
      iframe: "On Request",
      standard: false,
      premium: true,
      professional: true,
      bespoke: true,
    },
    {
      name: "MOT Booking Integration",
      iframe: "On Request",
      standard: false,
      premium: false,
      professional: true,
      bespoke: true,
    },
    {
      name: "Wheels Sales Feature",
      iframe: "On Request",
      standard: false,
      premium: false,
      professional: true,
      bespoke: true,
    },
    {
      name: "Body Shop Features",
      iframe: "On Request",
      standard: false,
      premium: false,
      professional: true,
      bespoke: true,
    },
    {
      name: "Payment Gateway Integration",
      iframe: "On Request",
      standard: false,
      premium: false,
      professional: true,
      bespoke: true,
    },
    {
      name: "Payment Assist Options",
      iframe: "On Request",
      standard: false,
      premium: false,
      professional: true,
      bespoke: true,
    },
    {
      name: "Car Trading Module",
      iframe: "On Request",
      standard: false,
      premium: false,
      professional: true,
      bespoke: true,
    },
    {
      name: "Web Development Support (1 Yr)",
      iframe: "On Request",
      standard: false,
      premium: false,
      professional: true,
      bespoke: true,
    },
    {
      name: "Web Development Support (Lifetime)",
      iframe: "On Request",
      standard: false,
      premium: false,
      professional: false,
      bespoke: true,
    },
    {
      name: "Facebook Advertising setup",
      iframe: "On Request",
      standard: false,
      premium: false,
      professional: false,
      bespoke: true,
    },
    {
      name: "Custom Mobile App",
      iframe: "On Request",
      standard: false,
      premium: false,
      professional: false,
      bespoke: true,
    },
    {
      name: "Local Area Exclusivity",
      iframe: "On Request",
      standard: false,
      premium: false,
      professional: false,
      bespoke: true,
    },
    {
      name: "Dedicated Full-Time SEO Person",
      iframe: "On Request",
      standard: false,
      premium: false,
      professional: false,
      bespoke: true,
    },
    {
      name: "Vostel (Telephone VoIP Integration)",
      iframe: "On Request",
      standard: false,
      premium: false,
      professional: false,
      bespoke: true,
    },
    {
      name: "Dedicated Customer App",
      iframe: "On Request",
      standard: false,
      premium: false,
      professional: false,
      bespoke: true,
    },
    {
      name: "Dedicated Technician App",
      iframe: "On Request",
      standard: false,
      premium: false,
      professional: false,
      bespoke: true,
    },
    {
      name: "5 Miles Location Micro Website",
      iframe: "On Request",
      standard: false,
      premium: false,
      professional: false,
      bespoke: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#050816] text-white">
      <SEOHeader
        title="Comprehensive Pricing Hub | Auto Garage Network"
        description="View our complete pricing options for Garage Management Systems (GMS), custom Garage Websites, and Autotech Data Lookup plans."
        keywords="garage management system cost, workshop software prices, garage website setup cost, autodata lookup package"
        canonicalPath="/pricing"
      />
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        {/* Header Hero Section */}
        <div className="relative pt-12 pb-16 text-center overflow-hidden">
          {/* Neon backlights */}
          <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight select-none">
            {dbPage && dbPage.bannerTitle ? (
              dbPage.bannerTitle
            ) : (
              <>
                Transparent, Flexible{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500">
                  Pricing Packages
                </span>
              </>
            )}
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto px-6 text-base md:text-lg leading-relaxed select-none">
            {dbPage && dbPage.bannerSubtitle ? (
              dbPage.bannerSubtitle
            ) : (
              "Choose the specific software features your independent workshop needs. Scale, downgrade, or bundle options for maximum efficiency and savings."
            )}
          </p>

          {/* Tab Selection Navigation */}
          <div className="flex justify-center mt-12 px-4">
            <div className="bg-[#0c1222]/90 border border-white/10 p-1.5 rounded-2xl flex flex-col sm:flex-row gap-2 w-full sm:w-auto shadow-2xl backdrop-blur-md pricing-tabs-container">
              <button
                onClick={() => setActiveTab("gms")}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs md:text-sm transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeTab === "gms"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "pricing-tab-link"
                }`}
              >
                Garage Management (GMS)
              </button>
              <button
                onClick={() => setActiveTab("websites")}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs md:text-sm transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeTab === "websites"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "pricing-tab-link"
                }`}
              >
                Website Solutions
              </button>
              <Link
                to="/autotech-data"
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs md:text-sm transition-all duration-300 whitespace-nowrap cursor-pointer pricing-tab-link flex items-center justify-center"
              >
                Autotech Data
              </Link>
            </div>
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-6">
          <AnimatePresence mode="wait">
            {activeTab === "gms" && (
              <motion.div
                key="gms"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
                  {gmsPlans.map((plan, idx) => (
                    <div
                      key={idx}
                      className={`relative bg-[#0c1222]/80 backdrop-blur-md rounded-3xl p-6 flex flex-col justify-between border transition-all duration-300 ${
                        plan.popular
                          ? "border-indigo-500 shadow-[0_0_40px_rgba(79,70,229,0.2)]"
                          : "border-white/5 hover:border-indigo-500/30"
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute top-0 inset-x-0 -translate-y-1/2 flex justify-center">
                          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow">
                            Best Seller
                          </span>
                        </div>
                      )}

                      <div>
                        <div className="mb-6">
                          <h3 className="text-lg font-black text-white">
                            {plan.name}
                          </h3>
                          <p className="text-xs md:text-sm text-gray-400 mt-1.5 h-10 leading-relaxed">
                            {plan.desc}
                          </p>
                          <div className="mt-4 flex items-baseline text-white">
                            <span className="text-2xl font-bold">£</span>
                            <span className="text-4xl font-extrabold tracking-tight">
                              {plan.price}
                            </span>
                            <span className="text-gray-400 text-xs ml-1">
                              + VAT / month
                            </span>
                          </div>
                          <div className="mt-2 text-xs text-gray-400 border-b border-white/5 pb-4">
                            Setup Cost:{" "}
                            <span className="text-white font-bold">
                              {plan.setup}
                            </span>
                          </div>
                        </div>

                        {/* Plan Quotas & Limits */}
                        <div className="space-y-2 mb-6 bg-[#050816]/30 p-3 rounded-xl border border-white/5 text-xs md:text-[13px]">
                          <div className="flex justify-between">
                            <span className="text-gray-400">
                              Users Included:
                            </span>
                            <span className="text-white font-semibold">
                              {plan.users}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">VRM Lookups:</span>
                            <span className="text-white font-semibold">
                              {plan.vrmLimit}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">
                              Postcode Lookups:
                            </span>
                            <span className="text-white font-semibold">
                              {plan.postcodeLimit}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">
                              SMS Reminders:
                            </span>
                            <span className="text-indigo-400 font-semibold">
                              {plan.smsLimit}
                            </span>
                          </div>
                        </div>

                        {/* Features List */}
                        <ul className="space-y-3 mb-8">
                          {plan.features.map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-start">
                              <FiCheck className="text-emerald-400 mt-0.5 mr-2 flex-shrink-0 text-xs" />
                              <span className="text-gray-300 text-xs md:text-sm leading-tight">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Link
                        to="/contact-us"
                        state={{ interest: "Garage Management System" }}
                        className={`w-full py-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-center block active:scale-[0.97] duration-150 ${
                          plan.popular
                            ? "bg-indigo-600 hover:!bg-blue-600 hover:!text-white text-white no-invert shadow-lg shadow-indigo-600/15"
                            : "bg-white/5 hover:!bg-blue-600 hover:!text-white text-white border border-white/10 hover:!border-blue-600"
                        }`}
                      >
                        {plan.cta}
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Detailed Fair Usage Policy Section */}
                <div className="mt-12 fup-container-bg border p-10 md:p-12 rounded-3xl w-full shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-[60px] pointer-events-none" />

                  <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-300 flex items-center gap-1.5 mb-3 select-none">
                    <FiAlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>FAIR USAGE POLICY (FUP) FOR SMS & VRMS</span>
                  </span>

                  <h3 className="text-base md:text-xl font-black text-white mb-2 flex items-center gap-2">
                    <span>
                      Fair Usage Policy for SMS Messages and VRM Lookups
                    </span>
                  </h3>
                  <p className="text-xs md:text-sm text-gray-400 mb-8 leading-relaxed">
                    This Fair Usage Policy (FUP) outlines the acceptable use of
                    SMS messages and VRM (Vehicle Registration Mark) lookups
                    provided under your subscribed package. The purpose of this
                    policy is to ensure fair and reasonable use of these
                    services for all customers while maintaining the quality and
                    reliability of our services.
                  </p>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm md:text-base">
                    {fupItems.map((item, idx) => {
                      const Icon = item.icon;
                      const isFlipped = !!flippedCards[idx];

                      return (
                        <div
                          key={idx}
                          onClick={() => toggleFlip(idx)}
                          style={{ "--card-color": item.color }}
                          className={`fup-card h-[220px] cursor-pointer group ${
                            isFlipped ? "flipped" : ""
                          }`}
                        >
                          <div className="fup-card-inner">
                            {/* Front Side */}
                            <div className="fup-card-front select-none">
                              <div
                                className="w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                                style={{
                                  backgroundColor: `${item.color}15`,
                                  border: `1px solid ${item.color}30`,
                                }}
                              >
                                <Icon
                                  className="w-5 h-5"
                                  style={{ color: item.color }}
                                />
                              </div>
                              <h4
                                className="font-black uppercase tracking-wider text-sm md:text-base text-center px-2"
                                style={{ color: item.color }}
                              >
                                {item.title}
                              </h4>
                              <div
                                className="flex items-center gap-1.5 mt-6 px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all duration-300"
                                style={{
                                  borderColor: `${item.color}30`,
                                  color: item.color,
                                  backgroundColor: `${item.color}08`,
                                }}
                              >
                                <span>Click to Read Details</span>
                                <FiRefreshCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
                              </div>
                            </div>

                            {/* Back Side */}
                            <div className="fup-card-back">
                              <h4
                                className="font-black uppercase tracking-wider text-xs md:text-sm mb-3"
                                style={{ color: item.color }}
                              >
                                {item.title}
                              </h4>
                              <div className="text-gray-300 text-xs md:text-sm leading-relaxed overflow-y-auto pr-1 flex-grow scrollbar-thin">
                                {item.desc}
                              </div>
                              <div
                                className="flex items-center justify-center gap-1.5 mt-3 px-3.5 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border transition-all duration-300 align-self-center text-center cursor-pointer"
                                style={{
                                  borderColor: `${item.color}30`,
                                  color: item.color,
                                  backgroundColor: `${item.color}08`,
                                }}
                              >
                                <span>Click to Flip Back</span>
                                <FiRefreshCw className="w-2.5 h-2.5 group-hover:rotate-180 transition-transform duration-500" />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-8 text-center border-t border-white/5 pt-6 text-xs text-gray-500">
                    By adhering to this Fair Usage Policy, you help us maintain
                    a high-quality service for all customers. Thank you for your
                    cooperation.
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "websites" && (
              <motion.div
                key="websites"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-16"
              >
                {/* Contract Discount Banner */}
                <div className="bg-[#0c1222]/90 border border-white/10 p-6 rounded-3xl w-full flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[45px] pointer-events-none" />
                  <div className="space-y-1 text-center md:text-left">
                    <h3 className="text-base font-bold text-white flex items-center justify-center md:justify-start gap-2">
                      <FiPercent className="text-purple-400" />
                      <span>Contract Commitments & Waiver Discounts</span>
                    </h3>
                    <p className="text-[11px] text-gray-400 leading-relaxed max-w-2xl">
                      <strong>36-Month Contract:</strong> Setup cost is entirely
                      waived; only monthly fee applies from day one. Includes a
                      12-month self-funding moneyback guarantee. <br />
                      <strong>24-Month Contract:</strong> 25% setup cost
                      discount (50% paid upfront, 50% on project sign-off).
                    </p>
                  </div>
                  <div className="flex-shrink-0 bg-purple-500/10 border border-purple-500/25 px-4 py-2 rounded-xl text-center">
                    <span className="text-[10px] text-purple-400 uppercase font-black tracking-widest block">
                      Free Setup
                    </span>
                    <span className="text-xs font-semibold text-white">
                      on 3-Year Plans
                    </span>
                  </div>
                </div>

                {/* Website Tiers Grid */}
                <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 items-stretch">
                  {websitePlans.map((plan, idx) => (
                    <div
                      key={idx}
                      className={`relative bg-[#0c1222]/80 backdrop-blur-md rounded-2xl p-5 flex flex-col justify-between border transition-all duration-300 ${
                        plan.popular
                          ? "border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.15)]"
                          : "border-white/5 hover:border-purple-500/20"
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute top-0 inset-x-0 -translate-y-1/2 flex justify-center">
                          <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow">
                            Best Choice
                          </span>
                        </div>
                      )}

                      <div>
                        <div className="mb-4">
                          <span className="text-[10px] text-purple-400 uppercase tracking-widest font-black block mb-1">
                            {plan.target}
                          </span>
                          <h3 className="text-base font-black text-white">
                            {plan.name}
                          </h3>
                          <p className="text-[10px] text-gray-400 mt-2 h-12 leading-relaxed">
                            {plan.desc}
                          </p>
                          <div className="mt-4 flex items-baseline text-white">
                            <span className="text-xl font-bold">£</span>
                            <span className="text-3xl font-extrabold tracking-tight">
                              {plan.price}
                            </span>
                            <span className="text-gray-400 text-[10px] ml-1">
                              + VAT / mo
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2 text-[10px] text-gray-300">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Pages:</span>
                            <span className="font-semibold text-white">
                              {plan.pages}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Terms:</span>
                            <span className="font-semibold text-white text-[9px] text-right max-w-[80px] leading-tight">
                              {plan.contract}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Link
                        to="/contact-us"
                        state={{ interest: "Website for Garages" }}
                        className={`w-full mt-6 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer text-center block active:scale-[0.97] duration-150 ${
                          plan.popular
                            ? "bg-purple-600 hover:!bg-purple-500 hover:!text-white text-white no-invert shadow-lg shadow-purple-600/15"
                            : "bg-white/5 hover:!bg-purple-600 hover:!text-white text-white border border-white/10 hover:!border-purple-600"
                        }`}
                      >
                        Select Tier
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Features Matrix Table */}
                <div className="w-full overflow-hidden rounded-2xl border border-white/5 shadow-2xl bg-[#0c1222]/80 backdrop-blur-md">
                  <div className="p-6 border-b border-white/5">
                    <h3 className="text-lg font-bold text-white">
                      Website Solutions Feature Matrix
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Compare included features across all of our website design
                      tiers. All packages include a **Free Garage Management
                      System (GMS)**.
                    </p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse min-w-[700px]">
                      <thead>
                        <tr className="bg-[#050816] text-gray-400 border-b border-white/5 uppercase tracking-wider font-bold">
                          <th className="p-4 w-1/3">Features</th>
                          <th className="p-4 text-center">Iframe Widget</th>
                          <th className="p-4 text-center">Standard</th>
                          <th className="p-4 text-center">Premium</th>
                          <th className="p-4 text-center">Professional</th>
                          <th className="p-4 text-center">Bespoke</th>
                        </tr>
                      </thead>
                      <tbody>
                        {websiteFeatures.map((feat, fIdx) => (
                          <tr
                            key={fIdx}
                            className="border-b border-white/5 hover:bg-white/5 transition-colors"
                          >
                            <td className="p-4 font-medium text-gray-100">
                              {feat.name}
                            </td>
                            <td className="p-4 text-center text-gray-400 italic font-semibold">
                              {feat.iframe}
                            </td>
                            <td className="p-4 text-center">
                              {feat.standard ? (
                                <FiCheck className="text-emerald-400 mx-auto text-sm" />
                              ) : (
                                <FiX className="text-red-500 mx-auto text-sm" />
                              )}
                            </td>
                            <td className="p-4 text-center">
                              {feat.premium ? (
                                <FiCheck className="text-emerald-400 mx-auto text-sm" />
                              ) : (
                                <FiX className="text-red-500 mx-auto text-sm" />
                              )}
                            </td>
                            <td className="p-4 text-center">
                              {feat.professional ? (
                                <FiCheck className="text-emerald-400 mx-auto text-sm" />
                              ) : (
                                <FiX className="text-red-500 mx-auto text-sm" />
                              )}
                            </td>
                            <td className="p-4 text-center">
                              {feat.bespoke ? (
                                <FiCheck className="text-emerald-400 mx-auto text-sm" />
                              ) : (
                                <FiX className="text-red-500 mx-auto text-sm" />
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Dynamic HTML Content block if editable from backend */}
        {dbPage && dbPage.content && (
          <section className="py-12 px-6 md:px-12 border-t border-white/5 bg-white/[0.01]">
            <div className="max-w-7xl mx-auto prose prose-invert prose-indigo">
              <div dangerouslySetInnerHTML={{ __html: dbPage.content }} className="dynamic-html-content" />
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
