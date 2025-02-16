import React from "react";
import { Avatar } from "./Avatar";
import Button from "./Button";

interface Props {
    name: string;
}

export const User: React.FC<Props> = ({ name }) => {
    return (
        <div className="flex justify-between items-center mb-2">
            <span className="flex items-center gap-2">
                <Avatar text={name.substring(0, 1)} />
                <h2>{name}</h2>
            </span>

            <Button title="Send Money" className="w-40" />
        </div>
    );
};
