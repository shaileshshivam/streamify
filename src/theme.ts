import { createTheme } from "@mui/material";

export const CHART_COLORS = {
  primary: "#60a5fa",
  secondary: "#f48fb1",
  tertiary: "#ffe082",
  quaternary: "#81c784",
  neutral: "#9e9e9e",
};
export const BASE_THEME = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4a90e2",
      light: "#79b9ef",
      dark: "#357abf",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f50057",
      light: "#ff4081",
      dark: "#c51162",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f9fafb",
      paper: "#ffffff",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
    error: { main: "#e74c3c" },
    warning: { main: "#f39c12" },
    info: { main: "#3498db" },
    success: { main: "#2ecc71" },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: "2.5rem", fontWeight: 700, color: "#333333" },
    h2: { fontSize: "2rem", fontWeight: 600, color: "#333333" },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      color: "#333333",
      lineHeight: 1.3,
      letterSpacing: "0.5px",
    },
    h4: { fontSize: "1.5rem", fontWeight: 600, color: "#333333" },
    h5: { fontSize: "1.25rem", fontWeight: 600, color: "#333333" },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      color: "#333333",
      lineHeight: 1.4,
    },
    body1: { fontSize: "1rem", color: "#666666", lineHeight: 1.6 },
    body2: { fontSize: "0.875rem", color: "#666666" },
    button: { fontWeight: 500 },
  },
  shape: { borderRadius: 3 },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: "none" } } },
    MuiCard: {
      styleOverrides: { root: { boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" } },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
        },
      },
    },
  },
});
