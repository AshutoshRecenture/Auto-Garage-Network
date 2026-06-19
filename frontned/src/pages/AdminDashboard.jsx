import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiDownload, FiSearch, FiKey, FiDatabase, FiLayers, FiMail, FiPhone } from "react-icons/fi";
import SEOHeader from "../components/SEOHeader.jsx";

const AdminDashboard = () => {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("agn_admin_authenticated") === "true";
  });
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterInterest, setFilterInterest] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
    loadLeads();
  }, []);

  const loadLeads = () => {
    try {
      const stored = localStorage.getItem("agn_leads");
      if (stored) {
        setLeads(JSON.parse(stored).reverse()); // newest first
      }
    } catch (e) {
      console.error("Failed to load leads:", e);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === "admin123") {
      setIsAuthenticated(true);
      sessionStorage.setItem("agn_admin_authenticated", "true");
    } else {
      alert("Invalid passcode! Hint: admin123");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("agn_admin_authenticated");
    setPasscode("");
  };

  const handleDeleteLead = (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      const updated = leads.filter((lead) => lead.id !== id);
      // Leads are rendered in reverse (newest first), so reverse again before saving
      const saveList = [...updated].reverse();
      localStorage.setItem("agn_leads", JSON.stringify(saveList));
      setLeads(updated);
    }
  };

  const handleClearDatabase = () => {
    if (window.confirm("WARNING: This will permanently delete ALL leads! Proceed?")) {
      localStorage.removeItem("agn_leads");
      setLeads([]);
    }
  };

  const downloadCSV = () => {
    if (leads.length === 0) {
      alert("No leads to download.");
      return;
    }

    const headers = ["ID", "Garage/Company Name", "Email", "Phone", "Interest", "Message", "Timestamp"];
    const rows = leads.map((lead) => [
      lead.id,
      `"${lead.name.replace(/"/g, '""')}"`,
      `"${lead.email.replace(/"/g, '""')}"`,
      `"${lead.phone.replace(/"/g, '""')}"`,
      `"${lead.interest.replace(/"/g, '""')}"`,
      `"${(lead.message || "").replace(/"/g, '""')}"`,
      lead.timestamp,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `agn_leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter and search leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      (lead.message || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterInterest === "All" || lead.interest === filterInterest;

    return matchesSearch && matchesFilter;
  });

  // Calculate metrics
  const totalLeads = leads.length;
  const gmsLeads = leads.filter((l) => l.interest.includes("Garage")).length;
  const webLeads = leads.filter((l) => l.interest.includes("Website")).length;
  const otherLeads = totalLeads - gmsLeads - webLeads;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#050816] text-white">
      <SEOHeader
        title="Admin Portal Dashboard"
        description="Internal administrative control dashboard for managing platform accounts, clients, subscriptions, and integrations."
        keywords="admin console, internal manager"
        canonicalPath="/admin"
      />
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        {/* Passcode Login Form */}
        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md mx-auto my-20 px-6"
            >
              <div className="bg-[#0c1222] border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-[50px] pointer-events-none" />
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mx-auto mb-6">
                  <FiKey size={30} />
                </div>
                <h1 className="text-2xl font-black mb-2 text-white">Admin Dashboard</h1>
                <p className="text-gray-400 text-sm mb-6">
                  Enter the administrator passcode to view and manage workshop leads.
                </p>

                <form onSubmit={handleLogin} className="space-y-4 text-left">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-500">
                      Passcode
                    </label>
                    <input
                      type="password"
                      required
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder="Enter passcode (admin123)"
                      className="w-full bg-[#070b18] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg cursor-pointer"
                  >
                    Authorize Access
                  </button>
                </form>
              </div>
            </motion.div>
          ) : (
            /* Main Admin Dashboard Workspace */
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl mx-auto px-6 md:px-12 mt-6"
            >
              {/* Header and Logout */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                  <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-4 py-1.5 rounded-full inline-block mb-3">
                    Administrative Access
                  </span>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-white">
                    Demo Request Leads Database
                  </h1>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-white/5 border border-white/10 text-gray-300 hover:text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  Logout Session
                </button>
              </div>

              {/* Analytics Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-[#0c1222] border border-white/5 p-5 rounded-2xl flex flex-col justify-between shadow-md">
                  <span className="text-gray-400 text-xs font-bold uppercase tracking-wide">Total Leads</span>
                  <span className="text-3xl font-black text-indigo-400 mt-2">{totalLeads}</span>
                </div>
                <div className="bg-[#0c1222] border border-white/5 p-5 rounded-2xl flex flex-col justify-between shadow-md">
                  <span className="text-gray-400 text-xs font-bold uppercase tracking-wide">GMS Enquiries</span>
                  <span className="text-3xl font-black text-emerald-400 mt-2">{gmsLeads}</span>
                </div>
                <div className="bg-[#0c1222] border border-white/5 p-5 rounded-2xl flex flex-col justify-between shadow-md">
                  <span className="text-gray-400 text-xs font-bold uppercase tracking-wide">Website Enquiries</span>
                  <span className="text-3xl font-black text-cyan-400 mt-2">{webLeads}</span>
                </div>
                <div className="bg-[#0c1222] border border-white/5 p-5 rounded-2xl flex flex-col justify-between shadow-md">
                  <span className="text-gray-400 text-xs font-bold uppercase tracking-wide">Other Enquiries</span>
                  <span className="text-3xl font-black text-amber-400 mt-2">{otherLeads}</span>
                </div>
              </div>

              {/* Actions, Filters and Search */}
              <div className="bg-[#0c1222] border border-white/5 p-6 rounded-3xl mb-8 flex flex-col md:flex-row justify-between items-center gap-4 shadow-md">
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                  {/* Search Bar */}
                  <div className="relative w-full sm:w-64">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search name, phone, msg..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-[#050816] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-indigo-500 text-white placeholder-gray-500"
                    />
                  </div>

                  {/* Filter Select */}
                  <div className="relative w-full sm:w-56">
                    <select
                      value={filterInterest}
                      onChange={(e) => setFilterInterest(e.target.value)}
                      className="w-full bg-[#050816] border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-indigo-500 text-white cursor-pointer"
                    >
                      <option value="All">All Interests</option>
                      <option value="Garage Management System">Garage Management System</option>
                      <option value="Website for Garages">Website for Garages</option>
                      <option value="Autotech Data Integration">Autotech Data Integration</option>
                      <option value="MOT Diary Calendar">MOT Diary Calendar</option>
                    </select>
                  </div>
                </div>

                {/* Database Actions */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  <button
                    onClick={downloadCSV}
                    className="flex items-center gap-2 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-600 hover:text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
                  >
                    <FiDownload />
                    <span>Download CSV</span>
                  </button>
                  <button
                    onClick={handleClearDatabase}
                    disabled={leads.length === 0}
                    className="flex items-center gap-2 bg-red-600/10 border border-red-500/20 text-red-400 hover:bg-red-600 hover:text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer disabled:opacity-40 disabled:hover:bg-red-600/10 disabled:hover:text-red-400"
                  >
                    <FiTrash2 />
                    <span>Clear Database</span>
                  </button>
                </div>
              </div>

              {/* Leads List / Table */}
              <div className="bg-[#0c1222] border border-white/5 rounded-3xl overflow-hidden shadow-xl">
                {filteredLeads.length === 0 ? (
                  <div className="text-center py-16 px-6">
                    <FiDatabase className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-white mb-1">No Leads Found</h3>
                    <p className="text-gray-500 text-sm max-w-xs mx-auto">
                      There are no submissions matching your search filters. Try resetting the criteria.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="border-b border-white/5 bg-[#050816]/30 text-gray-400 text-[10px] uppercase font-bold tracking-wider">
                          <th className="py-4 px-6">Garage / Contact</th>
                          <th className="py-4 px-6">System Interest</th>
                          <th className="py-4 px-6">Message / Profile</th>
                          <th className="py-4 px-6">Submitted At</th>
                          <th className="py-4 px-6 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-xs">
                        {filteredLeads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-4 px-6 space-y-1">
                              <span className="font-bold text-white block text-sm">{lead.name}</span>
                              <div className="flex flex-col gap-0.5 text-gray-400">
                                <a href={`mailto:${lead.email}`} className="hover:text-indigo-400 flex items-center gap-1.5">
                                  <FiMail className="shrink-0" size={12} />
                                  <span>{lead.email}</span>
                                </a>
                                <a href={`tel:${lead.phone}`} className="hover:text-indigo-400 flex items-center gap-1.5">
                                  <FiPhone className="shrink-0" size={12} />
                                  <span>{lead.phone}</span>
                                </a>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                <FiLayers size={10} />
                                {lead.interest}
                              </span>
                            </td>
                            <td className="py-4 px-6 max-w-xs">
                              <p className="text-gray-400 line-clamp-3 leading-relaxed">
                                {lead.message || <span className="italic text-gray-600">No message provided</span>}
                              </p>
                            </td>
                            <td className="py-4 px-6 text-gray-500">
                              {new Date(lead.timestamp).toLocaleString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </td>
                            <td className="py-4 px-6 text-center">
                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                className="text-red-400 hover:text-white p-2 hover:bg-red-500/20 rounded-xl transition-all cursor-pointer"
                                title="Delete Lead"
                              >
                                <FiTrash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
