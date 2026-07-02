import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SEOHeader from "../components/SEOHeader.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { API_URL } from "../config";
import NotFound from "./NotFound.jsx";
import { FiBriefcase, FiClock, FiDollarSign, FiSend, FiCheckCircle } from "react-icons/fi";

const Careers = () => {
  const [vacancies, setVacancies] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [dbPage, setDbPage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Application Modal state
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyForm, setApplyForm] = useState({ name: "", email: "", phone: "", resumeUrl: "", message: "" });
  const [applied, setApplied] = useState(false);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadData = async () => {
      try {
        const [vacRes, pageRes] = await Promise.all([
          fetch(`${API_URL}/api/vacancies`),
          fetch(`${API_URL}/api/pages/slug/careers`)
        ]);

        if (vacRes.ok) {
          const vacData = await vacRes.json();
          // Filter active ones
          setVacancies(vacData.filter(v => v.isActive) || []);
        }

        if (pageRes.status === 403) {
          setIsDisabled(true);
        } else if (pageRes.ok) {
          const pageData = await pageRes.json();
          setDbPage(pageData);
        }
      } catch (err) {
        console.error("Failed to load careers details:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (isDisabled) {
    return <NotFound />;
  }

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    setApplying(true);
    // Simulate application upload
    setTimeout(() => {
      setApplying(false);
      setApplied(true);
      setApplyForm({ name: "", email: "", phone: "", resumeUrl: "", message: "" });
      setTimeout(() => {
        setApplied(false);
        setSelectedJob(null);
      }, 2500);
    }, 1500);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#050816] text-white">
      <SEOHeader
        title="Careers | Work with Auto Garage Network"
        description="Join our team at Auto Garage Network. Browse current job opportunities, mechanical engineering slots, and developer roles in the UK."
        keywords="careers auto garage network, workshop technician jobs, auto jobs UK"
        canonicalPath="/careers"
      />
      <Navbar />

      <main className="flex-grow pt-24 pb-20 relative overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          {/* Hero Banner section */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <motion.div
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6 }}
              variants={fadeUp}
            >
              <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Join Our Team
              </span>
              <h1 className="text-4xl md:text-6xl font-black mt-4 tracking-tight leading-tight">
                {dbPage && dbPage.bannerTitle ? dbPage.bannerTitle : "Build the Future of Workshops"}
              </h1>
              <p className="text-gray-400 text-sm md:text-base mt-4 leading-relaxed font-semibold">
                {dbPage && dbPage.bannerSubtitle ? dbPage.bannerSubtitle : "We are looking for passionate, driven individuals to shape modern e-partnerships with UK garages. Explore our open roles below."}
              </p>
            </motion.div>
          </div>

          {/* Dynamic Content block if added in admin panel */}
          {dbPage && dbPage.content && (
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              variants={fadeUp}
              className="mb-16 p-8 bg-white/[0.01] border border-white/5 rounded-3xl"
            >
              <div className="prose prose-invert prose-indigo max-w-none">
                <div dangerouslySetInnerHTML={{ __html: dbPage.content }} className="dynamic-html-content" />
              </div>
            </motion.section>
          )}

          {/* Job listings */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 rounded-full border-[3px] border-indigo-500 border-t-transparent animate-spin" />
            </div>
          ) : vacancies.length === 0 ? (
            <div className="text-center py-16 bg-white/[0.01] border border-white/5 rounded-3xl max-w-md mx-auto">
              <FiBriefcase className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white">No Vacancies Available</h3>
              <p className="text-gray-400 text-xs mt-2 px-6">
                We don't have any open opportunities right now, but feel free to send your CV to support@autogaragenetwork.com.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vacancies.map((job, idx) => (
                <motion.div
                  key={job._id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  variants={fadeUp}
                  className="bg-[#0c1222]/80 border border-white/5 p-6 rounded-3xl flex flex-col justify-between hover:border-indigo-500/30 hover:bg-[#0c1222] hover:shadow-xl hover:shadow-indigo-500/5 transition-all group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-md">
                      <FiBriefcase size={20} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-extrabold text-white group-hover:text-indigo-400 transition-colors">
                        {job.role}
                      </h3>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                        Auto Garage Network
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs text-gray-400 pt-2 font-medium">
                      <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg">
                        <FiClock className="text-indigo-400" />
                        {job.workingHours || "Full-Time"}
                      </span>
                      <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg">
                        <FiDollarSign className="text-emerald-400" />
                        {job.salary || "Competitive"}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedJob(job)}
                    className="w-full mt-6 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white border border-indigo-500/20 hover:border-indigo-500 font-bold py-2.5 rounded-xl text-xs transition-all shadow-md cursor-pointer text-center"
                  >
                    Apply Now
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Application Dialog Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-[#0c1222] border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl relative"
          >
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white cursor-pointer"
            >
              <FiBriefcase className="w-5 h-5 rotate-45 text-rose-400" />
            </button>

            {applied ? (
              <div className="text-center py-8 space-y-4">
                <FiCheckCircle className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-xl font-bold text-white">Application Received!</h3>
                <p className="text-gray-400 text-xs px-4">
                  Thank you for applying for the <strong>{selectedJob.role}</strong> position. Our recruiting team will review and respond shortly.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-black text-white">Apply for Role</h3>
                  <p className="text-xs text-indigo-400 font-bold mt-1 uppercase">{selectedJob.role}</p>
                </div>

                <form onSubmit={handleApplySubmit} className="space-y-4 text-left">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-slate-400">Full Name</label>
                    <input
                      type="text"
                      required
                      value={applyForm.name}
                      onChange={(e) => setApplyForm({ ...applyForm, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full bg-[#050816] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-slate-400">Email Address</label>
                    <input
                      type="email"
                      required
                      value={applyForm.email}
                      onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                      placeholder="e.g. john@example.com"
                      className="w-full bg-[#050816] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-slate-400">Phone Number</label>
                    <input
                      type="text"
                      required
                      value={applyForm.phone}
                      onChange={(e) => setApplyForm({ ...applyForm, phone: e.target.value })}
                      placeholder="e.g. +44 7911 123456"
                      className="w-full bg-[#050816] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-slate-400">Resume / CV Link</label>
                    <input
                      type="url"
                      required
                      value={applyForm.resumeUrl}
                      onChange={(e) => setApplyForm({ ...applyForm, resumeUrl: e.target.value })}
                      placeholder="e.g. Link to Google Drive, Dropbox, etc."
                      className="w-full bg-[#050816] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-slate-400">Cover Note / Message</label>
                    <textarea
                      rows={3}
                      value={applyForm.message}
                      onChange={(e) => setApplyForm({ ...applyForm, message: e.target.value })}
                      placeholder="Briefly state why you're a great fit..."
                      className="w-full bg-[#050816] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={applying}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl text-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
                  >
                    <FiSend />
                    <span>{applying ? "Submitting Application..." : "Submit Application"}</span>
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Careers;
