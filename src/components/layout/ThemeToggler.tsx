"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type ColorScheme = "dark" | "light";

const checkIsProperColorScheme = (
  theme?: string | null,
): theme is ColorScheme => {
  if (!theme) {
    return false;
  }

  return ["dark", "light"].includes(theme);
};

const ThemeToggler = () => {
  const [theme, setTheme] = useState<ColorScheme>("dark");

  const updateColorScheme = (targetScheme: ColorScheme) => {
    localStorage.setItem("color-scheme", targetScheme);
    setTheme(targetScheme);
    document.documentElement.setAttribute("data-theme", targetScheme);
  };

  useEffect(() => {
    const stored = localStorage.getItem("color-scheme");

    if (checkIsProperColorScheme(stored)) {
      updateColorScheme(stored);
      return;
    }

    const isSystemDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    updateColorScheme(isSystemDark ? "dark" : "light");
  }, []);

  return (
    <button
      onClick={() => updateColorScheme(theme === "dark" ? "light" : "dark")}
      className="hover:bg-background-secondary relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg p-1"
    >
      <div className="relative h-full w-full">
        {theme === "dark" ? (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <MoonIcon className="h-6 w-6 text-blue-100" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <SunIcon className="h-6 w-6 text-yellow-400" />
          </motion.div>
        )}
      </div>
    </button>
  );
};

export default ThemeToggler;
