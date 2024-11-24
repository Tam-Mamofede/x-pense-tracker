import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import Login from "../components/login";

function Homepage() {
  const { loggedInUser } = useAuth();

  return (
    <div>
      <h1>This is the homepage</h1>
      <Login />
      <Link to="/sign-up">Don't have an account? Sign up!</Link>
    </div>
  );
}

export default Homepage;
