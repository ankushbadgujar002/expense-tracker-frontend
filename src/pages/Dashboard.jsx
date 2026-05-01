import React, { useEffect, useState, useMemo } from 'react'
import { getExpenses, deleteExpense, getMonthlySummary, updateExpense as updateExpenseApi } from '../services/ExpenseService'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { getSwalTheme } from '../utils/swalTheme'
import { getBudget, updateBudget } from '../services/BudgetService'
import CategoryPieChart from '../components/charts/CategoryPieChart'
import SummaryCards from '../components/dashboard/SummaryCards'
import BudgetUsageChart from '../components/charts/BudgetUsageChart'
import TopCategoryBarChart from '../components/charts/TopCategoryBarChart'
import MonthlyLineChart from '../components/charts/MonthlyLineChart'
import ExpenseFilters from '../components/dashboard/ExpenseFilters'
import ExpenseTable from '../components/dashboard/ExpenseTable'
import EditExpenseModal from '../components/dashboard/EditExpenseModal'

const Dashboard = () => {

    const userId = localStorage.getItem("userId");
    const [expenses, setExpenses] = useState([])
    const [totalBudget, setTotalBudget] = useState(0)
    const [carryForward, setCarryForward] = useState(0)
    const [formData, setFormData] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [selectedExpense, setSelectedExpense] = useState(null)
    const [selectedFilter, setSelectedFilter] = useState("")
    const [searchText, setSearchText] = useState("")
    const [sortOption, setSortOption] = useState("")
    const [monthlyData, setMonthlyData] = useState([])
    const [lastAlert, setLastAlert] = useState(null)

    const navigate = useNavigate();

    const totalSpent = expenses.reduce((acc, expense) => acc + Number(expense.amount), 0)

    const remaining = Math.max(totalBudget - totalSpent, 0)

    const formattedData = monthlyData.map(item => ({
        ...item,
        total: item.total || item.amount,
        monthName: new Date(0, item.month - 1).toLocaleString('default', { month: 'short' })
    }))

    const fetchBudget = async () => {
        try {
            const res = await getBudget()

            if (typeof res.data === "object") {
                setTotalBudget(res.data.totalBudget ?? 0)
                setCarryForward(res.data.carryForward ?? 0)
            } else {
                setTotalBudget(res.data ?? 0)
                setCarryForward(0)
            }

        } catch {
            toast.error("Failed to load budget !")
        }
    }

    const loadExpenses = async () => {
        try {
            const res = await getExpenses();
            setExpenses(res.data);
        } catch (error) {

            console.log("ERROR STATUS:", error.response?.status);

            // ONLY logout on 401 (unauthenticated)
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                navigate("/login");
            }

            // For 403 → just show error
            else if (error.response?.status === 403) {
                toast.error("Access denied - check token");
            }
        }
    };

    useEffect(() => {
        const init = async () => {

            if (!userId) {
                navigate("/login");
                return;
            }

            try {
                await loadExpenses();
                await fetchBudget();

                const res = await getMonthlySummary();
                setMonthlyData(res.data);

            } catch (error) {
                console.log(error);
                toast.error("Failed to load monthly data");
            }
        };

        init();
    }, []);

    useEffect(() => {
        if (totalBudget === 0) return

        if (totalSpent > totalBudget && lastAlert !== "exceeded") {
            toast.error("Budget exceeded!")
            setLastAlert("exceeded")
        }
        else if (
            totalSpent >= totalBudget * 0.9 &&
            totalSpent <= totalBudget &&
            lastAlert !== "warning"
        ) {
            toast.warning("You are close to your budget limit!")
            setLastAlert("warning")
        }

        if (totalSpent < totalBudget * 0.9 && lastAlert !== null) {
            setLastAlert(null)
        }

    }, [totalSpent, totalBudget, lastAlert])

    useEffect(() => {
        if (selectedExpense) {
            setFormData(selectedExpense)
        }
    }, [selectedExpense])

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            ...getSwalTheme(),
            title: "Delete Expense?",
            text: "Are you sure you want to delete this expense?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel"
        })

        if (result.isConfirmed) {
            await deleteExpense(id)
            await loadExpenses()
            await fetchBudget()
            toast.success("Expense deleted successfully !!!")
        }
    }

    const handleEdit = (expense) => {
        setSelectedExpense(expense)
        setShowModal(true)
    }

    const updateExpense = async (id, expense) => {

        const result = await Swal.fire({
            ...getSwalTheme(),
            title: "Update Expense?",
            text: "Are you sure you want to update this expense?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Update",
            cancelButtonText: "Cancel"
        })

        if (!result.isConfirmed) return

        const payload = {
            title: expense.title,
            amount: expense.amount,
            category: expense.category,
            date: expense.date
        }

        await updateExpenseApi(id, payload)
        setShowModal(false)
        await loadExpenses()
        await fetchBudget()
        toast.success("Expense updated successfully!")
    }

    const handleBudget = async () => {

        const { value } = await Swal.fire({
            ...getSwalTheme(),
            title: "Set Monthly Budget",
            input: "number",
            inputPlaceholder: "Enter budget amount",
            showCancelButton: true,
            confirmButtonText: "Continue",
            confirmButtonColor: "#4fa1ff",
            cancelButtonColor: "#d33",
            inputValidator: (value) => {
                if (!value || value <= 0) {
                    return "Please enter a valid amount"
                }
            }
        })

        if (!value) return

        try {
            const data = await updateBudget(Number(value))

            await Swal.fire({
                ...getSwalTheme(),
                title: "Budget Adjustment",
                html: `
                    <div style="text-align:left">
                        <p><b>Entered Budget:</b> ₹${data.enteredBudget}</p>
                        <p style="color:${data.carryForward > 0 ? 'red' : 'green'}; margin-bottom:.7rem">
                            <b>Carry Forward:</b> ₹${data.carryForward}
                        </p>
                        <hr/>
                        <p style="font-size:18px; margin-top:.7rem">
                            <b>Final Budget:</b> ₹${data.finalBudget}
                        </p>
                    </div>
                `,
                icon: data.carryForward > 0 ? "warning" : "success",
                confirmButtonText: "OK"
            })

            setTotalBudget(data.finalBudget)
            setCarryForward(data.carryForward)

        } catch {
            toast.error("Failed to update budget ❌")
        }
    }

    const processedExpenses = useMemo(() => {
        return expenses
            .filter(exp => {
                if (selectedFilter === "ALL" || selectedFilter === "") return true
                return exp.category === selectedFilter
            })
            .filter(exp => {
                if (!searchText) return true
                return exp.title.toLowerCase().includes(searchText.toLowerCase())
            })
            .sort((a, b) => {
                if (sortOption === "HIGH") return b.amount - a.amount
                if (sortOption === "LOW") return a.amount - b.amount
                if (sortOption === "NEW") return new Date(b.date) - new Date(a.date)
                if (sortOption === "OLD") return new Date(a.date) - new Date(b.date)
                if (sortOption === "A-Z") return a.category.localeCompare(b.category)
                if (sortOption === "Z-A") return b.category.localeCompare(a.category)
                return 0
            })
    }, [expenses, selectedFilter, searchText, sortOption])

    const categoryData = useMemo(() => {
        return Object.values(
            processedExpenses.reduce((acc, expense) => {
                if (!acc[expense.category]) {
                    acc[expense.category] = { name: expense.category, value: 0 }
                }
                acc[expense.category].value += Number(expense.amount)
                return acc
            }, {})
        )
    }, [processedExpenses])

    return (
        <div className='min-h-screen mt-6 w-full bg-gray-50 dark:bg-black px-4 md:px-6'>

            <div className='max-w-7xl mx-auto space-y-8'>

                <h1 className='text-2xl md:text-3xl mb-6 text-center font-bold text-blue-400 uppercase'>
                    Expense Dashboard
                </h1>

                <SummaryCards
                    totalBudget={totalBudget}
                    totalSpent={totalSpent}
                    remaining={remaining}
                    carryForward={carryForward}
                    handleBudget={handleBudget}
                />

                <BudgetUsageChart
                    categoryData={categoryData}
                    totalBudget={totalBudget}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                    <CategoryPieChart data={categoryData} />
                    <TopCategoryBarChart data={categoryData} />
                    <MonthlyLineChart formattedData={formattedData} />
                </div>

                <div className="bg-white dark:bg-black rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">

                    <div className='flex flex-col items-center'>
                        <ExpenseFilters
                            selectedFilter={selectedFilter}
                            setSelectedFilter={setSelectedFilter}
                            sortOption={sortOption}
                            setSortOption={setSortOption}
                            searchText={searchText}
                            setSearchText={setSearchText}
                            expenses={expenses}
                        />

                        <h2 className="text-gray-700 dark:text-white text-center font-semibold tracking-wide sm:text-xl md:text-2xl mb-2">
                            Expenses
                        </h2>
                    </div>

                    <div className="expense mt-6 overflow-y-auto flex-1">

                        {processedExpenses.length === 0 ? (
                            <p className="text-center text-gray-500 dark:text-white">
                                No expenses found
                            </p>
                        ) : (
                            <ExpenseTable
                                processedExpenses={processedExpenses}
                                handleDelete={handleDelete}
                                handleEdit={handleEdit}
                            />
                        )}

                    </div>

                </div>

                <EditExpenseModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    selectedExpense={selectedExpense}
                    formData={formData}
                    setFormData={setFormData}
                    updateExpense={updateExpense}
                />

            </div>
        </div>
    )
}

export default Dashboard