import React, { createContext, useContext, useState } from "react";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../Config/firebase.config";
import { useAuth } from "./AuthContext";

const BudgetContext = createContext;

function BudgetContext({ children }) {
  const [month, setMonth] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  // Function to store a budget in Firestore
  const storeBudget = async () => {
    try {
      if (!user) {
        alert("You must be logged in to create a budget.");
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
        amount: parseFloat(amount), // Ensure it's stored as a number
        createdAt: new Date().toISOString(), // Add timestamp
      };

      await setDoc(budgetDocRef, budgetData);
      setBudgets((prev) => [
        ...prev,
        { id: `${month}-${category}`, ...budgetData },
      ]);
      alert("Budget created successfully!");
    } catch (error) {
      console.error("Error saving budget:", error);
      alert("Failed to create the budget. Please try again.");
    }
    //CREATE HANDLESUBMIT FUNCTION
    //FIND A BETTER WAY TO STORE CATEGORY AND AMOUNT AS FIELD'S AND EDIT THEM IN THE FUTURE
  };
  return (
    <div>
      <BudgetContext.Provider
        value={{
          amount,
          setAmount,
          month,
          setMonth,
          category,
          setCategory,
        }}
      >
        {children}
      </BudgetContext.Provider>
    </div>
  );
}

function useBudget() {
  context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }
  return context;
}

export default BudgetContext;
