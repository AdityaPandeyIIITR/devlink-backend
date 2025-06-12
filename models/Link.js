const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
    originalUrl: {
    type: String,
    required: true
  },
  shortId: {
    type: String,
    required: true,
    unique: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  totalClicks: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Link",LinkSchema);