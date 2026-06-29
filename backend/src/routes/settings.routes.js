const express = require("express");
const { getSettings, updateSettings } = require("../controllers/settings.controller");
const { protect, admin } = require("../middleware/auth.middleware");

const router = express.Router();

router.route("/")
  .get(getSettings)
  .put(protect, admin, updateSettings);

module.exports = router;
