import React, { forwardRef } from "react";
import { useBudget } from "../Contexts/BudgetContext";
import { useAuth } from "../Contexts/AuthContext";

const CreateBudget = forwardRef((props, ref) => {
  const {
    month,
    setMonth,
    amount,
    setAmount,
    category,
    setCategory,
    handleSetBudget,
    isMonth,
    setIsMonth,
    handleSetMonth,
  } = useBudget();

  const { selectedMonth, setSelectedMonth } = useAuth();

  const handleCreateNewMonth = () => {
    setIsMonth(false);
    setSelectedMonth("");
  };

  // Validation checks
  const isValidAmount = !isNaN(amount) && parseFloat(amount) > 0;
  const isFormValid = category && isValidAmount;

  // Dynamic button classes
  const buttonClass = (enabled) =>
    `w-fit rounded-2xl px-4 py-2 text-center ${
      enabled
        ? "bg-[#e3f0af] text-[#1f4529]"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`;
  // console.log("selectedMonth:", selectedMonth);
  // console.log("isMonth:", isMonth);

  return (
    <div ref={ref} className="my-4 flex flex-col items-center">
      {selectedMonth ? (
        <div className="m-4 max-w-md rounded-lg bg-[#e3f0af] pt-4 font-bold text-[#1f4529] shadow-md">
          <h1 className="mb-2 text-center text-lg">Plan your wallet!</h1>
          <div className="flex flex-col space-y-4 rounded-2xl bg-[#fffcf9] p-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-xl border border-[#1f4529] px-2 py-1"
                aria-label="Enter budget category"
              />
              <label htmlFor="amount">Amount</label>
              <input
                type="text"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="rounded-xl border border-[#1f4529] px-2 py-1"
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
                className={buttonClass}
              >
                Submit budget
              </button>
              <button
                onClick={handleCreateNewMonth}
                className={buttonClass(true)}
              >
                Create budget for a new month
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col space-y-2">
          <label htmlFor="month">Month</label>
          <input
            type="text"
            id="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="rounded-xl border border-[#1f4529] px-2 py-1"
            aria-label="Enter month"
          />
          <button onClick={handleSetMonth} className={buttonClass(true)}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
});

CreateBudget.displayName = "CreateBudget";

export default CreateBudget;
