import { useNavigate } from "react-router-dom";

export const Appbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear any user data (e.g., tokens)
        localStorage.removeItem('token');
        // Redirect to the login page
        navigate('/signin');
    };

    return (
        <div className="shadow-lg h-16 flex justify-between items-center bg-white">
            <div className="text-green-700 font-extrabold text-2xl ml-6">
                CleanSweep
            </div>

            <div className="flex items-center  mr-6 gap-5">
                <div>

                <button 
                    onClick={()=>{
                        navigate("/addlocation")
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Add Location
                </button>
                </div>

                <div>

                <button 
                    onClick={()=>{
                        navigate("/signin")
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Logout
                </button>
                </div>
            </div>
        </div>
    );
}
