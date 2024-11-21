export interface ThemeType {
  mode: "light" | "dark";
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    error: string;
    success: string;
  };
}
