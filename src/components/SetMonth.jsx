import React, { forwardRef } from "react";
import { useBudget } from "../Contexts/BudgetContext";

const SetMonth = forwardRef(() => {
  const { month, setMonth, handleSetMonth } = useBudget();

  return (
    <div className="w-23 flex h-fit flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center justify-center space-y-4 rounded-lg bg-[#e3f0af] px-8 py-6 shadow-md">
        <label htmlFor="month" className="font-extrabold text-[#1f4529]">
          Month
        </label>
        <input
          type="text"
          id="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="rounded-xl border border-[#1f4529] px-2 py-1"
          aria-label="Enter month"
        />
        <button
          onClick={handleSetMonth}
          className="w-fit rounded-2xl bg-[#1f4529] px-4 py-2 text-center font-extrabold text-[#e3f0af]"
        >
          Submit
        </button>
      </div>
    </div>
  );
});

SetMonth.displayName = "SetMonth";
export default SetMonth;
