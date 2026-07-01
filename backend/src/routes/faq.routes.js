const express = require("express");
const router = express.Router();
const faqController = require("../controllers/faq.controller");
const { protect } = require("../middleware/auth.middleware");

// Public route to get all FAQs
router.get("/", faqController.getAllFaqs);

// Protected routes (Admin only for modifying FAQs)
router.post("/", protect, faqController.createFaq);
router.put("/:id", protect, faqController.updateFaq);
router.delete("/:id", protect, faqController.deleteFaq);

module.exports = router;
