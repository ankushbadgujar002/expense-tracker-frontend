import React, { useState } from 'react'
import { addExpense } from '../services/ExpenseService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ExpenseForm = () => {

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const navigate = useNavigate();

    const handleForm = async (e) => {
        e.preventDefault();

        if (Number(amount) > 0) {

            const userId = localStorage.getItem("userId");

            const newExpense = {
                title,
                amount: Number(amount),
                category: category.toUpperCase(),
                date: date,
                userId: userId
            };

            await addExpense(newExpense);

            toast.success("Expense Added Successfully !");
            navigate("/dashboard");

        } else {
            toast.warning("Amount must be greater than 0 !");
        }

        setTitle("");
        setAmount("");
        setCategory("");
        setDate("");
    };

    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-2xl">

                <form
                    className='flex gap-6 flex-col items-center'
                    onSubmit={handleForm}
                >

                    <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4'>

                        <input
                            autoFocus
                            placeholder='enter title...'
                            className='bg-gray-100 dark:bg-black text-gray-700 dark:text-white 
                    border border-gray-200 dark:border-gray-700 
                    p-2 rounded-xl outline-none shadow w-full'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                        />

                        <input
                            placeholder='enter amount...'
                            className='bg-gray-100 dark:bg-black text-gray-700 dark:text-white 
                    border border-gray-200 dark:border-gray-700 
                    p-2 rounded-xl outline-none shadow w-full'
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            type="number"
                        />

                        <select
                            className='bg-gray-100 dark:bg-black text-gray-700 dark:text-white 
                    border border-gray-200 dark:border-gray-700 
                    p-2 rounded-xl outline-none shadow w-full'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Select Category</option>
                            <option value="RENT">RENT</option>
                            <option value="GROCERIES">GROCERIES</option>
                            <option value="FOOD">FOOD</option>
                            <option value="TRAVEL">TRAVEL</option>
                            <option value="FUEL">FUEL</option>
                            <option value="UTILITIES">UTILITIES</option>
                            <option value="MEDICAL">MEDICAL</option>
                            <option value="EDUCATION">EDUCATION</option>
                            <option value="ENTERTAINMENT">ENTERTAINMENT</option>
                            <option value="SHOPPING">SHOPPING</option>
                            <option value="EMI">EMI</option>
                            <option value="INVESTMENT">INVESTMENT</option>
                            <option value="SUBSCRIPTIONS">SUBSCRIPTIONS</option>
                            <option value="FAMILY">FAMILY</option>
                            <option value="OTHER">OTHER</option>
                        </select>

                        <input
                            className='bg-gray-100 dark:bg-black text-gray-700 dark:text-white 
                    border border-gray-200 dark:border-gray-700 
                    p-2 rounded-xl outline-none shadow w-full'
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            type="date"
                        />

                    </div>

                    <button
                        className='bg-blue-400 w-full sm:w-60 rounded-xl py-2 font-bold text-md active:scale-95'
                        type='submit'
                    >
                        Add
                    </button>

                </form>

            </div>
        </div>
    )
}

export default ExpenseForm