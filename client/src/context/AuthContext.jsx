// src/context/AuthContext.jsx — Authentication Context
// Provides Firebase auth state (current user) to the entire app.
// Any component can call useAuth() to access the logged-in user.

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

// Create the context object
const AuthContext = createContext();

/**
 * AuthProvider — Wrap your app with this to provide auth state
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);       // Current Firebase user
  const [loading, setLoading] = useState(true); // Are we still checking auth?

  // Listen for auth state changes (login, logout, page refresh)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  /**
   * Login with email & password
   */
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  /**
   * Create new account with email & password
   */
  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  /**
   * Sign out the current user
   */
  const logout = () => signOut(auth);

  /**
   * Get a fresh ID token for API requests
   * Firebase tokens expire after 1 hour — this refreshes automatically
   */
  const getToken = async () => {
    if (!user) return null;
    return await user.getIdToken();
  };

  const value = { user, loading, login, signup, logout, getToken };

  return (
    <AuthContext.Provider value={value}>
      {/* Don't render children until we know auth state */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

/**
 * useAuth — Custom hook to access auth context
 * Usage: const { user, login, logout } = useAuth();
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
};
