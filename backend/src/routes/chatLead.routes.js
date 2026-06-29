const express = require("express");
const { createChatLead, updateChatLead, getChatLeads, deleteChatLead } = require("../controllers/chatLead.controller");
const { protect, admin } = require("../middleware/auth.middleware");

const router = express.Router();

router.route("/")
  .get(protect, admin, getChatLeads)
  .post(createChatLead);

router.route("/:id")
  .put(updateChatLead)
  .delete(protect, admin, deleteChatLead);

module.exports = router;
