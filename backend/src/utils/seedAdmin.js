const User = require("../models/User");

const seedAdmin = async () => {
  try {
    // 1. Super Admin Account
    const superAdminEmail = "superadmin@autogaragenetwork.com";
    let superAdmin = await User.findOne({ email: superAdminEmail });

    if (!superAdmin) {
      console.log("Seeding super admin account...");
      await User.create({
        name: "Super Admin",
        email: superAdminEmail,
        password: "superadmin123",
        role: "super_admin",
      });
      console.log("SUCCESS: Super admin seeded successfully!");
    } else {
      if (superAdmin.role !== "super_admin") {
        superAdmin.role = "super_admin";
        await superAdmin.save();
        console.log("SUCCESS: Existing super admin upgraded!");
      } else {
        console.log("Super admin account already exists.");
      }
    }

    // 2. Standard Admin Account
    const adminEmail = "admin@autogaragenetwork.com";
    let adminUser = await User.findOne({ email: adminEmail });

    if (!adminUser) {
      console.log("Seeding default standard admin account...");
      await User.create({
        name: "Standard Admin",
        email: adminEmail,
        password: "admin123",
        role: "admin",
        permissions: {
          contacts: { read: true, write: false },
          chatLeads: { read: true, write: false },
          blogs: { read: true, write: true }, // blogs write access
          faqs: { read: true, write: false },
          media: { read: true, write: false },
          settings: { read: true, write: false },
          socialMedia: { read: true, write: false },
          vacancies: { read: true, write: false },
          pages: { read: true, write: true },
        },
      });
      console.log("SUCCESS: Standard admin seeded successfully!");
    } else {
      // Force role and permissions to be standard admin for testing
      adminUser.role = "admin";
      adminUser.permissions = {
        contacts: { read: true, write: false },
        chatLeads: { read: true, write: false },
        blogs: { read: true, write: true },
        faqs: { read: true, write: false },
        media: { read: true, write: false },
        settings: { read: true, write: false },
        socialMedia: { read: true, write: false },
        vacancies: { read: true, write: false },
        pages: { read: true, write: true },
      };
      await adminUser.save();
      console.log("SUCCESS: Standard admin role/permissions updated.");
    }

    // 3. System Settings initialization
    const Settings = require("../models/Settings");
    let settings = await Settings.findOne();
    if (!settings) {
      console.log("Seeding default system settings...");
      await Settings.create({});
    }

    // 4. Predefined Core Pages seeding
    const PageContent = require("../models/PageContent");
    const corePages = [
      {
        title: "Home",
        slug: "home",
        bannerTitle: "Run Your Garage Smarter",
        bannerSubtitle:
          "Auto Garage Network is the premium garage management system & website provider for UK workshops.",
        content:
          "<h2>Welcome to Auto Garage Network</h2><p>Predefined homepage content editable from admin panel.</p>",
      },
      {
        title: "About Us",
        slug: "about-us",
        bannerTitle: "About Auto Garage Network",
        bannerSubtitle:
          "We act as a lifetime e-partner for garage owners, building bespoke digital solutions.",
        content:
          "<h2>Our Journey</h2><p>Predefined about page content editable from admin panel.</p>",
      },
      {
        title: "Pricing Plans",
        slug: "pricing",
        bannerTitle: "Transparent & Flexible Pricing Plans",
        bannerSubtitle:
          "No hidden fees. Choose a plan that fits your workshop requirements.",
        content:
          "<h2>Pricing Overview</h2><p>Predefined pricing page content editable from admin panel.</p>",
      },
      {
        title: "Search Engine Optimisation",
        slug: "seo",
        bannerTitle: "Search Engine Optimisation (SEO) Services",
        bannerSubtitle:
          "Position your workshop at the top of local rankings to drive steady leads.",
        content:
          "<h2>Dominate Local Search Results</h2><p>Predefined SEO services page content editable from admin panel.</p>",
      },
      {
        title: "Contact Us",
        slug: "contact-us",
        bannerTitle: "Contact Our Sales & Support Teams",
        bannerSubtitle:
          "Have questions? Reach our sales and support teams using the form or details below.",
        content:
          "<h2>Get In Touch</h2><p>Predefined contact page content editable from admin panel.</p>",
      },
    ];

    for (const page of corePages) {
      let existingPage = await PageContent.findOne({ slug: page.slug });
      if (!existingPage) {
        console.log(`Seeding core page: ${page.title}...`);
        await PageContent.create(page);
      }
    }
  } catch (error) {
    console.error("ERROR: Seeding admin failed:", error.message);
  }
};

module.exports = seedAdmin;
