// ============================================================
// index.js — Main Server Entry Point
// This file starts our Express server, connects to MongoDB,
// and registers all API routes.
// ============================================================

const dotenv = require("dotenv");
dotenv.config();  // ← must be FIRST before anything else

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const chatRoutes = require("./routes/chatRoutes");

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET", "POST", "DELETE"],
}));

app.use(express.json());

// Routes
app.use("/api/chat", chatRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "AI Chatbot API is running 🚀" });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});