// import React, { createContext, useContext, useState } from "react";
// import { useBudget } from "./BudgetContext";
// import { collection, doc, getDoc } from "firebase/firestore";
// import { db } from "../../Config/firebase.config";

// const ExpenseContext = createContext();

// function ExpenseProvider({ children }) {
//   const { fetchBudgetCat, catIDs } = useBudget();

//   const [showExpense, setShowExpense] = useState(false);
//   const [expenseCategory, setExpenseCategory] = useState("");
//   const [expenseAmount, setExpenseAmount] = useState(0);
//   const [amountValue, setAmountValue] = useState(0);
//   const [totalAmount, setTotalAmount] = useState();

//   const handleShowExpense = () => {
//     setShowExpense(true);
//   };

//   const handleSumbitExpense = async () => {
//     try {
//       const budgetCat = catIDs.map((cat) => cat);

//       if (budgetCat.includes(expenseCategory)) {
//         // Firestore document references
//         const userDocRef = doc(db, "users", uid); // Replace `uid` with actual user ID
//         const monthCollectionRef = collection(userDocRef, selectedMonth); // Replace `selectedMonth` with actual month
//         const budgetDocRef = doc(monthCollectionRef, "Budgets");
//         const categoryCollectionRef = collection(budgetDocRef, "Category");
//         const docRef = doc(categoryCollectionRef, expenseCategory);

//         // Fetch the document
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           const value = docSnap.data().Amount;
//           setAmountValue(value);
//           // Calculate new amount
//           const calcAmount = Number(AmountValue) - Number(expenseAmount);
//           setTotalAmount(calcAmount);

//           await updateDoc(docRef, {
//             "{expenseCategory}.Amount": { totalAmount },
//           });
//           // Reset fields
//           setExpenseAmount(0);
//           setExpenseCategory("");
//         } else {
//           alert("Budget category document does not exist.");
//         }
//       } else {
//         alert(
//           "You have not set a budget for this category, so we cannot deduct your expense"
//         );
//       }
//     } catch (error) {
//       console.error("Error submitting expense:", error);
//     } finally {
//       setShowExpense(false);
//     }
//   };

//   return (
//     <ExpenseContext.Provider
//       value={{
//         handleShowExpense,
//         setShowExpense,
//         showExpense,
//         expenseCategory,
//         setExpenseCategory,
//         expenseAmount,
//         setExpenseAmount,
//         handleSumbitExpense,
//         amountValue,
//       }}
//     >
//       {children}
//     </ExpenseContext.Provider>
//   );
// }

// function useExpense() {
//   const context = useContext(ExpenseContext);
//   if (context === undefined) {
//     throw new Error("useExpense must be used within an ExpenseProvider");
//   }
//   return context;
// }

// export { ExpenseProvider, useExpense };

import React, { createContext, useContext, useState } from "react";
import { useBudget } from "./BudgetContext";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../Config/firebase.config";

const ExpenseContext = createContext();

function ExpenseProvider({ children }) {
  const { fetchBudgetCat, catIDs } = useBudget();

  const [showExpense, setShowExpense] = useState(false);
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [amountValue, setAmountValue] = useState(0);

  const handleShowExpense = () => {
    setShowExpense(true);
  };

  const handleSumbitExpense = async () => {
    try {
      const budgetCat = catIDs.map((cat) => cat);

      if (budgetCat.includes(expenseCategory)) {
        // Firestore document references
        const userDocRef = doc(db, "users", user.uid); // Replace `uid` with actual user ID
        const monthCollectionRef = collection(userDocRef, selectedMonth); // Replace `selectedMonth` with actual month
        const budgetDocRef = doc(monthCollectionRef, "Budgets");
        const categoryCollectionRef = collection(budgetDocRef, "Category");
        const docRef = doc(categoryCollectionRef, expenseCategory);

        // Fetch the document
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const value = docSnap.data().Amount;

          // Calculate new amount
          const calcAmount = Number(value) - Number(expenseAmount);

          // Update Firestore with the new amount
          await updateDoc(docRef, {
            Amount: calcAmount,
          });

          // Reset fields
          setExpenseAmount(0);
          setExpenseCategory("");
          setAmountValue(calcAmount); // Optional: Update state if needed elsewhere
        } else {
          alert("Budget category document does not exist.");
        }
      } else {
        alert(
          "You have not set a budget for this category, so we cannot deduct your expense"
        );
      }
    } catch (error) {
      console.error("Error submitting expense:", error);
    } finally {
      setShowExpense(false);
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
        handleSumbitExpense,
        amountValue,
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
