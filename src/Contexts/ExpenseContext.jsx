/* eslint-disable react/prop-types */
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { useBudget } from "./BudgetContext";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useAuth } from "./AuthContext";

const ExpenseContext = createContext();

function ExpenseProvider({ children }) {
  const { categories } = useBudget();
  const { user, selectedMonth, setAlertMessage, setIsLoading } = useAuth();
  const [showExpense, setShowExpense] = useState(false);
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [amountValue, setAmountValue] = useState();
  const [isSubmitExpense, setIsSubmitExpense] = useState(false);
  const [totalExpense, setTotalExpense] = useState(0);
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
      // Check if the expense category exists in the categories array
      const category = categories.find(
        (cat) => cat.Category === expenseCategory,
      );

      if (!category) {
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
      const newAmount = Amount - Number(expenseAmount);
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

  ////////////////////////////////////////

  useEffect(() => {
    if (categories && categories.length > 0) {
      const total = categories.reduce(
        (sum, category) => sum + (category.Expense || 0),
        0,
      );
      setTotalExpense(total);
    } else {
      setTotalExpense(0);
    }
  }, [categories]);

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
        totalExpense,
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
