import React from "react";
import { useAuth } from "../Contexts/AuthContext";
import { NavLink } from "react-router-dom";

function Dashboard() {
  const { logOut } = useAuth();

  return (
    <div>
      <p> This is the dashboard</p>
      <button onClick={logOut}>Log Out</button>

      <h3>
        <NavLink to="/create-budget">Start your budget</NavLink>
      </h3>
    </div>
  );
}
export default Dashboard;
