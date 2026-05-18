// src/components/Layout/Navbar.jsx — Top Navigation Bar
// Shows the app logo, user email, and logout button.

import React from "react";
import { useAuth } from "../../context/AuthContext";

const Navbar = ({ onClearChat }) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-10">
      {/* Logo */}
      <div className="flex items-center gap-2">
        {/* AI Icon */}
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-gray-950 font-bold text-sm">
          AI
        </div>
        <span className="font-semibold text-white text-lg tracking-tight">
          ChatBot
        </span>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-3">
        {/* Clear chat button */}
        <button
          onClick={onClearChat}
          className="text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-gray-800"
          title="Clear chat history"
        >
          Clear Chat
        </button>

        {/* User email (truncated on mobile) */}
        <span className="hidden sm:block text-xs text-gray-500 max-w-[150px] truncate">
          {user?.email}
        </span>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-3 py-1.5 rounded-lg transition-all"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
