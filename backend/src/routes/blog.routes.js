const express = require("express");
const { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog } = require("../controllers/blog.controller");
const { protect, admin } = require("../middleware/auth.middleware");

const router = express.Router();

router.route("/")
  .get(getBlogs)
  .post(protect, admin, createBlog);

router.route("/:id")
  .get(getBlogById)
  .put(protect, admin, updateBlog)
  .delete(protect, admin, deleteBlog);

module.exports = router;
