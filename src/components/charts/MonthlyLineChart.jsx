import React from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts"

const MonthlyLineChart = ({ formattedData }) => {

    const isDark = document.documentElement.classList.contains("dark");

    const gridColor = isDark ? "#374151" : "#e5e7eb";
    const textColor = isDark ? "#e5e7eb" : "#374151";
    const tooltipBg = isDark ? "#1f2937" : "#ffffff";
    const tooltipText = isDark ? "#f9fafb" : "#111827";

    if (!formattedData || formattedData.length === 0) {
        return (
            <div className="bg-white dark:bg-black p-6 rounded-2xl shadow-sm
            border border-gray-100 dark:border-gray-700 text-center">
                <p className="text-gray-500 dark:text-white font-medium">
                    No monthly data
                </p>
            </div>
        )
    }

    return (
        <div className="bg-white dark:bg-black p-6 rounded-2xl shadow-sm hover:shadow-lg
        dark:shadow-gray-400 dark:hover:shadow-md transition-shadow duration-300
        border border-gray-100 dark:border-gray-700 hover:-translate-y-1 md:col-span-2 xl:col-span-1">

            <h2 className="text-gray-700 dark:text-white font-semibold tracking-wide text-lg mb-4 text-center">
                Monthly Expense Trend
            </h2>

            <div className="flex justify-center items-center w-full h-75">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={formattedData}>

                        <defs>
                            <linearGradient id="colorLine" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />

                        <XAxis
                            dataKey="monthName"
                            tick={{ fontSize: 12, fill: textColor }}
                        />

                        <YAxis tick={{ fill: textColor }} />

                        <Tooltip
                            formatter={(value) => `₹${value}`}
                            contentStyle={{
                                backgroundColor: tooltipBg,
                                color: tooltipText,
                                borderRadius: "10px",
                                border: "none"
                            }}
                        />

                        <Line
                            type="monotone"
                            dataKey="total"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            isAnimationActive={true}
                            animationDuration={1000}
                            dot={{ r: 4 }}
                            activeDot={{ r: 7 }}
                        />

                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default MonthlyLineChart