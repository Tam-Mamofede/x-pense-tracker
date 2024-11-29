import React, { useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { NavLink } from "react-router-dom";
import Budget from "../components/Budget";
import Expense from "../components/Expense";
import { useExpense } from "../Contexts/ExpenseContext";
import { useBudget } from "../Contexts/BudgetContext";

function Dashboard() {
  const { logOut } = useAuth();
  const { isMonth, month } = useBudget();
  const { handleShowExpense, showExpense, setShowExpense } = useExpense();

  return (
    <div>
      <p> This is the dashboard</p>
      <button onClick={logOut}>Log Out</button>

      {month ? (
        <>
          <Budget /> <NavLink to="/create-budget">Add more</NavLink>
        </>
      ) : (
        <>
          <p>
            Start you budgeting journery.
            <NavLink to="/create-budget"> Click here!</NavLink>
          </p>
        </>
      )}
      {/* {(
        <>
     
          <button onClick={handleShowExpense} disabled={showExpense}>
            Log an expense
          </button>
          {showExpense == true && <Expense />}
        </>
      ) || (
        <div>
        
        </div>
      )} */}
    </div>
  );
}
export default Dashboard;
