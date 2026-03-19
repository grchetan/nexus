const express = require("express");
const path = require("path");
const fs = require("fs");
const Post = require("../models/Post");
const { protect } = require("../middleware/auth");
const { uploadPostMedia, handleUpload } = require("../middleware/upload");

const router = express.Router();

// ─── helper: format post for client ──────────────────────────────────────────
const formatPost = (post, currentUserId) => ({
  _id:        post._id,
  text:       post.text,
  mediaUrl:   post.mediaUrl,
  mediaType:  post.mediaType,
  likes:      post.likes?.length || 0,
  isLiked:    currentUserId
    ? post.likes?.some((l) => l.toString() === currentUserId.toString())
    : false,
  comments:   post.comments?.length || 0,
  shares:     post.shares || 0,
  author: post.author
    ? {
        _id:      post.author._id,
        fullName: `${post.author.firstName} ${post.author.lastName}`,
        initials: `${post.author.firstName[0]}${post.author.lastName[0]}`.toUpperCase(),
        headline: post.author.headline || post.author.role || "",
        avatar:   post.author.avatar || "",
      }
    : null,
  createdAt: post.createdAt,
});

// ─── GET /api/posts/feed ─────────────────────────────────────────────────────
// All posts from everyone (simple public feed for now)
router.get("/feed", protect, async (req, res) => {
  try {
    const page  = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip  = (page - 1) * limit;

    const posts = await Post.find()
      .populate("author", "firstName lastName headline role avatar")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      posts: posts.map((p) => formatPost(p, req.user._id)),
      page,
      hasMore: posts.length === limit,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// ─── GET /api/posts/user/:userId ─────────────────────────────────────────────
router.get("/user/:userId", protect, async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.userId })
      .populate("author", "firstName lastName headline role avatar")
      .sort({ createdAt: -1 });
    res.json({ success: true, posts: posts.map((p) => formatPost(p, req.user._id)) });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// ─── POST /api/posts ──────────────────────────────────────────────────────────
router.post("/", protect, handleUpload(uploadPostMedia), async (req, res) => {
  try {
    const { text } = req.body;
    if (!text?.trim() && !req.file) {
      return res.status(400).json({ success: false, message: "Post must have text or media." });
    }

    let mediaUrl  = "";
    let mediaType = "";
    if (req.file) {
      mediaUrl = req.file.filename;
      const videoExts = /mp4|mov|avi|mkv/;
      mediaType = videoExts.test(path.extname(req.file.originalname).toLowerCase())
        ? "video"
        : "image";
    }

    const post = await Post.create({
      author: req.user._id,
      text:   text?.trim() || "",
      mediaUrl,
      mediaType,
    });

    const populated = await post.populate("author", "firstName lastName headline role avatar");
    res.status(201).json({ success: true, post: formatPost(populated, req.user._id) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// ─── PUT /api/posts/:id/like ──────────────────────────────────────────────────
router.put("/:id/like", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found." });

    const alreadyLiked = post.likes.includes(req.user._id);
    if (alreadyLiked) {
      post.likes.pull(req.user._id);
    } else {
      post.likes.push(req.user._id);
    }
    await post.save();

    res.json({ success: true, likes: post.likes.length, isLiked: !alreadyLiked });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// ─── POST /api/posts/:id/comment ─────────────────────────────────────────────
router.post("/:id/comment", protect, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text?.trim()) return res.status(400).json({ success: false, message: "Comment text required." });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found." });

    post.comments.push({ user: req.user._id, text: text.trim() });
    await post.save();

    const populated = await post.populate("comments.user", "firstName lastName avatar");
    const last = populated.comments[populated.comments.length - 1];

    res.status(201).json({
      success:  true,
      comments: post.comments.length,
      comment: {
        _id:      last._id,
        text:     last.text,
        user:     {
          _id:      last.user._id,
          fullName: `${last.user.firstName} ${last.user.lastName}`,
          initials: `${last.user.firstName[0]}${last.user.lastName[0]}`.toUpperCase(),
          avatar:   last.user.avatar || "",
        },
        createdAt: last.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// ─── DELETE /api/posts/:id ────────────────────────────────────────────────────
router.delete("/:id", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found." });

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized." });
    }

    // Delete media file
    if (post.mediaUrl) {
      const filePath = path.join(__dirname, "..", "uploads", "posts", post.mediaUrl);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await post.deleteOne();
    res.json({ success: true, message: "Post deleted." });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;
