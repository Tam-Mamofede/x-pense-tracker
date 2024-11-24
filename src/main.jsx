import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "../App.jsx";
import { AuthProvider } from "./Contexts/AuthContext.jsx";
import { BudgetProvider } from "./Contexts/BudgetContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BudgetProvider>
          <App />
        </BudgetProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
