// src/hooks/useChat.js — Custom Chat Hook
// Handles all chat state: messages, loading, sending, history fetch.
// Components just call this hook — no API logic in components.

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "";

export const useChat = () => {
  const { getToken } = useAuth();

  // Array of message objects: { role: "user"|"assistant", content: "..." }
  const [messages, setMessages] = useState([]);

  // Is the AI currently generating a response?
  const [isLoading, setIsLoading] = useState(false);

  // Any error message to show the user
  const [error, setError] = useState(null);

  // ── Fetch History on Mount ──────────────────────────────
  useEffect(() => {
    fetchHistory();
  }, []);

  /**
   * fetchHistory — Load past messages from MongoDB
   */
  const fetchHistory = useCallback(async () => {
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/api/chat/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.messages) {
        setMessages(data.messages);
      }
    } catch (err) {
      console.error("Failed to load history:", err);
    }
  }, [getToken]);

  /**
   * sendMessage — Send user input to the backend → OpenAI
   * @param {string} content - The user's message text
   */
  const sendMessage = useCallback(
    async (content) => {
      if (!content.trim() || isLoading) return;

      setError(null);

      // Optimistically add user message to UI immediately
      const userMessage = { role: "user", content: content.trim() };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const token = await getToken();

        const res = await fetch(`${API_URL}/api/chat/send`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message: content.trim() }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        // Add AI response to messages
        const aiMessage = { role: "assistant", content: data.reply };
        setMessages((prev) => [...prev, aiMessage]);
      } catch (err) {
        setError(err.message || "Failed to send message");
        // Remove the optimistic user message on error
        setMessages((prev) => prev.slice(0, -1));
      } finally {
        setIsLoading(false);
      }
    },
    [getToken, isLoading]
  );

  /**
   * clearChat — Delete all messages from DB and clear UI
   */
  const clearChat = useCallback(async () => {
    try {
      const token = await getToken();
      await fetch(`${API_URL}/api/chat/history`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages([]);
    } catch (err) {
      console.error("Failed to clear chat:", err);
    }
  }, [getToken]);

  return { messages, isLoading, error, sendMessage, clearChat };
};
