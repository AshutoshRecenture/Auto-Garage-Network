const express = require("express");
const { createChatLead, updateChatLead, getChatLeads } = require("../controllers/chatLead.controller");
const { protect, admin } = require("../middleware/auth.middleware");

const router = express.Router();

router.route("/")
  .get(protect, admin, getChatLeads)
  .post(createChatLead);

router.route("/:id")
  .put(updateChatLead);

module.exports = router;
