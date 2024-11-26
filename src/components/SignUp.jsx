import React from "react";
import { useAuth } from "../Contexts/AuthContext";

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
  } = useAuth();

  return (
    <div>
      <input
        type="text"
        value={userName}
        placeholder="What is your name?"
        onChange={(e) => setUserName(e.target.value)}
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
      {isAuthenticated ? (
        <p>You've done it {userName}</p>
      ) : (
        <p>
          Already have an account? <span>Log in</span>
        </p>
      )}
    </div>
  );
}

export default SignUp;
