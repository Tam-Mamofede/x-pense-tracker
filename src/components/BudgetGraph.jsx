import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { db } from "../../Config/firebase.config";
import { doc, collection, getDocs } from "firebase/firestore";
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
  Legend
);

function LineChart() {
  const { categories } = useBudget();
  const { user, selectedMonth } = useAuth();
  const [isEmpty, setIsEmpty] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Budget Amounts",
        data: [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  });

  useEffect(() => {
    if (categories?.length > 0) {
      const labels = categories.map((cat) => cat.Category);
      const data = categories.map((cat) => cat.Amount);

      setChartData({
        labels,
        datasets: [
          {
            label: "Budget Amounts",
            data,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 2,
            tension: 0.4,
          },
        ],
      });
    }
  }, [categories]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.uid || !selectedMonth) {
        console.error("User or selectedMonth is undefined");
        return;
      }

      try {
        const userDocRef = doc(db, "users", user.uid);
        const monthCollectionRef = collection(userDocRef, selectedMonth);
        const querySnapshot = await getDocs(monthCollectionRef);
        setIsEmpty(querySnapshot.empty);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [selectedMonth, user?.uid]);

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
