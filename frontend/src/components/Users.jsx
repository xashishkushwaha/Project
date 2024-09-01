import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/app/v1/user/bulk?filter=" + filter)
            .then(response => {
                setUsers(response.data.user);
            });
    }, [filter]);

    return (
        <div className="p-8 bg-white shadow-lg rounded-xl max-w-3xl mx-auto mt-8">
            <div className="text-3xl font-extrabold text-green-700 mb-6 text-center">
                Users
            </div>
            <div className="mb-6">
                <input
                    onChange={(e) => setFilter(e.target.value)}
                    type="text"
                    placeholder="Search by name or email"
                    className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
                />
            </div>
            <div className="space-y-6">
                {users.map(user => (
                    <User key={user._id} user={user} />
                ))}
            </div>
        </div>
    );
}

function User({ user }) {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-between p-5 bg-green-50 border border-green-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
                <div className="rounded-full h-14 w-14 bg-green-600 text-white flex items-center justify-center text-xl font-semibold">
                    {user.firstName[0].toUpperCase()}
                </div>
                <div className="ml-5">
                    <div className="text-lg font-semibold text-green-800">
                        {user.firstName} {user.lastName}
                    </div>
                    <div className="text-sm text-green-600">
                        {user.email}
                    </div>
                </div>
            </div>
            <div>
                <Button
                    onClick={() => navigate(`/send?id=${user._id}&name=${user.firstName}`)}
                    label={"Send Money"}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-colors duration-200"
                />
            </div>
        </div>
    );
}
