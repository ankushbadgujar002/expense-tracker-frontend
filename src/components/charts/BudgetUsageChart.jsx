import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { categoryColors } from "../../utils/categoryColors";

const BudgetUsageChart = ({ categoryData, totalBudget }) => {

    const spent = categoryData.reduce((acc, item) => acc + item.value, 0);
    const remaining = totalBudget - spent;
    const percentage = Math.round((spent / totalBudget) * 100);

    const chartData = [
        ...categoryData,
        { name: "Remaining", value: remaining }
    ];

    return (
        <div className='mb-8'>
            <div className="flex flex-col items-center justify-center bg-white dark:bg-black p-6 rounded-2xl shadow-sm hover:shadow-lg
            dark:shadow-gray-400 dark:hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-1">
                <h2 className="text-gray-700 dark:text-white font-semibold tracking-wide text-lg mb-4 text-center">
                    Budget Usage Chart
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>

                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={110}
                            innerRadius={65}
                            cornerRadius={6}
                            paddingAngle={2}
                            isAnimationActive={true}
                            animationDuration={1200}
                            animationEasing="ease-out"
                        >

                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={
                                        entry.name === "Remaining"
                                            ? "#c5c7c9"
                                            : categoryColors[entry.name] || "#9ca3af"
                                    }
                                />
                            ))}

                        </Pie>

                        <text
                            x="50%"
                            y="45%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-sm fill-gray-500 dark:fill-gray-200"
                        >
                            Spent
                        </text>

                        <text
                            x="50%"
                            y="55%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-xl font-bold fill-gray-800 dark:fill-gray-200"
                        >
                            ₹ {spent}
                        </text>

                        <text
                            x="50%"
                            y="65%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="fill-blue-500 text-sm font-semibold"
                        >
                            {percentage}% used
                        </text>

                        <Tooltip />

                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default BudgetUsageChart;