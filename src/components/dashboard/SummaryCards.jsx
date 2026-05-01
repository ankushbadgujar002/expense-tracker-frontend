import { SquarePen } from 'lucide-react'
import React from 'react'

const SummaryCards = ({ totalBudget, totalSpent, remaining, carryForward, handleBudget }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 text-center">

            <div className="h-full flex flex-col relative bg-white dark:bg-black p-6 rounded-2xl shadow-sm dark:shadow-gray-400 hover:shadow-lg dark:hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-1">
                <h2 className="text-gray-500 dark:text-white font-bold">Total Budget</h2>

                <button onClick={handleBudget}>
                    <SquarePen size={18} className='absolute right-2.5 top-11 lg:top-11 lg:right-5 text-blue-400 cursor-pointer active:scale-125' />
                </button>

                <p className="text-3xl text-[#50a2ff] font-bold tracking-tight">
                    ₹ {totalBudget}
                </p>
            </div>

            <div className="h-full bg-white dark:bg-black p-6 rounded-2xl shadow-sm dark:shadow-gray-400 hover:shadow-lg dark:hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-1">
                <h2 className="text-gray-500 dark:text-white font-bold">Total Spent</h2>

                <p className={`text-3xl font-bold tracking-tight  
                    ${totalSpent > totalBudget
                        ? "text-red-600 dark:text-red-400"
                        : "text-red-400 dark:text-red-300"}`}>
                    ₹ {totalSpent}
                </p>
            </div>

            <div className="h-full bg-white dark:bg-black p-6 rounded-2xl shadow-sm dark:shadow-gray-400 hover:shadow-lg dark:hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-1">
                <h2 className="text-gray-500 dark:text-white font-bold">Remaining</h2>

                <p className={`text-3xl font-bold tracking-tight 
                    ${remaining < 0
                        ? "text-red-600 dark:text-red-400"
                        : "text-green-600 dark:text-green-400"}`}>
                    ₹ {remaining}
                </p>
            </div>

            <div className="h-full bg-white dark:bg-black p-6 rounded-2xl shadow-sm dark:shadow-gray-400 hover:shadow-lg dark:hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-1">
                <h2 className="text-gray-500 dark:text-white font-bold">Carry Forward</h2>

                <p className={`text-3xl font-bold tracking-tight 
                    ${carryForward > 0
                        ? "text-red-600 dark:text-red-400"
                        : "text-green-600 dark:text-green-400"}`}>
                    ₹ {carryForward}
                </p>
            </div>

        </div>
    )
}

export default SummaryCards