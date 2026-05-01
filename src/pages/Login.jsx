import { Key, Mail } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import img from '../assets/images/login.png'
import FloatingInput from '../components/FloatingInput'
import { toast } from 'react-toastify'

const Login = () => {

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data.email || !data.password) {
            toast.error("Email and password are required");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log(response);

            if (!response.ok) {
                toast.error(result.message);
                setError(true);
                return;
            }

            setError(false);

            localStorage.setItem("token", result.token);
            localStorage.setItem("userId", result.userId);
            localStorage.setItem("userName", result.username);

            setData({ email: "", password: "" });
            window.location.href = "/dashboard";

        } catch (err) {
            console.error(err.message);
            toast.error("Something went wrong !");
            setError(true);
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
                    className='bg-blue-400 min-w-[18rem] -mb-8 w-full rounded-xl py-2 font-bold active:scale-95 cursor-pointer'
                    type="submit"
                >
                    Login
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