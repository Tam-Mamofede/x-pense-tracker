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
  } = useExpense();

  const handleSumbitExpense = () => {
    if (expenseCategory === category) {
      const calcAmount = Number(amount) - Number(expenseAmount);
      setAmount(calcAmount);
    } else {
      alert(
        "You have not set a budget for this category, so we cannot deduct your expense"
      );
    }

    setShowExpense(false);
    return amount;
  };
  return (
    <div>
      <label htmlFor="expenseCategory">
        What category does this fall under?
      </label>
      <input
        type="text"
        value={expenseCategory}
        onChange={setExpenseCategory}
      />
      <label htmlFor="expenseAmount">How much did you spend?</label>
      <input type="number" value={expenseAmount} onChange={setExpenseAmount} />
      <button onClick={handleSumbitExpense}>Submit expense</button>

      <p>This is how much you have left for this category</p>
    </div>
  );
}

export default Expense;
