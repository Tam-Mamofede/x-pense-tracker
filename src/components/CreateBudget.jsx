import React, { forwardRef } from "react";
import { useBudget } from "../Contexts/BudgetContext";
import { useAuth } from "../Contexts/AuthContext";
import SetMonth from "./SetMonth";

const CreateBudget = forwardRef((props, ref) => {
  const {
    amount,
    setAmount,
    category,
    handleSetBudget,
    setIsMonth,
    handleSetCategory,
  } = useBudget();

  const { selectedMonth, setSelectedMonth, darkmode } = useAuth();

  const handleCreateNewMonth = () => {
    setIsMonth(false);
    setSelectedMonth("");
  };

  // Validation checks
  const isValidAmount = !isNaN(amount) && parseFloat(amount) > 0;
  const isFormValid = category && isValidAmount;

  return (
    <div ref={ref} className="my-4 flex flex-col items-center">
      {selectedMonth ? (
        <div
          className={`m-4 max-w-md rounded-lg pt-4 font-bold shadow-md lg:w-[550px] ${darkmode ? "bg-[#1f4529] text-[#e3f0af]" : "bg-[#e3f0af] text-[#1f4529]"}`}
        >
          <h1 className="mb-2 text-center text-lg">Plan your wallet!</h1>
          <div
            className={`flex flex-col space-y-4 rounded-2xl p-4 ${darkmode ? "bg-[#2e5c3a]" : "bg-[#fffcf9]"}`}
          >
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="category"
                className={darkmode ? "text-[#f5f7ed]" : "text-black"}
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={handleSetCategory}
                className={`rounded-xl border px-2 py-1 ${darkmode ? "border-none bg-[#1f4529] text-white" : "bg-white"}`}
                aria-label="Enter budget category"
              />
              <label
                htmlFor="amount"
                className={darkmode ? "text-[#f5f7ed]" : "text-black"}
              >
                Amount
              </label>
              <input
                type="text"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`rounded-xl border px-2 py-1 ${darkmode ? "border-none bg-[#1f4529] text-white" : "bg-white"}`}
                aria-label="Enter budget amount"
              />
              {!isValidAmount && (
                <p className="text-red-400">Enter a valid positive amount</p>
              )}
            </div>
            <div className="flex flex-col items-center space-y-4 py-4">
              <button
                onClick={handleSetBudget}
                disabled={!isFormValid}
                className="w-fit rounded-xl bg-[#1f4529] px-4 py-2 text-center font-semibold text-[#e3f0af] shadow-md"
              >
                Submit budget
              </button>
              <button
                onClick={handleCreateNewMonth}
                className={`w-fit whitespace-normal border-none px-4 text-center font-semibold ${darkmode ? "text-[#e3f0af]" : "text-[#1f4529]"}`}
              >
                Create budget for a new month
              </button>
            </div>
          </div>
        </div>
      ) : (
        <SetMonth />
      )}
    </div>
  );
});

CreateBudget.displayName = "CreateBudget";

export default CreateBudget;
