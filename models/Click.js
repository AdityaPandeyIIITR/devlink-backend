const mongoose = require("mongoose");

const ClickSchema = new mongoose.Schema({
  linkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Link",
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  referrer: String,
  userAgent: String,
  ip: String
});

module.exports = mongoose.model("Click", ClickSchema);