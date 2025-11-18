"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook to detect if user prefers dark mode
 */
export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if user has a preference stored
    const storedPreference = localStorage.getItem("darkMode");

    if (storedPreference !== null) {
      setIsDarkMode(storedPreference === "true");
    } else {
      // Check system preference
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setIsDarkMode(mediaQuery.matches);
    }
  }, []);

  const toggleDarkMode = () => {
    const newValue = !isDarkMode;
    setIsDarkMode(newValue);
    localStorage.setItem("darkMode", String(newValue));

    // Update document class
    if (newValue) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return { isDarkMode, toggleDarkMode };
}
