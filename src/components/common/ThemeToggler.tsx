"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ColorScheme } from "@/types/shared.types";
import { checkIsProperScheme } from "@/utils/theme.utils";

const ThemeToggler = () => {
  const [theme, setTheme] = useState<ColorScheme>();

  const updateColorScheme = (targetScheme: ColorScheme) => {
    setTheme(targetScheme);

    localStorage.setItem("color-scheme", targetScheme);
    document
      .getElementById("theme-provider")
      ?.setAttribute("data-theme", targetScheme);
  };

  useEffect(() => {
    const locallyStored = localStorage.getItem("color-scheme");

    if (checkIsProperScheme(locallyStored)) {
      updateColorScheme(locallyStored);
      return;
    }

    const bodyTheme = document
      .getElementById("theme-provider")
      ?.getAttribute("data-theme");

    if (!checkIsProperScheme(bodyTheme)) {
      return;
    }

    updateColorScheme(bodyTheme);
  }, []);

  return (
    <button
      onClick={() => updateColorScheme(theme === "dark" ? "light" : "dark")}
      className="hover:bg-background-secondary relative flex aspect-square h-8 cursor-pointer items-center justify-center rounded-lg p-1"
    >
      <div className="relative h-full w-full cursor-pointer">
        {theme === "dark" ? (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <MoonIcon className="h-6 w-6 text-yellow-200" />
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
            <SunIcon className="h-6 w-6 text-amber-300" />
          </motion.div>
        )}
      </div>
    </button>
  );
};

export default ThemeToggler;
