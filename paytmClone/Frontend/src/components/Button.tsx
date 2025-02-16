import React from "react";
import { cn } from "../utils";

interface ButtonProps {
    title: string;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ title, className }) => {
    return (
        <button
            type="button"
            className={cn(
                "text-white w-full bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2",
                className
            )}
            onClick={() => {}}
        >
            {title}
        </button>
    );
};

export default Button;
