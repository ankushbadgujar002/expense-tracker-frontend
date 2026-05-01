import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { categoryColors } from "../../utils/categoryColors"

ChartJS.register(ArcElement, Tooltip, Legend)

const CategoryPieChart = ({ data }) => {

  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-black p-6 rounded-2xl shadow-sm
border border-gray-100 dark:border-gray-700 text-center">
        <p className="text-gray-500 dark:text-white font-medium">
          No category data
        </p>
      </div>
    )
  }

  const sortedData = data
    .map(item => ({
      name: item.name.toUpperCase(),
      value: item.value
    }))
    .sort((a, b) => b.value - a.value)

  const topFive = sortedData.slice(0, 5)

  const othersValue = sortedData
    .slice(5)
    .reduce((sum, item) => sum + item.value, 0)

  if (othersValue > 0) {
    topFive.push({ name: "OTHERS", value: othersValue })
  }

  const total = topFive.reduce((sum, item) => sum + item.value, 0)

  const chartData = {
    labels: topFive.map(item => item.name),
    datasets: [{
      label: "Expenses",
      data: topFive.map(item => item.value),
      backgroundColor: topFive.map(item =>
        categoryColors[item.name] || "#9ca3af"
      ),
      borderWidth: 2,
      borderColor: "#ffffff",
      hoverOffset: 12
    }]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 15,
          boxWidth: 12,
          font: { size: 11 }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw
            const percentage = ((value / total) * 100).toFixed(1)
            return `₹${value} (${percentage}%)`
          }
        }
      }
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000
    }
  }

  return (
    <div className="bg-white dark:bg-black p-6 rounded-2xl shadow-sm hover:shadow-lg
    dark:shadow-gray-400 dark:hover:shadow-md transition-shadow duration-300
    border border-gray-100 dark:border-gray-700 hover:-translate-y-1">

      <h2 className="text-gray-700 dark:text-white font-semibold tracking-wide text-lg mb-4 text-center">
        Category Pie Chart
      </h2>

      <div className="flex justify-center items-center w-full h-75">
        <Pie data={chartData} options={options} />
      </div>

    </div>
  )
}

export default CategoryPieChart