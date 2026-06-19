const Contact = require("../models/Contact");

// @desc    Submit a contact form / inquiry
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
  try {
    const {
      name,
      garageName,
      email,
      phone,
      interestedIn,
      interest,
      address,
      message,
    } = req.body || {};

    if (!name || !email || !phone) {
      return res.status(400).json({
        status: false,
        message: "Please provide name, email, and phone number",
      });
    }

    const contact = await Contact.create({
      name,
      garageName: garageName || name,
      email,
      phone,
      interestedIn: interestedIn || interest || "Garage Management System",
      address: address || "Not Provided",
      message: message || "",
    });

    res.status(200).json({
      status: true,
      message: "Contact form submitted successfully",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all contact submissions
// @route   GET /api/contact
// @access  Private/Admin
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a contact submission
// @route   DELETE /api/contact/:id
// @access  Private/Admin
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (contact) {
      await contact.deleteOne();
      res.json({ message: "Contact submission removed" });
    } else {
      res.status(404).json({ message: "Contact submission not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  submitContact,
  getContacts,
  deleteContact,
};
