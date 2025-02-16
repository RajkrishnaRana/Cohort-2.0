import React from "react";

interface InputBoxProps {
    label: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox: React.FC<InputBoxProps> = ({
    label,
    placeholder,
    onChange,
}) => {
    return (
        <div className="mb-4">
            <h3 className="font-bold text-sm mb-2">{label}</h3>

            <input
                type="text"
                placeholder={placeholder}
                className="w-full rounded-2xl border-2 border-gray-200 p-2"
                onChange={onChange}
            />
        </div>
    );
};

export default InputBox;
