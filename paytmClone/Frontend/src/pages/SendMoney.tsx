import { Avatar } from "../components/Avatar";
import Button from "../components/Button";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const name = searchParams.get("name");

    const [amount, setAmount] = useState("");

    const handleSendMoney = async () => {
        const response = await axios.post(
            "http://localhost:3000/api/v1/account/transfer",
            {
                to: name,
                amount: amount,
            },
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        console.log(response);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-300">
            <div className="w-96 bg-white rounded-xl p-8">
                <h1 className="text-center text-black text-3xl mb-8 font-bold">
                    Send Money
                </h1>

                <div className="flex gap-2 items-center mb-4">
                    <Avatar
                        text={name?.charAt(0)!}
                        className="bg-green-600 text-white"
                    />
                    <p className="text-black text-center font-bold text-xl">
                        {name}
                    </p>
                </div>

                <p className="text-gray-600 mb-2 ml-1 font-bold">
                    Amount in Rs.
                </p>
                <input
                    className="rounded-2xl border-1 border-gray-400 w-full p-3 "
                    placeholder="Enter amount to send"
                    onChange={(e) => {
                        setAmount(e.target.value);
                    }}
                />

                <Button
                    title="Send Money"
                    className="w-full mt-8 rounded-xl bg-green-600"
                    onClick={handleSendMoney}
                />
            </div>
        </div>
    );
};

export default SendMoney;
