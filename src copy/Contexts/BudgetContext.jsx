// import React, { createContext, useContext, useState } from "react";
// import {
//   doc,
//   setDoc,
//   collection,
//   getDocs,
//   deleteDoc,
// } from "firebase/firestore";
// import { db } from "../../Config/firebase.config";
// import { useAuth } from "./AuthContext";

// const BudgetContext = createContext();

// function BudgetProvider({ children }) {
//   const { user } = useAuth();
//   const [month, setMonth] = useState("");
//   const [category, setCategory] = useState("");
//   const [amount, setAmount] = useState("");
//   const [budgets, setBudgets] = useState([]); // Store fetched budgets

//   // Function to store a budget in Firestore
//   const storeBudget = async () => {
//     try {
//       if (!user) {
//         alert("You must be logged in to create a budget.");
//         return;
//       }
//       const budgetDocRef = doc(
//         db,
//         `users/${user.uid}/budgets`,
//         `${month}-${category}`
//       );
//       const budgetData = {
//         month,
//         category,
//         amount: parseFloat(amount), // Ensure it's stored as a number
//         createdAt: new Date().toISOString(), // Add timestamp
//       };

//       await setDoc(budgetDocRef, budgetData);
//       setBudgets((prev) => [
//         ...prev,
//         { id: `${month}-${category}`, ...budgetData },
//       ]);
//       alert("Budget created successfully!");
//     } catch (error) {
//       console.error("Error saving budget:", error);
//       alert("Failed to create the budget. Please try again.");
//     }
//   };

//   // Form submission handler
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!month || !category || isNaN(amount) || amount <= 0) {
//       alert("Please fill out all fields correctly.");
//       return;
//     }
//     storeBudget();
//   };

//   // Fetch all budgets for the logged-in user
//   const fetchBudgets = async () => {
//     try {
//       const budgetCollection = collection(db, `users/${user.uid}/budgets`);
//       const budgetSnapshot = await getDocs(budgetCollection);
//       const budgetList = budgetSnapshot.docs.map((entry) => ({
//         id: entry.id,
//         ...entry.data(),
//       }));
//       setBudgets(budgetList);
//     } catch (error) {
//       console.error("Error fetching budgets:", error);
//     }
//   };

//   const deleteEntry = async (id) => {
//     try {
//       if (!user) {
//         alert("You must be logged in to delete a budget.");
//         return;
//       }
//       const budgetDoc = doc(db, `users/${user.uid}/budgets`, id);
//       await deleteDoc(budgetDoc);
//       alert("Budget entry deleted successfully.");
//       setBudgets((prev) => prev.filter((budget) => budget.id !== id));
//     } catch (error) {
//       console.error("Error deleting budget entry:", error);
//       alert("Failed to delete the budget. Please try again.");
//     }
//   };
//   return (
//     <BudgetContext.Provider
//       value={{
//         month,
//         setMonth,
//         category,
//         setCategory,
//         amount,
//         setAmount,
//         onSubmit: handleSubmit,
//         fetchBudgets,
//         budgets,
//         deleteEntry,
//       }}
//     >
//       {children}
//     </BudgetContext.Provider>
//   );
// }

// // Custom hook for using the Budget context
// function useBudget() {
//   const context = useContext(BudgetContext);
//   if (context === undefined) {
//     throw new Error("useBudget must be used within a BudgetProvider");
//   }
//   return context;
// }

// export { BudgetProvider, useBudget };
