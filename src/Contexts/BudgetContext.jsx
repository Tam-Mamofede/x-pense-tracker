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
import { auth, db } from "../../Config/firebase.config";
import { useAuth } from "./AuthContext";
import { onAuthStateChanged } from "firebase/auth";

const BudgetContext = createContext();

function BudgetProvider({ children }) {
  const { user, setUser, selectedMonth, isAuthenticated } = useAuth();
  const [month, setMonth] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [budgets, setBudgets] = useState([]);
  const [currency, setCurrency] = useState("NGN");
  const [isMonth, setIsMonth] = useState(false);
  const [categories, setCategories] = useState([]);
  // const [spent, setSpent] = useState();

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

  const handleSetMonth = () => {
    if (!month) {
      console.error("Month is not set!");
      return;
    }
    setIsMonth(true);
  };

  const fetchCategories = async (uid) => {
    if (!selectedMonth) {
      console.error("No month selected.");
      return;
    }

    if (!user || !user.uid) {
      console.error("User is not logged in.");
      return;
    }

    try {
      const userDocRef = doc(db, "users", uid);
      const monthCollectionRef = collection(userDocRef, selectedMonth);
      const budgetDocRef = doc(monthCollectionRef, "Budgets");
      const categoryCollectionRef = collection(budgetDocRef, "Category");
      const categorySnapshot = await getDocs(categoryCollectionRef);
      const categoryList = categorySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCategories(categoryList);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSetBudget = async () => {
    if (!user || !user.uid) {
      console.error("No user is logged in. Ensure the user is authenticated.");
      return;
    }
    try {
      const userDocRef = doc(db, "users", user.uid);
      const monthCollectionRef = collection(userDocRef, month);
      const budgetDocRef = doc(monthCollectionRef, "Budgets");
      const categoryCollectionRef = collection(budgetDocRef, "Category");
      const categoryDocRef = doc(categoryCollectionRef, category);

      if (!amount || isNaN(amount)) {
        throw new Error("Amount is not valid. Please provide a number.");
      }

      await setDoc(categoryDocRef, {
        createdAt: new Date(),
        Category: category,
        Amount: Number(amount),
      }); // Refresh the list after setting the budget
      console.log("Budgets document created successfully!");
    } catch (error) {
      console.error("Error creating budgets document:", error);
    }
  };

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user && user.uid && selectedMonth) {
        fetchCategories(user.uid);
      }
    });
    return () => unsubscribe();
  }, [selectedMonth, user]);

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
        // handleDeleteEntry,
        monthNames,
        handleSetMonth,
        handleSetBudget,
        isMonth,
        setIsMonth,
        categories,
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
