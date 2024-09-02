import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Map = () => {
    const [locationName, setlocationName] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    // const [count, setCount] = useState("");

    const navigate = useNavigate();

    return (
        <div className="bg-green-100 h-screen flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-xl w-96 p-8">
                <Heading label={"Add a Account"} className="text-green-700 text-3xl font-bold mb-4 text-center" />
                <SubHeading label={"Fill in location details to add"} className="text-gray-500 text-sm mb-6 text-center" />
                
                <InputBox
                    onChange={(e) => setlocationName(e.target.value)}
                    placeholder="MicMac"
                    label={"Location Name"}
                />
                <InputBox
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Near Library"
                    label={"Address"}
                />
                <InputBox
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Place to Eat"
                    label={"Description"}
                />
                
                <Button
    onClick={async () => {
        try {
            const response = await axios.post("http://localhost:3000/app/v1/location", {
                locationName,
                address,
                description,
            }, {
                headers: {
                    'Content-Type': 'application/json' // Ensuring correct content type
                }
            });
        } catch (error) {
            console.error('Location error:', error);

            alert('Location Add failed: ' + (error.response?.data?.message || 'Unknown error'));
        }
    }}
    label={"Add Location"}
/>

    <div className="flex justify-center gap-5">
<div>

                <BottomWarning
                    buttonText={"Sign In"}
                    to={"/signin"}
                />
</div>
<div>
    
                <BottomWarning
                    buttonText={"Sign Up"}
                    to={"/signup"}
                />
</div>
    </div>
            </div>
        </div>
    );
};
