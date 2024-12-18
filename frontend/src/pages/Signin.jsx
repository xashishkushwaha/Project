import { useState } from "react"; // Import useState
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State for error handling

    const navigate = useNavigate();
    
    return (
        <div className="bg-green-100 h-screen flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-xl w-96 p-8">
                <Heading label={"Welcome Back"} />
                <SubHeading label={"Enter your credentials to access your account"} />

                <InputBox
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="youremail@example.com"
                    label={"Username"}
                />
                <InputBox
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                    type="password"
                    label={"Password"}
                />

                {error && <div className="text-red-500 mb-4">{error}</div>} {/* Error message */}

                <Button
                    onClick={async () => {
                        try {
                            const response = await axios.post("http://localhost:3000/app/v1/user/signin", { // Corrected endpoint
                                username,
                                password,
                            });

                            localStorage.setItem("token", response.data.token);
                            navigate("/dashboard");
                        } catch (error) {
                            console.error('SignIn error:', error);
                            setError("Invalid username or password."); // Set error message
                        }
                    }}
                    label={"Sign In"}
                />

                <BottomWarning
                    label={"Don't have an account?"}
                    buttonText={"Sign up"}
                    to={"/signup"}
                />
            </div>
        </div>
    );
};
