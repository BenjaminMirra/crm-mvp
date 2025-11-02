import "./index.css";
import { CssBaseline } from "@mui/material";
import { theme } from "./theme.ts";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App.tsx";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
