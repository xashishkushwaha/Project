import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import { FiArrowLeft } from "react-icons/fi"; // Import the back arrow icon

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    const handleTransfer = async () => {
        // Reset error and success messages
        setError("");
        setSuccessMessage("");

        // Validate amount
        if (amount <= 0) {
            setError("Please enter a valid amount to send.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/app/v1/account/transfer", {
                to: id,
                amount
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            setSuccessMessage("Transfer successful!");
            setAmount(0); // Reset amount after successful transfer
            document.getElementById("amount").value = 0;

        } catch (err) {
            console.error('Transfer error:', err);
            setError("An error occurred during the transfer. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-green-50 relative">
            <div className="h-full flex flex-col justify-center">
                <div className="border h-min text-card-foreground max-w-md p-6 space-y-6 w-96 bg-white shadow-lg rounded-lg">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate("/dashboard")} // Navigate back to the previous page
                        className="absolute top-4 left-4 flex items-center p-2 rounded-full bg-green-500 hover:bg-green-600 transition duration-300"
                    >
                        <FiArrowLeft className="text-white text-xl" />
                    </button>

                    <h2 className="text-3xl font-bold text-center text-green-600">Send Money</h2>
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center">
                            <span className="text-3xl text-white font-bold">{name[0].toUpperCase()}</span>
                        </div>
                        <h3 className="text-2xl font-semibold text-green-800">{name}</h3>
                    </div>
                    {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
                    {successMessage && <div className="text-green-500 text-sm mb-2">{successMessage}</div>}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none text-green-600"
                                htmlFor="amount"
                            >
                                Amount (in Rs)
                            </label>
                            <input
                                onChange={(e) => setAmount(Number(e.target.value))}
                                type="number"
                                className="flex h-10 w-full rounded-md border border-green-300 bg-green-50 px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                                id="amount"
                                placeholder="Enter amount"
                            />
                        </div>
                        <button
                            onClick={(handleTransfer)}
                            className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-600 text-white hover:bg-green-700"
                        >
                            Initiate Transfer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
