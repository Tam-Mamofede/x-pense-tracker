import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useBudget } from "../Contexts/BudgetContext";
import { getBudgetLineChartData } from "../../Config/chartConfig";
import { doc, listCollections } from "firebase/firestore";
function BudgetChart() {
  const { month, categories } = useBudget();
  const [chartData, setChartData] = useState(
    getBudgetLineChartData(categories)
  );

  //  const userDocRef = doc(db, "users", uid);
  //     const monthCollectionRef = collection(userDocRef, selectedMonth);
  //     const budgetDocRef = doc(monthCollectionRef, "Budgets");
  //     const categoryCollectionRef = collection(budgetDocRef, "Category");
  //     const categorySnapshot = await getDocs(categoryCollectionRef);
  //     const categoryList = categorySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));

  // Get the subcollection IDs within a document
  const fetchSubcollectionIDs = async (documentPath) => {
    try {
      const userDocRef = doc(db, "users", uid);
      const monthCollectionRef = collection(userDocRef, selectedMonth);
      const subcollectionIDs = monthCollectionRef.map(
        (subcollection) => subcollection.id
      );
      console.log("Subcollection IDs:", subcollectionIDs);
      return subcollectionIDs;
    } catch (error) {
      console.error("Error fetching subcollections:", error);
      return [];
    }
  };

  // Example usage
  fetchSubcollectionIDs("users/someUserId");

  useEffect(() => {
    // Update the char+t when categories change
    setChartData(getBudgetLineChartData(categories));
  }, [categories]);

  return (
    <div>
      <h2>Budget Line Chart</h2>
      <Line data={chartData} />
    </div>
  );
}

export default BudgetChart;
