import React, { useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { NavLink } from "react-router-dom";
import Budget from "../components/Budget";
import Expense from "../components/Expense";
import { useExpense } from "../Contexts/ExpenseContext";
import { useBudget } from "../Contexts/BudgetContext";
import BudgetChart from "../components/BudgetGraph";

function Dashboard() {
  const { logOut, selectedMonth } = useAuth();
  const { handleChangeMonth, categories } = useBudget();
  const { handleShowExpense, showExpense, setShowExpense } = useExpense();

  return (
    <div>
      <p> This is the dashboard</p>
      <button onClick={logOut}>Log Out</button>

      {selectedMonth ? (
        <>
          <BudgetChart />
          <Budget />
          {categories.length <= 0 ? (
            <NavLink to="/create-budget">Create a budget.</NavLink>
          ) : (
            <NavLink to="/create-budget">Add more</NavLink>
          )}{" "}
          <button onClick={handleChangeMonth}>change month</button>
        </>
      ) : (
        <>
          <p>
            Start you budgeting journery.
            <NavLink to="/create-budget"> Click here!</NavLink>{" "}
            <button onClick={handleChangeMonth}>change month</button>
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
