import React, { useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { NavLink } from "react-router-dom";
import Budget from "../components/Budget";
import Expense from "../components/Expense";
import { useExpense } from "../Contexts/ExpenseContext";

function Dashboard() {
  const { logOut } = useAuth();
  const { handleShowExpense, showExpense, setShowExpense } = useExpense();

  return (
    <div>
      <p> This is the dashboard</p>
      <button onClick={logOut}>Log Out</button>
      {(
        <>
          <Budget />
          <button onClick={handleShowExpense} disabled={showExpense}>
            Log an expense
          </button>
          {showExpense == true && <Expense />}
        </>
      ) || (
        <div>
          <NavLink to="/create-budget">Add more</NavLink>
        </div>
      )}
    </div>
  );
}
export default Dashboard;
