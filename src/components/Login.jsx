import React from "react";
import { useAuth } from "../Contexts/AuthContext";

function Login() {
  const {
    createAccountWithGoogle,
    logIn,
    logInEmail,
    setLogInEmail,
    logInPassword,
    setLogInPassword,
  } = useAuth();

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
