import { Search, Download } from 'lucide-react'
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

    const handleExportCSV = () => {
        if (!expenses || expenses.length === 0) return;
        const headers = ["Title", "Amount", "Category", "Date"];
        const rows = expenses.map(exp => [
            `"${(exp.title || '').replace(/"/g, '""')}"`,
            exp.amount,
            exp.category,
            exp.date
        ]);
        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `expenses_${new Date().toISOString().split("T")[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className='w-full flex items-center justify-around flex-wrap mb-5 gap-3 lg:gap-6'>

            <select
                className="w-full sm:w-70 p-2 lg:p-3 rounded-xl outline-none 
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
                className="w-full sm:w-70 p-2 lg:p-3 rounded-xl outline-none 
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

            <div className='w-full sm:w-70 p-3 rounded-xl outline-none 
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

            <button
                onClick={handleExportCSV}
                title="Export Expenses to CSV"
                disabled={!expenses || expenses.length === 0}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-medium shadow flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <Download size={18} />
                <span>Export CSV</span>
            </button>

        </div>
    )
}

export default ExpenseFilters