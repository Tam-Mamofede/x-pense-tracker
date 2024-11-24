// expense_data.js
export const monthlyExpenseData = {
  labels: [
    "Groceries",
    "Rent",
    "Transportation",
    "Miscellaneous",
    "Eating Out",
  ],
  datasets: [
    {
      label: "Amount", // Label for the dataset
      data: [1000, 5000, 10000, 15000, 20000], // Data points for each category
      borderColor: "red", // Color of the line
      backgroundColor: "rgba(255, 99, 132, 0.2)", // Fill color under the line
      tension: 0.1, // Line smoothness
    },
  ],
};
