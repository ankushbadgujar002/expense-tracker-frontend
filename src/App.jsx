import { Navigate, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="p-6 min-h-dvh bg-gray-50 dark:bg-black dark:text-white transition-all duration-500 ease-in-out">
      
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />

        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/add-expense"
          element={isLoggedIn ? <AddExpense /> : <Navigate to="/login" />}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={4000}
        limit={3}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
        transition={Bounce}
      />
    </div>
  );
}

export default App;