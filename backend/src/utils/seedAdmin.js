const User = require("../models/User");

const seedAdmin = async () => {
  try {
    const adminEmail = "admin@autogaragenetwork.com";
    const adminExists = await User.findOne({ email: adminEmail });

    if (!adminExists) {
      console.log("Seeding default admin account...");
      await User.create({
        name: "Administrator",
        email: adminEmail,
        password: "admin123", // Will be hashed in User schema pre-save hook
        role: "admin",
      });
      console.log("SUCCESS: Default admin seeded successfully!");
    } else {
      console.log("Admin account already exists in DB. Skipping seed.");
    }
  } catch (error) {
    console.error("ERROR: Seeding admin failed:", error.message);
  }
};

module.exports = seedAdmin;
