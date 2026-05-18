// src/components/Chat/MessageBubble.jsx — Individual Message
// Renders a single chat message differently for "user" vs "assistant".

import React from "react";
import ReactMarkdown from "react-markdown";

const MessageBubble = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex items-end gap-2 animate-fade-in-up ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
          isUser
            ? "bg-emerald-500 text-gray-950"
            : "bg-gradient-to-br from-cyan-500 to-blue-600 text-white"
        }`}
      >
        {isUser ? "U" : "AI"}
      </div>

      {/* Message bubble */}
      <div
        className={`max-w-[75%] sm:max-w-[65%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? // User: right side, green tint
              "bg-emerald-600/20 text-emerald-50 border border-emerald-700/30 rounded-br-sm"
            : // AI: left side, dark gray
              "bg-gray-800/80 text-gray-100 border border-gray-700/50 rounded-bl-sm"
        }`}
      >
        {isUser ? (
          // User messages: plain text
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          // AI messages: render Markdown (code blocks, bold, lists, etc.)
          <div className="prose-chat">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
