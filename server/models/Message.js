// ============================================================
// models/Message.js — MongoDB Message Schema
// Each message is stored with: who sent it, what it said,
// and which user it belongs to.
// ============================================================

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    // Firebase UID of the user who owns this message
    userId: {
      type: String,
      required: true,
    },

    // "user" = human message, "assistant" = AI response
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },

    // The actual message text
    content: {
      type: String,
      required: true,
    },

    // Optional: Group messages into sessions/conversations
    sessionId: {
      type: String,
      default: "default",
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);
