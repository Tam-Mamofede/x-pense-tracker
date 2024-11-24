// import LineGraph from "./components/LineGraph";
import React, { useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Homepage from "./src/pages/Homepage";
import Dashboard from "./src/pages/Dashboard";
import PageNotFound from "./src/pages/PageNotFound";
import ProtectedRoute from "./src/pages/ProtectedRoute";
import CreateBudget from "./src/pages/CreateBudget";
import Login from "./src/components/login";
import SignUp from "./src/components/SignUp";
import { useAuth } from "./src/Contexts/AuthContext";

function App() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect authenticated users to the dashboard only if they're on specific public pages
    const publicPages = ["/", "/sign-in", "/sign-up"];
    if (isAuthenticated && publicPages.includes(location.pathname)) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="sign-in" element={<Login />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="auth" element={<SignUp />} />
      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="create-budget" element={<CreateBudget />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
