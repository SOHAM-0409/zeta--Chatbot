// src/pages/ChatPage.jsx — Main Chat Page
// Combines Navbar + ChatWindow + InputBar into the full chat layout.

import React from "react";
import Navbar from "../components/Layout/Navbar";
import ChatWindow from "../components/Chat/ChatWindow";
import InputBar from "../components/Chat/InputBar";
import { useChat } from "../hooks/useChat";

const ChatPage = () => {
  // All chat logic comes from the custom hook
  const { messages, isLoading, error, sendMessage, clearChat } = useChat();

  return (
    // Full-screen flex column layout
    <div className="flex flex-col h-screen bg-gray-950">
      {/* Top navigation */}
      <Navbar onClearChat={clearChat} />

      {/* Scrollable chat area — takes up all remaining space */}
      <ChatWindow messages={messages} isLoading={isLoading} error={error} />

      {/* Fixed input bar at the bottom */}
      <InputBar onSend={sendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatPage;
