// ============================================================
// middleware/authMiddleware.js — Firebase Token Verification
// Every protected API request must carry a valid Firebase
// ID token in the Authorization header.
// ============================================================

const admin = require("firebase-admin");

// Initialize Firebase Admin SDK (only once)
// Uses service account credentials from environment variables
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // The private key comes with literal \n — replace them with real newlines
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

/**
 * verifyToken — Express Middleware
 * Checks the Bearer token in Authorization header.
 * If valid, attaches the decoded user info to req.user.
 */
const verifyToken = async (req, res, next) => {
  try {
    // Extract token from "Authorization: Bearer <token>"
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split("Bearer ")[1];

    // Verify with Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Attach user info (uid, email) to request object
    req.user = decodedToken;

    // Continue to the next middleware/route
    next();
  } catch (error) {
    console.error("❌ Token verification failed:", error.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
