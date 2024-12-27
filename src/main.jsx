import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "../App.jsx";
import "./index.css";
import { AuthProvider } from "./Contexts/AuthContext.jsx";

import { BrowserRouter } from "react-router-dom";
import { BudgetProvider } from "./Contexts/BudgetContext.jsx";
import { ExpenseProvider } from "./Contexts/ExpenseContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter future={{ v7_startTransition: true }}>
      <AuthProvider>
        <BudgetProvider>
          <ExpenseProvider>
            <App />
          </ExpenseProvider>
        </BudgetProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
