// import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
// import { useBudget } from "../Contexts/BudgetContext";
// import { getBudgetLineChartData } from "../../Config/chartConfig";
// import { doc, listCollections } from "firebase/firestore";
// function BudgetChart() {
//   const { month, categories } = useBudget();
//   const [chartData, setChartData] = useState(
//     getBudgetLineChartData(categories)
//   );

//   // const userDocRef = doc(db, "users", uid);
//   // const monthCollectionRef = collection(userDocRef, selectedMonth);
//   //     const budgetDocRef = doc(monthCollectionRef, "Budgets");
//   //     const categoryCollectionRef = collection(budgetDocRef, "Category");
//   //     const categorySnapshot = await getDocs(categoryCollectionRef);
//   //     const categoryList = categorySnapshot.docs.map((doc) => ({
//   //       id: doc.id,
//   //       ...doc.data(),
//   //     }));

//   // Get the subcollection IDs within a document
//   const fetchSubcollectionIDs = async (documentPath) => {
//     try {
//       const userDocRef = doc(db, "users", uid);
//       const monthCollectionRef = collection(userDocRef, selectedMonth);
//       const subcollectionIDs = monthCollectionRef.map(
//         (subcollection) => subcollection.id
//       );
//       console.log("Subcollection IDs:", subcollectionIDs);
//       return subcollectionIDs;
//     } catch (error) {
//       console.error("Error fetching subcollections:", error);
//       return [];
//     }
//   };

//   // Example usage
//   fetchSubcollectionIDs("users/someUserId");

//   useEffect(() => {
//     // Update the char+t when categories change
//     setChartData(getBudgetLineChartData(categories));
//   }, [categories]);

//   return (
//     <div>
//       <h2>Budget Line Chart</h2>
//       <Line data={chartData} />
//     </div>
//   );
// }

// export default BudgetChart;

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useBudget } from "../Contexts/BudgetContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart() {
  const { categories } = useBudget();
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (categories && categories.length > 0) {
      const labels = categories.map((cat) => cat.Category); // X-axis: Categories
      const data = categories.map((cat) => cat.Amount); // Y-axis: Amounts

      setChartData({
        labels,
        datasets: [
          {
            label: "Budget Amounts",
            data,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 2,
            tension: 0.4, // Smooth curves
          },
        ],
      });
    }
  }, [categories]);

  if (!chartData) return <p>Loading chart...</p>;

  return (
    <div>
      <h2>Budget Overview</h2>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Monthly Budget by Category",
            },
            scales: {
              x: {
                grid: {
                  display: false, // Show/hide grid lines
                  // color: "rgba(200, 200, 200, 0.5)", // Color of grid lines
                },
                // ticks: {
                //   color: "#000", // Label color
                //   font: {
                //     size: 12, // Font size of labels
                //   },
                // },
              },
              y: {
                beginAtZero: true, // Ensures the Y-axis starts at zero
                grid: {
                  display: false,
                },
                ticks: {
                  stepSize: 50, // Fixed steps on the axis
                },
              },
            },
          },
        }}
      />
    </div>
  );
}

export default LineChart;
