import React from "react";

const FloatingInput = ({
    type = "text",
    label,
    value,
    onChange,
    Icon,
    error,
    required = false
}) => {
    return (
        <div className="relative w-full mb-4">

            <input
                type={type}
                placeholder=" "
                value={value}
                onChange={onChange}
                required={required}
                className={`
                peer w-full p-2 pr-8.5 rounded-xl
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

            {Icon && (
                <Icon className="absolute right-4 top-3 text-gray-500 dark:text-white" size={18} />
            )}

            {error && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
            )}

        </div>
    );
};

export default FloatingInput;