const express = require("express");
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/error.middleware");
const { configureCloudinary } = require("./config/cloudinary");

// Initialize Cloudinary
configureCloudinary();

// Routes imports
const authRoutes = require("./routes/auth.routes");
const contactRoutes = require("./routes/contact.routes");
const blogRoutes = require("./routes/blog.routes");
const projectRoutes = require("./routes/project.routes");
const serviceRoutes = require("./routes/service.routes");
const bookingRoutes = require("./routes/booking.routes");
const mediaRoutes = require("./routes/media.routes");
const chatLeadRoutes = require("./routes/chatLead.routes");
const settingsRoutes = require("./routes/settings.routes");
const faqRoutes = require("./routes/faq.routes");

const path = require("path");

const app = express();

// Standard middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static images folder
app.use("/images", express.static(path.join(__dirname, "../public/images")));

// Welcome test route
app.get("/", (req, res) => {
  res.json({ message: "Auto Garage Network GMS Suite API is running..." });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/chat-submissions", chatLeadRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/faqs", faqRoutes);

// Fallback middlewares for error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
