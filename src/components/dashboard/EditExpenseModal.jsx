import React from 'react'

const EditExpenseModal = ({ showModal, setShowModal, selectedExpense, formData, setFormData, updateExpense }) => {
    return (
        <div
            className={`fixed inset-0 flex items-center justify-center
                    bg-black/40 backdrop-blur-sm z-50
                    transition-all duration-300
                    ${showModal ? "opacity-100 visible" : "opacity-0 invisible"}`}
            onClick={() => setShowModal(false)}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-[#f3f4f6] dark:bg-gray-900 p-6 rounded-xl w-96 shadow-xl
                        transform transition-all duration-300 ease-out
                        ${showModal
                        ? "translate-y-0 scale-100 opacity-100"
                        : "translate-y-10 scale-95 opacity-0"
                    }`}
            >

                <h2 className="text-xl text-center text-blue-400 uppercase font-bold mb-4">
                    Edit Expense
                </h2>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        updateExpense(selectedExpense.id, formData);
                    }}
                    className="space-y-4">

                    <input
                        type="text"
                        placeholder="Title"
                        value={formData.title || ""}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full p-3 rounded-xl bg-white dark:bg-gray-800 dark:text-white 
                        shadow hover:shadow-md border border-gray-100 dark:border-gray-700 outline-none"
                    />

                    <input
                        type="number"
                        placeholder="Amount"
                        value={formData.amount || ""}
                        onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                        className="w-full p-3 rounded-xl bg-white dark:bg-gray-800 dark:text-white 
                        shadow hover:shadow-md border border-gray-100 dark:border-gray-700 outline-none"
                    />

                    <select
                        className="w-full p-3 rounded-xl outline-none bg-white dark:bg-gray-800 dark:text-white 
                        shadow hover:shadow-md border border-gray-100 dark:border-gray-700 appearance-none"
                        value={formData.category || ""}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                        type="date"
                        value={formData.date || ""}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full p-3 rounded-xl bg-white dark:bg-gray-800 dark:text-white 
                        shadow hover:shadow-md border border-gray-100 dark:border-gray-700 outline-none"
                    />

                    <div className="flex justify-center gap-3 pt-2">

                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:shadow-md active:scale-105"
                        >
                            Update
                        </button>

                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:shadow-md active:scale-105"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>
        </div>
    )
}

export default EditExpenseModal