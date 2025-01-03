import React from "react";
import { useBudget } from "../Contexts/BudgetContext";

function Budget() {
  const { handleDeleteEntry, categories, handleToggleDelBtn, showButton } =
    useBudget();

  return (
    <>
      <div className="flex table-auto flex-col items-center justify-center rounded-sm border">
        {!categories && <p>Loading categories...</p>}
        {categories.length === 0 && (
          <div className="flex h-fit w-4/5 flex-col items-center justify-center space-y-2 p-4">
            <p className="text-center font-extrabold text-[#1f4529]">
              No categories found.
            </p>
          </div>
        )}
        <thead className="bg-[#e3f0af] text-[#1f4529]">
          <tr>
            <th className="border border-[#1f4529] px-6 py-2">Category</th>
            <th className="border border-[#1f4529] px-6 py-2">Budget</th>
            <th className="border border-[#1f4529] px-6 py-2">Expense</th>
          </tr>
        </thead>
        {categories.map((categoryItem) => (
          <>
            <tbody key={categoryItem.id}>
              <tr>
                <td
                  onClick={handleToggleDelBtn}
                  className="border border-[#1f4529] px-6 py-2 hover:cursor-pointer"
                >
                  {categoryItem.Category}
                </td>
                <td
                  className={`border border-[#1f4529] px-6 py-2 ${categoryItem.Amount < 1 && "bg-red-400"}`}
                >
                  {categoryItem.Amount}
                </td>
                <td className="border border-[#1f4529] px-6 py-2">
                  {categoryItem.Expense}
                </td>
              </tr>
            </tbody>
            {showButton === true && (
              <button onClick={() => handleDeleteEntry(categoryItem.id)}>
                Delete Entry
              </button>
            )}
          </>
        ))}
      </div>
    </>
  );
}

export default Budget;
