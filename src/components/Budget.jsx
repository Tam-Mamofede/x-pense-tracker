import React, { useEffect } from "react";
import { useBudget } from "../Contexts/BudgetContext";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../Config/firebase.config";

function Budget() {
  const { month, handleDeleteEntry, categories, setMonth } = useBudget();
  const { user, selectedMonth } = useAuth();

  // const fetchMonth = async (uid) => {
  //   if (!user || !user.uid) {
  //     console.error("User is not logged in.");
  //     return;
  //   }

  //   try {
  //     const userDocRef = doc(db, "users", user.uid);
  //     const monthCollectionRef = collection(userDocRef, selectedMonth);
  //     const monthSnapshot = await getDocs(monthCollectionRef);
  //     const selectedMonth = monthSnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //     }));

  //     setMonth(selectedMonth);
  //   } catch (error) {
  //     console.error("Error fetching categories:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchMonth(user.uid);
  // }, [user]);

  return (
    <>
      <div>
        <h1>This is your budget for {selectedMonth}</h1>
      </div>
      <ul>
        {categories.map((categoryItem) => (
          <li key={categoryItem.id}>
            {categoryItem.category}: ${categoryItem.amount}{" "}
            <button onClick={() => handleDeleteEntry(categoryItem.id)}>
              Delete entry
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Budget;
