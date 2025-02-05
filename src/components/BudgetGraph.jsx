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
  const { user, selectedMonth, darkmode } = useAuth();
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
            borderColor: `${darkmode ? "#e3f0af" : "#1f4529"}`,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 2,
            tension: 0.4,
          },
          {
            label: "Expenses",
            data: exAmt,
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            borderWidth: 2,
            tension: 0.4,
          },
        ],
      });
    }
  }, [categories, exAmt]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "center",
        labels: {
          boxWidth: 60,
          boxHeight: 40,
          padding: 10,
          usePointStyle: true,
          color: `${darkmode ? "#e3f0af" : "#1f4529"}`,
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: `${darkmode ? "#e3f0af" : "#1f4529"}`,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          stepSize: 1000,
          color: `${darkmode ? "#e3f0af" : "#1f4529"}`,
        },
      },
    },
  };

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
              return 0;
            }
          }),
        );

        setExAmt(expenses);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    getExpenses();
  }, [categories, user?.uid, selectedMonth]);

  if (isEmpty)
    return (
      <div className="mt-8 flex h-2/3 w-4/5 flex-col items-center justify-center space-y-6 p-4">
        <p
          className={`text-center font-extrabold ${darkmode ? "text-[#e3f0af]" : "text-[#1f4529]"}`}
        >
          Please create your budget to see your chart
        </p>
      </div>
    );
  if (!chartData?.labels?.length)
    return (
      <div className="flex h-2/3 w-4/5 flex-col items-center justify-center space-y-6 p-4">
        <p
          className={`text-center font-extrabold ${darkmode ? "text-[#e3f0af]" : "text-[#1f4529]"}`}
        >
          No data to load on the chart. Please add some categories.
        </p>
      </div>
    );

  return (
    <div className="mb-4 flex flex-col p-4">
      <div className="mt-4">
        <h2
          className={`whitespace-normal text-center text-[16px] font-extrabold lg:text-xl ${darkmode ? "text-[#e3f0af]" : "text-[#1f4529]"}`}
        >
          Budget for the month of {selectedMonth}
        </h2>
      </div>
      <div className="h-[300px] w-[380px] p-2 lg:h-[500px] lg:w-[650px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

export default LineChart;
