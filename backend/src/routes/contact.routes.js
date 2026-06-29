const express = require("express");
const { submitContact, getContacts, deleteContact, updateContact } = require("../controllers/contact.controller");
const { protect, admin } = require("../middleware/auth.middleware");

const router = express.Router();

router.route("/")
  .post(submitContact)
  .get(protect, admin, getContacts);

router.route("/:id")
  .put(protect, admin, updateContact)
  .delete(protect, admin, deleteContact);

module.exports = router;
