import React, { useEffect } from "react";
import { useBudget } from "../Contexts/BudgetContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

function CreateBudget() {
  const {
    month,
    setMonth,
    category,
    setCategory,
    amount,
    setAmount,
    onSubmit: handleSubmit,
    fetchBudgets,
    budgets, // Use this to display the saved budgets
    deleteEntry,
  } = useBudget();
  const { logOut } = useAuth();

  // Fetch budgets when the component mounts
  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  const navigate = useNavigate();
  return (
    <div>
      {/* Budget Creation Form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="month">
            What month are you budgeting for (YYYY-MM):{" "}
          </label>
          <input
            id="month"
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="category">Category: </label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., Groceries, Rent"
          />
        </div>
        <div>
          <label htmlFor="amount">Amount: </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g., 1000"
          />
        </div>
        <button type="submit">Create Budget</button>
      </form>

      {/* Display Saved Budgets */}
      <div>
        <h2>Saved Budgets</h2>
        {budgets && budgets.length > 0 ? (
          <ul>
            {budgets.map((budget) => (
              <li key={budget.id}>
                <strong>{budget.month}</strong> - {budget.category}: $
                {budget.amount.toFixed(2)}
              </li>
            ))}
          </ul>
        ) : (
          <p>No budgets saved yet. Start by creating one!</p>
        )}
      </div>

      <button onClick={() => navigate("/dashboard")}>
        Return to dashboard
      </button>
      <button onClick={logOut}>Logout</button>
      <button onClick={() => deleteEntry(entry.id)}>Logout</button>
    </div>
  );
}

export default CreateBudget;
