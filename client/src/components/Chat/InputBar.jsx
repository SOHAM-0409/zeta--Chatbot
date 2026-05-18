// src/components/Chat/InputBar.jsx — Message Input
// Text area with send button. Supports Enter to send, Shift+Enter for newline.

import React, { useState, useRef } from "react";

const InputBar = ({ onSend, isLoading }) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  /**
   * Handle form submission (send button or Enter key)
   */
  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    onSend(input);       // Call parent's sendMessage
    setInput("");        // Clear input
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  /**
   * Handle keyboard shortcuts:
   * Enter = send, Shift+Enter = new line
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Don't add newline
      handleSend();
    }
  };

  /**
   * Auto-resize textarea height as user types
   */
  const handleInput = (e) => {
    setInput(e.target.value);
    // Reset height first, then set to scrollHeight
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px";
  };

  return (
    <div className="border-t border-gray-800 bg-gray-950/80 backdrop-blur-sm p-3 sm:p-4">
      <div className="max-w-3xl mx-auto flex items-end gap-2">
        {/* Text input */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Type a message... (Enter to send)"
          rows={1}
          disabled={isLoading}
          className="flex-1 bg-gray-800 text-gray-100 placeholder-gray-500 
                     rounded-xl px-4 py-3 text-sm resize-none outline-none 
                     border border-gray-700 focus:border-emerald-500/50 
                     transition-colors min-h-[44px] max-h-40 
                     disabled:opacity-50 disabled:cursor-not-allowed
                     scrollbar-thin"
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="flex-shrink-0 w-11 h-11 rounded-xl 
                     bg-emerald-500 hover:bg-emerald-400 
                     disabled:bg-gray-700 disabled:cursor-not-allowed
                     text-gray-950 font-bold
                     transition-all duration-200
                     flex items-center justify-center
                     active:scale-95"
          title="Send message"
        >
          {isLoading ? (
            // Spinner when loading
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            // Send arrow icon
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Hint text */}
      <p className="text-center text-xs text-gray-600 mt-2">
        Shift+Enter for new line · Enter to send
      </p>
    </div>
  );
};

export default InputBar;
