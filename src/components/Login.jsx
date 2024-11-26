import React, { useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Config/firebase.config";

function Login() {
  const [logInEmail, setLogInEmail] = useState("");
  const [logInPassword, setLogInPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuthenticated, createAccountWithGoogle } = useAuth();
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!logInEmail || !logInPassword) {
      setError("Email and password are required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(logInEmail)) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError(null); // Clear errors if validation passes
    return true;
  };

  const logIn = async () => {
    if (!validateInputs()) return;

    setIsLoading(true); // Disable button while logging in
    try {
      await signInWithEmailAndPassword(auth, logInEmail, logInPassword);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err.message);
      setError("Login failed: " + err.message);
    } finally {
      setIsLoading(false); // Re-enable button after operation
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label htmlFor="email">Enter your email</label>
        <input
          id="email"
          type="text"
          value={logInEmail}
          onChange={(e) => setLogInEmail(e.target.value)}
          placeholder="Email"
        />
      </div>
      <div>
        <label htmlFor="password">Enter your password</label>
        <input
          id="password"
          type="password"
          value={logInPassword}
          onChange={(e) => setLogInPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={logIn} disabled={isLoading}>
        {isLoading ? "Logging in..." : "Log in"}
      </button>
      <button onClick={createAccountWithGoogle} disabled={isLoading}>
        Log in with Google
      </button>
    </div>
  );
}

export default Login;
