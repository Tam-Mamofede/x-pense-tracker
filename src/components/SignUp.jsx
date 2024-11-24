import { useAuth } from "../Contexts/AuthContext";
import React from "react";
function SignUp() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    signUp,
    signUpWithGoogle,
    logIn,
    userName,
    setUserName,
    loggedInUser,
    isAuthenticated,
  } = useAuth();
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
      {loggedInUser ? null : (
        <>
          <label>Name: </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </>
      )}
      <button onClick={signUp}>Sign Up</button>
      <button onClick={signUpWithGoogle}>Google</button>
    </form>
  );
}

export default SignUp;
