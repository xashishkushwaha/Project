import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export const AddLocation = () => {
    console.log("Add Location");
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState("");
    const [locationName, setLocationName] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    const handleAddLocation = async () => {
        // Reset messages
        setSuccessMessage("");
        setError("");

        try {
            const response = await axios.post("http://localhost:3000/app/v1/location", {
                locationName,
                address,
                description,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            setSuccessMessage("Location added successfully!");
        } catch (error) {
            console.error('Location error:', error);
            setError("Location already present");
        }
    };

    return (
        <>
            <div className="flex justify-center items-center h-screen bg-green-50 relative">
                <div className="flex flex-col justify-center items-center w-full max-w-md px-6">
                    <div className="relative border bg-white shadow-lg rounded-lg p-8 w-full">
                        {/* Back Button */}
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="absolute top-4 left-4 flex items-center p-2 rounded-full bg-green-500 hover:bg-green-600 transition duration-300"
                        >
                            <FiArrowLeft className="text-white text-xl" />
                        </button>

                        <Heading label={"Add a Location"} className="text-green-700 text-3xl font-bold mb-4 text-center" />
                        <SubHeading label={"Fill in location details to add"} className="text-gray-500 text-sm mb-6 text-center" />

                        <div className="space-y-4">
                            <InputBox
                                onChange={(e) => setLocationName(e.target.value)}
                                value={locationName}
                                placeholder="MicMac"
                                label={"Location Name"}
                            />
                            <InputBox
                                onChange={(e) => setAddress(e.target.value)}
                                value={address}
                                placeholder="Near Library"
                                label={"Address"}
                            />
                            <InputBox
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                placeholder="Place to Eat"
                                label={"Description"}
                            />
                        </div>

                        {error && <div className="text-red-500 text-sm mt-4 text-center">{error}</div>}
                        {successMessage && <div className="text-green-500 text-sm mt-4 text-center">{successMessage}</div>}

                        <Button
                            onClick={handleAddLocation}
                            label={"Add Location"}
                            className="w-full mt-6"
                        />

                        <div className="flex justify-center gap-5 mt-6">
                            <BottomWarning buttonText={"Sign In"} to={"/signin"} />
                            <BottomWarning buttonText={"Sign Up"} to={"/signup"} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
