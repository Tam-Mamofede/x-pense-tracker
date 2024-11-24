import React from "react";
import { auth, googleProvider, db } from "./Config/firebase.config";

function App() {
  return (
    <div>
      <label>Enter your email</label>
      <input type="text" />
      <label>Enter your password</label>
      <input type="password" />
    </div>
  );
}

export default App;
