const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  action: String,
  tag: String, // e.g., "Created Post"
  post: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  history: [historySchema],
  avatar: {
    type: String,
    default: "https://ik.imagekit.io/sf0ybmgwy/caption_generator/avatarImg.jpg",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  mailVerifyToken: {
    type: String,
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
