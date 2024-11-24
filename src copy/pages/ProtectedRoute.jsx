import React, { useEffect } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Only render children if authenticated, otherwise null (or a loading spinner)
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
