import React from "react";
import { useAuth } from "../Contexts/AuthContext";
import Login from "./login";
import SignUp from "./SignUp";

export function Auth() {
  const { isAuthenticated } = useAuth();
  return <div>{!isAuthenticated ? <SignUp /> : <Login />}</div>;
}

export default Auth;
