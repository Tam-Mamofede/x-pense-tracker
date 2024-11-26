import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/sign-up" replace />;
  }
}

export default ProtectedRoute;
