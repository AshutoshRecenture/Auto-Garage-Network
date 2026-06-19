import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheckCircle,
  FiSend,
  FiInfo,
  FiAlertTriangle,
  FiChevronDown,
  FiDatabase,
  FiTrendingUp,
  FiCheck,
  FiX,
  FiShield,
  FiCpu,
  FiSliders,
  FiSettings,
  FiCalendar,
  FiMail,
  FiPhone,
  FiUser,
  FiMapPin,
  FiFileText,
  FiBriefcase,
} from "react-icons/fi";
import SEOHeader from "../components/SEOHeader.jsx";
import Navbar from "../components/Navbar.jsx";
import DashboardSection from "../components/DashboardSection.jsx";
import Footer from "../components/Footer.jsx";

// Import brand logos from assets
import tecrmlImg from "../assets/images/tecrml.webp";
import automatedRemindersImg from "../assets/images/automated-reminders.webp";
import courtesyVehiclesImg from "../assets/images/courtesy-vehicles.webp";
import calendarImg from "../assets/images/calendar.webp";
import customerManagementImg from "../assets/images/customer-management.webp";
import customerPortalImg from "../assets/images/customer-portal.webp";
import autodataImg from "../assets/images/solera-autodata.webp";
import gsfImg from "../assets/images/gsf-car-parts.webp";
import partslink24Img from "../assets/images/partslink24.webp";
import bondImg from "../assets/images/bond-integration.webp";
import stapletonsImg from "../assets/images/stapletons.webp";
import bmtrImg from "../assets/images/bmtr.webp";
import groupTyresImg from "../assets/images/group-tyres.webp";
import oakTyresImg from "../assets/images/oak-tyres.webp";
import motImg from "../assets/images/mot.webp";
import quickbooksImg from "../assets/images/quickbooks.webp";
import stockControlImg from "../assets/images/stock-control.webp";
import webBookingImg from "../assets/images/web-booking.webp";
import technicianAppImg from "../assets/images/technician-mobile-app-andriod-ios.webp";
import vehicleSalesImg from "../assets/images/vehicle-sales.webp";
import inspectionImg from "../assets/images/inspection-form-management.webp";
import bookkeepingImg from "../assets/images/bookkeeping.webp";
import multiSiteImg from "../assets/images/multi-site-garage-management-system.webp";
import personnelImg from "../assets/images/personnel-management.webp";
import workshopBookingsImg from "../assets/images/workshop-bookings.webp";
import workshopEstimatesImg from "../assets/images/workshop-estimates.webp";

// Mapping feature names to imported logos
const featureLogos = {
  "TecRMI Inside": tecrmlImg,
  "Automated Reminders": automatedRemindersImg,
  "Courtesy Vehicles": courtesyVehiclesImg,
  "Calendar Scheduling": calendarImg,
  "Customer Management": customerManagementImg,
  "Customer Portal": customerPortalImg,
  "Autodata Integration": autodataImg,
  "Full Technical Data (Autodata)": autodataImg,
  "GSF Parts Integration": gsfImg,
  "GSF Integration": gsfImg,
  "Partslink24 Integration": partslink24Img,
  "Bond Integration": bondImg,
  "Stapletons Tyre Integration": stapletonsImg,
  "Stapletons Integration": stapletonsImg,
  "BMTR Tyre API": bmtrImg,
  "BMTR Integration": bmtrImg,
  "Group Tyre Stock": groupTyresImg,
  "Group Integration": groupTyresImg,
  "Oak Tyre Integration": oakTyresImg,
  "Oak Integration": oakTyresImg,
  "DVLA Database Sync": motImg,
  "MOT Expiry Lookup": motImg,
  "Quickbooks Integration": quickbooksImg,
  "QuickBooks Integration": quickbooksImg,
  "Stock Control": stockControlImg,
  "Web Bookings Gateway": webBookingImg,
  "Web Bookings": webBookingImg,
  "Technician Mobile App": technicianAppImg,
  "Technician Mobile App Android/iOS": technicianAppImg,
  "Vehicle Sales": vehicleSalesImg,
  "Inspection Form Manager": inspectionImg,
  "Inspection Form Management": inspectionImg,
  "Bookkeeping & Reports": bookkeepingImg,
  Bookkeeping: bookkeepingImg,
  BookKeeping: bookkeepingImg,
  "Multi-Site Control": multiSiteImg,
  "Multi-site Management": multiSiteImg,
  "Personnel Rota Logs": personnelImg,
  "Personnel Management": personnelImg,
  "Workshop Bookings": workshopBookingsImg,
  "Workshop bookings": workshopBookingsImg,
  "Workshop Estimates": workshopEstimatesImg,
  "Invoicing & Estimates": workshopEstimatesImg,
};

const getIconComponent = (name) => {
  switch (name) {
    case "Postcode Lookup":
      return FiMapPin;
    case "Tyre Suppliers Stock APIs":
      return FiDatabase;
    case "Custom Job Cards":
      return FiFileText;
    case "Administrator Mobile App":
      return FiPhone;
    case "Customer Booking App":
      return FiUser;
    case "Data Migration Support":
      return FiSliders;
    case "Automatic Updates":
      return FiSettings;
    case "Secure Cloud Backups":
      return FiShield;
    case "Ramp Configuration":
      return FiSliders;
    case "SMS / Email Communication":
      return FiMail;
    default:
      return null;
  }
};

const getFeatureLogoOrIcon = (name, idx) => {
  const logoSrc = featureLogos[name];

  if (logoSrc) {
    return (
      <div className="bg-gradient-to-b from-white to-[#f1f5f9] px-4 py-2.5 rounded-2xl border border-slate-200/80 shadow-[0_4px_10px_rgba(0,0,0,0.06),inset_0_-2px_0_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,1)] flex items-center justify-center h-14 w-fit min-w-[95px] transform hover:scale-[1.05] transition-transform duration-300">
        <img
          src={logoSrc}
          alt={name}
          className="h-8 object-contain max-w-[125px] select-none"
        />
      </div>
    );
  }

  // Branded badge for Sage (files are not present) - 3D tactile pill style
  if (name === "Sage Integration") {
    return (
      <div className="bg-gradient-to-b from-[#00eb87] to-[#00be69] text-white px-5 py-2.5 rounded-2xl border border-[#00a859]/30 shadow-[0_4px_10px_rgba(0,190,105,0.25),inset_0_-2.5px_0_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.4)] flex items-center justify-center h-14 w-fit select-none font-sans lowercase font-extrabold text-xl tracking-tight transform hover:scale-[1.05] transition-transform duration-300">
        sage
      </div>
    );
  }

  // Branded badge for Xero (files are not present) - 3D tactile pill style
  if (name === "Xero Integration") {
    return (
      <div className="bg-gradient-to-b from-[#1ec3fa] to-[#11abdd] text-white px-5 py-2.5 rounded-2xl border border-[#009bcf]/30 shadow-[0_4px_10px_rgba(17,171,221,0.25),inset_0_-2.5px_0_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.4)] flex items-center justify-center h-14 w-fit select-none font-sans lowercase font-black text-lg tracking-tight transform hover:scale-[1.05] transition-transform duration-300">
        xero
      </div>
    );
  }

  // Fallback themed icon or index box with 3D glass look
  const IconComponent = getIconComponent(name);
  return (
    <div className="w-12 h-12 rounded-2xl bg-gradient-to-b from-blue-500/20 to-blue-600/5 border border-blue-500/35 text-blue-400 flex items-center justify-center shadow-[0_4px_10px_rgba(59,130,246,0.15),inset_0_1px_0_rgba(255,255,255,0.1)] select-none shrink-0 transform hover:scale-[1.05] transition-transform duration-300">
      {IconComponent ? (
        <IconComponent className="w-5 h-5" />
      ) : (
        <span className="font-extrabold text-sm">{idx + 1}</span>
      )}
    </div>
  );
};

const GarageManagementSystem = () => {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    garageName: "",
    email: "",
    phone: "",
    interestedIn: "",
    address: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll to booking form helper
  const scrollToForm = (planName = "") => {
    if (planName) {
      setFormData((prev) => ({ ...prev, interestedIn: planName }));
    }
    const formElement = document.getElementById("gms-booking-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.garageName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.interestedIn.trim() ||
      !formData.address.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          garageName: formData.garageName,
          email: formData.email,
          phone: formData.phone,
          interestedIn: formData.interestedIn,
          address: formData.address,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong while submitting booking.");
      }

      setFormSubmitted(true);
      // Reset form
      setFormData({
        name: "",
        garageName: "",
        email: "",
        phone: "",
        interestedIn: "",
        address: "",
        message: "",
      });
    } catch (error) {
      console.error("Booking submission error:", error);
      alert(`Submission failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 36 Key GMS Features data matching the real site index
  const keyFeatures = [
    {
      name: "TecRMI Inside",
      desc: "Access manufacturer service/repair times and detailed operations configuration.",
    },
    {
      name: "Automated Reminders",
      desc: "Built-in scheduler triggers automated SMS & email campaigns for vehicle MOT dates.",
    },
    {
      name: "Courtesy Vehicles",
      desc: "Manage agreement templates and check-outs for courtesy cars in real-time.",
    },
    {
      name: "Calendar Scheduling",
      desc: "Smart drag-and-drop day calendar configuration to coordinate ramp loads.",
    },
    {
      name: "Customer Management",
      desc: "Central database CRM to manage customer vehicle diagnostics histories and invoicing.",
    },
    {
      name: "Customer Portal",
      desc: "Transparent client portal allowing drivers to review and accept estimates online.",
    },
    {
      name: "Autodata Integration",
      desc: "OEM technical repair specifications and interactive wiring diagrams.",
    },
    {
      name: "GSF Parts Integration",
      desc: "Direct catalog parts ordering link to GSF distributors at the click of a button.",
    },
    {
      name: "Partslink24 Integration",
      desc: "Live wholesale inventory connections for direct spare parts procurement.",
    },
    {
      name: "Postcode Lookup",
      desc: "Direct address verification fields to register vehicles and clients swiftly.",
    },
    {
      name: "Tyre Suppliers Stock APIs",
      desc: "Compare prices and access live stock connections from leading UK tyre wholesalers.",
    },
    {
      name: "Custom Job Cards",
      desc: "Auto-generated smart job cards outlining exact vehicle specs and required checklists.",
    },
    {
      name: "Invoicing & Estimates",
      desc: "Streamline billing with professional estimates, automated jobsheets, and instant invoices.",
    },
    {
      name: "Xero Integration",
      desc: "One-click financial accounting synchronization to prevent double data entries.",
    },
    {
      name: "Quickbooks Integration",
      desc: "Seamless accounting journal log updates for daily workshop revenue.",
    },
    {
      name: "Sage Integration",
      desc: "Secure invoice transaction transfer to your Sage bookkeeping dashboards.",
    },
    {
      name: "Stock Control",
      desc: "Automated parts inventory tracker linked to upcoming diagnostics schedules.",
    },
    {
      name: "SMS / Email Communication",
      desc: "Unified messages inbox to communicate with clients about active repairs.",
    },
    {
      name: "Web Bookings Gateway",
      desc: "Enable customers to book MOT slots and tyre fittings from your site 24/7.",
    },
    {
      name: "Technician Mobile App",
      desc: "Mobile check-off list and visual diagnostic upload apps for mechanics on Android/iOS.",
    },
    {
      name: "Administrator Mobile App",
      desc: "Track revenue logs, check scheduling loads, and view active tickets on the go.",
    },
    {
      name: "Customer Booking App",
      desc: "Custom branded iOS & Android apps under your own garage name to secure bookings.",
    },
    {
      name: "Vehicle Sales",
      desc: "Manage pre-owned vehicle logs, sales listings, and historic vehicle invoices.",
    },
    {
      name: "Inspection Form Manager",
      desc: "Generate electronic vehicle inspection reports with photo attachments.",
    },
    {
      name: "Bookkeeping & Reports",
      desc: "Generate advanced analytical graphs tracking margins, labor rates, and profitability.",
    },
    {
      name: "Data Migration Support",
      desc: "Assistance migrating CRM and inventory historical files into the new GMS suite.",
    },
    {
      name: "Multi-Site Control",
      desc: "Manage scheduling metrics, staff ritas, and parts transfers across branches.",
    },
    {
      name: "Automatic Updates",
      desc: "Seamless cloud updates ensuring your workshop always runs the latest software tools.",
    },
    {
      name: "DVLA Database Sync",
      desc: "Instant MOT history, VIN, engine code, and tyre sizing lookups by registration.",
    },
    {
      name: "Ramp Configuration",
      desc: "Configure custom day loads, load limits, and technician lift schedules.",
    },
    {
      name: "Stapletons Tyre Integration",
      desc: "Browse wholesale stock from Stapletons Tyre directly in the parts portal.",
    },
    {
      name: "BMTR Tyre API",
      desc: "Query live tyre stock and delivery time estimates from BMTR wholesale portal.",
    },
    {
      name: "Group Tyre Stock",
      desc: "Connect directly to Group tyres supplier database for active tyre bookings.",
    },
    {
      name: "Oak Tyre Integration",
      desc: "Live integration with Oak Tyres for tyres catalogue lookups and prices.",
    },
    {
      name: "Bond Integration",
      desc: "Seamless integration with Bond International for live tyre stock and pricing.",
    },
    {
      name: "Secure Cloud Backups",
      desc: "Automatic daily data replication keeping your database secure and encrypted.",
    },
    {
      name: "Personnel Rota Logs",
      desc: "Track labor hours, technician job efficiency, and configure mechanic commissions.",
    },
  ];

  // Pricing plans feature structure matching real website
  const pricingFeatures = [
    { name: "Store Customer Data", p1: "Yes", p2: "Yes", p3: "Yes" },
    { name: "Store Vehicle Data", p1: "Yes", p2: "Yes", p3: "Yes" },
    { name: "Create Estimates/Quotes", p1: "Yes", p2: "Yes", p3: "Yes" },
    { name: "Jobsheets", p1: "Yes", p2: "Yes", p3: "Yes" },
    { name: "Invoicing", p1: "Yes", p2: "Yes", p3: "Yes" },
    {
      name: "SMS/MOT Reminders (Fair Usage)",
      p1: "300 FOC PM",
      p2: "400 FOC PM",
      p3: "Unlimited*",
    },
    {
      name: "VRMs (Fair Usage)",
      p1: "300 PM",
      p2: "Unlimited*",
      p3: "Unlimited*",
    },
    { name: "Advanced VRM info", p1: "Yes", p2: "Yes", p3: "Yes" },
    { name: "Postcode Lookup", p1: "200pm", p2: "300pm", p3: "Unlimited*" },
    {
      name: "Tyre Suppliers Stock APIs",
      p1: "1 Supplier",
      p2: "Unlimited*",
      p3: "Unlimited*",
    },
    { name: "Multi users", p1: "3 Users", p2: "Unlimited*", p3: "Unlimited*" },
    {
      name: "Website Solutions",
      p1: "Not Included",
      p2: "Not Included",
      p3: "Free Unlimited",
    },
    {
      name: "Manufacturers Service/Repair Times",
      p1: "Optional £",
      p2: "Yes",
      p3: "Yes",
    },
    { name: "Stock System", p1: "Optional £", p2: "Yes", p3: "Yes" },
    {
      name: "Accounting Package Integration",
      p1: "Optional £",
      p2: "Yes",
      p3: "Yes",
    },
    { name: "Service Visuals", p1: "Optional £", p2: "Yes", p3: "Yes" },
    { name: "Vehicle Sales", p1: "Optional £", p2: "Optional £", p3: "Yes" },
    {
      name: "Full Technical Data (Autodata)",
      p1: "Optional £",
      p2: "Optional £",
      p3: "Yes",
    },
    { name: "Courtesy Cars", p1: "Optional £", p2: "Optional £", p3: "Yes" },
    {
      name: "Electronic Vehicle Inspections",
      p1: "Optional £",
      p2: "Optional £",
      p3: "Yes",
    },
    {
      name: "Technicians Mobile App",
      p1: "Optional £",
      p2: "Optional £",
      p3: "Yes",
    },
    {
      name: "Technicians Efficiency Reports",
      p1: "Optional £",
      p2: "Optional £",
      p3: "Yes",
    },
    {
      name: "Advanced Analytical Reports",
      p1: "Optional £",
      p2: "Optional £",
      p3: "Yes",
    },
    { name: "Set up cost", p1: "£500", p2: "£500", p3: "£500" },
    {
      name: "Data Migration",
      p1: "Optional £",
      p2: "Optional £",
      p3: "Optional £",
    },
    { name: "Multi-site Management", p1: "No", p2: "No", p3: "Yes" },
    { name: "Automatic Updates", p1: "Yes", p2: "Yes", p3: "Yes" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#050816] text-white">
      <SEOHeader
        title="Garage Management System (GMS) | Digital Workspace"
        description="Explore the all-in-one digital GMS for independent garages. Manage smart job cards, customer CRM, invoicing, stock control, and real-time revenue reports."
        keywords="GMS, garage CRM, workshop job cards, parts stock control, invoicing software garages"
        canonicalPath="/garage-management-system"
      />
      <Navbar />

      <main className="flex-grow pt-24">
        {/* ══════════════════════════════════════════
            HERO SECTION + BOOKING FORM
        ══════════════════════════════════════════ */}
        <section className="relative py-16 md:py-24 px-6 md:px-12 overflow-hidden border-b border-white/5">
          {/* background glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
            {/* Left Column: Heading, intro & bullet points */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="inline-flex items-center gap-2 bg-[#111827]/85 border border-indigo-500/35 px-4 py-2 rounded-full text-xs font-bold text-indigo-300 backdrop-blur-sm select-none shadow-[0_0_15px_rgba(99,102,241,0.15)]">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                <span>Auto Garage Network GMS Suite</span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-[52px] font-black tracking-tight text-white leading-[1.2] lg:max-w-4xl">
                Explore the Features of AGN's <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                  Garage Management System
                </span>{" "}
                <br />
                for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-400">
                  Excellent Tyre Fitting, MOT & Repair Garages
                </span>
              </h1>

              <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl font-semibold">
                Effortlessly streamline your workshop operations, maximize
                booking loads, and auto-sync accounting with our comprehensive
                GMS.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  "Acquire completely Free Setup & Free Training",
                  "Accessibility to a thorough comparison with our competitors",
                  "Advanced Autodata services will be at your disposal",
                  "1000+ people using AGN’s Garage Management System",
                  "With so many features you can rest assured, there is no match for us & we have the best system ever.",
                ].map((bullet, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 6 }}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/20 hover:bg-white/[0.04] transition-all duration-300"
                  >
                    <div className="w-6 h-6 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mt-0.5 shadow-sm">
                      <FiCheck className="w-4 h-4" />
                    </div>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed font-semibold">
                      {bullet}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column: Embedded booking form (styled cards) */}
            <div id="gms-booking-form" className="lg:col-span-5 w-full">
              <div className="relative group">
                {/* Glowing backlight ring */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[32px] blur opacity-30 group-hover:opacity-45 transition duration-1000 group-hover:duration-200 pointer-events-none" />

                <div className="relative bg-[#0c1222] border border-white/10 rounded-[30px] p-6 md:p-8 shadow-2xl backdrop-blur-md overflow-hidden">
                  {/* Accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

                  <h3 className="text-xl md:text-2xl font-black text-white text-center mb-1 select-none">
                    Book Now to Get further information
                  </h3>
                  <p className="text-xs text-gray-400 text-center mb-6 select-none font-semibold">
                    Fill in details below and our UK team will contact you
                    shortly.
                  </p>

                  <AnimatePresence mode="wait">
                    {formSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-12 space-y-4"
                      >
                        <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mx-auto">
                          <FiCheck className="w-8 h-8" />
                        </div>
                        <h4 className="text-white font-bold text-lg">
                          Inquiry Submitted!
                        </h4>
                        <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
                          Thank you for your interest. An Auto Garage Network
                          specialist will reach out to you within 24 hours.
                        </p>
                        <button
                          type="button"
                          onClick={() => setFormSubmitted(false)}
                          className="text-xs text-indigo-400 hover:text-white transition-colors pt-2 font-bold cursor-pointer"
                        >
                          Submit another request
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider block mb-1">
                            Full Name *
                          </label>
                          <div className="relative flex items-center group/field">
                            <span className="absolute left-4 text-gray-500 group-focus-within/field:text-indigo-400 pointer-events-none transition-colors">
                              <FiUser className="w-4 h-4" />
                            </span>
                            <input
                              id="form-name"
                              type="text"
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Your Name"
                              className="w-full bg-[#050816]/40 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-xs text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-semibold"
                            />
                          </div>
                        </div>

                        {/* Garage Name */}
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider block mb-1">
                            Company / Garage Name *
                          </label>
                          <div className="relative flex items-center group/field">
                            <span className="absolute left-4 text-gray-500 group-focus-within/field:text-indigo-400 pointer-events-none transition-colors">
                              <FiBriefcase className="w-4 h-4" />
                            </span>
                            <input
                              id="form-garagename"
                              type="text"
                              name="garageName"
                              required
                              value={formData.garageName}
                              onChange={handleInputChange}
                              placeholder="Your Garage Name / Company Name"
                              className="w-full bg-[#050816]/40 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-xs text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-semibold"
                            />
                          </div>
                        </div>

                        {/* Email & Phone side-by-side */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider block mb-1">
                              Email Address *
                            </label>
                            <div className="relative flex items-center group/field">
                              <span className="absolute left-4 text-gray-500 group-focus-within/field:text-indigo-400 pointer-events-none transition-colors">
                                <FiMail className="w-4 h-4" />
                              </span>
                              <input
                                id="form-email"
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="support@email.com"
                                className="w-full bg-[#050816]/40 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-xs text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-semibold"
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider block mb-1">
                              Phone Number *
                            </label>
                            <div className="relative flex items-center group/field">
                              <span className="absolute left-4 text-gray-500 group-focus-within/field:text-indigo-400 pointer-events-none transition-colors">
                                <FiPhone className="w-4 h-4" />
                              </span>
                              <input
                                id="form-phone"
                                type="tel"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="07947 906789"
                                className="w-full bg-[#050816]/40 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-xs text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-semibold"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Dropdown: Interested in */}
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider block mb-1">
                            Interested In *
                          </label>
                          <div className="relative flex items-center group/field">
                            <span className="absolute left-4 text-gray-500 group-focus-within/field:text-indigo-400 pointer-events-none transition-colors">
                              <FiDatabase className="w-4 h-4" />
                            </span>
                            <select
                              id="interestedin"
                              name="interestedIn"
                              required
                              value={formData.interestedIn}
                              onChange={handleInputChange}
                              className="w-full bg-[#050816]/40 border border-white/10 rounded-2xl pl-12 pr-10 py-3.5 text-xs text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-semibold appearance-none cursor-pointer"
                            >
                              <option
                                value=""
                                disabled
                                className="dark:bg-slate-900 dark:text-white bg-white text-slate-800"
                              >
                                Please Select
                              </option>
                              <option
                                value="Elite Workshop"
                                className="dark:bg-slate-900 dark:text-white bg-white text-slate-800"
                              >
                                Elite Workshop (£135+VAT /mo)
                              </option>
                              <option
                                value="Elite ProMax"
                                className="dark:bg-slate-900 dark:text-white bg-white text-slate-800"
                              >
                                Elite ProMax Workshop (£235+VAT /mo)
                              </option>
                              <option
                                value="Elite ProMax Plus"
                                className="dark:bg-slate-900 dark:text-white bg-white text-slate-800"
                              >
                                Elite ProMax Plus Workshop (£375+VAT /mo)
                              </option>
                              <option
                                value="General Query"
                                className="dark:bg-slate-900 dark:text-white bg-white text-slate-800"
                              >
                                General Inquiry
                              </option>
                            </select>
                            <FiChevronDown className="absolute right-4 text-gray-500 pointer-events-none transition-colors group-hover/field:text-indigo-400" />
                          </div>
                        </div>

                        {/* Address */}
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider block mb-1">
                            Garage Address *
                          </label>
                          <div className="relative flex items-center group/field">
                            <span className="absolute left-4 text-gray-500 group-focus-within/field:text-indigo-400 pointer-events-none transition-colors">
                              <FiMapPin className="w-4 h-4" />
                            </span>
                            <input
                              id="form-address"
                              type="text"
                              name="address"
                              required
                              value={formData.address}
                              onChange={handleInputChange}
                              placeholder="Melton Mowbray, Nether Broughton, LE14 3HD"
                              className="w-full bg-[#050816]/40 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-xs text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-semibold"
                            />
                          </div>
                        </div>

                        {/* Message */}
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider block mb-1">
                            Inquiry Message
                          </label>
                          <div className="relative flex items-start group/field">
                            <span className="absolute left-4 top-3.5 text-gray-500 group-focus-within/field:text-indigo-400 pointer-events-none transition-colors">
                              <FiFileText className="w-4 h-4" />
                            </span>
                            <textarea
                              id="form-message"
                              name="message"
                              rows={2.5}
                              value={formData.message}
                              onChange={handleInputChange}
                              placeholder="How can Auto Garage Network help your garage?"
                              className="w-full bg-[#050816]/40 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-xs text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-semibold resize-none"
                            />
                          </div>
                        </div>

                        {/* Submit */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="relative w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:via-indigo-500 hover:to-violet-500 text-white font-extrabold text-xs shadow-[0_0_25px_rgba(99,102,241,0.35)] hover:shadow-[0_0_35px_rgba(99,102,241,0.55)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 overflow-hidden group/btn"
                        >
                          {/* Shimmer overlay effect */}
                          <div className="absolute inset-0 w-1/2 h-full bg-white/15 skew-x-[-25deg] -translate-x-full group-hover/btn:animate-shimmer pointer-events-none" />

                          {isSubmitting ? (
                            <>
                              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              <span>Submitting Inquiries...</span>
                            </>
                          ) : (
                            <>
                              <FiSend className="w-3.5 h-3.5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5 transition-transform" />
                              <span>Submit Information</span>
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            LIVE INTERACTIVE PREVIEW SYSTEM
        ══════════════════════════════════════════ */}
        <div className="border-b border-white/5 bg-[#0a0f24]/20">
          <DashboardSection />
        </div>

        {/* ══════════════════════════════════════════
            DETAILED FEATURE COMPARISON TABLE
        ══════════════════════════════════════════ */}
        <section className="py-20 px-6 md:px-12 relative overflow-hidden border-b border-white/5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full inline-block">
                Pricing Comparison
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white">
                Simple, Fully Described Packages
              </h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Compare direct GMS features and choose the tier that fits your
                workshop's daily goals.
              </p>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto rounded-[24px] border border-white/10 bg-[#0c1222]/90 shadow-xl">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-[#050816]/80 text-gray-400 select-none">
                    <th className="p-5 font-black uppercase text-[10px] tracking-wider">
                      Features Suite
                    </th>
                    <th className="p-5 font-black uppercase text-[10px] tracking-wider text-center bg-white/5">
                      <div className="text-white text-sm">Elite Workshop</div>
                      <div className="text-emerald-400 text-lg font-black mt-1">
                        £135
                        <span className="text-[10px] font-normal text-gray-400">
                          /mo + VAT
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => scrollToForm("Elite Workshop")}
                        className="mt-3 px-4 py-2 rounded-xl bg-white/10 dark:bg-white/10 hover:bg-indigo-600 hover:text-white border border-white/10 text-white font-bold transition-all text-[10px] cursor-pointer"
                      >
                        Select Plan
                      </button>
                    </th>
                    <th className="p-5 font-black uppercase text-[10px] tracking-wider text-center bg-indigo-500/10 border-x border-white/10">
                      <div className="text-indigo-300 text-sm">
                        Elite ProMax
                      </div>
                      <div className="text-indigo-400 text-lg font-black mt-1">
                        £235
                        <span className="text-[10px] font-normal text-gray-400">
                          /mo + VAT
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => scrollToForm("Elite ProMax")}
                        className="mt-3 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-black transition-all text-[10px] cursor-pointer shadow-md shadow-indigo-600/20"
                      >
                        Select Plan
                      </button>
                    </th>
                    <th className="p-5 font-black uppercase text-[10px] tracking-wider text-center bg-white/5">
                      <div className="text-white text-sm">
                        Elite ProMax Plus
                      </div>
                      <div className="text-emerald-400 text-lg font-black mt-1">
                        £375
                        <span className="text-[10px] font-normal text-gray-400">
                          /mo + VAT
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => scrollToForm("Elite ProMax Plus")}
                        className="mt-3 px-4 py-2 rounded-xl bg-white/10 dark:bg-white/10 hover:bg-indigo-600 hover:text-white border border-white/10 text-white font-bold transition-all text-[10px] cursor-pointer"
                      >
                        Select Plan
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pricingFeatures.map((row, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-white/5 hover:bg-white/[0.02] transition-colors font-medium text-gray-300"
                    >
                      <td className="p-4 font-bold text-gray-200 border-r border-white/5">
                        {row.name}
                      </td>
                      <td className="p-4 text-center border-r border-white/5 bg-white/[0.01] text-gray-200">
                        {row.p1 === "Yes" ? (
                          <FiCheck className="text-blue-400 w-4.5 h-4.5 mx-auto" />
                        ) : row.p1 === "No" ? (
                          <FiX className="text-red-400 w-4.5 h-4.5 mx-auto" />
                        ) : (
                          row.p1
                        )}
                      </td>
                      <td className="p-4 text-center bg-indigo-500/[0.02] border-r border-white/10 font-bold text-white">
                        {row.p2 === "Yes" ? (
                          <FiCheck className="text-blue-400 w-4.5 h-4.5 mx-auto" />
                        ) : row.p2 === "No" ? (
                          <FiX className="text-red-400 w-4.5 h-4.5 mx-auto" />
                        ) : (
                          row.p2
                        )}
                      </td>
                      <td className="p-4 text-center bg-white/[0.01] text-gray-200">
                        {row.p3 === "Yes" ? (
                          <FiCheck className="text-blue-400 w-4.5 h-4.5 mx-auto" />
                        ) : row.p3 === "No" ? (
                          <FiX className="text-red-400 w-4.5 h-4.5 mx-auto" />
                        ) : (
                          row.p3
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Stack Cards List View */}
            <div className="grid md:hidden gap-6">
              {[
                { name: "Elite Workshop", price: "£135", listKey: "p1" },
                { name: "Elite ProMax", price: "£235", listKey: "p2" },
                { name: "Elite ProMax Plus", price: "£375", listKey: "p3" },
              ].map((plan, i) => (
                <div
                  key={i}
                  className="bg-[#0c1222]/90 border border-white/10 rounded-[22px] p-6 space-y-4 shadow-xl"
                >
                  <div className="flex justify-between items-center pb-3 border-b border-white/10">
                    <h3 className="font-extrabold text-white text-base">
                      {plan.name}
                    </h3>
                    <span className="text-indigo-400 font-black text-lg">
                      {plan.price}/mo
                    </span>
                  </div>
                  <ul className="space-y-3.5 text-xs text-gray-400">
                    {pricingFeatures.slice(0, 10).map((row, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span className="font-medium">{row.name}</span>
                        <span className="font-bold text-white">
                          {row[plan.listKey]}
                        </span>
                      </li>
                    ))}
                    <li className="text-center pt-3">
                      <button
                        type="button"
                        onClick={() => scrollToForm(plan.name)}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold rounded-xl transition-all cursor-pointer text-xs shadow-md shadow-indigo-600/10"
                      >
                        Inquire About {plan.name}
                      </button>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FAIR USAGE POLICY BLOCK
        ══════════════════════════════════════════ */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#0c1222]/95 via-[#0c1222]/95 to-indigo-950/20 border border-white/10 rounded-[28px] p-6 md:p-10 shadow-2xl relative overflow-hidden dark-card-preserve"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10 space-y-6 text-left">
                <div className="flex items-center gap-2 text-indigo-400 font-bold uppercase text-xs tracking-wider">
                  <FiAlertTriangle className="w-5 h-5 shrink-0" /> Fair Usage
                  Policy (FUP) for SMS & VRMs
                </div>
                <h3 className="text-2xl font-black text-white leading-tight">
                  Fair Usage Policy Rules
                </h3>
                <div className="space-y-4 text-xs md:text-sm text-gray-400 leading-relaxed font-medium">
                  <p>
                    <strong>1. Allocation:</strong> Subscribed packages include
                    specific allocations of SMS messages and Vehicle
                    Registration Mark (VRM) lookups per billing cycle (monthly).
                    Unused allocations do not roll over.
                  </p>
                  <p>
                    <strong>2. Fair Usage Limits:</strong> Customers must use
                    services for standard business operations. Standard rates
                    apply for excess usage beyond your limit (SMS: 10p per
                    message, VRM: 10p per lookup).
                  </p>
                  <p>
                    <strong>3. Prohibited Use:</strong> Reselling lookup queries
                    or utilizing automated scrapers is strictly prohibited under
                    Mr. Bassi's security system.
                  </p>
                  <p>
                    <strong>4. Support & Monitoring:</strong> Notifications will
                    be dispatched when approaching 90% usage limits. Contact
                    support on <strong>01702 655556</strong> or{" "}
                    <strong>support@autogaragenetwork.com</strong> for
                    assistance.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CORE GMS FEATURES GRID (36 CARDS)
        ══════════════════════════════════════════ */}
        <section className="py-20 px-6 md:px-12 bg-[#0a0f24]/20 border-t border-white/5 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-4 py-1.5 rounded-full inline-block">
                All Capabilities
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-white">
                GMS Features Grid
              </h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Everything you need to successfully run, automate, and expand
                your independent garage workshop.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {keyFeatures
                .filter(
                  (item) =>
                    featureLogos[item.name] ||
                    item.name === "Xero Integration" ||
                    item.name === "Sage Integration",
                )
                .map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{
                      y: -10,
                      scale: 1.025,
                      borderColor: "rgba(99, 102, 241, 0.5)",
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 22 }}
                    className="bg-gradient-to-br from-[#0c1222] to-[#080d19] border border-white/10 border-b-4 border-b-indigo-500/20 hover:border-b-indigo-500/40 p-6 rounded-[24px] flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.05)] text-left group relative overflow-hidden cursor-default transition-all duration-300 gms-feature-card"
                  >
                    {/* Shiny reflecting beam sweep on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "200%" }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                    />

                    {/* Corner ambient radial glow */}
                    <div className="absolute -right-8 -top-8 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors pointer-events-none" />

                    <div className="h-14 flex items-center mb-4 select-none relative z-10">
                      {getFeatureLogoOrIcon(item.name, idx)}
                    </div>
                    <h4 className="font-extrabold text-white text-sm mb-2 transition-colors duration-300 group-hover:text-indigo-300 relative z-10">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-gray-400 leading-relaxed font-medium flex-grow relative z-10">
                      {item.desc}
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

export default GarageManagementSystem;
