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
  const { user, setUser, selectedMonth, setSelectedMonth } = useAuth();
  const [month, setMonth] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [isMonth, setIsMonth] = useState(false);
  const [categories, setCategories] = useState([]);
  const [setBudget, setSetBudget] = useState(false);
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
    setSelectedMonth(month);
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

  const handleSetBudget = async (event) => {
    event.preventDefault();
    if (!user || !user.uid) {
      console.error("No user is logged in. Ensure the user is authenticated.");
      return;
    }
    try {
      const userDocRef = doc(db, "users", user.uid);
      const monthCollectionRef = collection(userDocRef, month || selectedMonth);
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

      setSetBudget(true);
      console.log("Budgets document created successfully!");

      setCategory("");
      setAmount("");
    } catch (error) {
      console.error("Error creating budgets document:", error);
    }
  };

  const handleDeleteEntry = async (docId) => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const monthCollectionRef = collection(userDocRef, selectedMonth);
      const budgetDocRef = doc(monthCollectionRef, "Budgets");
      const categoryCollectionRef = collection(budgetDocRef, "Category");
      const catDocRef = doc(categoryCollectionRef, docId);
      await deleteDoc(catDocRef);

      setCategories((prevItems) => prevItems.filter((item) => item !== docId));

      console.log(`${docId} has been deleted successfully`);
    } catch (error) {
      console.error("Error deleting field:", error);
    }
  };
  //change month anywhere in app
  const handleChangeMonth = () => {
    const inputedMonth = prompt("Which month do you want to see?");
    {
      inputedMonth
        ? setSelectedMonth(inputedMonth)
        : alert("Please input the month you would like to see.");
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
  }, [selectedMonth, user, categories]);

  return (
    <BudgetContext.Provider
      value={{
        amount,
        setAmount,
        month,
        setMonth,
        category,
        setCategory,
        monthNames,
        handleSetMonth,
        handleSetBudget,
        isMonth,
        setIsMonth,
        categories,
        setCategories,
        handleDeleteEntry,
        handleChangeMonth,
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
