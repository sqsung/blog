"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Placeholder = () => {
  return <div className="aspect-square h-8" />;
};

const ThemeToggler = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  const isDark = resolvedTheme === "dark";

  if (!resolvedTheme || !isMounted) {
    return <Placeholder />;
  }

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="hover:bg-background-secondary relative flex aspect-square h-8 cursor-pointer items-center justify-center rounded-lg p-1"
    >
      <div className="relative h-full w-full cursor-pointer">
        {resolvedTheme === "dark" ? (
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
