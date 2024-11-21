import { ThemeType } from "./theme.types";

export interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}
