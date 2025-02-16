import React from "react";
import { Link } from "react-router-dom";

interface RedirectTextProps {
    text: string;
    link: string;
    to: string;
}

const RedirectText: React.FC<RedirectTextProps> = ({ text, link, to }) => {
    return (
        <div>
            <p className="text-gray-500 text-center text">
                {text}{" "}
                <Link className="underline font-bold text-black" to={to}>
                    {link}
                </Link>
            </p>
        </div>
    );
};

export default RedirectText;
