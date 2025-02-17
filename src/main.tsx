import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import "./index.css";
import { BASE_THEME } from "./theme";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ThemeProvider theme={BASE_THEME}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
