import { useEffect, useState } from "react";
import { User } from "./User";
import axios from "axios";

interface UserDataType {
    firstName: string;
    lastName: string;
    userId: string;
    _id: string;
}

const Users = () => {
    const debouncedTime = 500;

    const [userData, setUserData] = useState<UserDataType[]>([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const handler = setTimeout(async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/v1/user/bulk?filter=" + filter,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
                console.log(response);
                setUserData(response.data.user);
            } catch (error) {
                console.error(error);
            }
        }, debouncedTime);

        return () => clearTimeout(handler);
    }, [filter]);

    return (
        <div className="flex flex-col">
            <h1 className="text-xl text-black font-bold">Users</h1>
            <input
                className="my-2 border-2 border-gray-200 px-3 py-1.5 text-sm rounded"
                placeholder="Search ..."
                type="text"
                onChange={(e) => setFilter(e.target.value)}
            />

            {userData.map((user) => (
                <User user={user} key={user.userId} />
            ))}
        </div>
    );
};

export default Users;
