import React, { forwardRef } from "react";
import { useExpense } from "../Contexts/ExpenseContext";

const Expense = forwardRef((props, ref) => {
  const {
    expenseCategory,
    expenseAmount,
    setExpenseAmount,
    handleSubmitExpense,
    handleSetExpCat,
  } = useExpense();

  const isValidAmount = !isNaN(expenseAmount) && parseFloat(expenseAmount) > 0;
  const isFormValid = expenseCategory && isValidAmount;

  return (
    <div ref={ref} className="my-4 flex flex-col items-center">
      <div className="m-4 max-w-md rounded-lg bg-[#e3f0af] pt-4 font-bold text-[#1f4529] shadow-md">
        <h1 className="mb-2 text-center text-lg">Log your expense</h1>
        <div className="flex flex-col space-y-4 rounded-2xl bg-[#fffcf9] p-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="expenseCategory">
              What category does this expense fall under?
            </label>
            <input
              type="text"
              value={expenseCategory}
              onChange={handleSetExpCat}
              className="rounded-xl border border-[#1f4529] px-2 py-1"
              aria-label="Enter expense category"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="expenseAmount">How much did you spend?</label>
            <input
              type="text"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(Number(e.target.value))}
              className="rounded-xl border border-[#1f4529] px-2 py-1"
              aria-label="Enter expense category"
            />
            {!isValidAmount && (
              <p className="text-red-400">Enter a valid positive amount</p>
            )}
          </div>
          <div className="flex flex-col items-center space-y-4 py-4">
            <button
              onClick={handleSubmitExpense}
              disabled={!isFormValid}
              className="w-fit rounded-xl bg-[#1f4529] px-4 py-2 text-center font-semibold text-[#e3f0af] shadow-md"
            >
              Submit expense
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

Expense.displayName = "Expense";

export default Expense;
