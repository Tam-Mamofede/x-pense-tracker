import React from "react";
import { useBudget } from "../Contexts/BudgetContext";
import { useAuth } from "../Contexts/AuthContext";

function Budget() {
  const { month, handleDeleteEntry, categories } = useBudget();
  const { selectedMonth } = useAuth();

  return (
    <>
      <div>
        <h1 className="font-extrabold text-green-700 ">
          This is your budget for {selectedMonth || month}
        </h1>
      </div>
      {!categories && <p>Loading categories...</p>}
      {categories.length === 0 && <p>No categories found.</p>}
      <ul>
        {categories.map((categoryItem) => (
          <li key={categoryItem.id}>
            {categoryItem.Category}: {categoryItem.Amount}
            <button onClick={() => handleDeleteEntry(categoryItem.id)}>
              Delete entry
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Budget;
