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
    categories,
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
        <h1>This is your budget for {month}</h1>
      </div>
      <ul>
        {categories.map((categoryItem) => (
          <li key={categoryItem.id}>
            {categoryItem.Category}: ${categoryItem.Amount}{" "}
            <button onClick={() => handleDeleteEntry(budget.id)}>
              Delete entry
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Budget;
