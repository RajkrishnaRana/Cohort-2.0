import React from "react";

interface HeadingProps {
    label: string;
}

const Heading: React.FC<HeadingProps> = ({ label }) => {
    return (
        <h1 className="text-4xl font-extrabold text-center text-black-700">
            {label}
        </h1>
    );
};

export default Heading;
