/* eslint-disable react/react-in-jsx-scope */
import { Line } from "react-chartjs-2";
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
import { monthlyExpenseData } from "../expense_data";

// Registering necessary components for ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineGraph() {
  // Chart.js options (customize as needed)
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Monthly Expense Breakdown", // Title of the chart
      },
      tooltip: {
        mode: "index",
        intersect: false, // Tooltips will show for all points in the same category
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Expense Categories", // X-axis label
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount", // Y-axis label
        },
        beginAtZero: true, // Ensure the Y-axis starts at 0
      },
    },
  };

  // Using the data provided from monthlyExpenseData
  const data = {
    labels: monthlyExpenseData.labels, // Categories like "Groceries", "Rent"
    datasets: [
      {
        label: "Amount", // Label for the dataset
        data: monthlyExpenseData.datasets[0].data, // Expense values
        borderColor: monthlyExpenseData.datasets[0].borderColor, // Line color
        backgroundColor: monthlyExpenseData.datasets[0].backgroundColor, // Background fill color under the line
        tension: monthlyExpenseData.datasets[0].tension, // Line smoothness
      },
    ],
  };

  // Return the Line component to render the chart
  return <Line options={options} data={data} />;
}

export default LineGraph;
