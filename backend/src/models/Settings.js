const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    logoUrl: {
      type: String,
      default: "https://www.autogaragenetwork.com/catalog/view/theme/avnv1/assets/img/logo-color.png",
    },
    navbarLineColor: {
      type: String,
      default: "indigo",
    },
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.model("Settings", settingsSchema);
module.exports = Settings;
