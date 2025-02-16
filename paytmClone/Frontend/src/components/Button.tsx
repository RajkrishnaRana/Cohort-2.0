import React from "react";
import { cn } from "../utils";

interface ButtonProps {
    title: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ title, onClick, className }) => {
    return (
        <button
            type="button"
            className={cn(
                "text-white w-full bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2",
                className
            )}
            onClick={onClick}
        >
            {title}
        </button>
    );
};

export default Button;
