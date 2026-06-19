import React, { useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { motion } from "framer-motion";
import SEOHeader from "../components/SEOHeader.jsx";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#050816] text-white">
      <SEOHeader
        title="Privacy Policy | Data Protection"
        description="Read our privacy policy to understand how Auto Garage Network collects, uses, protects, and stores your workshop and customer data."
        keywords="privacy policy, data protection GDPR"
        canonicalPath="/privacy-policy"
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
              Privacy{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">
                Policy
              </span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto px-4 leading-relaxed">
              Learn how Auto Garage Network Ltd collects, uses, and safeguards your workshop data and personal information.
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
                At <strong>Auto Garage Network Ltd</strong> (referred to as "we", "us", or "our"), we respect your privacy and are committed to protecting your personal data. This Privacy Policy outlines our practices regarding data collection, processing, usage, and disclosures when you use our website, garage management platform, and associated services.
              </p>
            </div>

            <hr className="border-white/10" />

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
              <p className="mb-4">
                We may collect and process the following categories of personal and business information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li>
                  <strong>Contact Details:</strong> Your name, business address, email address, telephone numbers (such as Sales: 07947 906789 and Support: 01726 55556).
                </li>
                <li>
                  <strong>Account Information:</strong> Login credentials, subscription packages, billing addresses, and payment processing details.
                </li>
                <li>
                  <strong>Workshop Operational Data:</strong> Customer information, vehicle registration marks (VRMs), MOT test details, scheduling diaries, inventory stock, and customer invoices generated through our platform.
                </li>
                <li>
                  <strong>Technical Data:</strong> Internet Protocol (IP) addresses, browser type, device information, operating system, and interaction details captured through cookies.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Data</h2>
              <p className="mb-4">
                We use the information we collect for the following operational and service-oriented purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li>To provide, maintain, and optimize the Auto Garage Network software and workshop portals.</li>
                <li>To facilitate customer appointment bookings, MOT diary reminders, and automated SMS notifications.</li>
                <li>To process subscription payments, invoices, and billing inquiries.</li>
                <li>To provide customer support and troubleshoot application issues.</li>
                <li>To monitor, analyze, and enhance the performance and security of our websites.</li>
                <li>To comply with legal, regulatory, and taxation obligations in the UK.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">3. Data Sharing and Third Parties</h2>
              <p className="mb-4">
                We do not sell, rent, or trade your personal or business data. We only share information with trusted third-party service providers under strict data processing agreements:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li><strong>Vehicle Data Providers:</strong> To run registration lookups and parts cataloging.</li>
                <li><strong>SMS Gateways:</strong> To deliver booking reminders and notifications directly to your clients.</li>
                <li><strong>Payment Processors:</strong> To handle secure payment transactions.</li>
                <li><strong>Hosting & Security:</strong> Trusted UK-based cloud hosting providers to keep your databases encrypted and safe.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">4. Exclusions and Limitations of Liability</h2>
              <p className="mb-4">
                To the fullest extent permitted by law:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li>The information and services on this website are provided on an "as is" basis. We exclude all representations and warranties relating to this website and its contents, including any inaccuracies or omissions.</li>
                <li>We exclude all liability for damages arising out of or in connection with your use of this website. This includes, without limitation, direct loss, loss of business or profits (whether or not the loss of such profits was foreseeable), damage to computer software, systems, programs, and the data stored thereon.</li>
                <li>Nothing in these terms excludes liability for death or personal injury caused by our negligence.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">5. Data Retention & Security</h2>
              <p className="mb-4">
                We retain your personal data only as long as necessary to fulfill the purposes for which it was collected, or to comply with financial and legal reporting requirements. All data in transit is encrypted using Secure Socket Layer (SSL) technology, and database records are housed behind robust firewall configurations.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
              <p className="mb-4">
                Under UK General Data Protection Regulation (GDPR) and the Data Protection Act 2018, you hold several rights regarding your data:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li>The right to request access to and receive copies of your personal data.</li>
                <li>The right to request rectification of inaccurate or outdated data.</li>
                <li>The right to request erasure of your data under specific conditions.</li>
                <li>The right to object to or restrict processing of your information.</li>
                <li>The right to request data portability.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">7. Contact Information</h2>
              <p className="mb-4">
                If you have questions, comments, or data erasure requests, please contact our Data Protection Officer:
              </p>
              <div className="bg-[#050816]/40 p-6 rounded-2xl border border-white/5 space-y-2 text-sm text-gray-400">
                <p className="text-white font-bold">Auto Garage Network Ltd</p>
                <p>Address: The Chestnuts, 46 Middle Lane, Nether Broughton, LE14 3HD</p>
                <p>Email: <a href="mailto:info@autogaragenetwork.com" className="text-indigo-400 hover:text-indigo-300">info@autogaragenetwork.com</a></p>
                <p>Sales Line: 07947 906789</p>
                <p>Customer Support: 01726 55556</p>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
