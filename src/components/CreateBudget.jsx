import React from "react";
import { useBudget } from "../Contexts/BudgetContext";

function CreateBudget() {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const {
    month,
    setMonth,
    amount,
    setAmount,
    category,
    setCategory,
    handleStoreBudget,
    budgets,
    handleDeleteEntry,
  } = useBudget();

  // Format the current selected month (if it's a valid month string)
  const formattedMonth = month
    ? monthNames[parseInt(month.split("-")[1], 10) - 1]
    : month;

  // Check if amount is a valid positive number
  const isValidAmount = !isNaN(amount) && parseFloat(amount) > 0;

  // Form validation check
  const isFormValid = month && category && isValidAmount;

  return (
    <>
      <div>
        <h1>Start spending wisely</h1>
        <p>Create your budget for the month below</p>
      </div>

      <div>
        <label htmlFor="month">Month (YYYY-MM)</label>
        <input
          type="text"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />

        <label htmlFor="category">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <label htmlFor="amount">Amount</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={handleStoreBudget} disabled={!isFormValid}>
          Submit budget for {month}
        </button>
      </div>

      <div>
        <h1>Here is your budget for {formattedMonth}</h1>

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
    </>
  );
}

export default CreateBudget;
