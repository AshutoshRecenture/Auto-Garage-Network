import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiPercent, FiTrendingUp, FiClock } from 'react-icons/fi';

const PricingSection = () => {
  const plans = [
    {
      name: 'Elite Workshop',
      price: '135',
      desc: 'Perfect for small to medium independent garages.',
      features: [
        'Up to 3 Users',
        'Unlimited Invoices & Quotes',
        'MOT & Service Reminders',
        'Customer Database (CRM)',
        'Basic Reporting',
        'Email Support'
      ]
    },
    {
      name: 'Elite ProMax',
      price: '235',
      desc: 'Everything you need to scale your garage operations.',
      isPopular: true,
      features: [
        'Up to 10 Users',
        'Everything in Workshop',
        'Autodata & TecRMI Integration',
        'Xero/QuickBooks/Sage Sync',
        'Parts Ordering (GSF/Partslink24)',
        'Advanced Analytics',
        'Priority Phone Support'
      ]
    },
    {
      name: 'Elite ProMax Plus',
      price: '375',
      desc: 'For large multi-site operations and franchises.',
      features: [
        'Unlimited Users',
        'Everything in ProMax',
        'Multi-Site Management',
        'Custom API Access',
        'Dedicated Account Manager',
        'On-site Training',
        '24/7 Premium Support'
      ]
    }
  ];

  // ROI Calculator states
  const [dailyJobs, setDailyJobs] = useState(15);
  const [avgInvoice, setAvgInvoice] = useState(120);
  const [adminHours, setAdminHours] = useState(3);

  // Calculations:
  // - Admin hours reduced by 40% + 0.1 hours saved per job (auto-lookups, parts link)
  const monthlyHoursSaved = Math.round((adminHours * 0.4 + dailyJobs * 0.1) * 22);
  // - 6% more jobs recovered using automated reminders (average invoice value)
  const extraJobsRecovered = Math.round(dailyJobs * 0.06 * 22);
  const monthlyRevenueGain = Math.round((extraJobsRecovered * avgInvoice) + (monthlyHoursSaved * 25)); // assuming technician cost of £25/hr
  const yearlySavings = monthlyRevenueGain * 12;
  const roiMultiplier = (monthlyRevenueGain / 135).toFixed(1);

  return (
    <section id="pricing" className="py-24 px-6 md:px-12 bg-[#050816] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6 font-sans"
          >
            Simple, Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 font-sans">Pricing</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg font-sans"
          >
            No hidden fees. No long-term contracts. Choose the plan that fits your garage.
          </motion.p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch mb-24">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative bg-[#0c1222]/80 backdrop-blur-md rounded-3xl p-8 flex flex-col transition-all duration-300 border ${
                plan.isPopular 
                  ? 'border-indigo-500 shadow-[0_0_40px_rgba(79,70,229,0.25)]' 
                  : 'border-white/5 hover:border-indigo-500/25 shadow-lg'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 inset-x-0 -translate-y-1/2 flex justify-center">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg select-none">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="mb-8 select-none">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-xs text-gray-400 h-10">{plan.desc}</p>
                <div className="mt-6 flex items-baseline text-white">
                  <span className="text-3xl font-bold">£</span>
                  <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
                  <span className="text-gray-400 ml-2 font-medium">/month</span>
                </div>
              </div>

              <div className="flex-1">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 mt-0.5 mr-3">
                        <FiCheck className="w-3 h-3" />
                      </div>
                      <span className="text-gray-300 text-xs">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className={`w-full py-4 rounded-xl font-bold transition-all cursor-pointer ${
                plan.isPopular 
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
                  : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
              }`}>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>

        {/* ROI Savings Calculator Module */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-[#0c1222]/90 border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl backdrop-blur-md overflow-hidden max-w-5xl mx-auto"
        >
          {/* Decorative Backlights */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-500" />

          <div className="relative z-10 text-left">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2 flex items-center gap-2 select-none">
              <FiTrendingUp className="text-emerald-400" />
              <span>GMS ROI & Savings Calculator</span>
            </h3>
            <p className="text-xs md:text-sm text-gray-400 mb-10 select-none">
              Adjust the sliders below to calculate how much time and money the AGN Garage Management System can save your workshop.
            </p>

            <div className="grid lg:grid-cols-12 gap-10">
              {/* Sliders Container (Left) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Slider 1 */}
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center text-xs font-bold uppercase select-none">
                    <span className="text-gray-400">Daily Bookings / Jobs</span>
                    <span className="text-indigo-400 bg-indigo-500/10 border border-indigo-500/25 px-2 py-0.5 rounded">{dailyJobs} Jobs/day</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={dailyJobs}
                    onChange={(e) => setDailyJobs(Number(e.target.value))}
                    className="w-full h-1.5 bg-[#050816] rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <div className="flex justify-between text-[10px] text-gray-600 font-bold select-none">
                    <span>1 Job</span>
                    <span>50 Jobs</span>
                  </div>
                </div>

                {/* Slider 2 */}
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center text-xs font-bold uppercase select-none">
                    <span className="text-gray-400">Average Invoice Value</span>
                    <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 rounded">£{avgInvoice} per job</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="500"
                    value={avgInvoice}
                    onChange={(e) => setAvgInvoice(Number(e.target.value))}
                    className="w-full h-1.5 bg-[#050816] rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex justify-between text-[10px] text-gray-600 font-bold select-none">
                    <span>£30</span>
                    <span>£500</span>
                  </div>
                </div>

                {/* Slider 3 */}
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center text-xs font-bold uppercase select-none">
                    <span className="text-gray-400">Admin/Office Hours Per Day</span>
                    <span className="text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 px-2 py-0.5 rounded">{adminHours} Hours/day</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={adminHours}
                    onChange={(e) => setAdminHours(Number(e.target.value))}
                    className="w-full h-1.5 bg-[#050816] rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                  <div className="flex justify-between text-[10px] text-gray-600 font-bold select-none">
                    <span>1 Hour</span>
                    <span>8 Hours</span>
                  </div>
                </div>
              </div>

              {/* Live Savings Calculations Panel (Right) */}
              <div className="lg:col-span-5 bg-[#050816]/75 border border-white/5 rounded-3xl p-6 flex flex-col justify-between gap-6 relative shadow-lg roi-panel-preserve">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-[40px] pointer-events-none" />
                
                <div className="space-y-4">
                  {/* Gauge 1 */}
                  <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 shadow-inner">
                      <FiClock size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-0.5">Admin Time Saved</span>
                      <span className="text-lg font-black text-white">{monthlyHoursSaved} Hrs <span className="text-xs text-gray-400 font-medium">/month</span></span>
                    </div>
                  </div>

                  {/* Gauge 2 */}
                  <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shadow-inner">
                      <FiPercent size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-0.5">Estimated Revenue Gain</span>
                      <span className="text-lg font-black text-emerald-400">£{monthlyRevenueGain.toLocaleString()} <span className="text-xs text-gray-400 font-medium">/month</span></span>
                    </div>
                  </div>

                  {/* Gauge 3 */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 shadow-inner">
                      <FiTrendingUp size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-0.5">Return on Investment</span>
                      <span className="text-lg font-black text-white">{roiMultiplier}x <span className="text-xs text-indigo-400 font-semibold bg-indigo-500/15 border border-indigo-500/30 px-1.5 py-0.5 rounded ml-1">ROI</span></span>
                    </div>
                  </div>
                </div>

                {/* Banner summary */}
                <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-2xl p-4 text-center">
                  <span className="text-[9px] uppercase font-black tracking-widest text-emerald-400 block mb-0.5">Projected Yearly Return</span>
                  <span className="text-2xl font-black text-white">£{yearlySavings.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
