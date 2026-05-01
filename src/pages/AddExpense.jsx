import React from 'react'
import ExpenseForm from '../components/ExpenseForm'

const AddExpense = () => {
    return (
        <>
            <h1 className="text-3xl mb-6 text-center font-bold mt-6 text-blue-400 uppercase">
                Add Expense
            </h1>

            <div className="bg-white dark:bg-black p-6 rounded-2xl 
            shadow-sm hover:shadow-lg 
            dark:shadow-gray-400 dark:hover:shadow-md 
            border border-gray-100 dark:border-gray-700 
            mt-6 min-w-full transition-shadow duration-300">

                <ExpenseForm />

            </div>
        </>
    )
}

export default AddExpense