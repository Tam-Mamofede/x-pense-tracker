import React from "react";
import { useAuth } from "../Contexts/AuthContext";
import { NavLink } from "react-router-dom";
import Budget from "../components/Budget";

function Dashboard() {
  const { logOut } = useAuth();

  return (
    <div>
      <p> This is the dashboard</p>
      <button onClick={logOut}>Log Out</button>

      <Budget />
    </div>
  );
}
export default Dashboard;
