import React from "react";

interface InputBoxProps {
    label: string;
    placeholder: string;
}

const InputBox: React.FC<InputBoxProps> = ({ label, placeholder }) => {
    return (
        <div className="mb-4">
            <h3 className="font-bold text-sm mb-2">{label}</h3>

            <input
                type="text"
                placeholder={placeholder}
                className="w-full rounded-2xl border-2 border-gray-200 p-2"
            />
        </div>
    );
};

export default InputBox;
