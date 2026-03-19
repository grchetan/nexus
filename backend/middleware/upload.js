const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ─── helper: ensure directory exists ────────────────────────────────────────
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

// ─── storage factory ─────────────────────────────────────────────────────────
const makeStorage = (folder) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(__dirname, "..", "uploads", folder);
      ensureDir(dir);
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
      cb(null, unique);
    },
  });

// ─── file filter ─────────────────────────────────────────────────────────────
const imageFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp/;
  const ok = allowed.test(path.extname(file.originalname).toLowerCase()) &&
             allowed.test(file.mimetype);
  ok ? cb(null, true) : cb(new Error("Only image files are allowed!"));
};

const mediaFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp|mp4|mov|avi|mkv/;
  const ok = allowed.test(path.extname(file.originalname).toLowerCase());
  ok ? cb(null, true) : cb(new Error("Only image or video files are allowed!"));
};

// ─── exportable uploaders ─────────────────────────────────────────────────────
const uploadAvatar = multer({
  storage: makeStorage("avatars"),
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
}).single("avatar");

const uploadCover = multer({
  storage: makeStorage("covers"),
  fileFilter: imageFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
}).single("cover");

const uploadPostMedia = multer({
  storage: makeStorage("posts"),
  fileFilter: mediaFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
}).single("media");

// ─── error handler wrapper ────────────────────────────────────────────────────
const handleUpload = (uploader) => (req, res, next) => {
  uploader(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ success: false, message: `Upload error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
};

module.exports = { uploadAvatar, uploadCover, uploadPostMedia, handleUpload };
