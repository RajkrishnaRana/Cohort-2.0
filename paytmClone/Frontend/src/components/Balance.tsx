import React from "react";

interface BalanceProps {
    amount: string;
}

const Balance: React.FC<BalanceProps> = ({ amount }) => {
    return (
        <div className="text-lg font-bold mb-4">
            Your Balance is Rs. {amount}
        </div>
    );
};

export default Balance;
