import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./src/pages/Dashboard";
import CreateBudget from "./src/components/CreateBudget";
import ProtectedRoute from "./src/pages/ProtectedRoute";
import Homepage from "./src/pages/Homepage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="create-budget"
        element={
          <ProtectedRoute>
            <CreateBudget />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
