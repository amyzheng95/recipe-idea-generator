"use client";

import { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check initial theme
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      {darkMode ? (
        <SunIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
      ) : (
        <MoonIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
      )}
    </button>
  );
}
