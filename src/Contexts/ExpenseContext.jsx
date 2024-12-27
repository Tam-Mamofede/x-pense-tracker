/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState } from "react";
import { useBudget } from "./BudgetContext";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useAuth } from "./AuthContext";

const ExpenseContext = createContext();

function ExpenseProvider({ children }) {
  const { catIDs } = useBudget();
  const { user, selectedMonth } = useAuth();

  const [showExpense, setShowExpense] = useState(false);
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [amountValue, setAmountValue] = useState();
  const [isSubmitExpense, setIsSubmitExpense] = useState(false);

  const handleShowExpense = () => {
    setShowExpense(true);
  };

  const handleSubmitExpense = async () => {
    if (!expenseCategory || expenseCategory.trim() === "") {
      alert("Please select a valid category.");
      return;
    }
    if (!expenseAmount || expenseAmount <= 0) {
      alert("Please enter a valid expense amount.");
      return;
    }

    try {
      const budgetCat = catIDs.map((cat) => cat);

      if (budgetCat.includes(expenseCategory)) {
        const userDocRef = doc(db, "users", user.uid); // Replace `uid` with actual user ID
        const monthCollectionRef = collection(userDocRef, selectedMonth); // Replace `selectedMonth` with actual month
        const budgetDocRef = doc(monthCollectionRef, "Budgets");
        const categoryCollectionRef = collection(budgetDocRef, "Category");
        const docRef = doc(categoryCollectionRef, expenseCategory);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const value = docSnap.data().Amount;
          const calcAmount = Number(value) - Number(expenseAmount);

          if (docSnap.data().Expense) {
            const expenseData = docSnap.data();
            const previousAmount = Number(expenseData.Expense);
            const totalSpent = previousAmount + Number(expenseAmount);

            await updateDoc(
              docRef,
              { Amount: calcAmount, Expense: totalSpent },
              { merge: true },
            );
          } else {
            await updateDoc(docRef, {
              Amount: calcAmount,
              Expense: expenseAmount,
            });
          }
        } else {
          alert("Budget category document does not exist.");
        }
      } else {
        alert(
          "You have not set a budget for this category, so we cannot deduct your expense",
        );
      }
    } catch (error) {
      console.error("Error submitting expense:", error);
      alert(
        "An error occurred while submitting your expense. Please try again.",
      );
    } finally {
      setShowExpense(false);
      setExpenseAmount();
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
        setIsSubmitExpense,
        isSubmitExpense,
        setAmountValue,
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
