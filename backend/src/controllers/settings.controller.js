const Settings = require("../models/Settings");

// @desc    Get system settings
// @route   GET /api/settings
// @access  Public
const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      // Create default settings if not exists
      settings = await Settings.create({
        logoUrl: "https://www.autogaragenetwork.com/catalog/view/theme/avnv1/assets/img/logo-color.png",
        navbarLineColor: "indigo",
      });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update system settings
// @route   PUT /api/settings
// @access  Private/Admin
const updateSettings = async (req, res) => {
  try {
    const { logoUrl, navbarLineColor } = req.body || {};

    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({});
    }

    if (logoUrl !== undefined) settings.logoUrl = logoUrl;
    if (navbarLineColor !== undefined) settings.navbarLineColor = navbarLineColor;

    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSettings,
  updateSettings,
};
