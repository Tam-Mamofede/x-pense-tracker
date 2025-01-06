/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState, useRef } from "react";
import { useBudget } from "./BudgetContext";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useAuth } from "./AuthContext";

const ExpenseContext = createContext();

function ExpenseProvider({ children }) {
  const { catIDs } = useBudget();
  const { user, selectedMonth, setAlertMessage, setIsLoading } = useAuth();
  const [showExpense, setShowExpense] = useState(false);
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [amountValue, setAmountValue] = useState();
  const [isSubmitExpense, setIsSubmitExpense] = useState(false);
  const expenseRef = useRef(null);

  const handleShowExpense = () => {
    showExpense === false ? setShowExpense(true) : setShowExpense(false);
    setTimeout(() => {
      // Scroll to CreateBudget after it is rendered
      if (expenseRef.current) {
        expenseRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 0);
  };

  const handleSetExpCat = (e) => {
    const value = e.target.value;
    // Capitalize the first letter
    const capitalizedValue =
      value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    setExpenseCategory(capitalizedValue);
  };

  const handleSubmitExpense = async () => {
    if (!expenseCategory || !expenseAmount || expenseAmount <= 0) {
      setAlertMessage("Please enter valid details for the expense.");
      return;
    }

    setIsLoading(true);

    try {
      if (!catIDs.includes(expenseCategory)) {
        setAlertMessage(
          "You have not set a budget for this category, so we cannot deduct your expense.",
        );
        return;
      }

      const userDocRef = doc(db, "users", user.uid);
      const monthCollectionRef = collection(userDocRef, selectedMonth);
      const budgetDocRef = doc(monthCollectionRef, "Budgets");
      const categoryCollectionRef = collection(budgetDocRef, "Category");
      const docRef = doc(categoryCollectionRef, expenseCategory);

      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        setAlertMessage(
          "Budget category does not exist. Please create it first.",
        );
        return;
      }

      const { Amount = 0, Expense = 0 } = docSnap.data();
      const newAmount = Math.max(Amount - Number(expenseAmount), 0); // Prevent negative amounts
      const newExpense = Expense + Number(expenseAmount);

      await updateDoc(docRef, { Remaining: newAmount, Expense: newExpense });

      setAlertMessage("Expense successfully recorded.");
    } catch (error) {
      console.error("Error submitting expense:", error);
      setAlertMessage(
        "An error occurred while submitting your expense. Please try again.",
      );
    } finally {
      setIsLoading(false);
      setShowExpense(false);
      setExpenseAmount("");
      setExpenseCategory("");
    }
  };

  return (
    <ExpenseContext.Provider
      value={{
        handleShowExpense,
        setShowExpense,
        showExpense,
        expenseCategory,
        setExpenseCategory,
        expenseAmount,
        setExpenseAmount,
        handleSubmitExpense,
        amountValue,
        setAmountValue,
        isSubmitExpense,
        setIsSubmitExpense,
        expenseRef,
        handleSetExpCat,
      }}
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
