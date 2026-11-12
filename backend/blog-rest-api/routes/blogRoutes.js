/**
 * Blog CRUD Routes (/api/blogs)
 * Read routes are public; create, update, and delete routes require JWT authentication.
 */

const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controller/blogController");

const router = express.Router();

// Public read endpoints
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

// Protected write endpoints
router.post("/", authMiddleware, createBlog);
router.put("/:id", authMiddleware, updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);

module.exports = router;
