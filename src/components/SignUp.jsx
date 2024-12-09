import React from "react";
import { useAuth } from "../Contexts/AuthContext";
import { NavLink } from "react-router-dom";

function SignUp() {
  const {
    userName,
    setUserName,
    setEmail,
    email,
    password,
    setPassword,
    createAccount,
    isAuthenticated,
    createAccountWithGoogle,
    handleSetName,
  } = useAuth();

  return (
    <div>
      <input
        type="text"
        value={userName}
        placeholder="What is your name?"
        onChange={handleSetName}
      />
      {userName && (
        <>
          <label>Enter your email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Enter your password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={createAccount}>Sign up</button>
          <button onClick={createAccountWithGoogle}>Google</button>
        </>
      )}
      <p>
        Already have an account?
        <span>
          <NavLink to="/log-in">Log in</NavLink>
        </span>
      </p>
    </div>
  );
}

export default SignUp;
