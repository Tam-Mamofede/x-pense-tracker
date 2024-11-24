import { useAuth } from "../Contexts/AuthContext";
import React from "react";
function Login() {
  const { email, setEmail, password, setPassword, logIn, signUpWithGoogle } =
    useAuth();
  return (
    <form>
      <label>Email: </label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password: </label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={logIn}>Log in</button>
      <button onClick={signUpWithGoogle}>Google</button>
    </form>
  );
}

export default Login;
