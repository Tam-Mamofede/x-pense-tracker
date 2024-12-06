import React from "react";
import { useBudget } from "../Contexts/BudgetContext";
import { useExpense } from "../Contexts/ExpenseContext";

function Expense() {
  const { category, setCategory, month, amount, setAmount } = useBudget();
  const {
    setShowExpense,
    expenseCategory,
    setExpenseCategory,
    expenseAmount,
    setExpenseAmount,
    handleSumbitExpense,
  } = useExpense();

  return (
    <div>
      <label htmlFor="expenseCategory">
        What category does this expense fall under?
      </label>
      <input
        type="text"
        value={expenseCategory}
        onChange={setExpenseCategory}
      />
      <label htmlFor="expenseAmount">How much did you spend?</label>
      <input type="number" value={expenseAmount} onChange={setExpenseAmount} />
      <button onClick={handleSumbitExpense}>Submit expense</button>

      <p>This is how much you have left for this {expenseCategory}: Amount</p>

      <button onClick={handleShowExpense}>Add another expense</button>
    </div>
  );
}

export default Expense;
