import React from "react";
import SignUp from "./src/components/SignUp";
import { AuthProvider } from "./src/Contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      {" "}
      <AuthProvider>
        <SignUp />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
