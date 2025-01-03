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

  // const handleSubmitExpense = async () => {
  //   if (!expenseCategory || expenseCategory.trim() === "") {
  //     setAlertMessage("Please select a valid category.");
  //     return;
  //   }
  //   if (!expenseAmount || expenseAmount <= 0) {
  //     setAlertMessage("Please enter a valid expense amount.");
  //     return;
  //   }

  //   try {
  //     const budgetCat = catIDs.map((cat) => cat);

  //     if (budgetCat.includes(expenseCategory)) {
  //       const userDocRef = doc(db, "users", user.uid);
  //       const monthCollectionRef = collection(userDocRef, selectedMonth);
  //       const budgetDocRef = doc(monthCollectionRef, "Budgets");
  //       const categoryCollectionRef = collection(budgetDocRef, "Category");
  //       const docRef = doc(categoryCollectionRef, expenseCategory);
  //       const docSnap = await getDoc(docRef);

  //       if (docSnap.exists()) {
  //         const value = docSnap.data().Amount;
  //         const calcAmount = Number(value) - Number(expenseAmount);

  //         if (docSnap.data().Expense) {
  //           const expenseData = docSnap.data();
  //           const previousAmount = Number(expenseData.Expense);
  //           const totalSpent = previousAmount + Number(expenseAmount);

  //           await updateDoc(
  //             docRef,
  //             { Amount: calcAmount, Expense: totalSpent },
  //             { merge: true },
  //           );
  //         } else {
  //           await updateDoc(docRef, {
  //             Amount: calcAmount,
  //             Expense: expenseAmount,
  //           });
  //         }
  //       } else {
  //         setAlertMessage("Budget category document does not exist.");
  //       }
  //     } else {
  //       setAlertMessage(
  //         "You have not set a budget for this category, so we cannot deduct your expense.",
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error submitting expense:", error);
  //     setAlertMessage(
  //       "An error occurred while submitting your expense. Please try again.",
  //     );
  //   } finally {
  //     setShowExpense(false);
  //     setExpenseAmount();
  //     setExpenseCategory("");
  //   }
  // };

  const handleSubmitExpense = async () => {
    if (!expenseCategory || !expenseAmount || expenseAmount <= 0) {
      setAlertMessage("Please enter valid details for the expense.");
      return;
    }

    setIsLoading(true);

    try {
      const budgetCat = catIDs.map((cat) => cat);

      if (budgetCat.includes(expenseCategory)) {
        const userDocRef = doc(db, "users", user.uid);
        const monthCollectionRef = collection(userDocRef, selectedMonth);
        const budgetDocRef = doc(monthCollectionRef, "Budgets");
        const categoryCollectionRef = collection(budgetDocRef, "Category");
        const docRef = doc(categoryCollectionRef, expenseCategory);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setAlertMessage(
            "Budget category does not exist. Initializing the category.",
          );
          await setDoc(docRef, { Amount: 0, Expense: 0 });
        }

        const currentAmount = docSnap.data().Amount || 0;
        const currentExpense = docSnap.data().Expense || 0;
        const calcAmount = currentAmount - Number(expenseAmount);

        await updateDoc(docRef, {
          Amount: Math.max(calcAmount, 0), // Prevent negative amounts
          Expense: currentExpense + Number(expenseAmount),
        });

        setAlertMessage("Expense successfully recorded.");
      } else {
        setAlertMessage(
          "You have not set a budget for this category, so we cannot deduct your expense.",
        );
      }
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
