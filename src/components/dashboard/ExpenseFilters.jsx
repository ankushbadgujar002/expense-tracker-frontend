import { Search, Download, Calendar, RotateCcw } from 'lucide-react'
import React from 'react'

const ExpenseFilters = ({
    selectedFilter,
    setSelectedFilter,
    sortOption,
    setSortOption,
    searchText,
    setSearchText,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
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

    const handleResetFilters = () => {
        setSelectedFilter("");
        setSortOption("");
        setSearchText("");
        if (setStartDate) setStartDate("");
        if (setEndDate) setEndDate("");
    };

    const isFiltered = selectedFilter || sortOption || searchText || startDate || endDate;

    return (
        <div className='w-full flex flex-col gap-4 mb-5'>
            <div className='w-full flex items-center justify-around flex-wrap gap-3 lg:gap-6'>

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
                    <option value="">Filter By Category</option>
                    <option value="ALL">ALL</option>
                    {
                        [...new Set((expenses || []).map(exp => exp.category))]
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

            {/* Date Range & Reset Row */}
            <div className='w-full flex items-center justify-between flex-wrap gap-3 pt-2 border-t border-gray-100 dark:border-gray-800 text-xs sm:text-sm'>
                <div className='flex items-center gap-2 flex-wrap text-gray-600 dark:text-gray-300'>
                    <Calendar size={16} className='text-blue-400' />
                    <span className='font-medium'>Date Range:</span>
                    <input
                        type="date"
                        value={startDate || ""}
                        onChange={(e) => setStartDate && setStartDate(e.target.value)}
                        className="px-2 py-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 outline-none"
                    />
                    <span>to</span>
                    <input
                        type="date"
                        value={endDate || ""}
                        onChange={(e) => setEndDate && setEndDate(e.target.value)}
                        className="px-2 py-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 outline-none"
                    />
                </div>

                {isFiltered && (
                    <button
                        onClick={handleResetFilters}
                        className='flex items-center gap-1 text-red-500 hover:text-red-600 dark:text-red-400 transition-colors font-medium cursor-pointer'
                    >
                        <RotateCcw size={14} />
                        <span>Reset Filters</span>
                    </button>
                )}
            </div>
        </div>
    )
}

export default ExpenseFilters