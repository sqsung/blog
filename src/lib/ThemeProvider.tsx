"use client";

import { ColorScheme } from "@/types/shared.types";
import { checkIsProperScheme } from "@/utils/theme.utils";
import { useEffect, useState } from "react";

const getInitialTheme = (): ColorScheme => {
  const stored = localStorage.getItem("color-scheme");

  if (checkIsProperScheme(stored)) {
    return stored;
  }

  const isSystemDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  return isSystemDark ? "dark" : "light";
};

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ColorScheme | null>(null);

  useEffect(() => {
    if (!theme) {
      setTheme(getInitialTheme());
    }
  }, [theme]);

  if (!theme) {
    return null;
  }

  return (
    <div
      id="theme-provider"
      data-theme={theme}
      className="min-h-screen min-w-screen"
    >
      {children}
    </div>
  );
};

export default ThemeProvider;
