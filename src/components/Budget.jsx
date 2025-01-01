import React, { useState } from "react";
import { useBudget } from "../Contexts/BudgetContext";

function Budget() {
  const { handleDeleteEntry, categories } = useBudget();
  const [showButton, setShowButton] = useState(false);

  const handleToggleDelBtn = () => {
    showButton === false ? setShowButton(true) : setShowButton(false);
  };
  return (
    <>
      <div className="table-auto rounded-sm border">
        {!categories && <p>Loading categories...</p>}
        {categories.length === 0 && <p>No categories found.</p>}
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
            )}{" "}
          </>
        ))}
      </div>
    </>
  );
}

export default Budget;
