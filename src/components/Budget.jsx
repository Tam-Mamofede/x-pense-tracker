import React from "react";
import { useBudget } from "../Contexts/BudgetContext";
import { NavLink } from "react-router-dom";

function Budget() {
  const {
    month,
    amount,
    category,
    budgets,
    handleDeleteEntry,
    monthNames,
    finalMonth,
  } = useBudget();

  // Format the current selected month (if it's a valid month string)
  // const formattedMonth = month
  //   ? monthNames[parseInt(month.split("-")[1], 10) - 1]
  //   : month;

  // // Check if amount is a valid positive number
  // const isValidAmount = !isNaN(amount) && parseFloat(amount) > 0;

  return (
    <>
      <div>
        <h1>This is your budget</h1>
      </div>
      <div>
        {budgets.length === 0 ? (
          <p>
            No budgets found.
            <NavLink to="/create-budget">Start your budget</NavLink>
          </p>
        ) : (
          budgets.map((budget) => {
            // Get the month part from the budget
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
    </>
  );
}

export default Budget;
