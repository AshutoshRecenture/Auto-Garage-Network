import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiHelpCircle } from "react-icons/fi";

const faqs = [
  {
    question: "What exactly does Auto Garage Network offer?",
    answer:
      "Auto Garage Network (AGN) is an all-in-one cloud-based garage management system (GMS) and bespoke website provider. We automate administrative tasks, streamline daily workshop operations, and help scale your revenue.",
  },
  {
    question: "Does the system integrate with my accounting software?",
    answer:
      "Yes, our Garage Management System seamlessly synchronizes with major accounting platforms including QuickBooks, Xero, and Sage, ensuring your finances are always up-to-date without manual data entry.",
  },
  {
    question: "Can you help with MOT bookings and resource management?",
    answer:
      "Absolutely. Our cloud-based MOT Diary and ramp scheduler manages your bookings efficiently. It includes automated SMS and email reminders to significantly reduce workshop no-shows.",
  },
  {
    question: "What features are included in your custom websites?",
    answer:
      "Our bespoke e-commerce websites are designed to convert local search queries into bookings. Features include live DVLA lookups via registration number, e-commerce booking portals for MOTs/servicing, and real-time tyre inventory integration with major UK distributors.",
  },
  {
    question: "Do you provide technical vehicle data integrations?",
    answer:
      "Yes! Our platform features powerful integrations like Solera Autodata and TecRMI scheduling, giving your mechanics instant access to essential repair data and service times directly inside the smart job cards.",
  },
  {
    question: "Will you help my garage rank higher on Google?",
    answer:
      "Definitely. We provide targeted local SEO services that position your automotive workshop at the top of local Google search queries for MOTs, tyres, and mechanical repairs in your area.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="pt-2 pb-8 md:pt-1 md:pb-1 px-5 bg-[#050816] relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-indigo-600/10 rounded-full hidden md:block blur-[] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full hidden md:block blur-[] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-3 md:mb-9"> 
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white"
          >
            FAQ
          </motion.h2>
        </div>

        <div className="flex flex-col border-t border-white/10">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className={`border-b transition-colors duration-300 ${
                openIndex === index
                  ? "border-indigo-500/50"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex items-center justify-between w-full p-5 md:p-6 text-left focus:outline-none cursor-pointer"
              >
                <h3 className="text-base md:text-lg font-semibold pr-4">
                  {faq.question}
                </h3>
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    openIndex === index
                      ? "bg-indigo-500 text-white"
                      : "bg-white/5 text-gray-400"
                  }`}
                >
                  <FiChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
                  />
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 md:p-6 pt-0 text-gray-400 text-sm md:text-base leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 text-sm">
            Still have questions?{" "}
            <a
              href="/contact-us"
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              Contact our support team
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
