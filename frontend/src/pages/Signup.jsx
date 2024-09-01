import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    return (
        <div className="bg-green-100 h-screen flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-xl w-96 p-8">
                <Heading label={"Create Your Account"} className="text-green-700 text-3xl font-bold mb-4 text-center" />
                <SubHeading label={"Fill in your details to sign up"} className="text-gray-500 text-sm mb-6 text-center" />
                
                <InputBox
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Clean"
                    label={"First Name"}
                />
                <InputBox
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Sweep"
                    label={"Last Name"}
                />
                <InputBox
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="cleansweep@gmail.com"
                    label={"Email"}
                />
                <InputBox
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="cleansweep"
                    label={"Username"}
                />
                <InputBox
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                    type="password"
                    label={"Password"}
                />
                
                <Button
    onClick={async () => {
        try {
            const response = await axios.post("http://localhost:3000/app/v1/user/signup", {
                username,
                firstName,
                lastName,
                password,
                email,
            }, {
                headers: {
                    'Content-Type': 'application/json' // Ensuring correct content type
                }
            });

            localStorage.setItem("token", response.data.token);

            navigate("/signin");
        } catch (error) {
            console.error('Signup error:', error);

            alert('Signup failed: ' + (error.response?.data?.message || 'Unknown error'));
        }
    }}
    label={"Sign Up"}
/>


                <BottomWarning
                    label={"Already have an account?"}
                    buttonText={"Sign In"}
                    to={"/signin"}
                />
            </div>
        </div>
    );
};
