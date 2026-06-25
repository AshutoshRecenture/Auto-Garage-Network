import React, { useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { motion } from "framer-motion";
import SEOHeader from "../components/SEOHeader.jsx";
import { getCloudinaryUrl, useBackendOnline } from "../utils/cloudinary.js";

const PrivacyPolicy = () => {
  useBackendOnline();
  const privacyBg = getCloudinaryUrl("accidental-car-repair-hero-banner-img-1-768x512.webp");

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
      <main className="flex-grow pt-24 relative overflow-hidden">
        {/* Project Background Image with subtle overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08] dark:opacity-[0.15] mix-blend-overlay">
          <img
            src={privacyBg}
            alt="Garage backdrop"
            className="w-full h-full object-cover select-none"
          />
        </div>

        {/* Hero Header Section */}
        <section className="relative pt-12 pb-4 px-6 md:px-12 overflow-hidden text-center z-10">
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
              Privacy & Terms{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">
                Policy
              </span>
            </h1>
            <p className="text-gray-300 text-base md:text-lg max-w-xl mx-auto px-4 leading-relaxed">
              Read the standard terms of service, cookies policies, log files
              specifications, and legal exclusions of Auto Garage Network.
            </p>
          </motion.div>
        </section>

        {/* Content Section */}
        <section className="pt-2 pb-24 px-6 md:px-12 z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-7xl mx-auto bg-[#0c1222]/90 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl space-y-8 text-gray-300 leading-relaxed backdrop-blur-sm"
          >
            <div>
              <p className="text-gray-400 text-sm mb-6">
                Last updated: June 15, 2026
              </p>
              <p className="text-base md:text-lg mb-6 text-white font-medium">
                At <strong>Auto Garage Network Ltd</strong> (referred to as
                "we", "us", or "our"), we respect your privacy and are committed
                to protecting your personal data. This Privacy Policy outlines
                our practices regarding data collection, processing, usage, and
                disclosures when you use our website, garage management
                platform, and associated services.
              </p>
              <p className="mb-4 bg-[#050816]/30 p-5 rounded-xl border border-white/5 text-sm md:text-base text-indigo-300 font-bold">
                In using this website you are deemed to have read and agreed to
                the following terms and conditions:
              </p>
              <p className="text-sm text-gray-400 leading-relaxed">
                The following terminology applies to these Terms and Conditions,
                Privacy Statement and Disclaimer Notice and any or all
                Agreements: <strong>"Client"</strong>, <strong>"You"</strong>{" "}
                and <strong>"Your"</strong> refers to you, the person accessing
                this website and accepting the Company's terms and conditions.{" "}
                <strong>"The Company"</strong>, <strong>"Ourselves"</strong>,{" "}
                <strong>"We"</strong> and <strong>"Us"</strong>, refers to Auto
                Garage Network. <strong>"Party"</strong>,{" "}
                <strong>"Parties"</strong>, or <strong>"Us"</strong>, refers to
                both the Client and ourselves, or either the Client or
                ourselves. Any use of the above terminology or other words in
                the singular, plural, capitalisation and/or he/she or they, are
                taken as interchangeable and therefore as referring to same.
              </p>
            </div>

            <hr className="border-white/10" />

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
                  <span className="text-indigo-400">1.</span> Exclusions and
                  Limitations
                </h2>
                <p className="text-sm text-gray-300 leading-relaxed">
                  The information on this web site is provided on an "as is"
                  basis. To the fullest extent permitted by law, this Company:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300 leading-relaxed">
                  <li>
                    Excludes all representations and warranties relating to this
                    website and its contents or which is or may be provided by
                    any affiliates or any other third party, including in
                    relation to any inaccuracies or omissions in this website
                    and/or the Company's literature.
                  </li>
                  <li>
                    Excludes all liability for damages arising out of or in
                    connection with your use of this website. This includes,
                    without limitation, direct loss, loss of business or profits
                    (whether or not the loss of such profits was foreseeable,
                    arose in the normal course of things or you have advised
                    this Company of the possibility of such potential loss),
                    damage caused to your computer, computer software, systems
                    and programs and the data thereon or any other direct or
                    indirect, consequential and incidental damages.
                  </li>
                  <li>
                    Does not however exclude liability for death or personal
                    injury caused by its negligence. The above exclusions and
                    limitations apply only to the extent permitted by law. None
                    of your statutory rights as a consumer are affected.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
                  <span className="text-indigo-400">2.</span> Availability
                </h2>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Unless otherwise stated, the services featured on this website
                  are only available within the United Kingdom, or in relation
                  to postings from the United Kingdom. All advertising is
                  intended solely for the United Kingdom market.
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  You are solely responsible for evaluating the fitness for a
                  particular purpose of any downloads, programs and text
                  available through this site. Redistribution or republication
                  of any part of this site or its content is prohibited,
                  including such by framing or other similar or any other means,
                  without the express written consent of the Company.
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  The Company does not warrant that the service from this site
                  will be uninterrupted, timely or error free, although it is
                  provided to the best ability. By using this service you
                  thereby indemnify this Company, its employees, agents and
                  affiliates against any loss or damage, in whatever manner,
                  howsoever caused.
                </p>
              </div>
            </div>

            <hr className="border-white/10" />

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
                  <span className="text-indigo-400">3.</span> Log Files
                </h2>
                <p className="text-sm text-gray-300 leading-relaxed">
                  We use IP addresses to analyse trends, administer the site,
                  track user's movement, and gather broad demographic
                  information for aggregate use. IP addresses are not linked to
                  personally identifiable information.
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Additionally, for systems administration, detecting usage
                  patterns and troubleshooting purposes, our web servers
                  automatically log standard access information including
                  browser type, access times/open mail, URL requested, and
                  referral URL. This information is not shared with third
                  parties and is used only within this Company on a need-to-know
                  basis. Any individually identifiable information related to
                  this data will never be used in any way different to that
                  stated above without your explicit permission.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
                  <span className="text-indigo-400">4.</span> Cookies
                </h2>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Like most interactive web sites this Company's website or ISP
                  uses cookies to enable us to retrieve user details for each
                  visit. Cookies are used in some areas of our site to enable
                  the functionality of this area and ease of use for those
                  people visiting. Some of our affiliate partners may also use
                  cookies.
                </p>
              </div>
            </div>

            <hr className="border-white/10" />

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
                  <span className="text-indigo-400">5.</span> Links to and from
                  this Website
                </h2>
                <h4 className="font-extrabold text-white text-sm uppercase tracking-wider">
                  Links to this website
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  You may not create a link to any page of this website without
                  our prior written consent. If you do create a link to a page
                  of this website you do so at your own risk and the exclusions
                  and limitations set out above will apply to your use of this
                  website by linking to it.
                </p>
                <h4 className="font-extrabold text-white text-sm uppercase tracking-wider pt-2">
                  Links from this website
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  We do not monitor or review the content of other party's
                  websites which are linked to from this website. Opinions
                  expressed or material appearing on such websites are not
                  necessarily shared or endorsed by us and should not be
                  regarded as the publisher of such opinions or material.
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Please be aware that we are not responsible for the privacy
                  practices, or content, of these sites. We encourage our users
                  to be aware when they leave our site & to read the privacy
                  statements of these sites. This Company will not accept any
                  responsibility for any loss or damage in whatever manner,
                  howsoever caused, resulting from your disclosure to third
                  parties of personal information.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
                  <span className="text-indigo-400">6.</span> Intellectual
                  Property & General
                </h2>
                <h4 className="font-extrabold text-white text-sm uppercase tracking-wider">
                  Copyright Notice
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Copyright and other relevant intellectual property rights
                  exists on all text relating to the Company's services and the
                  full content of this website.
                </p>
                <h4 className="font-extrabold text-white text-sm uppercase tracking-wider pt-2">
                  General Terms
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  The laws of England and Wales govern these terms and
                  conditions. By accessing this website and using our services
                  you consent to these terms and conditions and to the exclusive
                  jurisdiction of the English courts in all disputes arising out
                  of such access.
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  If any of these terms are deemed invalid or unenforceable for
                  any reason (including, but not limited to the exclusions and
                  limitations set out above), then the invalid or unenforceable
                  provision will be severed from these terms and the remaining
                  terms will continue to apply.
                </p>
              </div>
            </div>

            <hr className="border-white/10" />

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
                  <span className="text-indigo-400">7.</span> Notification of
                  Changes
                </h2>
                <p className="text-sm text-gray-300 leading-relaxed">
                  The Company reserves the right to change these conditions from
                  time to time as it sees fit and your continued use of the site
                  will signify your acceptance of any adjustment to these terms.
                  You are therefore advised to re-read this statement on a
                  regular basis.
                </p>
                <p className="text-sm text-gray-300 bg-[#050816]/30 p-5 rounded-xl border border-white/5 italic leading-relaxed">
                  These terms and conditions form part of the Agreement between
                  the Client and ourselves. Your accessing of this website
                  and/or undertaking of a booking or Agreement indicates your
                  understanding, agreement to and acceptance, of the Disclaimer
                  Notice and the full Terms and Conditions contained herein.
                  Your statutory Consumer Rights are unaffected.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
                  <span className="text-indigo-400">8.</span> Contact Support
                </h2>
                <p className="text-sm text-gray-300 leading-relaxed">
                  If you have questions, comments, or data erasure requests,
                  please contact our Data Protection Officer:
                </p>
                <div className="bg-[#050816]/40 p-6 rounded-2xl border border-white/5 space-y-2 text-sm text-gray-300">
                  <p className="text-white font-bold text-base">
                    Auto Garage Network Ltd
                  </p>
                  <p>
                    Address: The Chestnuts, 46 Middle Lane, Nether Broughton,
                    LE14 3HD
                  </p>
                  <p>
                    Email:{" "}
                    <a
                      href="mailto:info@autogaragenetwork.com"
                      className="text-indigo-400 hover:text-indigo-300 font-semibold"
                    >
                      info@autogaragenetwork.com
                    </a>
                  </p>
                  <p>Sales Line: 07947 906789</p>
                  <p>Customer Support: 01726 55556</p>
                </div>
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
