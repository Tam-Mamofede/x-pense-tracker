// import React, { createContext, useState, useContext } from "react";

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [currentUserId, setCurrentUserId] = useState(null);

//   const selectUser = (userId) => {
//     setCurrentUserId(userId);
//   };

//   return (
//     <UserContext.Provider value={{ currentUserId, selectUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);
// //////////////////////////////////////////////
// import React, { createContext, useState, useContext } from "react";
// import { collection, doc, addDoc } from "firebase/firestore";
// import { db } from "../firebaseConfig"; // Replace with your Firestore initialization

// const BudgetContext = createContext();

// export const BudgetProvider = ({ children }) => {
//   const [currentMonth, setCurrentMonth] = useState(null);

//   const addBudget = async (userId, month) => {
//     try {
//       const userDocRef = doc(db, "Users", userId);
//       const budgetsCollectionRef = collection(userDocRef, "Budgets");
//       const monthDocRef = await addDoc(budgetsCollectionRef, { month });
//       setCurrentMonth(monthDocRef.id);
//     } catch (error) {
//       console.error("Error adding budget:", error);
//     }
//   };

//   return (
//     <BudgetContext.Provider value={{ currentMonth, addBudget }}>
//       {children}
//     </BudgetContext.Provider>
//   );
// };

// export const useBudget = () => useContext(BudgetContext);
// ////////////////////////////////////////////
// import React, { createContext, useState, useContext } from "react";

// const MonthContext = createContext();

// export const MonthProvider = ({ children }) => {
//   const [selectedMonth, setSelectedMonth] = useState(null);

//   const selectMonth = (monthId) => {
//     setSelectedMonth(monthId);
//   };

//   return (
//     <MonthContext.Provider value={{ selectedMonth, selectMonth }}>
//       {children}
//     </MonthContext.Provider>
//   );
// };

// export const useMonth = () => useContext(MonthContext);
// ///////////////////////////////////////////////////////
// import React, { createContext, useContext } from "react";
// import { collection, addDoc, doc } from "firebase/firestore";
// import { db } from "../firebaseConfig"; // Replace with your Firestore initialization
// import { useUser } from "./UserContext";
// import { useBudget } from "./BudgetContext";

// const CategoryContext = createContext();

// export const CategoryProvider = ({ children }) => {
//   const { currentUserId } = useUser();
//   const { currentMonth } = useBudget();

//   const addCategory = async (category, amount) => {
//     if (!currentUserId || !currentMonth) {
//       console.error("User or month not selected!");
//       return;
//     }

//     try {
//       const monthDocRef = doc(
//         db,
//         "Users",
//         currentUserId,
//         "Budgets",
//         currentMonth
//       );
//       const categoriesCollectionRef = collection(monthDocRef, "Categories");
//       await addDoc(categoriesCollectionRef, {
//         categoryName: category,
//         amount,
//         createdAt: new Date(),
//       });

//       console.log("Category added successfully!");
//     } catch (error) {
//       console.error("Error adding category:", error);
//     }
//   };

//   return (
//     <CategoryContext.Provider value={{ addCategory }}>
//       {children}
//     </CategoryContext.Provider>
//   );
// };

// export const useCategory = () => useContext(CategoryContext);
// ///////////////////////////////////////////////////
// import React from "react";
// import { UserProvider } from "./contexts/UserContext";
// import { BudgetProvider } from "./contexts/BudgetContext";
// import { MonthProvider } from "./contexts/MonthContext";
// import { CategoryProvider } from "./contexts/CategoryContext";

// const App = () => {
//   return (
//     <UserProvider>
//       <BudgetProvider>
//         <MonthProvider>
//           <CategoryProvider>
//             {/* Your Application Components */}
//           </CategoryProvider>
//         </MonthProvider>
//       </BudgetProvider>
//     </UserProvider>
//   );
// };

// export default App;
// /////////////////////////////////////////////////
// import React, { useState } from "react";
// import { useUser } from "./contexts/UserContext";
// import { useBudget } from "./contexts/BudgetContext";
// import { useCategory } from "./contexts/CategoryContext";

// const ExpenseManager = () => {
//   const { selectUser } = useUser();
//   const { addBudget } = useBudget();
//   const { addCategory } = useCategory();

//   const [userId, setUserId] = useState("");
//   const [month, setMonth] = useState("");
//   const [category, setCategory] = useState("");
//   const [amount, setAmount] = useState("");

//   const handleAddBudget = () => {
//     selectUser(userId);
//     addBudget(userId, month);
//   };

//   const handleAddCategory = () => {
//     addCategory(category, Number(amount));
//   };

//   return (
//     <div>
//       <h1>Expense Manager</h1>
//       <input
//         type="text"
//         placeholder="User ID"
//         value={userId}
//         onChange={(e) => setUserId(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Month"
//         value={month}
//         onChange={(e) => setMonth(e.target.value)}
//       />
//       <button onClick={handleAddBudget}>Add Budget</button>

//       <input
//         type="text"
//         placeholder="Category"
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//       />
//       <input
//         type="number"
//         placeholder="Amount"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       />
//       <button onClick={handleAddCategory}>Add Category</button>
//     </div>
//   );
// };

// export default ExpenseManager;
// //////////////////////////////////////////////
// Users (collection)
//   |
//   |-- user123(document)
//        |
//        |-- Budgets(collection)
//             |
//             |-- November-2024(document)
//                  |
//                  |-- Categories(collection)
//                       |
//                       |-- {CategoryID} (document)
//                            |-- categoryName: "Food"
//                            |-- amount: 500
//                            |-- createdAt: ...
