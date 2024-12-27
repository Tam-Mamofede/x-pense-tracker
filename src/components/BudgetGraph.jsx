import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { db } from "../../firebase.config";
import { doc, collection, getDocs, getDoc } from "firebase/firestore";
import { useBudget } from "../Contexts/BudgetContext";
import { useAuth } from "../Contexts/AuthContext";
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
  Legend,
);

function LineChart() {
  const { categories } = useBudget();
  const { user, selectedMonth } = useAuth();
  const [isEmpty, setIsEmpty] = useState(false);
  const [chartData, setChartData] = useState({});
  const [exAmt, setExAmt] = useState("");

  useEffect(() => {
    if (categories?.length > 0) {
      const labels = categories.map((cat) => cat.Category);
      const budgetData = categories.map((cat) => cat.Amount);

      setChartData({
        labels,
        datasets: [
          {
            label: "Budget Amounts",
            data: budgetData,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 2,
            tension: 0.4,
          },
          {
            label: "Expenses",
            data: exAmt, // Use the expenses array here
            borderColor: "rgba(255, 0, 0, 1)",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            borderWidth: 2,
            tension: 0.4,
          },
        ],
      });
    }
  }, [categories, exAmt]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.uid || !selectedMonth) {
        console.error("User or selectedMonth is undefined");
        return;
      }

      try {
        const userDocRef = doc(db, "users", user.uid);
        const monthCollectionRef = collection(userDocRef, selectedMonth);
        const budgetDocRef = doc(monthCollectionRef, "Budgets");
        const categoryCollectionRef = collection(budgetDocRef, "Category");
        const querySnapshot = await getDocs(categoryCollectionRef);
        setIsEmpty(querySnapshot.empty);
        console.log(querySnapshot.empty);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [selectedMonth, user?.uid]);

  useEffect(() => {
    const getExpenses = async () => {
      try {
        if (!categories?.length) return;

        // Loop through each category to fetch its expense
        const expenses = await Promise.all(
          categories.map(async (cat) => {
            const userDocRef = doc(db, "users", user.uid);
            const monthCollectionRef = collection(userDocRef, selectedMonth);
            const budgetDocRef = doc(monthCollectionRef, "Budgets");
            const categoryCollectionRef = collection(budgetDocRef, "Category");
            const docRef = doc(categoryCollectionRef, cat.Category); // Single category at a time
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              return docSnap.data().Expense;
            } else {
              console.warn(`No expense found for category: ${cat.Category}`);
              return 0; // Default value if no document
            }
          }),
        );

        setExAmt(expenses); // Set expenses as an array
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    getExpenses();
  }, [categories, user?.uid, selectedMonth]);

  if (isEmpty) return <p>Please create your budget to see your chart</p>;
  if (!chartData?.labels?.length)
    return <p>No data to load on the chart. Please add some categories.</p>;

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
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                display: false,
              },
              ticks: {
                stepSize: 50,
              },
            },
          },
        }}
      />
    </div>
  );
}

export default LineChart;
