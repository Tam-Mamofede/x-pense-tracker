import React from "react";
import { useBudget } from "../Contexts/BudgetContext";

function Budget() {
  const { month, amount, category, budgets, handleDeleteEntry, monthNames } =
    useBudget();

  // Format the current selected month (if it's a valid month string)
  const formattedMonth = month
    ? monthNames[parseInt(month.split("-")[1], 10) - 1]
    : month;

  // Check if amount is a valid positive number
  const isValidAmount = !isNaN(amount) && parseFloat(amount) > 0;

  return (
    <div>
      {budgets.length === 0 ? (
        <p>No budgets found.</p>
      ) : (
        budgets.map((budget) => {
          // Get the month part from the budget (e.g., "2024-12" -> "12")
          const monthNumber = parseInt(budget.month.split("-")[1], 10);
          // Map to the full month name using the monthNames array
          const formattedMonth = monthNames[monthNumber - 1];

          return (
            <div key={budget.id}>
              <ul>
                <li>
                  {budget.category} : {budget.amount}
                  <button onClick={() => handleDeleteEntry(budget.id)}>
                    Delete entry
                  </button>
                </li>
              </ul>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Budget;
