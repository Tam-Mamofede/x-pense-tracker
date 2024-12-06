export const getBudgetLineChartData = (categories) => ({
  labels: categories.map((item) => item.Category), //x-axis labels
  datasets: [
    {
      label: "Budget",
      data: categories.map((item) => item.Amount), //y-axis data points
    },
  ],
});
