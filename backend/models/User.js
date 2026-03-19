const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const experienceSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  company:  { type: String, required: true },
  duration: { type: String },
  desc:     { type: String },
  icon:     { type: String, default: "💼" },
});

const educationSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  school:   { type: String, required: true },
  duration: { type: String },
  icon:     { type: String, default: "🎓" },
});

const userSchema = new mongoose.Schema(
  {
    firstName:  { type: String, required: true, trim: true },
    lastName:   { type: String, required: true, trim: true },
    email:      { type: String, required: true, unique: true, lowercase: true, trim: true },
    password:   { type: String, required: true, minlength: 6, select: false },
    role:       { type: String, default: "" },          // "Software Engineer" etc.
    headline:   { type: String, default: "" },          // shown under name in feed
    about:      { type: String, default: "" },
    location:   { type: String, default: "" },
    avatar:     { type: String, default: "" },          // filename in uploads/avatars/
    coverPhoto: { type: String, default: "" },          // filename in uploads/covers/
    skills:     [{ type: String }],
    experience: [experienceSchema],
    education:  [educationSchema],
    followers:  [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    connections:[{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    openToWork: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

// Virtual: full name
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual: initials
userSchema.virtual("initials").get(function () {
  return `${this.firstName[0]}${this.lastName[0]}`.toUpperCase();
});

module.exports = mongoose.model("User", userSchema);
