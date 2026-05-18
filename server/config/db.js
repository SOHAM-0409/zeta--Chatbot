// ============================================================
// config/db.js — MongoDB Connection
// Uses Mongoose to connect to MongoDB Atlas.
// ============================================================

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Connect using the URI from .env
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    // Exit the process if DB connection fails
    process.exit(1);
  }
};

module.exports = connectDB;
