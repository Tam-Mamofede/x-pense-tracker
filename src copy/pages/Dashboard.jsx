import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <button
        onClick={() => {
          navigate("/create-budget");
        }}
      >
        Create a budget
      </button>
    </>
  );
}
export default Dashboard;
