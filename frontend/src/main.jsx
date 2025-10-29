import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./context/AuthContext.jsx";
import { StatsProvider } from "./context/StatsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <StatsProvider>
          <App />
        </StatsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
