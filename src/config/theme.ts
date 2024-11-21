import { ThemeType } from "../types/theme.types";

export const lightTheme: ThemeType = {
  mode: "light",
  colors: {
    primary: "#1976d2",
    secondary: "#dc004e",
    background: "#ffffff",
    text: "#000000",
    error: "#f44336",
    success: "#4caf50",
  },
};

export const darkTheme: ThemeType = {
  mode: "dark",
  colors: {
    primary: "#90caf9",
    secondary: "#f48fb1",
    background: "#121212",
    text: "#ffffff",
    error: "#ef5350",
    success: "#81c784",
  },
};
