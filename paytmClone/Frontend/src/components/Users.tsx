import React from "react";
import { User } from "./User";

const Users = () => {
    return (
        <div className="flex flex-col">
            <h1 className="text-xl text-black font-bold">Users</h1>
            <input
                className="my-2 border-2 border-gray-200 px-3 py-1.5 text-sm rounded"
                placeholder="Search ..."
                type="text"
            />

            <User name="Harkirat Singh" />
        </div>
    );
};

export default Users;
