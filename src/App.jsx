import { Navigate, Routes, Route } from "react-router-dom";
import React, { useEffect, useState, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader2 } from "lucide-react";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const AddExpense = lazy(() => import("./pages/AddExpense"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));

const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
    <Loader2 className="animate-spin text-blue-400" size={36} />
    <span className="text-gray-500 dark:text-gray-400 font-medium">Loading page...</span>
  </div>
);

const AppContent = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    // Quietly warm up the Render backend on app mount
    const baseUrl = import.meta.env.VITE_API_URL || "https://expense-tracker-backend-1-885b.onrender.com";
    fetch(`${baseUrl}/api/auth/health`).catch(() => {
      // Ignore background warmup errors
    });
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="p-6 min-h-dvh bg-gray-50 dark:bg-black dark:text-white transition-all duration-500 ease-in-out">
      
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <Suspense fallback={<PageLoader />}>
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
      </Suspense>

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
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;