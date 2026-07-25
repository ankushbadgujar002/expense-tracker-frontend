import { Key, Mail, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import img from '../assets/images/login.png'
import FloatingInput from '../components/FloatingInput'
import { toast } from 'react-toastify'

import { useAuth } from '../context/AuthContext'

const Login = () => {

    const { login } = useAuth();
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data.email || !data.password) {
            toast.error("Email and password are required");
            return;
        }

        setLoading(true);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 seconds timeout for free tier cold start

        try {
            const baseUrl = import.meta.env.VITE_API_URL || "https://expense-tracker-backend-1-885b.onrender.com";
            const response = await fetch(`${baseUrl}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            const result = await response.json();

            if (!response.ok) {
                toast.error(result.message || "Login failed");
                setError(true);
                setLoading(false);
                return;
            }

            setError(false);

            login({
                token: result.token,
                userId: result.userId,
                username: result.username
            });

            setData({ email: "", password: "" });
            toast.success("Login Successful!");
            navigate("/dashboard");

        } catch (err) {
            clearTimeout(timeoutId);
            console.error(err.message);
            if (err.name === 'AbortError') {
                toast.error("Server is waking up (Render cold start). Please tap Login again!");
            } else {
                toast.error("Something went wrong! Server might be waking up.");
            }
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='place-self-center'>
            <h1
                className='text-2xl lg:text-3xl my-6 text-center font-bold text-blue-400 uppercase'
            >
                login form
            </h1>

            <form
                className='relative flex flex-col justify-around px-3 py-2 md:px-6 
                bg-white dark:bg-black 
                rounded-3xl 
                shadow-sm hover:shadow-lg 
                dark:shadow-gray-400 dark:hover:shadow-md 
                transition-shadow duration-300 
                border border-gray-100 dark:border-gray-700 
                min-w-xs md:w-sm min-h-100'
                onSubmit={handleSubmit}
            >

                <img
                    className='absolute -top-9 left-1/2 -translate-x-1/2 h-20 w-20'
                    src={img}
                    alt="login_image"
                />

                <div className='flex flex-col gap-7'>
                    <div className='flex flex-col relative'>
                        <FloatingInput
                            type="email"
                            label="EMAIL"
                            value={data.email}
                            onChange={(e) =>
                                setData(prev => ({ ...prev, email: e.target.value }))
                            }
                            Icon={Mail}
                        />
                    </div>

                    <div className='flex flex-col relative'>
                        <FloatingInput
                            type="password"
                            label="PASSWORD"
                            value={data.password}
                            onChange={(e) =>
                                setData(prev => ({ ...prev, password: e.target.value }))
                            }
                            Icon={Key}
                        />
                    </div>

                    <div className='flex items-center gap-2 justify-between w-fit'>
                        <input type="checkbox" />
                        <p className='text-gray-500 dark:text-white text-sm lg:text-md font-light'>
                            Remember me
                        </p>
                    </div>
                </div>

                <button
                    className='bg-blue-400 min-w-[18rem] -mb-8 w-full rounded-xl py-2 font-bold active:scale-95 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                    type="submit"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" size={18} />
                            Logging in...
                        </>
                    ) : (
                        "Login"
                    )}
                </button>

                <div className='text-center'>
                    <Link
                        to="/register"
                        className='text-gray-500 dark:text-white text-sm lg:text-md font-light cursor-pointer'
                    >
                        Don't have an account? SignUp
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Login