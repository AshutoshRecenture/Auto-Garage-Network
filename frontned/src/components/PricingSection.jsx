import React from "react";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { useLogo } from "../utils/LogoContext.jsx";

const PricingSection = () => {
  const { priceEliteWorkshop, priceEliteProMax, priceEliteProMaxPlus } = useLogo();

  const plans = [
    {
      name: "Elite Workshop",
      price: priceEliteWorkshop || "135",
      desc: "Perfect for small to medium independent garages.",
      features: [
        "Up to 3 Users",
        "Unlimited Invoices & Quotes",
        "MOT & Service Reminders",
        "Customer Database (CRM)",
        "Basic Reporting",
        "Email Support",
      ],
    },
    {
      name: "Elite ProMax",
      price: priceEliteProMax || "235",
      desc: "Everything you need to scale your garage operations.",
      isPopular: true,
      features: [
        "Up to 10 Users",
        "Everything in Workshop",
        "Autodata & TecRMI Integration",
        "Xero/QuickBooks/Sage Sync",
        "Parts Ordering (GSF/Partslink24)",
        "Advanced Analytics",
        "Priority Phone Support",
      ],
    },
    {
      name: "Elite ProMax Plus",
      price: priceEliteProMaxPlus || "375",
      desc: "For large multi-site operations and franchises.",
      features: [
        "Unlimited Users",
        "Everything in ProMax",
        "Multi-Site Management",
        "Custom API Access",
        "Dedicated Account Manager",
        "On-site Training",
        "24/7 Premium Support",
      ],
    },
  ];

  return (
    <section
      id="pricing"
      className="pt-10 pb-6 md:pt-20 md:pb-10 px-6 md:px-12 bg-[#050816] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6 font-sans"
          >
            Simple, Transparent{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 font-sans">
              Pricing
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 text-lg font-sans"
          >
            No hidden fees. No long-term contracts. Choose the plan that fits
            your garage.
          </motion.p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch mb-6">
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
                  ? "border-indigo-500 shadow-[0_0_40px_rgba(79,70,229,0.25)]"
                  : "border-white/5 hover:border-indigo-500/25 shadow-lg"
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
                <h3 className="text-xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-xs text-gray-400 h-10">{plan.desc}</p>
                <div className="mt-6 flex items-baseline text-white">
                  <span className="text-3xl font-bold">£</span>
                  <span className="text-5xl font-extrabold tracking-tight">
                    {plan.price}
                  </span>
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

              <button
                className={`w-full py-4 rounded-xl font-bold transition-all cursor-pointer ${
                  plan.isPopular
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20"
                    : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                }`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
