import React from "react";
import { useBudget } from "../Contexts/BudgetContext";
import { useExpense } from "../Contexts/ExpenseContext";

function Expense() {
  const { category, month, amount: budgetAmount } = useBudget();
  const { setShowExpense } = useExpense();

  const handleSumbitExpense = () => {
    setShowExpense(false);
  };
  return (
    <div>
      <label htmlFor="category">What category does this fall under?</label>
      <input type="text" />
      <label htmlFor="amount">How much did you spend?</label>
      <input type="number" />
      <button onClick={handleSumbitExpense}>Submit expense</button>

      <p>This is how much you have left for this category</p>
    </div>
  );
}

export default Expense;
