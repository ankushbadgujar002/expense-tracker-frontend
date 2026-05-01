import { LayoutDashboard, PlusCircle, LogIn, Sun, Moon, LogOut, UserRoundPlus } from "lucide-react";
import { Link } from "react-router-dom";
import img from '../assets/images/spending.png';
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { getSwalTheme } from "../utils/swalTheme";

function Navbar({ theme, toggleTheme }) {

    const token = localStorage.getItem("token");

    const handleLogout = () => {

        const username = localStorage.getItem("userName");
        const theme = getSwalTheme();
    
        Swal.fire({
            title: "Log out?",
            text: `Are you sure ${username}, you want to logout?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, logout",
            cancelButtonText: "Cancel",
            background: theme.background,
            color: theme.color
        }).then((result) => {
    
            if (result.isConfirmed) {
    
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                localStorage.removeItem("userName");
                sessionStorage.removeItem("welcomeShown");
    
                Swal.fire({
                    title: "Logged out!",
                    text: "You have been successfully logged out.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                    background: theme.background,
                    color: theme.color
                }).then(() => {
                    window.location.href = "/login";
                });
            }
    
        });
    };
    return (
        <nav className="bg-white dark:bg-black dark:text-white dark:shadow-gray-400 shadow-md px-4 lg:px-8 py-1 md:py-3 flex justify-between items-center transition-all duration-1000 ease-in-out min-w-full rounded-xl relative">

            {/* Logo */}
            <div className="logo lg:h-20 lg:w-20 w-12 h-12 flex items-center justify-center rounded-xl">
                <img src={img} alt="expense_tracker_logo" />
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4 md:gap-6 items-center justify-center">

                <button
                    onClick={toggleTheme}
                    className="relative w-7 h-7 md:w-10 md:h-10 flex items-center justify-center border-2 border-gray-600 rounded-full hover:border-blue-600 dark:border-white
                    dark:hover:border-white
                     hover:text-blue-600 dark:hover:text-white transition-all duration-1000 hover:scale-110"
                >
                    {/* Sun Icon */}
                    <Sun
                        className={`absolute size-4 md:size-6 transition-all duration-1000 
                    ${theme === "dark"
                                ? "opacity-100 rotate-0 scale-100"
                                : "opacity-0 -rotate-180 scale-0"}`}
                    />

                    {/* Moon Icon */}
                    <Moon
                        className={`absolute size-4 md:size-6 transition-all duration-300 
                    ${theme === "light"
                                ? "opacity-100 rotate-0 scale-100"
                                : "opacity-0 rotate-180 scale-0"}`}
                    />
                </button>

                {token ? (
                    <>
                        <Link
                            to="/dashboard"
                            title="dashboard"
                            className="flex items-center gap-2 text-gray-600 dark:text-white hover:text-blue-600 text-sm lg:text-md active:scale-95 transition-all duration-300 ease-in-out">
                            <LayoutDashboard className="size-6" />
                            <span className="hidden md:inline">Dashboard</span>
                        </Link>

                        <Link
                            to="/add-expense"
                            title="add-expense"
                            className="flex items-center gap-2 text-gray-600 dark:text-white hover:text-blue-600 text-sm lg:text-md active:scale-95 transition-all duration-300 ease-in-out">
                            <PlusCircle className="size-6" />
                            <span className="hidden md:inline">Add Expense</span>
                        </Link>

                        <a
                            onClick={handleLogout}
                            title="logout"
                            className="flex items-center gap-2 text-gray-600 dark:text-red-500 hover:text-red-600 text-sm lg:text-md active:scale-95 transition-all duration-300 ease-in-out cursor-pointer">
                            <LogOut className="size-6" />
                            <span className="hidden md:inline">Log Out</span>
                        </a>
                    </>
                ) : (
                    <>
                        <h1
                            className="absolute  left-1/2 -translate-x-1/2 text-sm opacity-0 sm:opacity-100 lg:text-2xl text-blue-200 dark:text-blue-400  text-shadow-blue-700"
                        >Expense Tracker</h1>
                        <Link
                            to="/login"
                            title="login"
                            className="flex items-center gap-2 text-gray-600 dark:text-white hover:text-blue-600 text-sm lg:text-md active:scale-95 transition-all duration-300 ease-in-out"
                        >
                            <LogIn className="size-6" />
                            <span className="hidden md:inline">Login</span>
                        </Link>

                        <Link
                            to="/register"
                            title="signup/register"
                            className="flex items-center gap-2 text-gray-600 dark:text-white hover:text-blue-600 text-sm lg:text-md active:scale-95 transition-all duration-300 ease-in-out"
                        >
                            <UserRoundPlus className="size-6" />
                            <span className="hidden md:inline">SignUp</span>
                        </Link>
                    </>
                )}

            </div>

        </nav>
    );
}

export default Navbar;