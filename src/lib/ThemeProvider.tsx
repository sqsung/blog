"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="color-scheme"
      disableTransitionOnChange={true}
    >
      {children}
    </NextThemesProvider>
  );
};

export default ThemeProvider;
