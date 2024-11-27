import React, { createContext, useContext, useEffect, useState } from "react";
import {
  doc,
  setDoc,
  collection,
  getDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../Config/firebase.config";
import { useAuth } from "../src/Contexts/AuthContext";

const BudgetContext = createContext();

function BudgetProvider({ children }) {
  const { user } = useAuth();
  const [month, setMonth] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [budgets, setBudgets] = useState([]);
  const [currency, setCurrency] = useState("NGN");

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
  // Function to store a budget in Firestore
  const handleStoreBudget = async () => {
    try {
      if (!user) {
        alert("You must be logged in to create a budget.");
        return;
      }

      // Validate inputs
      if (!month || !category || isNaN(amount) || parseFloat(amount) <= 0) {
        alert(
          "Please provide valid inputs for month, category, and a positive amount."
        );
        return;
      }

      const budgetDocRef = doc(
        db,
        `users/${user.uid}/budgets`,
        `${month}-${category}`
      );
      const budgetData = {
        month,
        category,
        amount: parseFloat(amount),
        currency,
        createdAt: new Date().toISOString(),
      };

      const docSnapshot = await getDoc(budgetDocRef);
      if (docSnapshot.exists()) {
        alert("A budget for this month and category already exists.");
        return;
      }

      setBudgets((prev) => [
        ...prev,
        { id: `${month}-${category}`, ...budgetData },
      ]);

      await setDoc(budgetDocRef, budgetData);

      alert("Budget created successfully!");
    } catch (error) {
      console.error("Error saving budget:", error);

      setBudgets((prev) =>
        prev.filter((budget) => budget.id !== `${month}-${category}`)
      );

      alert("Failed to create the budget. Please try again.");
    }
  };

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

  // Currency options
  const currencies = [
    { code: "USD", symbol: "$" },
    { code: "EUR", symbol: "€" },
    { code: "GBP", symbol: "£" },
    { code: "INR", symbol: "₹" },
    { code: "JPY", symbol: "¥" },
    { code: "NGN", symbol: "₦" },
  ];

  const formatAmount = (amount, currencyCode) => {
    if (!amount || isNaN(amount)) return;

    // Ensure a valid currency code is provided (e.g., 'NGN', 'USD')
    const validCurrencyCode = currencyCode || "NGN"; // Default to NGN if not provided

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: validCurrencyCode, // Use the valid currency code (e.g., 'NGN', 'USD')
      currencyDisplay: "symbol", // Display the symbol
    }).format(amount);
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
        handleStoreBudget,
        formatAmount,
        currency,
        setCurrency,
        currencies,
        monthNames,
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
