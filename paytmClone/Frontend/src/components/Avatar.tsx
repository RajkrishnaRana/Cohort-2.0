import React from "react";
import { cn } from "../utils";

interface Props {
    text: string;
    className?: string;
}

export const Avatar: React.FC<Props> = ({ text, className }) => {
    return (
        <div
            className={cn(
                "flex w-10 h-10 rounded-full bg-gray-300 items-center text-xl font-bold text-center justify-center",
                className
            )}
        >
            {text}
        </div>
    );
};
