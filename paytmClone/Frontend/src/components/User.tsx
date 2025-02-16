import React from "react";
import { Avatar } from "./Avatar";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

interface Props {
    user: { firstName: string; lastName: string; userId: string; _id: string };
}

export const User: React.FC<Props> = ({ user }) => {
    const navigate = useNavigate();

    const handleSetMoney = () => {
        navigate("/send?id=" + user._id + "&name=" + user.firstName);
    };

    return (
        <div className="flex justify-between items-center mb-2">
            <span className="flex items-center gap-2">
                <Avatar text={user.firstName.charAt(0)} />
                <h2>{`${user.firstName} ${user.lastName}`}</h2>
            </span>

            <Button
                title="Send Money"
                onClick={handleSetMoney}
                className="w-40"
            />
        </div>
    );
};
