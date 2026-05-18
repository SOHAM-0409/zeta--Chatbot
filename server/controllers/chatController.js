const fetch = require("node-fetch");
const Message = require("../models/Message");

const sendMessage = async (req, res) => {
  try {
    const { message, sessionId = "default" } = req.body;
    const userId = req.user.uid;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    await Message.create({
      userId,
      role: "user",
      content: message.trim(),
      sessionId,
    });

    const history = await Message.find({ userId, sessionId })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    history.reverse();

    const contents = history.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      }
    );

    const data = await response.json();
   console.log("Gemini response:", JSON.stringify(data));
const aiReply = data.candidates[0].content.parts[0].text;
    await Message.create({
      userId,
      role: "assistant",
      content: aiReply,
      sessionId,
    });

    res.json({ reply: aiReply });
  } catch (error) {
    console.error("sendMessage error:", error);
    res.status(500).json({ error: "Failed to get AI response" });
  }
};

const getHistory = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { sessionId = "default" } = req.query;
    const messages = await Message.find({ userId, sessionId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
};

const clearHistory = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { sessionId = "default" } = req.query;
    await Message.deleteMany({ userId, sessionId });
    res.json({ message: "History cleared" });
  } catch (error) {
    res.status(500).json({ error: "Failed to clear history" });
  }
};

module.exports = { sendMessage, getHistory, clearHistory };