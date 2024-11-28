import React, { createContext, useContext, useEffect, useState } from "react";
import {
  doc,
  setDoc,
  collection,
  getDoc,
  deleteDoc,
  getDocs,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../../Config/firebase.config";
import { useAuth } from "./AuthContext";

const BudgetContext = createContext();

function BudgetProvider({ children }) {
  const { user } = useAuth();
  const [month, setMonth] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [budgets, setBudgets] = useState([]);
  const [currency, setCurrency] = useState("NGN");
  // const [savedMonth, setSavedMonth] = useState();
  const [isMonth, setIsMonth] = useState(false);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //Funcctin to set month

  const handleSetMonth = async () => {
    if (month) setIsMonth(true);
    const userDocRef = doc(db, "Users", `${user.uid}`);
    const monthCollectionRef = collection(userDocRef, ` ${month}`);
    await setDoc(monthCollectionRef, "Budgets");
  };
  // Function to store a budget in Firestore
  // const handleStoreBudget = async () => {
  //   try {
  //     if (!user) {
  //       alert("You must be logged in to create a budget.");
  //       return;
  //     }

  //     // Validate inputs
  //     if (!month || !category || isNaN(amount) || parseFloat(amount) <= 0) {
  //       alert(
  //         "Please provide valid inputs for month, category, and a positive amount."
  //       );
  //       return;
  //     }

  //     const budgetDocRef = doc(db, `users/${user.uid}/budgets`, `${month}`);
  // const monthDocRef = await addDoc(budgetDocRef, { month });

  //////working on how to create month collection
  // const budgetData = {
  //   month,
  //   category,
  //   amount: parseFloat(amount),
  //   currency,
  //   createdAt: new Date().toISOString(),
  // };

  // const docSnapshot = await getDoc(budgetDocRef);
  // if (docSnapshot.exists()) {
  //   alert("A budget for this month and category already exists.");
  //   return;
  // }

  // setBudgets((prev) => [
  //   ...prev,
  //   { id: `${month}-${category}`, ...budgetData },
  // ]);

  //     await setDoc(budgetDocRef);
  //     // await setDoc(budgetDocRef, budgetData);
  //     alert("Budget created successfully!");
  //   } catch (error) {
  //     console.error("Error saving budget:", error);

  //     setBudgets((prev) =>
  //       prev.filter((budget) => budget.id !== `${month}-${category}`)
  //     );

  //     alert("Failed to create the budget. Please try again.");
  //   }
  // };

  useEffect(() => {
    if (user) {
      const fetchBudgets = async () => {
        try {
          const querySnapshot = await getDocs(
            collection(db, `users/${user.uid}/budgets`)
          );
          const fetchedBudgets = [];
          querySnapshot.forEach((doc) => {
            fetchedBudgets.push({ id: doc.id, ...doc.data() });
          });
          setBudgets(fetchedBudgets);
        } catch (error) {
          console.error("Error fetching budgets:", error);
        }
      };
      fetchBudgets();
    }
  }, [user]);

  const handleDeleteEntry = async (budgetId) => {
    try {
      if (!user) {
        alert("You must be logged in to delete a budget.");
        return;
      }

      const budgetDocRef = doc(db, `users/${user.uid}/budgets`, budgetId);
      await deleteDoc(budgetDocRef);

      setBudgets((prev) => prev.filter((budget) => budget.id !== budgetId));
      alert("Budget deleted successfully!");
    } catch (error) {
      console.error("Error deleting budget:", error);
      alert("Failed to delete the budget. Please try again.");
    }
  };

  return (
    <BudgetContext.Provider
      value={{
        amount,
        setAmount,
        month,
        setMonth,
        category,
        setCategory,
        budgets,
        // handleStoreBudget,
        handleDeleteEntry,
        monthNames,
        handleSetMonth,
        isMonth,
        setIsMonth,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

function useBudget() {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }
  return context;
}

export { BudgetProvider, useBudget };
