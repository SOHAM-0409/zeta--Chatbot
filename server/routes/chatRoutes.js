// ============================================================
// routes/chatRoutes.js — API Route Definitions
// All routes here are prefixed with /api/chat
// verifyToken middleware protects every route
// ============================================================

const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const { sendMessage, getHistory, clearHistory } = require("../controllers/chatController");

// POST /api/chat/send — Send a message, get AI reply
router.post("/send", verifyToken, sendMessage);

// GET /api/chat/history — Fetch user's chat history
router.get("/history", verifyToken, getHistory);

// DELETE /api/chat/history — Clear user's chat history
router.delete("/history", verifyToken, clearHistory);

module.exports = router;
