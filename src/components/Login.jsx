import React, { useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const {
    email: registeredEmail,
    password: registeredPassword,
    setIsAuthenticated,
    createAccountWithGoogle,
  } = useAuth();

  const navigate = useNavigate();

  const logIn = (e, p) => {
    if ((e == registeredEmail) & (p == registeredPassword))
      setIsAuthenticated(true);

    navigate("/dashboard");
  };

  return (
    <div>
      <label>Enter your email</label>
      <input type="text" onChange={(e) => setEmail(e.target.value)} />
      <label>Enter your password</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => logIn(email, password)}>log in</button>
      <button onClick={() => createAccountWithGoogle()}>
        log in with Google
      </button>
    </div>
  );
}

export default Login;
