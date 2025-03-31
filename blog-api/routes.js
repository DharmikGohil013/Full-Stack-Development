const express = require("express");
const { createAuthor } = require("./controllers");
const { createBlogPost, getAllBlogPosts, getBlogPostById, deleteBlogPost } = require("./controllers");

const router = express.Router();

// Author Routes
router.post("/authors", createAuthor);

// BlogPost Routes
router.post("/blogposts", createBlogPost);
router.get("/blogposts", getAllBlogPosts);
router.get("/blogposts/:id", getBlogPostById);
router.delete("/blogposts/:id", deleteBlogPost);

module.exports = router;
    