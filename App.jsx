import React, { useState } from "react";
import SignUp from "./src/components/SignUp";
import { AuthProvider } from "./src/Contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <SignUp />
    </AuthProvider>
  );
}

export default App;
