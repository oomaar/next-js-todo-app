"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { Theme } from "@/server/dtos/UserDTOs/user.dto";

type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function resolveTheme(theme: Theme): ResolvedTheme {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return theme;
}

function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle("dark", resolveTheme(theme) === "dark");
}

function readStoredTheme(fallback: Theme): Theme {
  if (typeof window === "undefined") return fallback;
  return (localStorage.getItem("theme") as Theme | null) ?? fallback;
}

export function ThemeProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme?: Theme;
}) {
  const [theme, setThemeState] = useState<Theme>(() =>
    readStoredTheme(initialTheme ?? "system")
  );

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => {
    if (typeof window === "undefined") return "light";
    return resolveTheme(readStoredTheme(initialTheme ?? "system"));
  });

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    setResolvedTheme(resolveTheme(next));
    localStorage.setItem("theme", next);
    applyTheme(next);
  }, []);

  useEffect(() => {
    // Apply DOM class — no setState here
    applyTheme(theme);

    if (theme !== "system") return;

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    function onSystemChange() {
      const resolved = resolveTheme("system");
      document.documentElement.classList.toggle("dark", resolved === "dark");
      setResolvedTheme(resolved);
    }

    mql.addEventListener("change", onSystemChange);
    return () => mql.removeEventListener("change", onSystemChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}