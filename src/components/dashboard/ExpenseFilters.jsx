import { Search } from 'lucide-react'
import React from 'react'

const ExpenseFilters = ({
    selectedFilter,
    setSelectedFilter,
    sortOption,
    setSortOption,
    searchText,
    setSearchText,
    expenses
}) => {
    return (
        <div className='w-full flex items-center justify-around flex-wrap mb-5 gap-3 lg:gap-6'>

            <select
                className="w-70 p-2 lg:p-3 rounded-xl outline-none 
                bg-white dark:bg-black 
                text-gray-700 dark:text-white 
                border border-gray-100 dark:border-gray-700 
                shadow hover:shadow-md
                transition-all duration-300"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
            >
                <option value="">Filter By</option>
                <option value="ALL">ALL</option>
                {
                    [...new Set(expenses.map(exp => exp.category))]
                        .map(category => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))
                }
            </select>

            <select
                className="w-70 p-2 lg:p-3 rounded-xl outline-none 
                bg-white dark:bg-black 
                text-gray-700 dark:text-white 
                border border-gray-100 dark:border-gray-700 
                shadow hover:shadow-md 
                transition-all duration-300"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
            >
                <option value="">Sort By</option>
                <option value="HIGH">Highest Amount</option>
                <option value="LOW">Lowest Amount</option>
                <option value="NEW">Newest First</option>
                <option value="OLD">Oldest First</option>
                <option value="A-Z">Category A-Z</option>
                <option value="Z-A">Category Z-A</option>
            </select>

            <div className='w-70 p-3 rounded-xl outline-none 
            bg-white dark:bg-black 
            border border-gray-100 dark:border-gray-700 
            shadow hover:shadow-md 
            flex items-center justify-around overflow-hidden 
            transition-all duration-300'>

                <input
                    placeholder='search expenses...'
                    className='outline-none bg-white dark:bg-black text-gray-700 dark:text-white w-full'
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />

                <Search className='text-gray-600 dark:text-white active:scale-75 transition-all duration-300' />
            </div>

        </div>
    )
}

export default ExpenseFilters