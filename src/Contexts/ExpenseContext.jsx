import React, { createContext, useContext, useState } from "react";

const ExpenseContext = createContext();

function ExpenseProvider({ children }) {
  const [showExpense, setShowExpense] = useState(false);

  const handleShowExpense = () => {
    setShowExpense(true);
  };

  return (
    <ExpenseContext.Provider
      value={{ handleShowExpense, setShowExpense, showExpense }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

function useExpense() {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error("useExpense must be used within an ExpenseProvider");
  }
  return context;
}

export { ExpenseProvider, useExpense };
