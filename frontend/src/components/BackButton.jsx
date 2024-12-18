import { FiArrowLeft } from "react-icons/fi"; // Import the back arrow icon
import {useNavigate } from 'react-router-dom';


export function BackButton(){
    const navigate = useNavigate(); // Initialize useNavigate
    return <>
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
                    </div>
                    </div>
                    </div>
    </>
}