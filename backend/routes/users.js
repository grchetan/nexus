const express = require("express");
const path = require("path");
const fs = require("fs");
const User = require("../models/User");
const { protect } = require("../middleware/auth");
const { uploadAvatar, uploadCover, handleUpload } = require("../middleware/upload");

const router = express.Router();

const safeUser = (user, currentUserId) => ({
  _id:        user._id,
  firstName:  user.firstName,
  lastName:   user.lastName,
  fullName:   `${user.firstName} ${user.lastName}`,
  initials:   `${user.firstName[0]}${user.lastName[0]}`.toUpperCase(),
  email:      user.email,
  role:       user.role,
  headline:   user.headline,
  about:      user.about,
  location:   user.location,
  avatar:     user.avatar,
  coverPhoto: user.coverPhoto,
  skills:     user.skills,
  experience: user.experience,
  education:  user.education,
  openToWork: user.openToWork,
  followersCount:   user.followers?.length || 0,
  connectionsCount: user.connections?.length || 0,
  isConnected: currentUserId
    ? user.connections?.some((c) => c.toString() === currentUserId.toString())
    : false,
});

// ─── GET /api/users/search?q=name ────────────────────────────────────────────
router.get("/search", protect, async (req, res) => {
  try {
    const q = req.query.q || "";
    if (!q.trim()) return res.json({ success: true, users: [] });

    const users = await User.find({
      $or: [
        { firstName: { $regex: q, $options: "i" } },
        { lastName:  { $regex: q, $options: "i" } },
        { email:     { $regex: q, $options: "i" } },
      ],
      _id: { $ne: req.user._id },
    }).limit(8);

    res.json({ success: true, users: users.map((u) => safeUser(u, req.user._id)) });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// ─── GET /api/users/suggestions ──────────────────────────────────────────────
router.get("/suggestions", protect, async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.user._id },
      connections: { $nin: [req.user._id] },
    }).limit(5);
    res.json({ success: true, users: users.map((u) => safeUser(u, req.user._id)) });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// ─── GET /api/users/:id ───────────────────────────────────────────────────────
router.get("/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found." });
    res.json({ success: true, user: safeUser(user, req.user._id) });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// ─── PUT /api/users/profile ───────────────────────────────────────────────────
router.put("/profile", protect, async (req, res) => {
  try {
    const allowed = ["firstName","lastName","headline","role","about","location","skills","experience","education","openToWork"];
    const updates = {};
    allowed.forEach((f) => { if (req.body[f] !== undefined) updates[f] = req.body[f]; });

    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true });
    res.json({ success: true, user: safeUser(user) });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// ─── POST /api/users/avatar ───────────────────────────────────────────────────
router.post("/avatar", protect, handleUpload(uploadAvatar), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded." });

    // Delete old avatar
    if (req.user.avatar) {
      const old = path.join(__dirname, "..", "uploads", "avatars", req.user.avatar);
      if (fs.existsSync(old)) fs.unlinkSync(old);
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: req.file.filename },
      { new: true }
    );
    res.json({ success: true, avatar: user.avatar, user: safeUser(user) });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// ─── POST /api/users/cover ────────────────────────────────────────────────────
router.post("/cover", protect, handleUpload(uploadCover), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded." });

    if (req.user.coverPhoto) {
      const old = path.join(__dirname, "..", "uploads", "covers", req.user.coverPhoto);
      if (fs.existsSync(old)) fs.unlinkSync(old);
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { coverPhoto: req.file.filename },
      { new: true }
    );
    res.json({ success: true, coverPhoto: user.coverPhoto, user: safeUser(user) });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// ─── POST /api/users/:id/connect ─────────────────────────────────────────────
router.post("/:id/connect", protect, async (req, res) => {
  try {
    const targetId = req.params.id;
    if (targetId === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: "Cannot connect with yourself." });
    }

    const target = await User.findById(targetId);
    if (!target) return res.status(404).json({ success: false, message: "User not found." });

    const alreadyConnected = req.user.connections.includes(targetId);
    if (alreadyConnected) {
      // Disconnect
      await User.findByIdAndUpdate(req.user._id, { $pull: { connections: targetId } });
      await User.findByIdAndUpdate(targetId, { $pull: { connections: req.user._id } });
      return res.json({ success: true, connected: false, message: "Disconnected." });
    }

    // Connect both ways
    await User.findByIdAndUpdate(req.user._id, { $addToSet: { connections: targetId } });
    await User.findByIdAndUpdate(targetId, { $addToSet: { connections: req.user._id } });

    res.json({ success: true, connected: true, message: "Connected!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;
