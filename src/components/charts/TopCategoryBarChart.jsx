import {
    BarChart, Bar, XAxis, YAxis, Tooltip,
    ResponsiveContainer, CartesianGrid, LabelList, Cell
} from "recharts"
import { categoryColors } from "../../utils/categoryColors"

const TopCategoryBarChart = ({ data }) => {

    const isDark = document.documentElement.classList.contains("dark");

    const gridColor = isDark ? "#374151" : "#e5e7eb";
    const textColor = isDark ? "#e5e7eb" : "#374151";
    const tooltipBg = isDark ? "#1f2937" : "#ffffff";
    const tooltipText = isDark ? "#f9fafb" : "#111827";

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

    const sortedData = [...data]
        .map(item => ({
            category: item.name.toUpperCase(),
            amount: item.value
        }))
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5)

    return (
        <div className="bg-white dark:bg-black rounded-2xl shadow-sm hover:shadow-lg
            dark:shadow-gray-400 dark:hover:shadow-md transition-shadow duration-300
            border border-gray-100 dark:border-gray-700 hover:-translate-y-1">

            <h2 className="text-gray-700 dark:text-white font-semibold tracking-wide md:text-md lg:text-lg m-4 text-center">
                Top Spending Category Bar Chart
            </h2>

            <div className="w-full h-75 px-4 pb-4">

                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={sortedData}
                        layout="vertical"
                        margin={{ top: 20, right: 80, left: 0, bottom: 10 }}
                    >

                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />

                        <XAxis type="number" tick={{ fill: textColor, fontSize: 12 }} />

                        <YAxis
                            dataKey="category"
                            type="category"
                            width={120}
                            tick={{ fill: textColor, fontSize: 12 }}
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: tooltipBg,
                                color: tooltipText,
                                borderRadius: "10px",
                                border: "none"
                            }}
                        />

                        <Bar
                            dataKey="amount"
                            radius={[0, 10, 10, 0]}
                            animationDuration={1200}
                        >
                            {sortedData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={categoryColors?.[entry.category] || "#9ca3af"}
                                />
                            ))}

                            <LabelList
                                dataKey="amount"
                                position="right"
                                formatter={(value) => `₹${value}`}
                            />
                        </Bar>

                    </BarChart>
                </ResponsiveContainer>

            </div>
        </div>
    )
}

export default TopCategoryBarChart