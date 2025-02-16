import React from "react";

interface SubheadingProps {
    subheading: string;
}

const Subheading: React.FC<SubheadingProps> = ({ subheading }) => {
    return <h3 className="text-gray-500 text-center text">{subheading}</h3>;
};

export default Subheading;
