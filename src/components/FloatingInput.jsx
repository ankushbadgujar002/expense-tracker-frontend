import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const FloatingInput = ({
    type = "text",
    label,
    value,
    onChange,
    Icon,
    error,
    required = false
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
        <div className="relative w-full mb-4">

            <input
                type={inputType}
                placeholder=" "
                value={value}
                onChange={onChange}
                required={required}
                className={`
                peer w-full p-2 ${isPassword ? "pr-10" : "pr-8.5"} rounded-xl
                outline-none border-b-2 bg-transparent
                ${error ? "border-red-500" : "border-gray-300 dark:border-gray-700"}
                focus:border-blue-400
                text-black dark:text-white
                `}
            />

            <label
                className={`
                absolute top-3 left-2.5 bg-white dark:bg-black px-1
                transition-all duration-300 ease-in-out
                ${error ? "text-red-500" : "text-black dark:text-white"}

                peer-focus:-top-2
                peer-focus:text-xs
                peer-focus:text-gray-500 dark:peer-focus:text-gray-400

                peer-not-placeholder-shown:-top-2
                peer-not-placeholder-shown:text-xs
                `}
            >
                {label}
            </label>

            {isPassword ? (
                <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute right-4 top-3 text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-gray-300 transition-colors"
                    title={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            ) : Icon ? (
                <Icon className="absolute right-4 top-3 text-gray-500 dark:text-white" size={18} />
            ) : null}

            {error && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
            )}

        </div>
    );
};

export default FloatingInput;