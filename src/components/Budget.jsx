import React from "react";
import { useBudget } from "../Contexts/BudgetContext";

function Budget() {
  const { handleDeleteEntry, categories, handleToggleDelBtn, showButton } =
    useBudget();

  return (
    <>
      <table className="w-4/5 table-fixed border-collapse flex-col items-center justify-center rounded-sm border">
        {!categories && <p>Loading categories...</p>}
        {categories.length === 0 && (
          <div className="flex h-fit w-4/5 flex-col items-center justify-center space-y-2 p-4">
            <p className="text-center font-extrabold text-[#1f4529]">
              No categories found.
            </p>
          </div>
        )}
        <thead className="w-full bg-[#e3f0af] text-[#1f4529]">
          <tr>
            <th className="border border-[#1f4529] px-6 py-2">Category</th>
            <th className="border border-[#1f4529] px-6 py-2">Budget</th>
            <th className="border border-[#1f4529] px-6 py-2">Expense</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((categoryItem) => (
            <tr key={categoryItem.id}>
              <td
                onClick={handleToggleDelBtn}
                className="border border-[#1f4529] px-4 py-2 hover:cursor-pointer"
              >
                {categoryItem.Category}
              </td>
              <td
                className={`border border-[#1f4529] px-4 py-2 ${categoryItem.Amount < 1 && "bg-red-400"}`}
              >
                {categoryItem.Amount}
              </td>
              <td className="border border-[#1f4529] px-4 py-2">
                {categoryItem.Expense}
              </td>
              <td className="border border-[#1f4529] bg-red-700 px-4 py-2 text-white">
                {" "}
                {showButton && (
                  <button onClick={() => handleDeleteEntry(categoryItem.id)}>
                    Delete Entry
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Budget;
