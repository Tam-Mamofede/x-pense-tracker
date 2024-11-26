import React from "react";
import SignUp from "./src/components/SignUp";
import Login from "./src/components/Login";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./src/pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="sign-up" element={<SignUp />} />
      <Route path="log-in" element={<Login />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
