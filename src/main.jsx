import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./Contexts/AuthContext.jsx";
import App from "../App.jsx";
import { BrowserRouter } from "react-router-dom";
import { BudgetProvider } from "./Contexts/BudgetContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter future={{ v7_startTransition: true }}>
      <AuthProvider>
        <BudgetProvider>
          <App />
        </BudgetProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
