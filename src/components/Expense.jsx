import React, { forwardRef } from "react";
import { useExpense } from "../Contexts/ExpenseContext";
import { useAuth } from "../Contexts/AuthContext";

const Expense = forwardRef((props, ref) => {
  const { darkmode } = useAuth();

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
      <div
        className={`m-4 max-w-md rounded-lg pt-4 font-bold shadow-md lg:w-[550px] ${darkmode ? "bg-[#1f4529] text-[#e3f0af]" : "bg-[#e3f0af] text-[#1f4529]"}`}
      >
        <h1 className="mb-2 text-center text-lg">Log your expense</h1>
        <div
          className={`flex flex-col space-y-4 rounded-2xl px-8 py-4 ${darkmode ? "bg-[#2e5c3a]" : "bg-[#fffcf9]"}`}
        >
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="expenseCategory"
              className={`whitespace-normal ${darkmode ? "text-[#f5f7ed]" : "text-black"}`}
            >
              What category does this expense fall under?
            </label>
            <input
              type="text"
              value={expenseCategory}
              onChange={handleSetExpCat}
              className={`rounded-xl border px-2 py-1 ${darkmode ? "border-none bg-[#1f4529] text-white" : "bg-white"}`}
              aria-label="Enter expense category"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="expenseAmount"
              className={`whitespace-normal ${darkmode ? "text-[#f5f7ed]" : "text-black"}`}
            >
              How much did you spend?
            </label>
            <input
              type="text"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(Number(e.target.value))}
              className={`rounded-xl border px-2 py-1 ${darkmode ? "border-none bg-[#1f4529] text-white" : "bg-white"}`}
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
