import React from "react";
import { useAuth } from "../Contexts/AuthContext";

function Header() {
  const { logOut, firstName } = useAuth();
  return (
    <div className="flex justify-between bg-slate-500">
      <h1 className="text-yellow-500">Welcome {firstName}! </h1>
      <h1>Budget </h1>
      <h1> Date </h1>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
}

export default Header;
