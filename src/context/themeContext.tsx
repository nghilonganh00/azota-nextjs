"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme] = useLocalStorage<string>("currentTheme", "light");
  useEffect(() => {
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return <>{children}</>;
}
