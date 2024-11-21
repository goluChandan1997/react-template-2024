import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { ThemeType } from "../types/theme.types";
import { lightTheme, darkTheme } from "../config/theme";

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("isDark");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDark(systemPrefersDark);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev: any) => {
      const newTheme = !prev;
      localStorage.setItem("isDark", JSON.stringify(newTheme));
      return newTheme;
    });
  };

  const value = useMemo(
    () => ({
      theme: isDark ? darkTheme : lightTheme,
      toggleTheme,
    }),
    [isDark]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    if (process.env.NODE_ENV === "development") {
      console.warn("useTheme must be used within a ThemeProvider");
    }
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
