import React from "react";
import { useBudget } from "../Contexts/BudgetContext";
import { useAuth } from "../Contexts/AuthContext";

function Budget() {
  const { darkmode } = useAuth();
  const { handleDeleteEntry, categories, handleToggleDelBtn, showButton } =
    useBudget();

  return (
    <>
      <table className="w-4/5 table-fixed border-collapse flex-col items-center justify-center rounded-lg border">
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
            <th className="border border-[#1f4529] px-6 py-2">Remaining</th>
          </tr>
        </thead>
        <tbody className={darkmode ? "text-[#e3f0af]" : null}>
          {categories.map((categoryItem) => (
            <tr key={categoryItem.id}>
              <td
                onClick={handleToggleDelBtn}
                className="break-words border border-[#1f4529] px-4 py-2 hover:cursor-pointer"
              >
                {categoryItem.Category}
              </td>
              <td className="border border-[#1f4529] px-4 py-2">
                {categoryItem.Amount}
              </td>
              <td className="border border-[#1f4529] px-4 py-2">
                {categoryItem.Expense}
              </td>
              <td
                className={`border border-[#1f4529] px-4 py-2 ${
                  categoryItem.Amount < categoryItem.Expense
                    ? darkmode
                      ? "bg-[#310808] text-white"
                      : "bg-red-200"
                    : null
                } `}
              >
                {categoryItem.Remaining}
              </td>
              {showButton === true && (
                <td
                  key={`delBtn: ${categoryItem.id}`}
                  className="border border-[#1f4529] bg-red-800 px-4 py-2 text-white hover:cursor-pointer"
                >
                  <button onClick={() => handleDeleteEntry(categoryItem.id)}>
                    Delete Entry
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Budget;
