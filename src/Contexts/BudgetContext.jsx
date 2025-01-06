/* eslint-disable react/prop-types */
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  doc,
  setDoc,
  collection,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import { useAuth } from "./AuthContext";
import { onAuthStateChanged } from "firebase/auth";

const BudgetContext = createContext();

function BudgetProvider({ children }) {
  const [month, setMonth] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [isMonth, setIsMonth] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isBudget, setIsBudget] = useState(false);
  const [catIDs, setCatIDs] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [totalBudget, setTotalBudget] = useState(0);
  const {
    user,
    setUser,
    selectedMonth,
    setSelectedMonth,
    setIsLoading,
    setAlertMessage,
  } = useAuth();

  //////////////////////////////////////
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

  //////////////////////////////////////////////////////
  const handleSetMonth = () => {
    if (!month) {
      console.error("Month is not set!");
      return;
    }
    setIsMonth(true);
    setSelectedMonth(month);
  };
  /////////////////////////////////////////////

  const handleSetCategory = (e) => {
    const value = e.target.value;
    // Capitalize the first letter
    const capitalizedValue =
      value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    setCategory(capitalizedValue);
  };

  /////////////////////////////////////////////////////
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
  /////////////////////////////////////////////////

  const handleMonthInput = (e) => {
    const value = e.target.value;
    // Capitalize the first letter
    const capitalizedValue =
      value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    setMonth(capitalizedValue);
  };

  ////////////////////////////////////////

  const handleToggleDelBtn = () => {
    showButton === false ? setShowButton(true) : setShowButton(false);
  };
  ///////////////////////////////////////////////////////
  const handleSetBudget = async (event) => {
    setIsLoading(true);

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

      setIsBudget(true);
      console.log("Budgets document created successfully!");

      setCategory("");
      setAmount("");
      setPopupOpen(false);
    } catch (error) {
      console.error("Error creating budgets document:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //////////////////////////////////////////////////
  const debounce = (func, delay) => {
    let timer; // Timer to track the delay
    return (...args) => {
      clearTimeout(timer); // Clear the existing timer if the function is called again
      timer = setTimeout(() => func(...args), delay); // Set a new timer to execute the function after the delay
    };
  };
  const debouncedFetchCategories = debounce(fetchCategories, 500);

  useEffect(() => {
    if (user && user.uid && selectedMonth) {
      debouncedFetchCategories(user.uid); // Use the debounced version
    }
  }, [selectedMonth, user]);

  /////////////////////////////////////////////////////////////////////////////
  const handleDeleteEntry = async (docId) => {
    setIsLoading(true);
    try {
      const userDocRef = doc(db, "users", user.uid);
      const monthCollectionRef = collection(userDocRef, selectedMonth);
      const budgetDocRef = doc(monthCollectionRef, "Budgets");
      const categoryCollectionRef = collection(budgetDocRef, "Category");
      const catDocRef = doc(categoryCollectionRef, docId);
      await deleteDoc(catDocRef);

      setCategories((prevItems) => prevItems.filter((item) => item !== docId));
      setShowButton(false);
    } catch (error) {
      console.error("Error deleting field:", error);
    } finally {
      setIsLoading(false);
    }
  };

  ///////////////////////////////////////////////////////////////////
  //change month anywhere in app
  const handleChangeMonth = () => {
    setIsLoading(true);
    const inputedMonth = prompt("Type in a month (e.g., January):");

    if (inputedMonth) {
      const formattedMonth =
        inputedMonth.charAt(0).toUpperCase() +
        inputedMonth.slice(1).toLowerCase();
      if (monthNames.includes(formattedMonth)) {
        setSelectedMonth(formattedMonth);
      } else {
        setAlertMessage("Invalid month name. Please try again.");
      }
    } else {
      setAlertMessage("Please input a month.");
    }

    setIsLoading(false);
  };

  //////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user && user.uid && selectedMonth) {
        fetchCategories(user.uid);
      }
    });
    return () => unsubscribe();
  }, [selectedMonth, user, categories]);

  ///////////////////////////////////////////
  useEffect(() => {
    const fetchDocIDs = async () => {
      if (!user || !user.uid) {
        console.error("User is not logged in.");
        return;
      }

      try {
        const userDocRef = doc(db, "users", user.uid);
        const monthCollectionRef = collection(userDocRef, selectedMonth);
        const budgetDocRef = doc(monthCollectionRef, "Budgets");
        const categoryCollectionRef = collection(budgetDocRef, "Category");
        const querySnapshot = await getDocs(categoryCollectionRef);
        const ids = querySnapshot.docs.map((doc) => doc.id);
        setCatIDs(ids);
      } catch (error) {
        console.error("Error fetching document IDs:", error);
      }
    };

    if (user && user.uid && selectedMonth) {
      fetchDocIDs();
    }
  }, [user, selectedMonth]);

  //////////////////////////////////////////

  useEffect(() => {
    if (categories && categories.length > 0) {
      const total = categories.reduce(
        (sum, category) => sum + (category.Amount || 0),
        0,
      );
      setTotalBudget(total);
    } else {
      setTotalBudget(0);
    }
  }, [categories]);

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
        catIDs,
        handleMonthInput,
        handleSetCategory,
        isBudget,
        popupOpen,
        setPopupOpen,
        setSelectedMonth,
        handleToggleDelBtn,
        showButton,
        totalBudget,
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
