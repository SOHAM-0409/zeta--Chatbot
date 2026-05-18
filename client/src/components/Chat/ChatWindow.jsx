// src/components/Chat/ChatWindow.jsx — Chat Display Area
// Shows all messages and auto-scrolls to the bottom on new messages.

import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

/**
 * TypingIndicator — Animated dots shown while AI is responding
 */
const TypingIndicator = () => (
  <div className="flex items-end gap-2 animate-fade-in-up">
    {/* AI avatar */}
    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
      AI
    </div>
    {/* Dots */}
    <div className="bg-gray-800/80 border border-gray-700/50 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
      <span className="w-2 h-2 bg-emerald-400 rounded-full typing-dot animate-pulse_dot" />
      <span className="w-2 h-2 bg-emerald-400 rounded-full typing-dot animate-pulse_dot" />
      <span className="w-2 h-2 bg-emerald-400 rounded-full typing-dot animate-pulse_dot" />
    </div>
  </div>
);

/**
 * EmptyState — Shown when there are no messages yet
 */
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-4">
    {/* Large AI icon */}
    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-2xl font-bold text-gray-950">
      AI
    </div>
    <div>
      <h2 className="text-xl font-semibold text-white mb-1">
        How can I help you today?
      </h2>
      <p className="text-gray-500 text-sm max-w-xs">
        Ask me anything — coding, writing, analysis, or just a chat.
      </p>
    </div>
    {/* Suggestion chips */}
    <div className="flex flex-wrap gap-2 justify-center mt-2">
      {[
        "Explain quantum computing",
        "Write a React component",
        "Summarize a topic",
        "Help me debug code",
      ].map((suggestion) => (
        <span
          key={suggestion}
          className="text-xs px-3 py-1.5 rounded-full bg-gray-800 text-gray-400 border border-gray-700"
        >
          {suggestion}
        </span>
      ))}
    </div>
  </div>
);

const ChatWindow = ({ messages, isLoading, error }) => {
  // Ref to the bottom of the chat — used to auto-scroll
  const bottomRef = useRef(null);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4">
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Empty state */}
        {messages.length === 0 && !isLoading && <EmptyState />}

        {/* Message list */}
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))}

        {/* AI typing indicator */}
        {isLoading && <TypingIndicator />}

        {/* Error message */}
        {error && (
          <div className="text-center">
            <p className="text-xs text-red-400 bg-red-900/20 border border-red-800/30 rounded-lg px-4 py-2 inline-block">
              ⚠️ {error}
            </p>
          </div>
        )}

        {/* Invisible element at the bottom for scrolling */}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
