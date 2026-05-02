import React, { useState } from 'react'
import { Lock, Mail, Key } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import img from '../assets/images/login.png'
import FloatingInput from '../components/FloatingInput';
import { toast } from 'react-toastify';

const Register = () => {

    const [data, setData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            toast.error("please fix the form errors !");
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                toast.error(result.message);
                return;
            }

            toast.success(result.message);

            setData({
                username: "",
                email: "",
                password: ""
            })
            navigate("/login");

        } catch (error) {
            toast.error("Server error. Please try again later !");
        }
    };

    const validate = () => {
        let newErrors = {};

        if (!data.username.trim()) {
            newErrors.username = "Username is required";
        }

        if (!data.email.includes("@")) {
            newErrors.email = "Valid email is required";
        }

        if (data.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <div className='place-self-center'>
            <h1
                className='text-2xl lg:text-3xl my-6 text-center font-bold text-blue-400 uppercase'
            >
                Registration form
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

                <div className='flex flex-col gap-2 relative'>
                    <FloatingInput
                        type="text"
                        label="USERNAME"
                        value={data.username}
                        onChange={(e) =>
                            setData(prev => ({ ...prev, username: e.target.value }))
                        }
                        Icon={Lock}
                        error={errors.username}
                        required
                    />
                </div>

                <div className='flex flex-col gap-2 relative'>
                    <FloatingInput
                        type="email"
                        label="EMAIL"
                        value={data.email}
                        onChange={(e) =>
                            setData(prev => ({ ...prev, email: e.target.value }))
                        }
                        Icon={Mail}
                        error={errors.email}
                        required
                    />
                </div>

                <div className='flex flex-col gap-2 relative'>
                    <FloatingInput
                        type="password"
                        label="PASSWORD"
                        value={data.password}
                        onChange={(e) =>
                            setData(prev => ({ ...prev, password: e.target.value }))
                        }
                        Icon={Key}
                        error={errors.password}
                        required
                    />
                </div>

                <button
                    className='bg-blue-400 min-w-[18rem] w-full -mb-6 rounded-xl py-2 font-bold active:scale-95 cursor-pointer'
                    type="submit"
                >
                    Register
                </button>

                <Link
                    to="/login"
                    className='text-gray-500 dark:text-white text-center text-sm lg:text-md font-light cursor-pointer'
                >
                    Already have an account? Login here
                </Link>
            </form>
        </div>
    )
}

export default Register