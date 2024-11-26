import React from "react";
import { useAuth } from "../Contexts/AuthContext";

function Dashboard() {
  const { logOut } = useAuth();

  return (
    <div>
      <p> This is the dashboard</p>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
}
export default Dashboard;
