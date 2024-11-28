import React from "react";
import { useBudget } from "../Contexts/BudgetContext";
import Budget from "./Budget";

function CreateBudget() {
  const {
    month,
    setMonth,
    amount,
    setAmount,
    category,
    setCategory,
    handleStoreBudget,
    isMonth,
    handleSetMonth,
  } = useBudget();

  // Check if amount is a valid positive number
  const isValidAmount = !isNaN(amount) && parseFloat(amount) > 0;

  // Form validation check
  const isFormValid = category && isValidAmount;

  return (
    <>
      <div>
        <h1>Start spending wisely</h1>
        <p>Create your budget for the month below</p>
        <label htmlFor="month">Month</label>
        <input
          type="text"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
        <button onClick={handleSetMonth}>Submit</button>
      </div>

      {isMonth === true && (
        <div>
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
      )}
      <div>
        <Budget />
      </div>
    </>
  );
}

export default CreateBudget;
