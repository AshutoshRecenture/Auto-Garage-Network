import React, { useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { motion } from "framer-motion";
import SEOHeader from "../components/SEOHeader.jsx";

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#050816] text-white">
      <SEOHeader
        title="Terms & Conditions of Service"
        description="Review the terms and conditions for using Auto Garage Network software suite, website solutions, custom apps, and support contracts."
        keywords="terms of service, software terms, user agreement"
        canonicalPath="/terms-of-service"
      />
      <Navbar />
      <main className="flex-grow pt-24">
        {/* Hero Header Section */}
        <section className="relative py-20 px-6 md:px-12 overflow-hidden text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-4 py-1.5 rounded-full inline-block mb-4">
              Legal & Compliance
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Terms Of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">
                Service
              </span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto px-4 leading-relaxed">
              Read the terms, exclusions of liability, and regulations governing the use of the Auto Garage Network platforms.
            </p>
          </motion.div>
        </section>

        {/* Content Section */}
        <section className="py-12 pb-24 px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto bg-[#0c1222] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl space-y-8 text-gray-300 leading-relaxed"
          >
            <div>
              <p className="text-gray-400 text-sm mb-6">
                Last updated: June 15, 2026
              </p>
              <p className="mb-4">
                In using this website and subscribing to our platform services, you are deemed to have read and agreed to the following Terms and Conditions:
              </p>
              <p className="mb-4">
                The following terminology applies to these Terms and Conditions, Privacy Statement, and Disclaimer Notice: "Client", "You", and "Your" refers to you, the person accessing this website and accepting the Company's terms and conditions. "The Company", "Ourselves", "We", and "Us" refers to <strong>Auto Garage Network Ltd</strong>. "Party", "Parties", or "Us" refers to both the Client and ourselves, or either the Client or ourselves.
              </p>
            </div>

            <hr className="border-white/10" />

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
              <p className="mb-4">
                By accessing this website, loggin into the workshop panels, or purchasing any subscription plans, you agree to comply with and be bound by these Terms of Service. If you disagree with any part of these terms, you must not use our software, portals, or website content.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">2. Account Registration & Platform Use</h2>
              <p className="mb-4">
                To access the garage management system, booking diary, and customer invoicing features, you must maintain an active subscription. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li>Provide accurate, current, and complete registration information.</li>
                <li>Maintain the confidentiality of your account credentials.</li>
                <li>Accept full responsibility for all activities that occur under your account.</li>
                <li>Immediately notify us of any unauthorized use or security breaches.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">3. Subscription, Payments, and Cancellations</h2>
              <p className="mb-4">
                Our platform operates on a recurring subscription model (e.g. standard package starts at £49/month).
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li>Subscriptions are billed in advance on a monthly or annual cycle.</li>
                <li>All fees are non-refundable, except as required by law or as expressly agreed in writing.</li>
                <li>You may cancel your subscription at any time. Your access will remain active through the end of the current billing cycle.</li>
                <li>Failure to pay billing invoices may result in temporary suspension of your workshop access, customer portal, and integrated website.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">4. Exclusions and Limitations of Liability</h2>
              <p className="mb-4">
                The information on this web site is provided on an "as is" basis. To the fullest extent permitted by law, this Company:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li>Excludes all representations and warranties relating to this website and its contents or which is or may be provided by any affiliates or any other third party, including in relation to any inaccuracies or omissions in this website and/or the Company's literature; and</li>
                <li>Excludes all liability for damages arising out of or in connection with your use of this website. This includes, without limitation, direct loss, loss of business or profits (whether or not the loss of such profits was foreseeable, arose in the normal course of things or you have advised this Company of the possibility of such potential loss), damage caused to your computer, computer software, systems and programs and the data thereon or any other direct or indirect, consequential and incidental damages.</li>
                <li>Nothing in these terms excludes liability for death or personal injury caused by our negligence.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property Rights</h2>
              <p className="mb-4">
                Unless otherwise stated, Auto Garage Network Ltd and/or its licensors own the intellectual property rights for all material on Auto Garage Network. All intellectual property rights are reserved. You must not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li>Republish material, code, images, or copy text from autogaragenetwork.com.</li>
                <li>Sell, rent, or sub-license system modules.</li>
                <li>Reproduce, duplicate, or copy platform source files.</li>
                <li>Redistribute content from Auto Garage Network (unless content is specifically made for redistribution).</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">6. Governing Law & Jurisdiction</h2>
              <p className="mb-4">
                These Terms and Conditions shall be governed by and construed in accordance with the laws of England and Wales. You agree that any dispute arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.
              </p>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
