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
    handleSubmitExpense,
    handleShowExpense,
  } = useExpense();

  return (
    <div>
      <label htmlFor="expenseCategory">
        What category does this expense fall under?
      </label>
      <input
        type="text"
        value={expenseCategory}
        onChange={(e) => setExpenseCategory(e.target.value)}
      />
      <label htmlFor="expenseAmount">How much did you spend?</label>
      <input
        type="text"
        value={expenseAmount}
        onChange={(e) => setExpenseAmount(Number(e.target.value))}
        placeholder="5000"
      />
      <button onClick={handleSubmitExpense}>Submit expense</button>

      {expenseCategory && (
        <p>This is how much you have left for this {expenseCategory}: Amount</p>
      )}

      <button onClick={handleShowExpense}>Add another expense</button>
    </div>
  );
}

export default Expense;
