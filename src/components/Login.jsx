import React, { useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Config/firebase.config";

function Login() {
  const [logInEmail, setLogInEmail] = useState("");
  const [logInPassword, setLogInPassword] = useState("");
  const { setIsAuthenticated, createAccountWithGoogle } = useAuth(); // Remove unnecessary destructured values
  const navigate = useNavigate();

  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, logInEmail, logInPassword);

      // Firebase authentication is successful if we reach this point
      setIsAuthenticated(true);

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err.message);
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div>
      <label>Enter your email</label>
      <input
        type="text"
        value={logInEmail}
        onChange={(e) => setLogInEmail(e.target.value)}
        placeholder="Email"
      />
      <label>Enter your password</label>
      <input
        type="password"
        value={logInPassword}
        onChange={(e) => setLogInPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={logIn}>Log in</button>
      <button onClick={createAccountWithGoogle}>Log in with Google</button>
    </div>
  );
}

export default Login;
