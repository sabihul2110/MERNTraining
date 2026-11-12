/**
 * Blog Post Controller
 * Implements CRUD operations with author ownership verification.
 */

const Blog = require("../models/Blog");

// Create a new blog post authored by the authenticated user
const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Both title and content are required.",
      });
    }

    const blog = await Blog.create({
      title: title.trim(),
      content: content.trim(),
      author: req.userId,
    });

    return res.status(201).json({
      message: "Blog post created successfully.",
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create blog post.",
    });
  }
};

// Retrieve all blog posts ordered from newest to oldest
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve blog posts.",
    });
  }
};

// Retrieve a single blog post by its MongoDB ObjectId
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "name email"
    );

    if (!blog) {
      return res.status(404).json({
        message: "Blog post not found.",
      });
    }

    return res.status(200).json({ blog });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid blog post ID format.",
      });
    }

    return res.status(500).json({
      message: "Failed to retrieve blog post.",
    });
  }
};

// Update an existing blog post (restricted to the post's original author)
const updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (
      title !== undefined &&
      (typeof title !== "string" || !title.trim())
    ) {
      return res.status(400).json({
        message: "Title must be a non-empty string.",
      });
    }

    if (
      content !== undefined &&
      (typeof content !== "string" || !content.trim())
    ) {
      return res.status(400).json({
        message: "Content must be a non-empty string.",
      });
    }

    if (title === undefined && content === undefined) {
      return res.status(400).json({
        message: "Provide a title or content field to update.",
      });
    }

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog post not found.",
      });
    }

    if (blog.author.toString() !== req.userId) {
      return res.status(403).json({
        message: "You are only authorized to update your own blog posts.",
      });
    }

    if (title !== undefined) blog.title = title.trim();
    if (content !== undefined) blog.content = content.trim();

    await blog.save();

    return res.status(200).json({
      message: "Blog post updated successfully.",
      blog,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid blog post ID format.",
      });
    }

    return res.status(500).json({
      message: "Failed to update blog post.",
    });
  }
};

// Delete an existing blog post (restricted to the post's original author)
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog post not found.",
      });
    }

    if (blog.author.toString() !== req.userId) {
      return res.status(403).json({
        message: "You are only authorized to delete your own blog posts.",
      });
    }

    await blog.deleteOne();

    return res.status(200).json({
      message: "Blog post deleted successfully.",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid blog post ID format.",
      });
    }

    return res.status(500).json({
      message: "Failed to delete blog post.",
    });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
