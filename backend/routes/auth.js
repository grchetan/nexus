const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/auth");

const router = express.Router();

// ─── helper: sign token ───────────────────────────────────────────────────────
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

// ─── helper: safe user object (no password) ───────────────────────────────────
const safeUser = (user) => ({
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
  createdAt:  user.createdAt,
});

// ─── POST /api/auth/signup ────────────────────────────────────────────────────
router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: "Email already registered." });
    }

    const user = await User.create({ firstName, lastName, email, password, role: role || "" });
    const token = signToken(user._id);

    res.status(201).json({ success: true, token, user: safeUser(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// ─── POST /api/auth/login ─────────────────────────────────────────────────────
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required." });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    const token = signToken(user._id);
    res.json({ success: true, token, user: safeUser(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// ─── GET /api/auth/me ─────────────────────────────────────────────────────────
router.get("/me", protect, async (req, res) => {
  res.json({ success: true, user: safeUser(req.user) });
});

module.exports = router;
