import React, { useState } from "react";
import { useBudget } from "../../src copy/Contexts/BudgetContext";

function CreateBudget() {
  const {
    month,
    setMonth,
    amount,
    setAmount,
    category,
    setCategory,
    handleSubmit,
  } = useBudget();

  return (
    <>
      <div>
        <h1>Start spending wisely</h1>
        <p>Create you budget for the month below</p>
      </div>
      <div>
        <label htmlFor="month">Month</label>
        <input
          type="text"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
        <label htmlFor="category">Category</label>{" "}
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <label htmlFor="amount">Amount</label>{" "}
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit budget for {month}</button>
      </div>
    </>
  );
}

export default CreateBudget;
