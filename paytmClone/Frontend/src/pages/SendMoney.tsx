import React from "react";
import { Avatar } from "../components/Avatar";
import Button from "../components/Button";

const SendMoney = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-300">
            <div className="w-96 bg-white rounded-xl p-8">
                <h1 className="text-center text-black text-3xl mb-8 font-bold">
                    Send Money
                </h1>

                <div className="flex gap-2 items-center mb-4">
                    <Avatar text="A" className="bg-green-600 text-white" />
                    <p className="text-black text-center font-bold text-xl">
                        A Friend's name
                    </p>
                </div>

                <p className="text-gray-600 mb-2 ml-1 font-bold">
                    Amount in Rs.
                </p>
                <input
                    className="rounded-2xl border-1 border-gray-400 w-full p-3 "
                    placeholder="Enter amount to send"
                />

                <Button
                    title="Send Money"
                    className="w-full mt-8 rounded-xl bg-green-600"
                />
            </div>
        </div>
    );
};

export default SendMoney;
