import { SquarePen, Trash2, FileQuestion } from 'lucide-react';
import React from 'react'
import { categoryColors } from '../../utils/categoryColors';

const ExpenseTable = ({ processedExpenses, handleDelete, handleEdit }) => {

    if (!processedExpenses || processedExpenses.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <FileQuestion className="mx-auto size-12 mb-3 text-gray-400 dark:text-gray-500" />
                <p className="text-base font-medium">No expenses found matching your search or filters.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto w-full">
            <table className="w-full text-center border-collapse">

                <thead className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-white text-sm uppercase tracking-wide sticky top-0 z-10">
                    <tr className='border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition'>
                        <th className="p-2">Sr.No</th>
                        <th className="p-2">Title</th>
                        <th className="p-2">Amount</th>
                        <th className="p-2">Category</th>
                        <th className="p-2">Date</th>
                        <th className="p-2">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {processedExpenses.map((expense, index) => (

                        <tr key={expense.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition">

                            <td className="p-2">{index + 1}</td>

                            <td className="p-2 max-w-37.5 whitespace-nowrap">
                                {expense.title}
                            </td>

                            <td className="p-2 font-semibold text-gray-800 dark:text-white">
                                ₹ {Number(expense.amount).toLocaleString()}
                            </td>

                            <td className="p-2">
                                {(() => {
                                    const color = categoryColors[expense.category] || "#9ca3af";
                                    return (
                                        <span
                                            className="px-2 py-1 rounded-full text-xs font-medium"
                                            style={{
                                                backgroundColor: color + "20",
                                                color: color
                                            }}
                                        >
                                            {expense.category}
                                        </span>
                                    );
                                })()}
                            </td>

                            <td className="p-2 text-gray-600 dark:text-white">
                                {new Date(expense.date).toLocaleDateString()}
                            </td>

                            <td className="p-2">
                                <div className="flex items-center justify-center gap-4">

                                    <button
                                        title='delete expense'
                                        onClick={() => handleDelete(expense.id)}
                                    >
                                        <Trash2
                                            className="text-red-500 active:scale-125 cursor-pointer"
                                            size={20}
                                        />
                                    </button>

                                    <button
                                        title='edit expense'
                                        onClick={() => handleEdit(expense)}
                                    >
                                        <SquarePen
                                            className="text-blue-400 active:scale-125 cursor-pointer"
                                            size={20}
                                        />
                                    </button>

                                </div>
                            </td>

                        </tr>

                    ))}
                </tbody>

            </table>
        </div>
    )
}

export default ExpenseTable