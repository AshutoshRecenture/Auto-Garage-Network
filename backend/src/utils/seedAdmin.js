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
          settings: { read: true, write: false }
        }
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
        settings: { read: true, write: false }
      };
      await adminUser.save();
      console.log("SUCCESS: Standard admin role/permissions updated.");
    }
  } catch (error) {
    console.error("ERROR: Seeding admin failed:", error.message);
  }
};

module.exports = seedAdmin;
