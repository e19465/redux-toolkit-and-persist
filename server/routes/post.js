const Post = require("../models/Post");
const User = require("../models/User");
const router = require("express").Router();
const { verify_access_token } = require("../middleware/jwt");
const { request } = require("express");

//! Create Post
router.post("/create", verify_access_token, async (req, res) => {
  const reqTitle = req.body.title;
  const reqContent = req.body.content;
  const reqUserId = req.user.user_id;

  if (!reqTitle || !reqContent) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const foundUser = await User.findById(reqUserId);
    if (!foundUser) {
      return res.status(400).json({ error: "User not found" });
    }

    const newPost = new Post({
      user_id: reqUserId,
      title: reqTitle,
      content: reqContent,
    });
    await newPost.save();
    return res.status(201).json(newPost);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

//! Get All Posts
router.get("/all", verify_access_token, async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

//! Get Post by ID
router.get("/:id", verify_access_token, async (req, res) => {
  const reqPostId = req.params.id;

  if (!reqPostId) {
    return res.status(400).json({ error: "Post id is required" });
  }

  try {
    const post = await Post.findById(reqPostId);
    if (!post) {
      return res.status(400).json({ error: "Post not found" });
    }
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

//! Update Post
router.put("/update/:id", verify_access_token, async (req, res) => {
  const reqPostId = req.params.id;
  const reqUserId = req.user.user_id;

  if (!reqPostId) {
    return res.status(400).json({ error: "Post id is required" });
  }

  try {
    const foundPost = await Post.findById(reqPostId);
    if (!foundPost) {
      return res.status(400).json({ error: "Post not found" });
    }

    if (foundPost.user_id.toString() !== reqUserId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    foundPost.set(req.body);
    await foundPost.save();

    return res.status(200).json(foundPost);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

//! delete post
router.delete("/delete/:id", verify_access_token, async (req, res) => {
  const reqPostId = req.params.id;
  const reqUserId = req.user.user_id;

  if (!reqPostId) {
    return res.status(400).json({ error: "Post id is required" });
  }

  try {
    const foundPost = await Post.findById(reqPostId);
    if (!foundPost) {
      return res.status(400).json({ error: "Post not found" });
    }

    if (foundPost.user_id.toString() !== reqUserId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await Post.findByIdAndDelete(reqPostId);
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
